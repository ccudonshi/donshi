import React, { useEffect, useState, useRef } from 'react'
import { Asset } from 'expo-asset';
import { Animated, Dimensions, View } from 'react-native'
import MapView from "react-native-map-clustering";
import { PROVIDER_GOOGLE } from 'react-native-maps'; // remove PROVIDER_GOOGLE import if not using Google Maps
import PostMarker from '../../component/PostMarker'
import { typeIdToImgSrc } from '../../helper/helper'
import { mapStyles } from './styles'
import { Actions } from 'react-native-router-flux';
import { BackToInitBtn } from "../../component/BackToInitBtn";
import PostsModal from '../../component/PostsModal'
import PostItem from "../../component/PostItem";

const { width, height } = Dimensions.get('window');
const ASPECT_RATIO = width / height;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

function useFetchImgs() {
    const [response, setResponse] = useState(null)
    const [hasError, setHasError] = useState(false)
    useEffect(() => {
        console.log('preFetchImage')
        const preFecthImage = Asset.loadAsync([
            require('app/assets/first_menu_food.png'),
            require('app/assets/first_menu_cloth.png'),
            require('app/assets/first_menu_home.png'),
            require('app/assets/first_menu_transportation.png'),
            require('app/assets/first_menu_education.png'),
            require('app/assets/first_menu_entertainment.png'),
            require('app/assets/first_menu_health.png'),
            require('app/assets/first_menu_health.png')
        ])
        preFecthImage.then(res => { console.log("finish fetchImage"); console.log(res); setResponse(res) })
            .catch(error => { console.warn(error); setHasError(error) })
    }, [])
    return [response, hasError]
}

export default function Map({ animateTranform, displayData, isSideBarDisplay, displayClick }) {
    // eslint-disable-next-line no-unused-vars
    const [response, loading, hasError] = useFetchImgs() // 預先抓取一些圖片
    const [clickedPost, setClickedPost] = useState(null)

    useEffect(() => { setClickedPost(null) }, [displayData])
    // console.log(mapRef.current)
    const onMoveToMarker = (latlng) => { // 點到有點暈XD 先拿掉
        // mapRef.current.animateToRegion({
        //     ...latlng,
        //     latitudeDelta: LATITUDE_DELTA*0.05,
        //     longitudeDelta: LONGITUDE_DELTA*0.05,
        // }, 500)
    }


    const onMapPress = (e) => {
        if ("action" in e.nativeEvent && e.nativeEvent.action === 'marker-press') return;
        return setClickedPost(null)
    }
    const initalRegion = {
        latitude: 23.470934,
        longitude: 120.1788755,
        latitudeDelta: LATITUDE_DELTA,
        longitudeDelta: LONGITUDE_DELTA,
    };
    const mapRef = useRef(null)
    const mapConfig = {
        provider: PROVIDER_GOOGLE, // remove if not using Google Maps
        initialRegion: initalRegion,
        showsUserLocation: true,
        followUserLocation: true,
        showsMyLocationButton: true,
        enableZoomControl: true,

        zoomEnabled: !isSideBarDisplay,
        rotateEnabled: !isSideBarDisplay,
        scrollEnabled: !isSideBarDisplay,
        zoomTapEnabled: !isSideBarDisplay, // ios only
        zoomControlEnabled: !isSideBarDisplay, // android only
        onClusterPressEnabled: !isSideBarDisplay, // 我在套件上自己加了這個，讓cluster在menu呈現時不能點選
        onPress: (isSideBarDisplay) ? displayClick : onMapPress,
    }

    return (
        <Animated.View style={{ ...animateTranform, ...mapStyles.map }} duration={2000}>
            {(!isSideBarDisplay) &&
                <BackToInitBtn mapRef={mapRef} initalRegion={initalRegion} />
            }

            <MapView ref={mapRef} style={mapStyles.map} {...mapConfig} >
                {
                    displayData.map(
                        post =>
                            <PostMarker
                                key={post.getId()}
                                onMoveToMarker={onMoveToMarker}
                                setClickedPost={() => setClickedPost(post)}
                                coordinate={{
                                    latitude: post.getLatitude(),
                                    longitude: post.getLongitude(),
                                }}
                                title={post.getTitle()}
                                description={post.getText()}
                                imageSrc={typeIdToImgSrc(post.getType().id)} />
                    )
                }
            </MapView>
            {(clickedPost) && <View style={{ marginTop: 20, height: "40%" }}>
                <PostItem post={clickedPost} />
            </View>}

        </Animated.View>
    )
}
