import React, { useEffect, useRef, useState } from 'react';
import { Text, View,TouchableOpacity, Platform, Alert, StyleSheet,Image, } from 'react-native';
import RadioButtonRN from 'radio-buttons-react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import User from '../../model/User';
import { modelStyles} from './ProfileEditModal';
import { formatDate } from '../../helper/helper';
import { ScrollView,TextInput} from 'react-native-gesture-handler';
import { useImagePick } from '../../component/useImagePick';
import AppHelper from '../../helper/AppDBHelper'
// 這裡的componet用carriedFunction的形式,讓myUser跟setMyUser可以傳入
// 這幾個componet主要用嵌入到ProfileEditModal裡

export const EditPhone = ({ myUser, setMyUser }) => () => {
  const initalValue = (myUser.getPhone() === "無")?'':myUser.getPhone()
  const [value, onChangeText] = React.useState(initalValue);
  const onSubmit = () => {
    const user = new User(myUser);
    user.phone = value;
    setMyUser(user);
  };

  // autoFoucs with keyboard
  const txtInputRef = useRef(null);
  useEffect(() => {
    Platform.OS === 'ios'
        ? txtInputRef?.current?.focus()
        : setTimeout(() => txtInputRef?.current?.focus(), 600);
  }, [])

  return (
    <>
      <Text style={modelStyles.modalText}>電話號碼</Text>
      <View style={{ width: "100%", padding: 10, marginBottom: 10, borderBottomWidth: 1 }}>
        <TextInput
          ref={txtInputRef}
          style={{ fontSize: 20, alignSelf:'center' }}
          onChangeText={text => onChangeText(text)}
          value={value}
          maxLength={10}
          autoCompleteType="tel" 
          dataDetectorTypes="phoneNumber" 
          keyboardType="phone-pad" 
          textContentType="telephoneNumber" />
      </View>
      <SubmitBtn onSubmit={onSubmit} />

    </>
  );
};

export const EditGender = ({ myUser, setMyUser }) => () => {
  const [selectValue, setSelectValue] = useState(myUser.getGender());
  const radioData = [{ label: '男' }, { label: '女' }, { label: '其他' }];
  const onSubmit = () => {
      const user = new User(myUser);
      user.gender = selectValue;
      setMyUser(user);
  };
  return (
    <>
      <Text style={modelStyles.modalText}>性別</Text>
      <View style={{ width: "100%", padding: 10 }}>
        <RadioButtonRN
          data={radioData}
          selectedBtn={({ label }) => setSelectValue(label)} />
      </View>
      <SubmitBtn onSubmit={onSubmit} />
    </>
  );
};

export const EditIntroduction = ({ myUser, setMyUser }) => () => {
  const initalValue = (myUser.getIntroduction() === "無")?'':myUser.getIntroduction()
  const [value, onChangeText] = React.useState(initalValue);
  const onSubmit = () => {
    const user = new User(myUser);
    user.introduction = value;
    setMyUser(user);
  };

  // autoFoucs with keyboard
  const txtInputRef = useRef(null);
  useEffect(() => {
    Platform.OS === 'ios'
        ? txtInputRef?.current?.focus()
        : setTimeout(() => txtInputRef?.current?.focus(), 600);
  }, [])

  return (
    <>
      <Text style={modelStyles.modalText}>自我介紹</Text>
      <View style={{ fontSize: 20, minHeight: "20%", width: "100%", padding: 5, marginBottom: 15, borderWidth: 1.5, borderColor:'#5B5B5B' }}>
        <TextInput
          ref={txtInputRef}
          style={{}}
          multiline={true}
          onChangeText={text => onChangeText(text)}
          value={value}
          maxLength={200} />
      </View>
      <SubmitBtn onSubmit={onSubmit} />

    </>
  );
};

