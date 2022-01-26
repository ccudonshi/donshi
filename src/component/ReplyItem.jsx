import React, { Component } from 'react'
import { Text, StyleSheet, View, Image } from 'react-native'
import { TextInput, ScrollView, TouchableOpacity } from 'react-native-gesture-handler'
import AppDBHelper from '../helper/AppDBHelper';
import { diffDate } from '../helper/helper';
import { renderParserText } from './renderParserText';


export default class ReplyItem extends Component {

    constructor(props) {
        super(props);
        this.state = {

        }
        this.deleteReply = this.deleteReply.bind(this)
    }
    async deleteReply() {
        const manager = await AppDBHelper();
        await manager.deleteReply(this.props.reply.getId())
    }


    render() {
        const pictureUrl = this.props.reply.user.getPictureUrl();
        const user = this.props.reply.user
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
                            <Text style={{ fontSize: 13, fontWeight: 'bold' }}>{this.props.reply.user.username}</Text>
                            <Text numberOfLines={30} style={{ marginTop: 5 }}>
                                {renderParserText(this.props.reply.getText())}
                            </Text>
                        </View>
                    </View>
                </View>

                <View style={{ flexDirection: 'row', alignItems: 'center', marginLeft: 6 }}>
                    <Text style={{ marginLeft: 48, fontSize: 12, marginTop: 5, color: '#8E8E8E' }}>{diffDate(this.props.reply.getPostTimeDate())}</Text>
                    {/* <TouchableOpacity style={{ marginTop: 5, marginLeft: 20 }}>
                        <Text style={{ color: '#5698FC', fontSize: 13 }}>回覆</Text>
                    </TouchableOpacity> */}
                    {
                        (user.getId() === this.props.userId) &&
                        <TouchableOpacity onPress={this.deleteReply} style={{ marginTop: 5, marginLeft: 20 }}>
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
        marginBottom: 8,
        marginLeft: 40
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
        // elevation: 20,
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