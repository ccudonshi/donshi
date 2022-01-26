import React, { useCallback,useEffect, useState } from 'react'
import { View, Text, Alert } from 'react-native'
import MySocketFactory from '../helper/socketio'
import { useFocusEffect } from '@react-navigation/native';
export function useSocketIO(onChange) {
    const [hasError, setHasError] = useState(false)
    const [hasConnect, setHasConnect] = useState(false)
    useEffect(() => {
        let socket = null;
        const _onChangeSockerIO=(data)=>{
            console.log('_onchange')
            const result = MySocketFactory.preprocessData(data);
            try {
                onChange(result);
            } catch (error) {
                Alert.alert(error);
                setHasError(true);
            }
        
        }
        try {
            socket = MySocketFactory.getSocket();
            console.log('socket connect')
            if(socket.connected)setHasConnect(true)
            socket.on('change',_onChangeSockerIO);
        } catch (error) {
            Alert.alert(error);
            setHasError(true);
        }
        
        return () => {
            console.log('socket clear')
            if(socket)socket.off('change', _onChangeSockerIO);
        }
    }, [])
    return [hasError,hasConnect]
}

export function useSocketIOInNavigation(onChange) {
    const [hasError, setHasError] = useState(false)
    const [hasConnect, setHasConnect] = useState(false)
    
    useFocusEffect(
        useCallback(() => {
            let socket = null;
            console.log('navigation socket connect')
            const _onChangeInNavigation=(data)=>{
                console.log('_onchange')
                const result = MySocketFactory.preprocessData(data);
                try {
                    onChange(result);
                } catch (error) {
                    Alert.alert(error);
                    setHasError(true);
                }
            
            }
            try {
                socket = MySocketFactory.getSocket();
                setHasConnect(true)
                console.log('naviagation socket._callbacks')
                console.log(socket._callbacks)
                socket.on('change',_onChangeInNavigation);
                console.log('naviagation socket._callbacks')
                console.log(socket.connected)
            } catch (error) {
                Alert.alert(error);
                setHasError(true);
            }
            
            return () => {
                console.log('naviagation socket clear')
                if(socket)socket.off('change', _onChangeInNavigation);
            }
        }, [])
    );
    return [hasError,hasConnect]
}