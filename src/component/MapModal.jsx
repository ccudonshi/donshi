import React, { useRef } from 'react';
import { Dimensions, Text,View, Alert, Modal,StyleSheet, ScrollView, TouchableOpacity , Linking} from 'react-native';
import MapView, { PROVIDER_GOOGLE} from 'react-native-maps';
import {BackToInitBtn} from "./BackToInitBtn";
import PostMarker from './PostMarker'
import {typeIdToImgSrc} from '../helper/helper'
const { width, height } = Dimensions.get('window');

const ASPECT_RATIO = width / height;
const LATITUDE = 23.470934;
const LONGITUDE =120.1788755;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

function Map({post}){
    const mapRef = useRef(null)
    const latlng = {
        latitude: post.getLatitude(),
        longitude: post.getLongitude(),
    }
    const initalRegion = {
        ...latlng,
        latitudeDelta: LATITUDE_DELTA,
        longitudeDelta: LONGITUDE_DELTA,
    };
    const onMapPress = ()=>{
      const {latitude,longitude} = latlng
      var url = `https://www.google.com/maps/dir/?api=1&travelmode=driving&destination=${latitude},${longitude}`;
      Linking.canOpenURL(url).then(supported => {
          if (!supported) {
              console.log('Can\'t handle url: ' + url);
          } else {
              return Linking.openURL(url);
          }
      }).catch(err => console.error('An error occurred', err)); 
    }
   
    return(
        <View>
        {/* <BackToInitBtn mapRef={mapRef} initalRegion={initalRegion} /> */}

        <MapView
          style={{height:"100%"}}
          ref={mapRef}
          provider={PROVIDER_GOOGLE}
          initialRegion={initalRegion}
          onPress={e => onMapPress(e)}>
          

          <PostMarker
            key={post.getId()}
            coordinate={latlng}
            title={post.getTitle()}
            description={post.getText()}
            imageSrc={typeIdToImgSrc(post.getType().id)} />
        </MapView>
        
       
      </View>
    )
}
function SubNavbar({onClose}){
  return(
    <View>
            <View style={navStyles.container}>
                <TouchableOpacity style={navStyles.leftBtn}  onPress={onClose}>
                  <Text style={{ fontSize:20,color:"white"}}>Back</Text>
                </TouchableOpacity>
            </View>
    </View>
  )
}

//目前沒用到 原本是要做貼文點選連接地圖會出現此畫面，但後來改為直接轉到google地圖
export function MapModal({post,closeModelup}) {
    
    return ( <Map post={post}/>
    );
}
const navStyles = StyleSheet.create({
  container: {
      marginTop:20,
      paddingTop: 20,
      ...Platform.select({
      ios: {
          height: 62,
      },
      android: {
          height: 54,
      },
      windows: {
          height: 54,
      },
      }),
      width:'100%',
      display:'flex',
      flexDirection:'row',
      justifyContent:"space-around"
  },
  // leftBtn:{
  //   paddingLeft:15,
  //   justifyContent:'flex-start',
   
  // },
  title:{

  }
})
const modelStyles = StyleSheet.create({

    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: 'rgba(0,0,0,0.5)',
    },
      modalView: {
        width:"80%",
        margin: 20,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 35,
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
        color: "white",
        fontWeight: "bold",
        textAlign: "center"
      },
      modalText: {
        marginBottom: 15,
        textAlign: "center"
      }
})



