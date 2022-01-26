import React, { useState ,useRef, useMemo} from 'react';
import {
  StyleSheet,
  View,
  Text,
  Dimensions,
  TouchableOpacity,
  Button,
} from 'react-native';
import MapView, { Marker, PROVIDER_GOOGLE} from 'react-native-maps';
import { Actions } from 'react-native-router-flux';
import {CurriedBackToInitBtn} from "../../component/BackToInitBtn";

const { width, height } = Dimensions.get('window');

// 一些參數，詳細可以去看react-native-maps的document
const ASPECT_RATIO = width / height;
const LATITUDE = 23.470934;
const LONGITUDE =120.1788755;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

// 設定地圖座標的頁面
export default function PositionView({region,setRegion}){
  const initalRegion = {
    latitude: LATITUDE,
    longitude: LONGITUDE,
    latitudeDelta: LATITUDE_DELTA,
    longitudeDelta: LONGITUDE_DELTA,
  };
  console.log('region')
  console.log(region)
  const initalMarker = (Object.keys(region).length === 0)?{}:{coordinate:{...region}}
  console.log('initalMarker')
  console.log(initalMarker)
  const [marker, setMarker] = useState(initalMarker);
  const mapRef = useRef(null)

  console.log(marker)
  const BackToInitBtn = CurriedBackToInitBtn({bottom:0,right:0});
  const clearMarker = ()=>setMarker({});
  const onMapPress = (e) => setMarker({coordinate: e.nativeEvent.coordinate})
  const onBackPress = ()=>Actions.pop()
  const onSubmit = ()=> {
    ("coordinate" in marker)
      ? setRegion(marker.coordinate)
      : setRegion({})
    Actions.pop()
  }
  return (
    <View style={styles.container}>
        <BackToInitBtn mapRef={mapRef} initalRegion={initalRegion} />

        <View style={styles.submitConainter}>
          <Button  title="返回" onPress={onBackPress}/>
          {/* { Object.keys(marker).length != 0   // 如果不是空物件 */}
            {/* &&  */}
            <Button  title="確認" onPress={onSubmit}/> 
            {/* } */}
        </View>

        <MapView
          ref={mapRef}
          provider={PROVIDER_GOOGLE}
          style={styles.map}
          initialRegion={initalRegion}
          onPoiClick={e => onMapPress(e)}
          onPress={e => onMapPress(e)}
        >
          { Object.keys(marker).length != 0
            &&
            <Marker
              coordinate={marker.coordinate}
            />
          }
        </MapView>
        
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            onPress={clearMarker}
            style={styles.bubble}
          >
            <Text>
              {  Object.keys(marker).length != 0  // 如果不是空物件
                  && `經度:${marker.coordinate.longitude}\n緯度:${marker.coordinate.longitude}`
                || "點擊以進行定位,建議放大地圖以提高精確度"}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
  )
  
}

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  bubble: {
    backgroundColor: 'rgba(255,255,255,0.7)',
    paddingHorizontal: 18,
    paddingVertical: 12,
    borderRadius: 20,
  },
  latlng: {
    width: 200,
    alignItems: 'stretch',
  },
  button: {
    width: 80,
    paddingHorizontal: 12,
    alignItems: 'center',
    marginHorizontal: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    marginVertical: 40,
    backgroundColor: 'transparent',
  },
  submitConainter:{
    flexDirection: 'row',
    // marginVertical: 20,
    backgroundColor: 'white',
    zIndex :99
  }
});

