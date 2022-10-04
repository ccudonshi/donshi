import React, { useEffect } from 'react'
import { View, Text } from 'react-native'
import LoginExpo from './LoginExpo'
import Constants from 'expo-constants';
import AppDBHelper from '../../helper/AppDBHelper'
import MyToken from '../../model/MyToken';
// 這裏分成兩種
// Standalone版的還沒開發完
// 可以先都用Expo版的
export default function Login(props){
    return (
        // (Constants.appOwnership === 'expo')
        // ?   
        <LoginExpo />
        // :   <LoginStandalone />
    )   
}