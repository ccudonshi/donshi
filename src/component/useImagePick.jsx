import React, {useState,useEffect, useRef } from 'react'
import * as ImagePicker from 'expo-image-picker';
import { cancelable } from 'cancelable-promise';
import AppDBHelper from '../helper/AppDBHelper';
import { Alert } from 'react-native';
import Constants from 'expo-constants';

export function useImagePick() {
    const [image, setImage] = useState(null);
    const [hasError, setHasError] = useState(false);
    const [isPicking,setIsPicking]= useState(false);

    const errMsgRef = useRef(null)
    
    useEffect(() => {
        async function requestPermission() {
            console.log('requestPermission')
            if (Constants.platform.ios) {
                const { status } = await ImagePicker.requestCameraRollPermissionsAsync();
                if (status !== 'granted') {
                    alert('Sorry, we need camera roll permissions to make this work!');
                }
            }
        }
        const cancelableRequestPermission = cancelable(requestPermission());
        return () => {
            if (!cancelableRequestPermission.isCanceled())
                cancelableRequestPermission.cancel()
        }
    }, []);

    useEffect(() => {if(hasError){
        Alert.alert(`${errMsgRef.current}`)
        errMsgRef.current=null
        setHasError(false)
    }}, [hasError])

    useEffect(() => {
        if(!isPicking)return;
        const pickImgPromise = ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        }).then(result=>{
            if (!result.cancelled) {
                setImage(result);
            }else return ;
        }).catch(error=>{
            console.warn(error);
            errMsgRef.current = error.message
            setHasError(true);
        })
        const cancelablePickImgPromise = cancelable(pickImgPromise)
                                            .then(()=>setIsPicking(false));
        return () => {
            if (!cancelablePickImgPromise.isCanceled()){
                cancelablePickImgPromise.cancel()
                setIsPicking(false)
            }
        }
    }, [isPicking])

    const pickImage = () => setIsPicking(true);

    return [pickImage,image,hasError];
}
