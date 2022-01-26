/* eslint-disable react-native/no-color-literals */
import PropTypes from "prop-types";
import React, { useState, useEffect , useRef} from 'react'
import { View ,Image , Text, TouchableOpacity,StyleSheet} from 'react-native';
// 登入按鈕的UI和功能
const LoginBtn = (props)=>{ 
    const [isClicked,setIsClicked] = useState(false); // 用isClicked來防止連點
    const timeOutRef = useRef(null);
    
    useEffect(() => {
      if(isClicked)
        timeOutRef.current = setTimeout(( () => setIsClicked(false)), 2000) // 2秒可以再點一次 
      return ()=>(timeOutRef.current !== null)?clearTimeout(timeOutRef.current):null
    }, [isClicked]);

    const onMyPress = ()=>{
      if(!isClicked){
        setIsClicked(true)
        props.onPress()
      }  
    }

    const btnStyles = StyleSheet.create({
      container : { alignItems: "center", justifyContent: "center",padding:10 },
      googleLoginBtnSytle : {
        backgroundColor: (isClicked) ? 'black' : 'white',
        borderBottomLeftRadius: 10,
        borderTopLeftRadius: 10,
        borderTopRightRadius: 5, 
        borderWidth: 1,
        flexDirection: 'row',
        justifyContent: 'center',
      },
      imgStyle : {resizeMode:"contain"},
      iconStyle : { borderColor: (isClicked) ? 'white' : 'black', borderRightWidth: 1,alignItems: "center", justifyContent: "center",padding:10,},
      textStyle : { color: (isClicked) ? 'white' : 'black',
      // marginLeft: 10, marginTop: 5,
      // padding:10,
      //  textAlign: 'center',
      //  textAlignVertical: 'center',justifyContent:"center",alignContent:"center" 
      },
    })

    return(
      <TouchableOpacity  
              style={btnStyles.googleLoginBtnSytle} 
              onPress={onMyPress}>
              <View style={btnStyles.iconStyle}>
                <Image 
                    style={btnStyles.imgStyle}
                    source={require('app/assets/google32.png')}/>
              </View>
              <View style={btnStyles.container}>
                  <Text style={btnStyles.textStyle}>Google登入</Text>
              </View>
      </TouchableOpacity>
    )
}

LoginBtn.propTypes = {
  onPress: PropTypes.func
}

export default LoginBtn;