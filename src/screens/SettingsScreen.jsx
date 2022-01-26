import { View, StyleSheet, Text, Button, TouchableOpacity } from 'react-native';
import React, { useContext, useEffect, useState } from 'react';
import { Actions } from 'react-native-router-flux';
import MyToken from '../model/MyToken'
import User from '../model/User';
import { cancelable } from 'cancelable-promise';
import { getCurrentUserASync } from '../helper/helper'
import { AntDesign } from '@expo/vector-icons';
import AuthContextStore from '../authContext'

// 設定 的頁面 (在個人頁面裡面可連結到)
export default function SettingsPage() {

    const [user, setUser] = useState(new User());
    const [authState, authDispatch] = useContext(AuthContextStore);

    useEffect(() => {
        const cancelablePromise = cancelable(getCurrentUserASync())
        cancelablePromise.then(user => setUser(user))
        return () => {
            if (cancelablePromise !== null && !cancelablePromise.isCanceled())
                cancelablePromise.cancel()
        }
    }, [])
    const logout = async()=>{
        await MyToken.deleteToken();
        authDispatch({type: 'logout'})
    }

    return (
        <View style={styles.background}>
            <TouchableOpacity style={styles.iconStyle} onPress={() => Actions.pop()}>
                <AntDesign color='#7c7c7c' name='left' size={24}></AntDesign>
            </TouchableOpacity>
            {/* <Button
                style={styles.backBtn}
                title='回上頁'
                >
            </Button> */}

            <Text style={styles.greenText}>帳戶設定</Text>
            <Text style={styles.blackText}>帳號</Text>
            <Text style={styles.grayText}>{user.getAccount()}</Text>

            <View style={styles.separator} />

            <Text style={styles.greenText}>關於</Text>
            <Text style={styles.blackText}>暖一點</Text>
            <Text style={styles.grayText}>3.0.1</Text>

            <Text style={styles.blackText}>作者</Text>
            <Text style={styles.grayText}>中正大學-東石生活實驗室</Text>

            <View style={styles.separator} />

            <TouchableOpacity style={styles.button} onPress={logout}>
                <Text style={styles.buttonText}>登出</Text>
            </TouchableOpacity>


        </View>
    )
}

const styles = StyleSheet.create({
    iconStyle: {
        alignSelf: 'flex-start',
        color: '#8E8E8E',
        marginTop: 10,
        marginBottom: 20
    },
    background: {
        // alignItems:'flex-start',
        backgroundColor: '#EDEDED',
        flex: 1,
        padding: 25
    },
    backBtn: {
        margin: 20,
        padding: 10,
        paddingLeft: 20,
        paddingRight: 20,
        backgroundColor: '#406E9F',
        borderRadius: 9,
        alignItems: 'center',
        justifyContent: 'center',
    },
    greenText: {
        color: '#A7D379',
        fontSize: 25,
        fontWeight: 'bold',

    },
    blackText: {
        color: '#000',
        // fontWeight:'bold',
        fontSize: 18,
        marginTop: 20
    },
    grayText: {
        color: '#8E8E8E',
        fontSize: 18,
        marginTop: 3
    },
    separator: {
        marginTop: 20,
        marginBottom: 20,
        backgroundColor: '#ADADAD',
        height: 1
    },
    button: {
        marginVertical: 20,
        marginHorizontal:30,
        padding: 8,
        // paddingLeft: 20,
        // paddingRight: 20,
        backgroundColor: '#406E9F',
        borderRadius: 20,
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonText: {
        color: '#fff',
        fontSize: 20,
        fontWeight: 'bold',
    },
})