import React, { Component } from 'react';
import { Text, StyleSheet, View, Image, Alert } from 'react-native';
import { TextInput, ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import CommentItem from '../component/CommentItem';
import AppHelper from '../helper/AppDBHelper';
import Moment from 'moment';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import Menu from './Menu';
import CommentContainer from './CommentContainer';
import { getCurrentUserASync } from '../helper/helper';
import { goToGoogleMap } from '../helper/helper';
import * as Clipboard from 'expo-clipboard';

//每一篇貼文
export default class PostItem extends Component {
    constructor(props) {
        super(props);
        this.state = {
            mapModalVisible: false,
            modalVisible: false,
            CommentContainerVisible: false,
            // id,
            // text,
            // user,
            // updatedAt,
            // replies,
            userId: null,
            role: 1
        }


        this.setModalVisible = this.setModalVisible.bind(this);
        this.setCommentContainerVisible = this.setCommentContainerVisible.bind(this);
        this.setMapModalVisible = this.setMapModalVisible.bind(this);
    }
    setMapModalVisible() {
        const { post } = this.props
        const latlng = {
            latitude: post.getLatitude(),
            longitude: post.getLongitude(),
        }
        goToGoogleMap(latlng);
    }
    setMapModalNOTVisible() {
        // this.setState({mapModalVisible: false})
    }

    setModalVisible = (visible) => {
        this.setState({ modalVisible: visible });
    }

    setCommentContainerVisible = (visible) => {
        this.setState({ CommentContainerVisible: visible });
    }


    async componentDidMount() {
        getCurrentUserASync().then(user => this.setState({ userId: user.getId(), role: user.role }))
    }

    // addComment = async () => {
    //     const { postId, text } = this.state;
    //     const newComment = new Comment({ postId, text })
    //     const manager = await AppHelper();
    //     manager.addComment(postId, text)

    // }


    render() {
        const pictureUrl = this.props.post.getAuthor().getPictureUrl();
        return (
            <View>

                <View style={styles.radius_shadow}>

                    <View style={styles.postItemContainer}>

                        <View style={styles.proPicContainer}>

                            <Image style={styles.img} source={
                                (pictureUrl == '' || pictureUrl == undefined)
                                    ? require('app/assets/profile.png')
                                    : { uri: pictureUrl }
                            } />
                            <View style={styles.nameTimeContainer}>
                                <Text style={{ marginTop: 3, fontSize: 15 }}>{this.props.post.getAuthorName()}</Text>
                                <Text style={{ marginTop: 3, color: '#7b7b7b', fontSize: 12 }}>
                                    {this.props.post.getPostTime()}
                                </Text>
                            </View>
                        </View>


                        <View style={{ flexDirection: 'row', alignSelf: 'center', marginBottom: 15 }}>
                            <Text style={styles.theme}>{this.props.post.getTopicName()}</Text>
                            {((this.props.post.getAuthor().getId() === this.state.userId) || (this.state.role === 0)) && (
                                <>
                                    <Menu
                                        editPost={this.props.post}
                                        modalVisible={this.state.modalVisible}
                                        setModalVisible={this.setModalVisible}
                                        onEdit={() => {
                                            this.setModalVisible(false);
                                            this.props.navigation.navigate('EditPost', { post: this.props.post })
                                        }}
                                    />
                                    <TouchableOpacity onPress={() => this.setModalVisible(true)}>
                                        <MaterialCommunityIcons style={styles.iconStyle} name='dots-vertical' size={24}></MaterialCommunityIcons>
                                    </TouchableOpacity>
                                </>
                            )}
                        </View>

                    </View>


                    <View>
                        <Text
                            style={styles.title}
                            numberOfLines={2}
                            multiline={true}
                            maxLength={30}>{this.props.post.getTitle()}</Text>
                    </View>

                    <View style={styles.divide} />

                    <Text style={styles.fontBlue}>公告有效期間：{this.props.post.getStartDate() + ' ~ ' + this.props.post.getEndDate()}</Text>

                    <ScrollView style={styles.contentBox}>
                        <Text
                            style={styles.content}
                            multiline={true}
                            // numberOfLines={5}
                            maxLength={1000}
                        >
                            {this.props.post.getText()}
                        </Text>
                        <TouchableOpacity onPress={() => Clipboard.setString(this.props.post.getText())} style={{ marginTop: 5 }}>
                            <Text style={{ color: '#5698FC', fontSize: 16, marginLeft: 5 }}>複製內文</Text>
                        </TouchableOpacity>
                        {
                            this.props.post.getFiles().map(file =>
                                <Image key={file.id} style={styles.postImg} source={{ uri: file.getUrl() }} />
                            )
                        }
                        {/* <Image style={styles.postImg} source={require('../../assets/image_big.png')} /> */}

                        {
                            /* 連結地圖按鈕 */
                            (this.props.post.getLatitude() && this.props.post.getLongitude()) &&
                            <TouchableOpacity onPress={this.setMapModalVisible} style={{ flexDirection: 'row', alignItems: 'center', marginTop: 25 }}>
                                <Image style={{ height: 24, width: 24, marginRight: 3 }} source={require('app/assets/location.png')}></Image>
                                <Text style={{ color: 'red', fontSize: 18, textDecorationLine: 'underline' }}>連結地圖</Text>
                            </TouchableOpacity>
                        }
                        <View style={styles.divide} />

                        <View style={{ marginTop: 0 }}>
                            {
                                // 先列出三個 0,1,2 
                                this.props.post.comments
                                    .slice(0, 3)
                                    .map((comment, index) => (
                                        <CommentItem userId={this.state.userId} key={index} comment={comment} />
                                    ))
                            }
                            {
                                this.props.post.comments.length > 3 &&
                                <Text>...還有{this.props.post.comments.length - 3}則留言</Text>
                            }
                        </View>



                        {/* 留言框 */}
                        <TouchableOpacity onPress={this.setCommentContainerVisible}>
                            <CommentContainer userId={this.state.userId} goRefreshNthPost={this.props.goRefreshNthPost} post={this.props.post} CommentContainerVisible={this.state.CommentContainerVisible} setCommentContainerVisible={this.setCommentContainerVisible}></CommentContainer>
                            <View style={styles.commentInputBox} flexDirection='row'>
                                <Image style={{ height: 20, width: 20 }} source={require('app/assets/chat.png')}></Image>
                                <View style={{ justifyContent: 'center', alignItems: 'center', marginLeft: 10 }}>
                                    <Text style={{ color: '#8c8c8c' }}>點我查看更多留言</Text>
                                </View>

                            </View>
                        </TouchableOpacity>

                        {/* <CommentItem /> */}

                    </ScrollView>

                </View>

            </View>
        )
    }
}

const styles = StyleSheet.create({

    postItemContainer: {
        justifyContent: 'space-between',
        flexDirection: 'row',
        // alignItems: 'center'
    },
    iconStyle: {
        color: '#8E8E8E',
        // margin: 10,
        marginLeft: 18,
        marginRight: 10
    },
    fontBlue: {
        color: '#5698FC',
        marginLeft: 5,
        marginBottom: 10
    },
    img: {
        marginLeft: 5,
        width: 40,
        height: 40,
        borderRadius: 100,
        borderColor: '#6C6C6C',
        overflow: 'hidden',
    },
    postImg: {
        marginTop: 10,
        // backgroundColor: '#F0F0F0',
        alignSelf: 'center',
        resizeMode: 'contain',
        width: '100%',
        height: 300
    },
    theme: {
        alignSelf: 'center',
        fontSize: 18,
        color: '#A7D379',
        fontWeight: 'bold',
        // borderRadius: 10,
        // padding: 8,
        overflow: 'hidden',
        // width:100  
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        marginLeft: 5,
    },
    content: {
        // flex:1,
        fontSize: 18,
        marginLeft: 5,
    },
    contentBox: {
        marginTop: 10
        // alignItems:'center'
        // height:250,
        // flex:1
    },
    divide: {
        marginTop: 10,
        marginBottom: 10,
        backgroundColor: '#ADADAD',
        height: 2
    },
    radius_shadow: {
        // alignSelf: 'center',
        // width:'92%', 
        // flex: 1,
        margin: 12,
        padding: 15,
        backgroundColor: 'white',
        borderRadius: 10,
        shadowOffset: { width: 0, height: 0 },
        shadowColor: 'black',
        shadowOpacity: 0.2,
    },
    commentInputBox: {

        marginTop: 15,
        marginBottom: 5,
        // width: '100%',
        paddingHorizontal: 15,
        paddingVertical: 5,
        backgroundColor: '#F0F0F0',
        // elevation: 5,
        borderRadius: 20,
        // overflow: 'hidden'
    },
    proPicContainer: {
        alignItems: 'center',
        marginBottom: 15,
        flexDirection: 'row'
    },
    nameTimeContainer: {
        marginLeft: 10,
    },
})