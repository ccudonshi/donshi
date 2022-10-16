import React, { Component } from 'react'
import { Text, StyleSheet, View, Image } from 'react-native'
import { TextInput, ScrollView, TouchableOpacity } from 'react-native-gesture-handler'
import ReplyContainer from '../component/ReplyContainer'
import { getCurrentUserASync } from '../helper/helper';
import AppDBHelper from '../helper/AppDBHelper';
import { diffDate } from '../helper/helper';
import { renderParserText } from './renderParserText';


export default class ReplyComment extends Component {

    unicodeToChar = (text) => {
        return text.replace(/\\u[\dA-F]{4}/gi, function (match) {
            return String.fromCharCode(parseInt(match.replace(/\\u/g, ""), 16));
        });
    };

    constructor(props) {
        super(props);
        this.state = {
            ReplyContainerVisible: false,
        }

        this.setReplyContainerVisible = this.setReplyContainerVisible.bind(this);
        this.deleteComment = this.deleteComment.bind(this);
    }

    setReplyContainerVisible(visible) {
        this.setState({ ReplyContainerVisible: visible });
    }
    async deleteComment() {
        if (!("comment" in this.props)) return;
        const manager = await AppDBHelper();
        await manager.deleteComment(this.props.comment.getId())
    }



    render() {
        const pictureUrl = this.props.comment.getUser().getPictureUrl();

        return (

            <View style={styles.commentContainer}>
                <View style={styles.nameTextProPicContainer}>
                    <Image style={styles.img} source={
                        (pictureUrl == '' || pictureUrl == undefined)
                            ? require('app/assets/profile.png')
                            : { uri: pictureUrl }
                    } />
                    <View style={styles.nameTextContainer}>
                        <View>
                            <Text style={{ fontSize: 13, fontWeight: 'bold' }}>{this.props.comment.getUserName()}</Text>

                            <Text numberOfLines={30} style={{ marginTop: 5 }}>
                                {renderParserText(this.props.comment.text)}
                            </Text>
                            {/* <Text numberOfLines={30} style={{ marginTop: 5 }}>{this.unicodeToChar(this.props.comment.text)}</Text> */}
                        </View>
                    </View>
                </View>

                <View style={{ flexDirection: 'row', alignItems: 'center', marginLeft: 6 }}>
                    <Text style={{ marginLeft: 48, fontSize: 12, marginTop: 5, color: '#8E8E8E' }}>{diffDate(this.props.comment.getPostTimeDate())}</Text>

                    <TouchableOpacity onPress={this.setReplyContainerVisible} style={{ marginTop: 5, marginLeft: 20 }}>
                        <ReplyContainer comment={this.props.comment} commentId={this.props.comment.getId()} replies={this.props.comment.replies} ReplyContainerVisible={this.state.ReplyContainerVisible} setReplyContainerVisible={this.setReplyContainerVisible}></ReplyContainer>
                        {/* <Text style={{ color: '#5698FC', fontSize: 13 }}>回覆</Text> */}
                    </TouchableOpacity>
                    {
                        (this.props.comment.getUser().getId() === this.props.userId) &&
                        <TouchableOpacity onPress={this.deleteComment} style={{ marginTop: 5, marginLeft: 20 }}>
                            <Text style={{ color: '#5698FC', fontSize: 13 }}>刪除</Text>
                        </TouchableOpacity>
                    }

                </View>

                {/* 按回覆鍵跳出 */}
                {/* <View style={styles.commentInputBox} flexDirection='row' justifyContent='space-between'>
                    <View style={{ justifyContent: 'center' }}>
                        <TextInput placeholder='留言......' ></TextInput>
                    </View>
                    <TouchableOpacity >
                        <Image style={{ height: 28, width: 28 }} source={require('../../assets/send_blue.png')}></Image>
                    </TouchableOpacity>
                </View> */}



                {/* <Image style={styles.commentImg} source={require('../../assets/image_big.png')} /> */}
            </View>


        )
    }
}

const styles = StyleSheet.create({
    img: {
        marginLeft: 5,
        width: 40,
        height: 40,
        borderRadius: 100,
        borderColor: '#6C6C6C',
        overflow: 'hidden',
    },
    proPic: {
        // marginLeft: 5,
        width: 40,
        height: 40,
        borderRadius: 100,
        borderColor: '#6C6C6C',
        overflow: 'hidden',
    },
    commentContainer: {
        // width:'90%',
        // backgroundColor:'gray',
        marginBottom: 8
        // paddingRight:40
    },

    nameTextProPicContainer: {
        flexDirection: 'row',

    },
    nameTextContainer: {
        // width:'92%', 
        marginRight: 40,
        marginLeft: 5,
        padding: 10,
        backgroundColor: '#F0F0F0',
        borderRadius: 10
    },
    commentImg: {
        marginLeft: 40,
        marginRight: 40,
        backgroundColor: '#f0f0f0',
        borderRadius: 10,
        // alignSelf:'center',
        resizeMode: 'contain',
        width: '80%',
        height: 100
    },
    commentInputBox: {
        marginTop: 8,
        marginBottom: 10,
        marginLeft: 40,
        // width: '100%',
        paddingHorizontal: 15,
        paddingVertical: 5,
        backgroundColor: '#F0F0F0',
        elevation: 20,
        borderRadius: 20,
        // overflow: 'hidden'
    },

})