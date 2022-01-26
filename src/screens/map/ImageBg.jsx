import React from 'react';
import { Dimensions, View, Image, StyleSheet } from 'react-native';

export const ImageBg = () => (
  <View style={{ ...StyleSheet.absoluteFillObject, zIndex: -990 }}>
    <View style={{ ...StyleSheet.absoluteFillObject, zIndex: -990, backgroundColor: 'rgba(52, 52, 52, 0.5)', }} />
    <Image
      style={{
        ...StyleSheet.absoluteFillObject,
        height: Dimensions.get('screen').height,
        resizeMode: 'cover',
        zIndex: -999,
      }}
      source={require('app/assets/donshiFishGun.jpg')} />
  </View>
);
