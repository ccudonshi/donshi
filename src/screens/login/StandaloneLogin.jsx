import React, { useState } from 'react'
import { View, Text } from 'react-native'
// 這頁不用理他
const StandaloneLogin = () => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        initAsync();
    }, [])

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
            alert(JSON.stringify(user.toJSON()));
          }
        } catch ({ message }) {
          alert('login: Error:' + message);
        }
    };
    const onPress = async ()=>{
        if (this.state.user) {
            signOutAsync();
          } else {
            signInAsync();
          }
    }
    return (
        <View>
            <Text></Text>
        </View>
    )
}

export default StandaloneLogin;
