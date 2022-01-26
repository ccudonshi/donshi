import React, { useRef, useState ,useEffect} from 'react';
import {  TouchableOpacity,View, Alert, Modal,StyleSheet, Keyboard, TouchableWithoutFeedback, Button } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import User from '../../model/User'
import { formatDate } from '../../helper/helper';


export function AndroidEditDateModal({isVisible,myUser, setMyUser ,closeModal}){
    const iniatlDate = (myUser.getBirthDay()=== "無")?new Date():new Date(myUser.getBirthDay())
    // const iniatlDate = new Date()
    const [date, setDate] = React.useState(iniatlDate);
    const onChange = (event, selectedDate) => {
      const currentDate = selectedDate || date;
      switch (event?.type) {
        case 'set':
            return submit(currentDate);
          break;
        case 'dismissed':
            return closeModal();
          break;
        default:
          setDate(currentDate);
          break;
      }
     
    };
    const submit = (currentDate) => {
      closeModal(); // 防止submit後又再次開啟
      const user = new User(myUser);
      user.birthday= formatDate(currentDate);
      setMyUser(user);
      
    };
    return (<> 
              <DateTimePicker
                value={date}
                visible={isVisible}
                mode={'date'}
                onChange={onChange}
                locale="zh-TW" />
            </>
    );

}

export function ProfileEditModal({actFunc,closeModal}) {
    let ActiveComponet = (actFunc !== null)? actFunc : <></>;

    const onRequestClose = useRequestClose(closeModal);

                                    
    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={(actFunc !== null)}
            onRequestClose={onRequestClose}>
            <TouchableWithoutFeedback onPress={onRequestClose}>
                <View style={modelStyles.centeredView}>
                  {/* 用內層 TouchableWithoutFeedback 擋掉外層 TouchableWithoutFeedback 的onPress */}
                  <TouchableWithoutFeedback> 
                    <View style={modelStyles.modalView}>
                      <ActiveComponet />
                    </View>
                  </TouchableWithoutFeedback>  
                </View>
          </TouchableWithoutFeedback>
        </Modal>
    );
}

export const modelStyles = StyleSheet.create({

    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: 'rgba(0,0,0,0.5)',
    },
      modalView: {
        width:"80%",
        backgroundColor: "white",
        borderRadius: 20,
        padding: 25,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5
      },
      openButton: {
        backgroundColor: "#F194FF",
        borderRadius: 20,
        padding: 10,
        elevation: 2
      },
      textStyle: {
        paddingHorizontal:15,
        color: "white",
        fontWeight: "bold",
        textAlign: "center"
      },
      modalText: {
        color:'#5B5B5B',
        fontSize:18,
        marginBottom: 15,
        textAlign: "center"
      }
})



function useRequestClose(closeModal) {
  const [isKeyBoardShow, setIsKeyBoardShow] = useState(false);
  useEffect(() => {
    const _keyboardDidShow = () => setIsKeyBoardShow(true);
    const _keyboardDidHide = () => setIsKeyBoardShow(false);
    Keyboard.addListener("keyboardDidShow", _keyboardDidShow);
    Keyboard.addListener("keyboardDidHide", _keyboardDidHide);
    return () => {
      Keyboard.removeListener("keyboardDidShow", _keyboardDidShow);
      Keyboard.removeListener("keyboardDidHide", _keyboardDidHide);
    };
  }, []);

  const onRequestClose = () => (isKeyBoardShow)
    ? Keyboard.dismiss()
    : closeModal();
  return onRequestClose;
}

