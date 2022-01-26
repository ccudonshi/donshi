import React, { useCallback, useEffect, useRef, useState } from 'react';
import {
    Modal,
    Text,
    View,
    StyleSheet,
    Image,
    TouchableHighlight,
    KeyboardAvoidingView,
    Platform,
    TouchableOpacity,
} from 'react-native';
import AppHelper from '../helper/AppDBHelper'
import { ScrollView } from 'react-native-gesture-handler';
import { AntDesign } from '@expo/vector-icons';
import { MentionInput, replaceMentionValues } from 'react-native-controlled-mentions';
export default function MentionInputContainer(props) {
    const [gKeyword, setGkeyword] = useState('')
    const [text, setText] = useState('')
    const [userList, setUserList] = useState([])
    const inputRef = useRef(null)

    useEffect(() => {
        if(text ==='' && userList.length !== 0)setUserList([])
    }, [text])

    useEffect(() => {
        const searchUser = async (text)=>{
            const manager = await AppHelper();
            const userList = await manager.searchUser(text)
            return userList
        }
        searchUser(gKeyword)
                  .then(users=>
                          users.map(user=>({id: user.id, name: user.username, image:user.getPictureUrl()}))
                  ).then(data=>setUserList(data))
    }, [gKeyword])

    const _onSubmit = ()=>{
        if (text === '') return;
        const transformedTxt = replaceMentionValues(text, ({id,name}) => `<font color="#FE2026" id="${id}">${name}</font>`);
        props.onSubmit(transformedTxt)
        return setText('')
    }
    const _onRequestClose = ()=>{
        props.onRequestClose();
    }
 
    const onChangeText = (txt)=>setText(txt)
    
    const renderSuggestionsWithCallBack = useCallback(
        (callbackProps) => {
            return renderSuggestions(callbackProps)
        },
        [text,userList,gKeyword]
    )

    const renderSuggestions = ({keyword, onSuggestionPress})=>{
        console.log('renderSuggeestion')
        console.log(keyword)
        if (keyword == null || keyword == '') {
          if(gKeyword !== '') setGkeyword('')
          return null
        }
        if(gKeyword !== keyword){
            setGkeyword(keyword)
        }
        if(userList.length === 0)return null
        return (
          <View>
            {userList
              .filter(one => one.name.toLocaleLowerCase().includes(keyword.toLocaleLowerCase()))
              .map(user => (
                <TouchableHighlight
                  key={user.id}
                  onPress={() => {
                      onSuggestionPress(user)
                      inputRef?.current?.focus()
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
    return (

        <Modal
            animationType='slide'
            transparent={true}
            visible={props.CommentContainerVisible}
            onRequestClose={_onRequestClose}
        >

            <View style={styles.centeredView}>
                <View style={styles.modalView}>
                    <TouchableOpacity style={styles.iconStyle} onPress={_onRequestClose}>
                        <AntDesign color='#7c7c7c' name='left' size={24}></AntDesign>
                    </TouchableOpacity>
                    <View style={{ marginTop: 15 }}></View>

                    <ScrollView style={{ marginTop: 0, flex: 1 }}>
                        {props.renderData()}
                    </ScrollView>


                    {/* 輸入留言框 */}
                    <KeyboardAvoidingView behavior={Platform.OS == "ios" ? "padding" : "height"}>
                        <View style={styles.commentInputBox} flexDirection='row' justifyContent='space-between'>
                            <MentionInput
                                style={{ width: 232 }}
                                inputRef={inputRef}
                                value={text}
                                onChange={onChangeText}
                                placeholder='輸入留言......'
                                partTypes={[
                                    {
                                        trigger: '@', // Should be a single character like '@' or '#'
                                        renderSuggestions: renderSuggestionsWithCallBack,
                                        textStyle: { fontWeight: 'bold', color: 'blue' }, // The mention style in the input
                                    },
                                ]}
                            />
                            <TouchableOpacity onPress={_onSubmit}>
                                <Image style={{ height: 28, width: 28 }} source={require('app/assets/send_blue.png')}></Image>
                            </TouchableOpacity>
                        </View>
                    </KeyboardAvoidingView>
                </View>
            </View>

        </Modal>
    )
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
        color: 'red',
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