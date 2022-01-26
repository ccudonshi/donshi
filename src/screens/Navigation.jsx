import * as React from 'react';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
// import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { NavigationContainer } from '@react-navigation/native';
import { Ionicons, MaterialIcons, AntDesign , MaterialCommunityIcons, FontAwesome5} from '@expo/vector-icons';

import GoogleMapScreen from './map/GoogleMapScreen'
import ProfileScreen from './profile/'
import InfoNeedPostType from './InfoNeedPostType'


const Tab = createMaterialBottomTabNavigator();
// 主頁面
export default function Navigation({refresh}) {
    const info = ({route}) => (<InfoNeedPostType route={route} isNeed={false}></InfoNeedPostType>)
    const need = ({route}) => (<InfoNeedPostType route={route} isNeed={true}></InfoNeedPostType>)
    const navigationRef = React.useRef(null);
    const route = navigationRef.current?.getCurrentRoute();
    React.useEffect(() => {
        if(refresh == undefined || refresh == false)return;  //first time
        console.log('refresh')
        console.log(refresh)
        console.log(route)
        navigationRef.current?.navigate(route.name,{refresh:{}})
    }, [refresh])
    return (
        <NavigationContainer ref={navigationRef}>
            <Tab.Navigator
                initialRouteName="InfoScreen"
                activeColor="#fff"
                // inactiveColor="#4F4F4F"
            >
                

                <Tab.Screen
                    name="infoScreen"
                    component={info}
                    options={{
                        tabBarLabel: '資訊',
                        tabBarColor:'#009387',
                        tabBarIcon: ({ color }) => (
                            <MaterialCommunityIcons name="view-dashboard" color={color} size={24} />
                        ),
                    }}
                />

                <Tab.Screen
                    name="needScreen"
                    component={need}
                    options={{
                        tabBarLabel: '需求',
                        tabBarColor:'#cd5c5c',
                        tabBarIcon: ({ color }) => (
                            <FontAwesome5 name="hands-helping" color={color} size={20} />
                        ),
                    }}
                />

                <Tab.Screen
                    name="profile"
                    component={ProfileScreen}
                    options={{
                        tabBarLabel: '個人頁面',
                        tabBarColor:'#FFA042',
                        tabBarIcon: ({ color }) => (
                            <MaterialCommunityIcons name="account" color={color} size={26} />
                        ),
                    }}
                />

                <Tab.Screen
                    name="map"
                    component={GoogleMapScreen}
                    options={{
                        tabBarLabel: '地圖',
                        tabBarColor:'#0066CC',
                        tabBarIcon: ({ color }) => (
                            <MaterialCommunityIcons name="map-marker" color={color} size={26} />
                        ),
                    }}
                />

                

            </Tab.Navigator>
        </NavigationContainer>
            
           
    );
}