import React from 'react'
import { Image, View, Text, Linking} from 'react-native'
import {Platform} from 'react-native'
import { Marker, Callout} from "react-native-maps";
import { StyleSheet } from 'react-native'
import {goToGoogleMap}from '../helper/helper'

const markerStyles = StyleSheet.create({
  calloutStyle :{ flex: 1, position: 'relative' },
  calloutviewStyle : { flex: 1, padding: 0 },
  imageStyle : { height: 20, width: 20 }
});

const PostMarker = (props) => {
  const onMarkerPress = ()=>{
    props.onMoveToMarker(props.coordinate);
    props.setClickedPost();
  }
  return(
    <Marker
      coordinate={props.coordinate}
      title={props.title}
      description={props.description}
      tracksViewChanges={false}
      onPress={onMarkerPress}
      onCalloutPress={()=>goToGoogleMap(props.coordinate)} // for android
    >
      {(props.imageSrc != undefined) && 
          <Image source={props.imageSrc} style={markerStyles.imageStyle}/>}
      { Platform.OS === 'ios' &&
        <Callout onPress={()=>goToGoogleMap(props.coordinate)} style={markerStyles.calloutStyle}>
          <View  style={markerStyles.calloutviewStyle}>
            <Text>{props.title}</Text>
          </View>
        </Callout>}
  
    </Marker>
  )
    
}  

export default PostMarker;
