import React, { Component } from 'react';
import {
    Modal,
    Text,
    Platform,
    TouchableHighlight,
    TouchableWithoutFeedback,
    View,
    StyleSheet,
    BackAndroid,
    Dimensions
} from 'react-native';
import TopicItem from './TopicItem';
import AppHelper from '../helper/AppDBHelper'
import { Alert, TouchableOpacity, ScrollView, } from 'react-native';
import PropTypes from 'prop-types';




//選擇主題
export default class ChooseTopicBox extends Modal {


    constructor(props) {
        super(props);
        this.state = {
            topicList: [],
        }
    }

    async componentDidMount() {
        // await (await AppHelper()).getLimitPosts(1,"false",0,5).then(posts => {})
        console.log(this.props.typeId)
        const manager = await AppHelper();
        manager.getTopicsWithType(this.props.typeId.id)
            .then(topic => {
                this.setState({ topicList: topic })
            })
    }

    render() {
        return (

            <Modal
                style={{margin:0}}
                animationType="fade"
                transparent={true}
                visible={this.props.modalVisible}
                onRequestClose={() => this.props.setModalVisible((prev) => !prev)}>

                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <Text style={styles.modalText} >選擇主題</Text>

                        {/* <View style={styles.topicBox}> */}
                        <View style={{ height: 240 }}>
                            <ScrollView >

                                {/* 主題列表 */}
                                <View style={{ paddingBottom: 20 }}>
                                    {
                                        this.state.topicList.map((topic, index) => (
                                            <TouchableOpacity key={index} onPress={() => this.props.setTopic(topic)}>
                                                <TopicItem key={index} topic={topic.topicName} />
                                            </TouchableOpacity>
                                        ))
                                    }
                                </View>

                            </ScrollView>
                        </View>

                        
                    </View>
                </View>

            </Modal>
        );
    }
}

const styles = StyleSheet.create({
    topicBox: {
        height: undefined
    },
    centeredView: {
        flex:1,
        backgroundColor: 'rgba(0,0,0,0.5)',
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22
    },
    modalView: {
        margin: 20,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 35,
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