import React, { Component } from 'react';
import {
    Modal,
    Button,
    Text,
    View,
    StyleSheet,
    Image,
    TouchableOpacity,
    KeyboardAvoidingView,
    Platform,
    TouchableHighlight
} from 'react-native';
import TopicItem from './TopicItem';
import AppHelper from '../helper/AppDBHelper'
import { ScrollView, TextInput } from 'react-native-gesture-handler';
import { EvilIcons, MaterialIcons, AntDesign } from '@expo/vector-icons';
import ReplyItem from './ReplyItem'
import AppDBHelper from '../helper/AppDBHelper';
import ReplyComment from './ReplyComment'
import { MentionInput, replaceMentionValues } from 'react-native-controlled-mentions';

// let SCREEN_WIDTH = Dimensions.get('window').width;//宽
// let SCREEN_HEIGHT = Dimensions.get('window').height;//高

// 原本要用成ReplyContainerCopy那樣 但一直錯誤 所以先繼續用class component
export default class ReplyContainer extends Modal {

    // 构造
    constructor(props) {
        super(props);
        this.gKeyword = '';
        this._inputElement;
        this.state = {
            text: '',
            userList: [],
        }
        this.addReply = this.addReply.bind(this)
        this.onChangeText = this.onChangeText.bind(this);
        this.renderSuggestions = this.renderSuggestions.bind(this)
    }
    async addReply() {
        if (!("commentId" in this.props)) return;
        const { text } = this.state
        if (text === '') return;
        const transformedTxt = replaceMentionValues(text, ({id,name}) => `<font color="#FE2026" id="${id}">${name}</font>`);
        const manager = await AppDBHelper();
        await manager.addReply(this.props.commentId, transformedTxt)
        return this.setState({ text: '' ,userList:[]})
    }
    onChangeText(text) { this.setState({text})}

    renderSuggestions({keyword, onSuggestionPress}){
        console.log('renderSuggeestion')
        console.log(keyword)
        if (keyword == null || keyword == '') {
          if(this.gKeyword !== '') this.gKeyword = ''
          return null
        }
        if(this.gKeyword !== keyword){
            this.gKeyword = keyword
            const searchUser = async (text)=>{
                const manager = await AppHelper();
                const userList = await manager.searchUser(text)
                return userList
            }
            searchUser(this.gKeyword)
                      .then(users=>
                              users.map(user=>({id: user.id, name: user.username, image:user.getPictureUrl()}))
                      ).then(data=>this.setState({userList:data}))
        }
        if(this.state.userList.length === 0)return null
        return (
          <View>
            {this.state.userList
              .filter(one => one.name.toLocaleLowerCase().includes(keyword.toLocaleLowerCase()))
              .map(user => (
                <TouchableHighlight
                  key={user.id}
                  onPress={() => {
                      onSuggestionPress(user)
                      this._inputElement.focus()
                    }}
                  style={{padding: 12}}
                >
                    <View style={{flexDirection:'row'}}>
                        <Image style={{ width: 35,height: 35,borderRadius: 17.5,backgroundColor: '#F7F6FB'}} 
                            source={
                                (user.image == '' || user.image == undefined)
                                    ? require('app/assets/profile.png')
                                    : { uri: user.image }
                        } />
                        <View style={{paddingLeft:20,justifyContent:"center"}}>
                            <Text style={{color:"blue"}}>{user.name}</Text>
                        </View>
                    </View>
              </TouchableHighlight>
              ))
            }
          </View>
        );
      };


    render() {

        return (
            <Modal
                animationType='slide'
                transparent={true}
                visible={this.props.ReplyContainerVisible}
                onRequestClose={() => {
                    // Alert.alert("Modal has been closed.");
                    this.props.setReplyContainerVisible(false);
                }}
            >
                {/* <TouchableWithoutFeedback onPress={() => this.props.setModalVisible(false)}> */}
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <Text style={{alignSelf:'center', fontSize:15, color:'#6C6C6C'}}>回覆留言</Text>
                        <TouchableOpacity style={styles.iconStyle} onPress={() => this.props.setReplyContainerVisible(false)}>
                            <AntDesign color='#7c7c7c' name='left' size={24}></AntDesign>
                        </TouchableOpacity>



                        <View style={{ marginTop: 15 }}></View>

                        {/* <View style={styles.topicBox}> */}
                        {/* <ScrollView > */}

                        <ScrollView style={{ marginTop: 0, flex: 1 }}>
                            <ReplyComment userId={this.props.userId} key={this.props.key} comment={this.props.comment} />
                            {this.props.replies.map((reply, index) => (
                                <ReplyItem userId={this.props.userId} key={index} reply={reply} />
                            ))
                            }
                        </ScrollView>

                        {/* 輸入留言框 */}
                        <KeyboardAvoidingView behavior={Platform.OS == "ios" ? "padding" : "height"}>
                            <View style={styles.commentInputBox} flexDirection='row' justifyContent='space-between'>
                                    <MentionInput
                                        inputRef={ref => { this._inputElement = ref }}
                                        value={this.state.text}
                                        onChange={this.onChangeText}
                                        placeholder='輸入留言......'
                                        partTypes={[
                                            {
                                                trigger: '@', // Should be a single character like '@' or '#'
                                                renderSuggestions: this.renderSuggestions,
                                                textStyle: { fontWeight: 'bold', color: 'blue' }, // The mention style in the input
                                            },
                                        ]}
                                    />
                                <TouchableOpacity onPress={this.addReply}>
                                    <Image style={{ height: 28, width: 28 }} source={require('app/assets/send_blue.png')}></Image>
                                </TouchableOpacity>
                            </View>
                        </KeyboardAvoidingView>





                    </View>
                </View>


            </Modal >
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
        margin: 20,
        backgroundColor: "white",
        borderRadius: 10,
        padding: 20,
        // alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        // elevation: 5,
        // fontSize:50
    },
    openButton: {
        backgroundColor: "#F194FF",
        borderRadius: 20,
        padding: 10,
        // elevation: 2
    },
    commentInputBox: {
        marginTop: 15,
        marginBottom: 65,
        // width: '100%',
        paddingHorizontal: 15,
        paddingVertical: 5,
        backgroundColor: '#F0F0F0',
        elevation: 0,
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