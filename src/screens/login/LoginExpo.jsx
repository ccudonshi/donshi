/* eslint-disable react-native/no-inline-styles */
import React, {useContext } from 'react';
import { Image, View, Alert } from 'react-native';
import * as Google from 'expo-google-app-auth';
import LoginBtn from './LoginBtn'
import PropTypes from "prop-types";
import AppDBHelper from '../../helper/AppDBHelper';
import LoginView from './LoginView';
import { getCurrentUserASync } from '../../helper/helper';
import AuthContextStore from '../../authContext'
import { Actions } from 'react-native-router-flux';

// 這個android、ios中都會另外開啟網站 account.google.com
// 可在dev、standalone 都可以使用

const config = {
    // expoClientId: `<YOUR_WEB_CLIENT_ID>`,
    iosClientId: '567511155278-t7iq314l1psm25n6jrnrifoe20fkdm27.apps.googleusercontent.com',
    androidClientId: '567511155278-2e8k43fs7aejq9l9dg97o64hc2e1td2k.apps.googleusercontent.com',
    iosStandaloneAppClientId: `567511155278-95aaotmk6uc9la4p0tlgv2h2eee93am8.apps.googleusercontent.com`,
    androidStandaloneAppClientId: `567511155278-7qkisiidvrd6hk861283apo7931egncs.apps.googleusercontent.com`,
    scopes: ['profile', 'email'],
};

export default function LoginExpo(params) {
    const [authState, authDispatch] = useContext(AuthContextStore);
    const signInWithGoogleAsync = async () => {
        try {
            const result = await Google.logInAsync(config);
            console.log(result)
            if (result.type === 'success') {
                console.log('success')
                return {
                    success: true,
                    googleIdToken: result.idToken
                }
            } else {
                console.log('not sucess')
                return { cancelled: true };
            }
        } catch (e) {
            return { error: true };
        }
    }

    const onPress = async () => {
        const result = await signInWithGoogleAsync();
        if (!result.success) return new Error("cancel");
        const {googleIdToken } = result;
        const manager = await AppDBHelper()
        const data = await manager.googleLogin(googleIdToken);
        if(!data.success)
            Actions.register({googleIdToken,accountInfo:data.payload})
        const user = await getCurrentUserASync();
        authDispatch({type:"login",payload:{userId:user.getId()}})
    }

    return (
        <LoginView loginPress={onPress} />
    )

}




