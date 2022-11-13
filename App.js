import 'react-native-gesture-handler';
import React, { useMemo,useCallback, useEffect, useRef, useState, useReducer } from 'react';
import { Vibration, Alert, AppState, View } from 'react-native';
import Routes from './src/Routes';
import MyToken from './src/model/MyToken';
import * as Notifications from 'expo-notifications';
import { getCurrentUserASync } from './src/helper/helper.js'
import AppDBHelper from './src/helper/AppDBHelper'
import MySocketFactory from './src/helper/socketio';
import { notify, registerForPushNotificationsAsync } from './src/helper/notification'
import AuthContextStore from './src/authContext'
import authReducer from './src/authReducer'
import {registerBackgroundTask,getBackgroundStatusAsync} from './src/task'
import { parserText } from './src/component/renderParserText';
import { NavigationContainer } from '@react-navigation/native';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

export default function App() {
    const [authState, authDispatch] = useReducer(authReducer,null)
    
    // 通知相關操作，先註解掉
    useNotification(authState);

    // check login effect 一開始會判斷有沒有登入過
    useEffect(() => {
        console.log('checklogin effect')
        async function checkLogin() {
            const hasToken = await MyToken.hasToken()
            return (hasToken)
                ? (await AppDBHelper()).checkTokExp()
                : Promise.resolve({ success: false })
        }
        checkLogin()
            .then(({ success }) => {
                console.log('check login finishi')
                if (success) {
                    getCurrentUserASync()
                        .then(user => user.getId())
                        .then(userId => authDispatch({type: 'login', payload: {userId:userId}}))
                }else authDispatch({type: 'init'})
                // else setCheckLoginFinishi(true)
            })
            .catch(err=>{authDispatch({type: 'init'})})
    }, []);

    return (
        <NavigationContainer>
            <AuthContextStore.Provider value={[authState, authDispatch]}>
                {!authState ? <View /> : <Routes isLoggedin={!authState.userId}/>}
            </AuthContextStore.Provider>
        </NavigationContainer>
    );
};

// 通知相關操作，最近從expo37升級到expo38有可能不能用了
function useNotification(authState) {
    const tokenRef = useRef(null);
    const notificationListenerRef = useRef(null);
    const responseListenerRef = useRef(null);

    // 註冊背景程式狀態
    useEffect(() => {
        console.log('backgroundTask');
        getBackgroundStatusAsync();
        registerBackgroundTask();
    }, []);

    // socket Effect 開啟socketio 監聽有沒有新的資料，有的話就推播通知
    useEffect(() => {
        if (!authState)
            return;
        // console.log('app socketIo efect')
        if (authState.userId == '')
            return;
        let socket = null;

        const _onChangeInApp = (data) => {
            console.log('_onChangeInApp');
            const result = MySocketFactory.preprocessData(data);
            try {
                const { action, effected, post } = data;
                if (action === "ADD") {
                    const effectedData = data[effected];
                    if (post.userId == authState.userId) {
                        notify({
                            title: "你有一則新留言",
                            body: `${effectedData.user.username} : ${parserText(effectedData.text)}`,
                            data: { postId: post.id }
                        });
                        Vibration.vibrate();
                    }

                }
            } catch (error) { Alert.alert(error); }
        };
        try {
            socket = MySocketFactory.getSocket();
            console.log('app socket connect');
            // console.log('naviagation socket._callbacks')
            // console.log(socket._callbacks)
            socket.on('change', _onChangeInApp);
            // console.log('naviagation socket._callbacks')
            // console.log(socket._callbacks)
        } catch (error) {
            Alert.alert(error);
        }
        return () => {
            console.log('app socket close');
            if (socket)
                socket.off('change', _onChangeInApp);
            MySocketFactory.clearSocket();
        };
    }, [authState]);

    // notification Effect 用來初始化推播通知的地方，要求權限以及開listener
    useEffect(() => {
        registerForPushNotificationsAsync().then(token => tokenRef.current = token);

        notificationListenerRef.current = Notifications.addNotificationReceivedListener(notification => {
            console.log('notification: ', notification);
        });

        responseListenerRef.current = Notifications.addNotificationResponseReceivedListener(response => {
            console.log('response: ', response);
        });

        return () => {
            Notifications.removeNotificationSubscription(notificationListenerRef.current);
            Notifications.removeNotificationSubscription(responseListenerRef.current);
        };
    }, []);
}

