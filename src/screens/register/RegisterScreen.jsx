import React, {useState,useEffect, useContext } from 'react'
import RegisterFirst from './RegisterFirst'
import RegisterSecond from './RegisterSecond'
import User from '../../model/User';
import { Alert } from 'react-native';
import { cancelable } from 'cancelable-promise';
import AppDBHelper from '../../helper/AppDBHelper';
import { useImagePick } from '../../component/useImagePick';
import AuthContextStore from '../../authContext';
import { getCurrentUserASync } from '../../helper/helper';

// 註冊頁面
export default function RegisterScreen({ route: { params: { googleIdToken, accountInfo } }, navigation }){
    const account = accountInfo.account
    const [authState, authDispatch] = useContext(AuthContextStore);

    const [username, setUsername] = useState(accountInfo.username)
    const [gender, setGender] = useState('')
    const [birthday, setBirthday] = useState('');
    const [phone, setPhone] = useState('')
    const [hasUserTicket, setHasUserTicket] = useState(false);
    const [step, setStep] = useState(0)
    const [isSubmitClick, setIsSubmitClick] = useState(false)
    const [pickImage,image,hasError] = useImagePick();

    useEffect(() => {
        if(!isSubmitClick)return;
        setIsSubmitClick(false)
        
        async function goRegister(){
            const user = new User({
                account,
                username,
                gender,
                birthday,
                phone,
                hasUserTicket,
            });
            const manager = await AppDBHelper();
            await manager.register(user,image,googleIdToken);

            const newUser = await getCurrentUserASync();
            authDispatch({
                type: 'login',
                payload: { userId: newUser.getId() },
            });
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
        if(!username) {
            return Alert.alert('暱稱未填寫');
        } else if (!gender) {
            return Alert.alert('性別未填寫');
        } else if (!birthday) {
            return Alert.alert('生日未填寫');
        } else if (!phone) {
            return Alert.alert('手機號碼未填寫');
        }
        setStep(preStep=>preStep+1)
    };

    const firstProps={
        username,setUsername,
        gender,setGender,
        birthday, setBirthday,
        phone, setPhone,
        hasUserTicket, setHasUserTicket,
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