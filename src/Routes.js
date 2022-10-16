/* eslint-disable no-unused-vars */

import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { AddPostScreen, EditPostScreen } from './screens/addOrEditPost/';
import SettingsScreen from './screens/SettingsScreen';
import LoginScreen from './screens/login/';
import Navigation from './screens/Navigation';
import PositionView from './screens/addOrEditPost/PositionView';
import ImageBrowserScreen from './screens/ImageBrowserScreen';
import RegisterScreen from './screens/register/';
import QueryScreen from './screens/QueryScreen';

const RouteStack = createStackNavigator();

const Routes = ({ isLoggedin }) => {
   return (
      <RouteStack.Navigator
         screenOptions={{
            headerShown: false,
         }}
      >
         {
            isLoggedin ? (
               <>
                  <RouteStack.Screen
                     name='Login'
                     component={LoginScreen}
                  />
                  <RouteStack.Screen
                     name='Register'
                     component={RegisterScreen}
                  />
               </>
            ) : (
               <>
                  <RouteStack.Screen
                     name='Home'
                     component={Navigation}
                  />
                  <RouteStack.Screen
                     name='Settings'
                     component={SettingsScreen}
                  />
                  <RouteStack.Screen
                     name='EditPost'
                     component={EditPostScreen}
                  />
                  <RouteStack.Screen
                     name='AddPost'
                     component={AddPostScreen}
                  />
                  <RouteStack.Screen
                     name='Position'
                     component={PositionView}
                  />
                  <RouteStack.Screen
                     name='ImgBrowser'
                     component={ImageBrowserScreen}
                  />
                  <RouteStack.Screen
                     name='Query'
                     component={QueryScreen}
                  />
               </>
            )
         }
      </RouteStack.Navigator>
   );
};

export default Routes;