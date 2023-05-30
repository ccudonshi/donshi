import React, {useState } from 'react'
import { Platform,KeyboardAvoidingView,Keyboard,Text,StyleSheet, View, Button, ScrollView } from 'react-native'
import { TouchableOpacity , TextInput} from 'react-native-gesture-handler';
import DateTimePicker from 'react-native-modal-datetime-picker';
import { Checkbox } from 'react-native-paper';
import { ModelUPRadio } from '../../component/ModelUPRadio';
import { formatDate } from '../../helper/helper';
// 註冊的第一個頁面 1/2
export default function RegisterFirst({
    username,setUsername,
    gender,setGender,
    birthday, setBirthday,
    phone, setPhone,
    hasUserTicket, setHasUserTicket,
    onNextStep
}){
    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
    const [isRadioVisible,setIsRadioVisible] = useState(false)
    const showRadio = () => setIsRadioVisible(true)
    const hideRadio = () => setIsRadioVisible(false)
    const showDatePicker = () => setDatePickerVisibility(true)
    const hideDatePicker = () => setDatePickerVisibility(false)
    const onRadioSubmit = (value) => {
        if(value!=null)setGender(value);
        hideRadio();
    }
    const handleConfirm = (date) => {
        setBirthday(formatDate(date))
        hideDatePicker();
    };
    return (
        <KeyboardAvoidingView behavior={Platform.OS == 'ios' ? 'padding' : 'height'} style={styles.background}>
            <Text style={styles.title}>註冊(1/2)</Text>
            <View style={{position:'absolute',right:10,top:30}}>
               <Button onPress={Keyboard.dismiss} title='收起鍵盤'></Button>
            </View>
            
            <Text style={{color:'red',alignSelf:'flex-end', marginTop:15}}>(有*號者為必塡)</Text>
            <View style={{flexDirection:'row',marginTop:40}}>
                <View>
                    <Text style={{color:'red'}}>*</Text>
                </View>
                <TextInput 
                    onChangeText={(text)=>setUsername(text)} 
                    style={styles.textInput} 
                    placeholder='暱稱(以此名稱顯示)'  
                    maxLength={20} 
                    autoCompleteType='username' 
                    textContentType='username'
                    value = {username} />
            </View>
            

            <TouchableOpacity style={{ marginTop: 40 }} onPress={showRadio}>
                <View style={{ flexDirection: 'row' }} pointerEvents='none'>
                    <Text style={{color:'red'}}>*</Text>
                    <TextInput
                        style={styles.textInput}
                        placeholder='性別'
                        editable={false}
                        selectTextOnFocus={false}
                        value={gender}
                    />
                </View>
            </TouchableOpacity>

            <ModelUPRadio 
                data = {[{ label: '男' }, { label: '女' }, { label: '其他' }] }
                isRadioVisible={isRadioVisible} 
                onRadioSubmit={onRadioSubmit}/>
            
            <TouchableOpacity style={{ marginTop: 40 }} onPress={showDatePicker}>
                <View style={{ flexDirection: 'row' }} pointerEvents='none'>
                    <Text style={{color:'red'}}>*</Text>
                    <TextInput
                        style={styles.textInput}
                        placeholder='年/月/日'
                        editable={false}
                        selectTextOnFocus={false}
                        value={birthday}
                    />
                </View>
            </TouchableOpacity>

            <View style={{ flexDirection: 'row', marginTop: 40 }}>
                <View>
                    <Text style={{color:'red'}}>*</Text>
                </View>
                <TextInput 
                    style={styles.textInput}
                    onChangeText={text=>setPhone(text)} 
                    placeholder='手機號碼' 
                    autoCompleteType='tel' 
                    dataDetectorTypes='phoneNumber' 
                    maxLength={10}
                    keyboardType='phone-pad' 
                    textContentType='telephoneNumber'
                    value={phone} />
            </View>

            <View style={{ flexDirection: 'row', marginTop: 40 }}>
                <Text style={{color:'red'}}>*</Text>
                <Checkbox.Item
                    mode='android'
                    status={hasUserTicket ? 'checked' : 'unchecked'}
                    label='是否有好時券'
                    position='leading'
                    onPress={() => {
                        setHasUserTicket(prev => !prev);
                    }}
                    style={{ paddingLeft: 0 }}
                />
            </View>

                 
            <TouchableOpacity onPress={onNextStep}>
                <Text style={styles.btnNext}>下一步</Text>
            </TouchableOpacity>
               
               
               
            <DateTimePicker
                headerTextIOS={'選擇日期'}
                cancelTextIOS={'取消'}
                confirmTextIOS={'確定'}
                isVisible={isDatePickerVisible}
                mode={'date'}
                onConfirm={handleConfirm}
                onCancel={hideDatePicker}
                locale='zh-TW'
            />
        </KeyboardAvoidingView>
    );
}



const styles = StyleSheet.create({
    background:{
        flex:1,
        padding:40,
        justifyContent:'center'
    },
    title:{
        fontSize:40,
        color:'#7B7B7B'
    },
    textInput:{
        width: '100%',
        fontSize:20,
        borderBottomWidth:1.5,
        borderBottomColor:'#BEBEBE',
        paddingVertical:5
    },
    btnNext:{
        alignSelf:'center',
        textAlign:'center',
        marginTop:40,
        color:'#fff',
        backgroundColor:'#46A3FF',
        padding:8,
        borderRadius:23,
        borderWidth:5,
        borderColor:'#46A3FF',
        overflow:'hidden',
        fontSize:18,
        width:200
    },
  


});
