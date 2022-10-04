import React, { Component } from 'react';
import {
    Modal,
    Text,
    View,
    StyleSheet,
    Image,

    TouchableHighlight,
    Button,
    Alert,
    KeyboardAvoidingView,
    Platform,
    TouchableOpacity,
} from 'react-native';

import AppHelper from '../helper/AppDBHelper'
import { ScrollView,  TextInput } from 'react-native-gesture-handler';
import { Ionicons, MaterialIcons, AntDesign } from '@expo/vector-icons';
import CommentItem from './CommentItem'
import AppDBHelper from '../helper/AppDBHelper';
import Post from '../model/Post';
import Comment from '../model/Comment';
import { renderParserText } from './renderParserText';

//留言
export default class CommentContainer extends Modal {

    constructor(props) {
        super(props);
        this.state = {
            text: '',
            userList: [],
            onTag: false,
        }
        this.addComment = this.addComment.bind(this);
        this.goTagUser = this.goTagUser.bind(this);
        this.onChangeText = this.onChangeText.bind(this);
        this.tagPress = this.tagPress.bind(this);
    }
    async addComment() {
        if (!("post" in this.props)) return;
        const { text } = this.state
        if (text === '') return;
        const manager = await AppDBHelper();
        await manager.addComment(this.props.post.getId(), text)
        return this.setState({ text: '' })
        //  用socker listen change 之後 就不用自己更新了
        //  ,()=>this.props.goRefreshNthPost() )
    }
    onChangeText(text) {
        console.log(text)
        if (text.match('@') && text.match('@').length !== 0) this.setState({ onTag: true, text: text }, () => this.goTagUser())
        else this.setState({ onTag: false, text: text, userList: [] })
    }
    async goTagUser() {
        console.log('goTagUsrt')
        const regexp = /(@[^\s|^\t]+)/g;
        const matchList = this.state.text.match(regexp);
        console.log(matchList)
        if (matchList == null || matchList.length === 0) return this.setState({ userList: [] }, console.log(this.state.userList))
        const search = matchList[0].replace('@', '');
        console.log(search)
        const manager = await AppHelper();
        const userList = await manager.searchUser(search)
        this.setState({ userList }, console.log(this.state.userList))

    }

    tagPress(user) {
        const { text } = this.state
        const setState = (value) => this.setState(value)
        return function () {
            const regexp = /(@[^\s|^\t]+)/g;
            const matchList = text.match(regexp);
            if (matchList !== null && matchList.length !== 0) {
                // id感覺要Encode 有空再來做
                const tagName = `<font color="#FE2026" id="${user.id}">${user.username}</font>`
                const newText = text.replace(matchList[0], tagName)
                setState({ text: newText, userList: [] })
            }
        }
    }
    renderUserList() {
        return this.state.userList.length !== 0 &&
            <View>
                {this.state.userList.map(user =>
                    <Button
                        key={user.id}
                        onPress={this.tagPress(user)}
                        title={user.username} />
                )}
            </View>;
    }
    render() {

        return (

            <Modal
                animationType='slide'
                transparent={true}
                visible={this.props.CommentContainerVisible}
                onRequestClose={() => {
                    // Alert.alert("Modal has been closed.");
                    this.props.setCommentContainerVisible(false);

                }}
            >

                {/* <TouchableWithoutFeedback onPress={() => this.props.setModalVisible(false)}> */}
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>

                        <TouchableOpacity style={styles.iconStyle} onPress={() => this.props.setCommentContainerVisible(false)}>
                            <AntDesign color='#7c7c7c' name='left' size={24}></AntDesign>
                        </TouchableOpacity>

                        <View style={{ marginTop: 15 }}></View>


                        {/* <View style={styles.topicBox}> */}
                        {/* <ScrollView > */}



                        <ScrollView style={{ marginTop: 0, flex: 1 }}>
                            {this.props.post.comments.map((comment, index) => (
                                <CommentItem userId={this.props.userId} key={index} comment={comment} />
                            ))
                            }
                        </ScrollView>



                        {/* 輸入留言框 */}
                        <KeyboardAvoidingView behavior={Platform.OS == "ios" ? "padding" : "height"}>
                            <View style={styles.commentInputBox} flexDirection='row' justifyContent='space-between'>
                            
                                <View style={{ position: 'relative', flex: 1 }}>
                                    <Text numberOfLines={1}  style={ { flex: 1, position: 'absolute'}}>
                                        {renderParserText(this.state.text)}
                                    </Text>
                            
                                    
                                    <TextInput
                                        value={this.state.text}
                                        onChangeText={this.onChangeText}
                                        sytle={{ flex: 1,position: 'absolute',color: 'rgba(0,0,0,0)'}}
                                        placeholder='輸入留言......' />
                
                                    
                                </View> 
                                {/* <TextInput
                                    value={this.state.text}
                                    onChangeText={this.onChangeText}
                                    style={{ justifyContent: 'center' }}
                                    placeholder='輸入留言......' /> */}
                                <TouchableOpacity onPress={this.addComment}>
                                    <Image style={{ height: 28, width: 28 }} source={require('app/assets/send_blue.png')}></Image>
                                </TouchableOpacity>
                            </View>
                        </KeyboardAvoidingView>

                        {this.renderUserList()}


                        {/* <View>
        
                                    <TouchableHighlight>
                                        <Text>.username</Text>
                                    </TouchableHighlight>
                            </View> */}





                    </View>
                </View>


            </Modal>
        );
    }


}

const styles = StyleSheet.create({
    iconStyle: {
        alignSelf: 'flex-start',
        color: '#8E8E8E',
        // margin: 10,

    },
    topicBox: {
        height: undefined
    },
    centeredView: {
        backgroundColor: 'rgba(0,0,0,0.5)',
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22
    },
    modalView: {
        width: '90%',
        height: '90%',
        // margin: 20,
        backgroundColor: "white",
        borderRadius: 10,
        paddingHorizontal: 20,
        paddingTop: 20,
        // alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        // fontSize:50
    },
    openButton: {
        backgroundColor: "#F194FF",
        borderRadius: 20,
        padding: 10,
        elevation: 2
    },
    commentInputBox: {
        marginTop: 15,
        marginBottom: 65,
        // width: '100%',
        paddingHorizontal: 15,
        paddingVertical: 5,
        backgroundColor: '#F0F0F0',
        borderRadius: 20,
        // overflow: 'hidden'
    },
    textStyle: {
        paddingHorizontal: 10,
        color: "white",
        fontWeight: "bold",
        textAlign: "center"
    },
    modalText: {
        fontSize: 18,
        marginBottom: 15,
        textAlign: "center"
    }
});