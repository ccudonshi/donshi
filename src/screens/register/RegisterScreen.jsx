import React, {useState,useEffect } from 'react'
import RegisterFirst from './RegisterFirst'
import RegisterSecond from './RegisterSecond'
import User from '../../model/User';
import { Alert } from 'react-native';
import { cancelable } from 'cancelable-promise';
import { Actions } from 'react-native-router-flux';
import AppDBHelper from '../../helper/AppDBHelper';
import { useImagePick } from '../../component/useImagePick';
// 註冊頁面
export default function RegisterScreen({googleIdToken,accountInfo}){
    const account = accountInfo.account
    const [username, setUsername] = useState(accountInfo.username)
    const [gender, setGender] = useState('')
    const [birthday, setBirthday] = useState('');
    const [phone, setPhone] = useState('')
    const [step, setStep] = useState(0)
    const [isSubmitClick, setIsSubmitClick] = useState(false)
    const [pickImage,image,hasError] = useImagePick();

    useEffect(() => {
        if(!isSubmitClick)return;
        setIsSubmitClick(false)
        
        async function goRegister(){
            const user = new User({account,username,gender,birthday,phone})
            const manager = await AppDBHelper();
            manager.register(user,image,googleIdToken)
                   .then(()=> Actions.replace("home"))
        }

        const cancelableSubmit = cancelable(goRegister());
        return () => {
            if(!cancelableSubmit.isCanceled())
                cancelableSubmit.cancel()
        }

    }, [isSubmitClick])

    const onSubmitClick = ()=>setIsSubmitClick(true); 
    const onBackStep = ()=>setStep(preStep=>preStep-1);
    const onNextStep = ()=>{
        if(username === '' || username === undefined || username === null) 
            return Alert.alert("暱稱未填寫")
        setStep(preStep=>preStep+1)
    };

    const firstProps={
        username,setUsername,
        gender,setGender,
        birthday, setBirthday,
        phone, setPhone,
        onNextStep
    }
    const secondProps={
        onSubmitClick,
        onBackStep,
        pickImage,image,hasError,
    }
    return (
        (step===0)
        ? <RegisterFirst {...firstProps} />
        : <RegisterSecond {...secondProps} />
    )
}