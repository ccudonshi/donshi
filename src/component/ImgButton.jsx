import React, { Component } from 'react';
import { StyleSheet,View ,Image , Text, TouchableOpacity} from 'react-native';


const styles = StyleSheet.create({
    imgBtn:{
        justifyContent:"center",
        alignItems:"center",
    },
    img:{
        // resizeMode:"cover",
        height:20,
        width:20,

    }
  });
  const ImgButton = (props)=><TouchableOpacity  
            style={{
                ...styles.imgBtn,
                ...props.style,
            }} 
            onPress={props.onPress}>
        <Image 
            style={styles.img}
            source={props.imgSrc || require('app/assets/logo.png')}
            
            />
    </TouchableOpacity>


export default ImgButton;