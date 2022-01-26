import React,{useState,useEffect}from 'react';
import * as GoogleSignIn from 'expo-google-sign-in';
import LoginView from './LoginView';
// 這個在android中會用原生的google 
// ios 會開啟網頁account.google.com
// 只能在standalone （build） 才能使用
export default function LoginStandalone(){
    const [user, setUser] = useState(null);

    useEffect(() => {
        initAsync();
    }, [])

    useEffect(() => {
      alert(JSON.stringify(user.toJSON()));
    }, [user])

    const initAsync = async () => {
        await GoogleSignIn.initAsync({});
        _syncUserWithStateAsync();
    };

    const _syncUserWithStateAsync = async () => {
        const user = await GoogleSignIn.signInSilentlyAsync();
        setUser(user);
    };

    const signOutAsync = async () => {
        await GoogleSignIn.signOutAsync();
        setUser(null)
    };

    const signInAsync = async () => {
        try {
          await GoogleSignIn.askForPlayServicesAsync();
          const { type, user } = await GoogleSignIn.signInAsync();
          if (type === 'success') {
            this._syncUserWithStateAsync();
            setUser(user)
          }
        } catch ({ message }) {
          alert('login: Error:' + message);
        }
    };
    const onPress = async ()=>{
        if (user) {
            signOutAsync();
          } else {
            signInAsync();
          }
    }
    return (
        <LoginView loginPress={onPress} />
    )
}