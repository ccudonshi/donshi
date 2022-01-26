import 'react-native-gesture-handler';
import React, { useMemo,useCallback, useEffect, useRef, useState, useReducer } from 'react';
import { Vibration, Alert, AppState, View } from 'react-native';
import Routes from './src/Routes';
import MyToken from './src/model/MyToken';
import { Actions } from 'react-native-router-flux';
import { Notifications } from 'expo';
import { getCurrentUserASync } from './src/helper/helper.js'
import AppDBHelper from './src/helper/AppDBHelper'
import MySocketFactory from './src/helper/socketio';
import { notify, registerForPushNotificationsAsync } from './src/helper/notification'
import AuthContextStore from './src/authContext'
import authReducer from './src/authReducer'
import {registerBackgroundTask,getBackgroundStatusAsync} from './src/task'
import { parserText } from './src/component/renderParserText';

export default function App() {
    const [authState, authDispatch] = useReducer(authReducer,null)
    const userIdRef = useRef(null)
    const tokenRef = useRef(null)
    
    // 通知相關操作，先註解掉
    // useNotification(authState, userIdRef, tokenRef);

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
    }, [])

    // authState redirect effect 根據登入狀態跳轉頁面，只要APP有動作改變了登入狀態就會執行
    useEffect(() => {
        if(!authState)return;
        const checkIsLogin = (authState.userId == '')
        if(checkIsLogin)return Actions.reset('login');
        Actions.replace('home')
    }, [authState])


    // useMemo感覺是多餘的不用用到(?
    const isLoginInitailRoute = useMemo(
        () => ()=>(authState == null || authState.userId == ''),
        [authState],
    )
    console.log('isLoginInitailRoute()')
    console.log(isLoginInitailRoute())
    // const isLoginInitailRoute = (authState?.userId == '')
    return <AuthContextStore.Provider value={[authState, authDispatch]}>
        {!authState ? <View/> : <Routes isLoginInitailRoute={isLoginInitailRoute()}/>}
    </AuthContextStore.Provider>
};

// 通知相關操作，最近從expo37升級到expo38有可能不能用了
function useNotification(authState, userIdRef, tokenRef) {
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
        userIdRef.current = authState.userId;
        // console.log('userIdRef.current')
        console.log(userIdRef.current);
        const _onChangeInApp = (data) => {
            console.log('_onChangeInApp');
            console.log(userIdRef.current);
            const result = MySocketFactory.preprocessData(data);
            try {
                const { action, effected, post } = data;
                if (action === "ADD") {
                    const effectedData = data[effected];
                    if (!userIdRef || !tokenRef)
                        return;
                    if (post.userId == userIdRef.current) {
                        const body = {
                            title: "你有一則新留言",
                            body: `${effectedData.user.username} : ${parserText(effectedData.text)}`,
                            data: { postId: post.id }
                        };
                        const message = {
                            to: tokenRef.current,
                            sound: 'default',
                            ...body,
                            _displayInForeground: true,
                        };
                        notify(message, "remote");
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
        const setExpoPushToken = (expoPushToken) => { tokenRef.current = expoPushToken; };
        registerForPushNotificationsAsync(setExpoPushToken);
        const handleNotification = notification => {
            console.log('handleNotification');
            console.log(notification);
            // if (AppState.currentState == 'active' && notification.origin === 'received') {
            // Notifications.dismissNotificationAsync(notification.notificationId);
            // } else {
            Vibration.vibrate();
            Actions.push('postShow', { postId: notification?.data?.postId });
            // }
        };
        const listener = Notifications.addListener(handleNotification);
        return () => listener.remove();
    }, []);
}

