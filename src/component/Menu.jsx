import React, { Component } from 'react';
import {
    Modal,
    Text,
    View,
    StyleSheet,
    Alert,
    Button,
    TouchableOpacity
} from 'react-native';
import { Dialog } from 'react-native-simple-dialogs';
import TopicItem from './TopicItem';
import AppHelper from '../helper/AppDBHelper'
import { ScrollView, } from 'react-native-gesture-handler';
import { Actions } from 'react-native-router-flux';
import AppDBHelper from '../helper/AppDBHelper';

// let SCREEN_WIDTH = Dimensions.get('window').width;//宽
// let SCREEN_HEIGHT = Dimensions.get('window').height;//高


export default class Menu extends Modal {

    // 构造
    constructor(props) {
        super(props);
        this.state = {}
        this.deletePost = this.deletePost.bind(this);
        this.topicList = [
            {
                title: '編輯貼文',
                func: () => {
                    this.props.setModalVisible(false);
                    Actions.push('editPost', { post: this.props.editPost })
                }
            },
            {
                title: '刪除貼文',
                func: () => {
                    Alert.alert(
                        '警告',
                        '請問真的要刪除貼文嗎？（此動作無法復原）',
                        [
                            {
                                text: '取消',
                                onPress: () => console.log('取消 Pressed'),
                                style: 'cancel'
                            },
                            {
                                text: '確認', onPress: () => Alert.alert(
                                    '警告',
                                    '真的真的要刪除貼文嗎？不會再提醒囉（此動作無法復原）',
                                    [
                                        {
                                            text: '取消',
                                            onPress: () => console.log('取消 Pressed'),
                                            style: 'cancel'
                                        },
                                        { text: '刪除', onPress: () => this.deletePost() }
                                    ],
                                    { cancelable: false }
                                )
                            }
                        ],
                        { cancelable: false }
                    );
                }
            }, {
                title: '取消',
                func: () => this.props.setModalVisible(false)
            }
        ];

    }

    test = () => {
        this.props.setModalVisible(false)
    }
    async deletePost() {
        const manager = await AppDBHelper();
        manager.deletePost(this.props.editPost.getId())
            .then(res => {
                if (res.succeess) {
                    this.props.setModalVisible(false)
                    Actions.replace('home', { refresh: {} })
                }
                else Alert.alert('警告：沒有刪除成功，請聯絡管理員')
            })
            .catch(() => Alert.alert('警告：沒有刪除成功，請聯絡管理員'))
    }
    onPress(func) {
        return () => func()
    }

    render() {
        // onPress事件直接与父组件传递进来的属性挂接
        return (
            <Modal
                animationType="fade"
                transparent={true}
                visible={this.props.modalVisible}
                onRequestClose={() => {
                    Alert.alert("Modal has been closed.");
                }}
            >
                {/* <TouchableWithoutFeedback onPress={() => this.props.setModalVisible(false)}> */}
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <Text style={styles.modalText} >貼文</Text>

                        {/* <View style={styles.topicBox}> */}
                        {/* <ScrollView > */}

                        {/* 主題列表 */}
                        <View style={{ paddingBottom: 10 }}>
                            {
                                this.topicList.map((topic, index) => (
                                    // <Button style={styles.buttonStyle} key={index} title={topic.title} onPress={() => topic.func()}></Button>
                                    <TouchableOpacity key={index} onPress={this.onPress(topic.func)}>
                                        <TopicItem key={index} topic={topic.title} />
                                    </TouchableOpacity>
                                ))
                            }
                        </View>


                    </View>
                </View>


            </Modal>
        );
    }
}

const styles = StyleSheet.create({
    buttonStyle: {
        color: '#000'
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
        margin: 20,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 20,
        alignItems: "center",
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