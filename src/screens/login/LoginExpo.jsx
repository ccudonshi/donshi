/* eslint-disable react-native/no-inline-styles */
import React, {useContext, useEffect } from 'react';
import * as Google from 'expo-auth-session/providers/google';
import AppDBHelper from '../../helper/AppDBHelper';
import LoginView from './LoginView';
import { getCurrentUserASync } from '../../helper/helper';
import AuthContextStore from '../../authContext'

// 這個android、ios中都會另外開啟網站 account.google.com
// 可在dev、standalone 都可以使用

const EXPO_CIENT_ID = '567511155278-q3af19rgfpg6voc82i9i6q7dn6rpkgig.apps.googleusercontent.com';
const IOS_STANDALONE_CLIENT_ID = '567511155278-95aaotmk6uc9la4p0tlgv2h2eee93am8.apps.googleusercontent.com';
const ANDROID_STANDALONE_CLIENT_ID = '567511155278-7qkisiidvrd6hk861283apo7931egncs.apps.googleusercontent.com';

export default function LoginExpo({ navigation }) {
    const [authState, authDispatch] = useContext(AuthContextStore);
    const [request, response, promptAsync] = Google.useIdTokenAuthRequest({
        expoClientId: EXPO_CIENT_ID,
        iosClientId: IOS_STANDALONE_CLIENT_ID,
        androidClientId: ANDROID_STANDALONE_CLIENT_ID,
        scopes: ['profile', 'email'],
    });

    useEffect(() => {
        (async () => {
            if (response?.type === 'success') {
                console.log('Google Login response: ', response)
                const { params } = response;
                const manager = await AppDBHelper();
                const data = await manager.googleLogin(params.id_token);
                if(!data.success) {
                    navigation.navigate('Register', {
                        googleIdToken: params.id_token,
                        accountInfo: data.payload,
                    });
                }
                const user = await getCurrentUserASync();
                authDispatch({
                    type: "login",
                    payload: { userId: user.getId() },
                });
            }
        })();
    }, [response]);

    return (
        <LoginView loginPress={promptAsync} />
    )

}




