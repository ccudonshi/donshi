
import React, { Component,useState,useEffect } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, ActivityIndicator, StatusBar, Image, ActionSheetIOS } from 'react-native';
import * as ImageManipulator from 'expo-image-manipulator';
import {ImageBrowser} from '../lib/expo-image-picker-multiple';
// import {ImageBrowser} from 'expo-image-picker-multiple';
import { Actions } from 'react-native-router-flux';
import { set } from 'date-fns';
// 用來選擇照片的頁面
export default function ImageBrowserScreen({setImages,MAXLIMIT}){
    const [loading, setLoading] = useState(false)
    const [title, setTitle] = useState(`請選擇照片，最多${MAXLIMIT}張`)
    const [files, setFiles] = useState([])
    const onSubmit = ()=>{
      setImages(files); 
      Actions.pop();
    }    

    const updateHandler = (count) => {setTitle(`已選擇${count}個檔案`)};
    const _processImageAsync = async(uri)=>{
        const file = await ImageManipulator.manipulateAsync(
          uri,
          [{resize: { width: 1000 }}],
          { compress: 0.8, format: ImageManipulator.SaveFormat.JPEG }
        );
        return file;
    }
    const imagesCallback = (callback) => {
        
        setLoading(true)
        callback.then(async(photos) => {
            console.log('callback')
            const cPhotos = [];
            for(let photo of photos) {
                const pPhoto = await _processImageAsync(photo.uri);
                cPhotos.push({
                uri: pPhoto.uri,
                name: photo.filename,
                type: 'image/jpg'
                })
            }
            setFiles(cPhotos);
        })
        .catch((e) => console.log(e))
        .finally(() => setLoading(false));
      };
    const  renderSelectedComponent = (number) => (
        <View style={styles.countBadge}>
          <Text style={styles.countBadgeText}>{number}</Text>
        </View>
    );
    const emptyStayComponent = <Text style={styles.emptyStay}>Empty =(</Text>;
    return (
    <View style={[styles.flex, styles.container]}>
        <NavBar loading={loading} title={title} onSubmit={onSubmit}/>
        <ImageBrowser
            max={MAXLIMIT}
            onChange={updateHandler}
            callback={imagesCallback}
            renderSelectedComponent={renderSelectedComponent}
            emptyStayComponent={emptyStayComponent}
        />
    </View>
    );
}


function NavBar({loading,title,onSubmit}){
  return(
          <View>
              <StatusBar/>
                  <View style={navBarStyle.container}>
                      <TouchableOpacity style={navBarStyle.leftBtn} onPress={() => Actions.pop()}>
                          <Image
                              source={require('app/assets/back.png')}
                              style={navBarStyle.backarrowStyle} />
                      </TouchableOpacity>
                      <View style={navBarStyle.middleBtn}>
                        <Text>{title}</Text>
                      </View>
                      {!loading &&
                          <TouchableOpacity style={navBarStyle.rightBtn} onPress={onSubmit}>
                              <Text>
                                確定
                              </Text>
                          </TouchableOpacity>
                      
                      }
                      
                      {loading &&
                          <View style={navBarStyle.rightBtn}>
                                  <ActivityIndicator size="small" color={'#0580FF'}/>
                              </View>
                      }
                      
          </View>
          </View>
  )
}


const styles = StyleSheet.create({
  flex: {
    flex: 1
  },
  container: {
    position: 'relative'
  },
  emptyStay:{
    textAlign: 'center',
  },
  countBadge: {
    paddingHorizontal: 8.6,
    paddingVertical: 5,
    borderRadius: 50,
    position: 'absolute',
    right: 3,
    bottom: 3,
    justifyContent: 'center',
    backgroundColor: '#0580FF'
  },
  countBadgeText: {
    fontWeight: 'bold',
    alignSelf: 'center',
    padding: 'auto',
    color: '#ffffff'
  }
});

const navBarStyle = StyleSheet.create({
        container: {
            paddingTop: 10,
            ...Platform.select({
            ios: {
                height: 64,
            },
            android: {
                height: 54,
            },
            windows: {
                height: 54,
            },
            }),
            width:'100%',
            borderBottomWidth: 0.5,
            borderBottomColor: '#828287',
            display:'flex',
            flexDirection:'row',
            justifyContent:'space-between',
            backgroundColor:"#B1C6E6",
        },
        backarrowStyle: {
            resizeMode: 'contain',
            width: 25,
        },
        leftBtn:{
            paddingLeft:15,
            justifyContent:'center'
    
        },
        middleBtn:{
            alignSelf: 'center',
            // width:'80%',
            flexDirection:'row',
            justifyContent:'center',
            alignItems:"center",
            marginTop:10
    
        },
        rightBtn:{
            // align
            // alignSelf: 'flex-end',
            marginTop:10,
            paddingRight:15,
            justifyContent:'center'
            
        },
        settingStyle: {
            // right: 0,
            // paddingRight: 8,
                // backgroundColor: 'black',  
            resizeMode: 'contain',
            // width: 50,
            // height: 50,
            justifyContent: 'center',
            // position: 'relative',
            // left: 210
        }
    
})
