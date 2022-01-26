import React, { useState ,useRef, useMemo} from 'react';
import {
  StyleSheet,
  View,
  Text,
  Dimensions,
  TouchableOpacity,
  Button,
} from 'react-native';
// import fakeDatas from './test/fakeDatas'

import MapView, { Marker, PROVIDER_GOOGLE} from 'react-native-maps';
import { Actions } from 'react-native-router-flux';
import {CurriedBackToInitBtn} from "../component/BackToInitBtn";
import PostMarker from '../component/PostMarker'
import {typeIdToImgSrc} from '../helper/helper'
const { width, height } = Dimensions.get('window');

const ASPECT_RATIO = width / height;
const LATITUDE = 23.470934;
const LONGITUDE =120.1788755;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

export default function MapWithPostScreen(){
  const initalRegion = {
    latitude: LATITUDE,
    longitude: LONGITUDE,
    latitudeDelta: LATITUDE_DELTA,
    longitudeDelta: LONGITUDE_DELTA,
  };
  const mapRef = useRef(null)
  
  const BackToInitBtn = CurriedBackToInitBtn({bottom:0,right:0});
  const post = fakeDatas[0]
  
  return (
    <View style={styles.container}>
        <BackToInitBtn mapRef={mapRef} initalRegion={initalRegion} />

        <MapView
          ref={mapRef}
          provider={PROVIDER_GOOGLE}
          style={styles.map}
          initialRegion={initalRegion}
          onPoiClick={e => onMapPress(e)}
          onPress={e => onMapPress(e)}
        >
          <PostMarker
                key={post.getId()}
                coordinate={{
                    latitude: post.getLatitude(),
                    longitude: post.getLongitude(),
                }}
                title={post.getTitle()}
                description={post.getText()}
                imageSrc={typeIdToImgSrc(post.getType().id)} />
        </MapView>
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