export const EditUserName = ({ myUser, setMyUser }) => () => {
  const initalValue = myUser.getUserName()
  const [value, onChangeText] = React.useState(initalValue);
  const onSubmit = () => {
    if(value === '' || value === ' ')return Alert.alert("暱稱不能為空")
    const user = new User(myUser);
    user.username = value;
    setMyUser(user);
  };

  // autoFoucs with keyboard
  const txtInputRef = useRef(null);
  useEffect(() => {
    Platform.OS === 'ios'
        ? txtInputRef?.current?.focus()
        : setTimeout(() => txtInputRef?.current?.focus(), 600);
  }, [])

  return (
    <>
      <Text style={modelStyles.modalText}>暱稱</Text>
      <View style={{ width: "100%", padding: 5, marginBottom: 10, borderBottomWidth: 1.5 }}>
        <TextInput
          ref={txtInputRef}
          style={{ fontSize: 20, alignSelf:'center' }}
          onChangeText={text => onChangeText(text)}
          value={value}
          maxLength={20} />
      </View>
      <SubmitBtn onSubmit={onSubmit} />

    </>
  );
};

export const EditBirthDay = ({ myUser, setMyUser }) => () => {
  console.log(myUser)
  const iniatlDate = (myUser.getBirthDay()=== "無")?new Date():new Date(myUser.getBirthDay())
  // const iniatlDate = new Date()
  const [date, setDate] = React.useState(iniatlDate);
  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setDate(currentDate);
  };
  const onSubmit = () => {
    const user = new User(myUser);
    user.birthday= formatDate(date);
    setMyUser(user);
  };
  return ( <>
          <Text style={modelStyles.modalText}>出生日期</Text>
          <View style={{ width: "100%" }}>
            <DateTimePicker
              value={date}
              isVisible={true}
              mode={'date'}
              onChange={onChange}
              locale="zh-TW" />
          </View>
          <SubmitBtn onSubmit={onSubmit} />
        </>
  );
};

export const EditProfileImage = ({ myUser, setMyUser }) => () => {
  const [pickImage,image,hasError] = useImagePick();
  const pictureUrl = myUser.getPictureUrl();
  const displayImgSrc = (image && !hasError) ? { uri: image.uri }
                            : ((pictureUrl) 
                                ? { uri: pictureUrl }
                                : null)
                                // : require('app/assets/profile.png'))
  const onDelete = ()=>{
    const user = new User(myUser);
    user.pictureUrl = ""
    setMyUser(user);
  }

  const onSubmit = async() => {
     
    try {
      const user = new User(myUser);
      if(!image) return setMyUser(user);
      const manager = await AppHelper();
      const data = await manager.uploadImage([image])
      user.pictureUrl = data[0].url
      setMyUser(user);
    } catch (error) {
      console.warn(error)
    }
  };
  return (
    <>
      <Text style={modelStyles.modalText}>更換大頭貼</Text>
        <TouchableOpacity
              style={{ ...modelStyles.openButton, backgroundColor: "rgb(221, 112, 154)" }}
              onPress={onDelete}>
              <Text style={modelStyles.textStyle}>刪除大頭貼</Text>
         </TouchableOpacity>
      
        <TouchableOpacity onPress={pickImage} style={{
              marginVertical: 40,
              backgroundColor: '#BEBEBE',
              width: 220,
              height: 220,
              borderRadius: 200,
              borderWidth: 0,
              // alignSelf: 'center',
              // justifyContent: "center",
              elevation: 6
          }}>
            <Image
                    style={{ flex:1 ,resizeMode: "cover", borderRadius: 200}}
                    source={displayImgSrc}/>
          </TouchableOpacity>

        <SubmitBtn onSubmit={onSubmit} />

    </>
  );
};

function SubmitBtn({onSubmit}){
  return(
    <TouchableOpacity
      style={{ ...modelStyles.openButton, backgroundColor: "#2196F3" }}
      onPress={onSubmit}>
      <Text style={modelStyles.textStyle}>確認</Text>
    </TouchableOpacity>
  )
}


