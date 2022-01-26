/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import { Image,View,Alert } from 'react-native';
import LoginBtn from './LoginBtn'
// 登入的UI頁面呈現
export default function LoginView({loginPress}){
  return (
      <View style={{flex:1,width:"100%",alignItems:'center', justifyContent:'center'}}>
        
        <View style={{flex:7,width:"100%",alignItems:'center', justifyContent:'center',padding:10,}}>
          <Image style = {{resizeMode:"contain",width:"100%",height:"60%",maxHeight:350}} source = {require('app/assets/logo.png')}></Image>
        </View>

        <View  style = {{flex:2,width:"100%",alignItems:'center', justifyContent:'flex-start'}}>
          <LoginBtn onPress={loginPress} />
        </View>
        {/* <View  style = {{flex:1}}></View> */}
    </View>
  )

}

  
