import PropTypes from "prop-types";
import React from 'react'
import { Image } from "react-native";
import { Text, View, TouchableOpacity, Dimensions } from 'react-native'
import ImgButton from '../../component/ImgButton';
import { typeIdToImgSrc } from '../../helper/helper'
import { Ionicons, MaterialIcons, AntDesign , MaterialCommunityIcons, FontAwesome5} from '@expo/vector-icons';



const white = "white";
// eslint-disable-next-line react-native/no-inline-styles
const DivdeLine = () => <Text style={{ textAlign: "center", color: white, fontSize: 18, }}>-----------------</Text>
const deviceWidth = Dimensions.get("window").width;
const deviceHeight = Dimensions.get("window").height;

// 左方可以調整類別顯示的選單
export default function Menu({ displayStatus, types, isDisplay, changeDisplayStatus, displayClick }) {
    return (
        (isDisplay) ?
            <MenuList
                types={types}
                displayClick={displayClick}
                displayStatus={displayStatus}
                changeDisplayStatus={changeDisplayStatus}
            />
            : <ActiveBtn displayClick={displayClick} />

    )
}

Menu.propTypes = {
    changeDisplayStatus: PropTypes.any,
    displayClick: PropTypes.any,
    displayStatus: PropTypes.any,
    isDisplay: PropTypes.any,
    types: PropTypes.any
}

// 開Menu按鈕
function ActiveBtn({ displayClick }) {
    const ActiveBtnStyle = {
        shadowOffset: { width: 0, height: 3 },
        shadowColor: 'black',
        shadowOpacity: 0.3,
        width: 50,
        height: 60,
        borderRadius: 30,
        backgroundColor: 'rgba(250,250,250,1)',
        position: 'absolute',
        top: deviceHeight * 0.4,
        left: 5,
        zIndex: 99,
        elevation: 100,
        // overflow: "visible",
    };
    return (
        <ImgButton
            style={ActiveBtnStyle}
            onPress={displayClick}
            imgSrc={require('app/assets/right_arrow.png')} />
    )
}
ActiveBtn.propTypes = {
    displayClick: PropTypes.any
}

function MenuList({ types, displayClick, displayStatus, changeDisplayStatus }) {
    const infoNeed = [{
            key: 'info',
            title: '資訊',
            MyIcon: ({infoNeedIconStyle})=><MaterialCommunityIcons 
                                            style={infoNeedIconStyle} 
                                            name="view-dashboard" 
                                            color={'white'} 
                                            size={24} />
        },
        {
            key: 'need',
            title: '需求',
            MyIcon: ({infoNeedIconStyle})=><FontAwesome5 
                                            style={infoNeedIconStyle} 
                                            name="hands-helping" 
                                            color={'white'} 
                                            size={20} />
    }]

    types = types.map(value => ({ 
        key: value.id, 
        title: value.typeName,
        MyIcon: ({typesIconStyle})=><Image source={typeIdToImgSrc(value.id)} style={typesIconStyle}/>
    }))

    const menuListStyle = {
        alignSelf: "center",
        alignItems: "center",
        // alignItems:"stretch"
        
        borderTopRightRadius: 30,
        borderBottomRightRadius: 30,
        justifyContent: "center",
    };
    return (
        <View style={menuListStyle}>
            <CloseBtn displayClick={displayClick} />
            {(displayStatus !== null) && infoNeed.map((value, index) =>
                <MenuBtn MyIcon={value.MyIcon} key={value.title} value={value} index={index} changeDisplayStatus={changeDisplayStatus} displayStatus={displayStatus} />)}
            <DivdeLine />
            {(displayStatus !== null) && types.map((value, index) =>
                <MenuBtn MyIcon={value.MyIcon} key={value.title} value={value} index={index} changeDisplayStatus={changeDisplayStatus} displayStatus={displayStatus} />)}
        </View>
    )
}
MenuList.propTypes = {
    changeDisplayStatus: PropTypes.any,
    displayClick: PropTypes.any,
    displayStatus: PropTypes.any,
    types: PropTypes.any
}

function MenuBtn({ MyIcon, value, index, changeDisplayStatus, displayStatus }) {
    const menuBtnStyle = {
        marginTop: (index == 0) ? 20 : 10,
        marginBottom: 10,
        height: deviceHeight * 0.06,
        width: deviceWidth * 0.4,
        minWidth: 100,
        marginHorizontal: 20,
        backgroundColor: (displayStatus[value.key])
            ? 'rgba(52, 152, 152, 0.7)'
            : 'rgba(102, 102, 102, 0.7)',
        flexDirection: 'row',
        justifyContent: "center",
        alignItems:'center',
        zIndex: 99,
    };
    const menuBtnTextStyle = {
        textAlign: "center",
        color: 'white',
        fontSize: deviceHeight * 0.03,
        opacity: (displayStatus[value.key]) ? 1 : 0.5
    };
   
    // Style for the MyIcon in Type
    const typesIconStyle = { 
        height: 20,
        width: 20,
        marginHorizontal:10,
        opacity: (displayStatus[value.key]) ? 1 : 0.5
    };

    // Style for the MyIcon in InfoNeed
    const infoNeedIconStyle = { 
        opacity: (displayStatus[value.key]) ? 1 : 0.5
    };

    return (
        <TouchableOpacity
            key={value.title}
            style={menuBtnStyle}
            onPress={() => changeDisplayStatus(value.key)}>
            <MyIcon typesIconStyle={typesIconStyle} infoNeedIconStyle={infoNeedIconStyle}/>
            <Text style={menuBtnTextStyle}>{value.title}</Text>
        </TouchableOpacity>
    )
}
MenuBtn.propTypes = {
    changeDisplayStatus: PropTypes.func,
    displayStatus: PropTypes.any,
    index: PropTypes.number,
    value: PropTypes.shape({
        key: PropTypes.any,
        title: PropTypes.any
    })
}

// 關Menu按鈕
function CloseBtn({ displayClick }) {
    const closeBtnStyle = {
        width: 50,
        height: 60,
        borderRadius: 30,
        shadowOffset: { width: 1, height: 1 },
        shadowColor: 'black',
        shadowOpacity: 0.4,
        backgroundColor: 'rgba(250,250,250,0.85)',
        position: 'absolute',
        top: deviceHeight * 0.35,
        right: -20,
        zIndex: 999,
    };
    return (
        <ImgButton
            style={closeBtnStyle}
            onPress={displayClick}
            imgSrc={require('app/assets/left_arrow.png')} />
    )
}
CloseBtn.propTypes = {
    displayClick: PropTypes.any
}
