/* eslint-disable react-native/no-color-literals */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable no-unused-vars */
import React, { useEffect, useRef, useState } from 'react'
import { Dimensions, Animated, SafeAreaView, Alert } from 'react-native';
import { ImageBg } from './ImageBg';
import Map from './Map';
import Menu from './Menu';
import { screen } from './styles'
import useFetchData from './useFetchData'
// 地圖頁面
export default function GoogleMapScreen() {
  const [hasError, isFinished, datas, setDatas, types] = useFetchData(); 
  const [isSideBarDisplay, setIsSideBarDisplay] = useState(false); //menu選單是否顯示
  const [rotateY, setRotateY] = useState(new Animated.Value(0)); 
  const [translateX, setTranslateX] = useState(new Animated.Value(0));
  const [displayStatus, setDisplayStatus] = useState({ info: true, need: true }); // 需求資訊食衣住行育樂 是否顯示

  let keyRef = useRef(null);

  useEffect(() => {
    if (types.length !== 0 && isFinished)
      setDisplayStatus(preDisplayStatus => {
        const newDisplayStatus = Object.assign({},preDisplayStatus);
        types.forEach(type => newDisplayStatus[type.id] = true)
        return newDisplayStatus
      })
  }, [types, isFinished])
  
  useEffect(() => { if (displayStatus !==null && keyRef.current !== null) changeDisplay(keyRef.current); }, [displayStatus]) // 根據更新後的displayStatus 去更動data的display
  useEffect(() => { openDoorAnimation() }, [isSideBarDisplay])
  useEffect(() => { if (!hasError) return; }, [hasError])

  function openDoorAnimation() {
    Animated.parallel([
      Animated.spring(translateX, {
        toValue: (isSideBarDisplay) ? 1 : 0,
        useNativeDriver: true, // <-- Add this in Expo38
      }),
      Animated.timing(rotateY, {
        toValue: (isSideBarDisplay) ? 1 : 0,
        duration: 200 ,
        useNativeDriver: true, // <-- Add this in Expo38
      }),
        
    ]).start()
  }

  function changeDisplay(key) {
    if (typeof key !== "number" && key !== "need" && key !== "info") {
      console.warn('wrong argument in changeDisplay!')
      return;
    }
    let keyName;
    let targetKeys;

    if (typeof key == "number") {
      keyName = "typeId";
      console.log(`changeDisplay in ${keyName}:${key}`)
      targetKeys = [`info${key}`, `need${key}`];
    } else {
      keyName = "isNeed";
      console.log(`changeDisplay in ${keyName}:${key}`)
      targetKeys = types.map(type => key + type.id);
      key = (key == "need") ? true : false;
    }

    // 把可能受影響的post列出來
    targetKeys.forEach(targetKey => {
      setDatas((prevDatas) => {
        let pData = prevDatas[targetKey];
        let { isNeed, typeId } = pData;
        isNeed = (isNeed) ? "need" : "info";
        // 檢查displayStatus[info|need],displayStatus[1|2|..|7]
        // 如果皆為true 代表此 post 要顯示 否則 不顯示
        pData.isDisplay = (displayStatus[isNeed] && displayStatus[typeId]) ? true : false;
        // change to check displayStatus
        return (Object.assign({}, prevDatas, { [targetKey]: pData }))
      })
    })
  }

  const changeDisplayStatus = (key) => { // key == typeId || "need" || "info"
    if (!isFinished) return;
    if (typeof key !== "number" && key !== "need" && key !== "info") {
      console.warn('wrong argument in changeDisplayStatus!')
      return;
    }
    keyRef.current = key;
    setDisplayStatus(preDisplayStatus => Object.assign({}, preDisplayStatus, { [key]: !preDisplayStatus[key] }));
  }

  const changeSideBarDisplay = () => setIsSideBarDisplay(!isSideBarDisplay);
  
  const displayData = (isFinished && types.length !== 0) ?
    Object.keys(datas).map(value => datas[value])
      .filter(data => (data != undefined))
      .filter(data => (data.isDisplay))
      .map(datas => datas.posts)
      .flat()
    : []
  console.log('displayDataLength :\t' + displayData.length)

  const animateTranform = {
    transform: [
      { perspective: 850 },
      {
        translateX: translateX.interpolate({
          inputRange: [0, 1],
          outputRange: [0, Dimensions.get('window').width * 0.24],
        })
      },
      {
        rotateY: rotateY.interpolate({
          inputRange: [0, 1],
          outputRange: ['0deg', '-60deg'],
        })
      }]
  }

  return (
    <SafeAreaView style={screen.container}>
      <ImageBg />
      
      <Menu
        displayStatus={displayStatus}
        types={(types.length !== 0) ? types : []}
        isDisplay={isSideBarDisplay}
        changeDisplayStatus={changeDisplayStatus}
        displayClick={changeSideBarDisplay}
      />

      <Map
        animateTranform={animateTranform}
        isSideBarDisplay={isSideBarDisplay}
        displayData={displayData}
        displayClick={changeSideBarDisplay}
      />

      
    </SafeAreaView>
  )
}
