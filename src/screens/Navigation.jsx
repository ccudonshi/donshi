import * as React from 'react';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
// import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { MaterialCommunityIcons, FontAwesome5} from '@expo/vector-icons';

import GoogleMapScreen from './map/GoogleMapScreen'
import ProfileScreen from './profile/'
import InfoNeedPostType from './InfoNeedPostType'
import { Text } from 'react-native-paper';


const Tab = createMaterialBottomTabNavigator();
// 主頁面
export default function Navigation() {
    const Info = (props) => (<InfoNeedPostType {...props} isNeed={false}></InfoNeedPostType>)
    const Need = (props) => (<InfoNeedPostType {...props} isNeed={true}></InfoNeedPostType>)

    return (
        <Tab.Navigator
            initialRouteName="InfoScreen"
            activeColor="#fff"
        >
            

            <Tab.Screen
                name="infoScreen"
                component={Info}
                options={{
                    tabBarLabel: <Text style={{ color: 'white', fontSize: 16, fontWeight: 'bold' }}>資訊</Text>,
                    tabBarColor:'#009387',
                    tabBarIcon: ({ color }) => (
                        <MaterialCommunityIcons name="view-dashboard" color={color} size={24} />
                    ),
                }}
            />

            <Tab.Screen
                name="needScreen"
                component={Need}
                options={{
                    tabBarLabel: <Text style={{ color: 'white', fontSize: 16, fontWeight: 'bold' }}>需求</Text>,
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
                    tabBarLabel: <Text style={{ color: 'white', fontSize: 16, fontWeight: 'bold' }}>個人頁面</Text>,
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
                    tabBarLabel: <Text style={{ color: 'white', fontSize: 16, fontWeight: 'bold' }}>地圖</Text>,
                    tabBarColor:'#0066CC',
                    tabBarIcon: ({ color }) => (
                        <MaterialCommunityIcons name="map-marker" color={color} size={26} />
                    ),
                }}
            />
        </Tab.Navigator>
    );
}