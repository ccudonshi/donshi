import React, { useState } from "react";
import { Image, FlatList, StatusBar, StyleSheet, Text, TouchableOpacity, View, Alert } from "react-native";
import DateTimePicker from 'react-native-modal-datetime-picker';
import Moment from 'moment';
import { format } from "date-fns";

import start from 'app/assets/start_clock.png'
import end from 'app/assets/end_clock.png'
import location from 'app/assets/location.png'
import image from 'app/assets/image.png'
import { formatDate } from "../../helper/helper";
import { Actions } from "react-native-router-flux";

// 新增/修改貼文的頁面中需填入的表單
/**
 * 公告開始時間 公告結束時間 圖片 選擇定位
 */

const Item = ({ item, onPress, style }) => (
  <TouchableOpacity onPress={onPress} style={{ flexDirection: 'row', paddingVertical: 5, borderBottomColor: '#F0F0F0', borderBottomWidth: 1.2 }}>
    <Image style={styles.img} source={item.image} />
    <Text style={styles.title}>{item.title}</Text>
    <Text style={styles.date}>{item.date}</Text>
  </TouchableOpacity>
);

const ChooseList = ({ startDate,endDate,setStartDate, setEndDate,region,setRegion,images,setImages}) => {
  const [selectedId, setSelectedId] = useState(null);
  const [isStartDatePickerVisible, setStartDatePickerVisibility] = useState(false);
  const [isEndDatePickerVisible, setEndDatePickerVisibility] = useState(false);

  const showStartDatePicker = () => {setStartDatePickerVisibility(true);};
  const hideStartDatePicker = () => {setStartDatePickerVisibility(false);};
  const handleStartConfirm = (date) => {
    console.log(new Date(endDate).getTime())
    console.log(date.getTime())
    if(endDate !== '' && new Date(endDate).getTime() < date.getTime())return Alert.alert('開始時間不能大於結束時間')
    setStartDate(formatDate(date));
    hideStartDatePicker();
  };

  const showEndDatePicker = () => {setEndDatePickerVisibility(true);};
  const hideEndDatePicker = () => {setEndDatePickerVisibility(false);};
  const handleEndConfirm = (date) => {
    if(startDate !=='' && new Date(startDate).getTime()>date.getTime())return Alert.alert('結束時間不能低於開始時間')
    setEndDate(formatDate(date));
    hideEndDatePicker();
  };

  const goToPosionView = ()=> Actions.push('position',{region,setRegion});
  
  const addImages = ()=>Actions.imgBrowser({setImages,MAXLIMIT:4})


  const DATA = [
    {
      num: 0,
      id: "post_start",
      title: "公告開始時間：",
      image: start,
      date: startDate,
      func:showStartDatePicker
    },
    {
      num: 1,
      id: "post_end",
      title: "公告結束時間：",
      image: end,
      date: endDate,
      func:showEndDatePicker
    },
    {
      num: 2,
      id: "choosePic",
      title: (images.length===0)?"圖片":`圖片已選擇${images.length}張`,
      image: image,
      func:addImages 
    },
    {
      num: 3,
      id: "locate",
      title: (Object.keys(region).length === 0)?"選擇定位":"定位完成",
      image: location,
      func:goToPosionView
    },
  ];
  const renderItem = ({ item }) => {
    const backgroundColor = item.id === selectedId ? "#E0E0E0" : "#fff";
    // const func = item.num === 0 ? showStartDatePicker : showEndDatePicker

    return (
      <Item
        key ={item.id}
        item={item}
        onPress={item.func}
        style={{ backgroundColor }}
      />
    );
  };


  return (

    <View style={styles.container}>
      <FlatList
        data={DATA}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        extraData={selectedId}
      />
      <DateTimePicker

        headerTextIOS={'選擇開始日期'}
        cancelTextIOS={'取消'}
        confirmTextIOS={'確定'}
        isVisible={isStartDatePickerVisible}
        mode={'date'}
        format={"y-MM-dd"}
        onConfirm={handleStartConfirm}
        onCancel={hideStartDatePicker}
        locale="zh-ZH"
      />
      <DateTimePicker
        dateFormat="shortdate"
        headerTextIOS={'選擇結束日期'}
        cancelTextIOS={'取消'}
        confirmTextIOS={'確定'}
        isVisible={isEndDatePickerVisible}
        mode={'date'}
        onConfirm={handleEndConfirm}
        onCancel={hideEndDatePicker}
        locale="zh-ZH"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    // flex: 1,
  },
  item: {

  },
  title: {
    alignSelf: 'center',
    marginLeft: 5,
    fontSize: 18,
  },
  img: {
    width: 26,
    height: 26
  },
  date: {
    // alignSelf: 'center',
    marginLeft: 5,
    fontSize: 18,
  }
});

export default ChooseList;
