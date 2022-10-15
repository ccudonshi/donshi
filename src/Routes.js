/* eslint-disable no-unused-vars */

import React from 'react'
import { Router, Scene } from 'react-native-router-flux'
import { createStackNavigator } from '@react-navigation/stack';
import { AddPostScreen, EditPostScreen } from './screens/addOrEditPost/'
import InfoScreen from './screens/InfoScreen'
import SettingsScreen from './screens/SettingsScreen'
import PostItem from "./component/PostItem"
import ChooseTopicBox from './component/ChooseTopicBox'
import LoginScreen from './screens/login/'
import Navigation from './screens/Navigation'
import PositionView from './screens/addOrEditPost/PositionView'
import ImageBrowserScreen from './screens/ImageBrowserScreen'
import RegisterScreen from './screens/register/'
import QueryScreen from './screens/QueryScreen'


// 這個App的path
const _Routes = ({ isLoginInitailRoute }) => {
   return (
   <Router>
      <Scene key="root">

         <Scene
            key="login"
            component={LoginScreen}
            hideNavBar={true}
            initial={isLoginInitailRoute} />
         <Scene
            key="home"
            component={Navigation}
            title="Home"
            hideNavBar={true}
            initial={!isLoginInitailRoute} />
        
         <Scene 
            key="query"
            component={QueryScreen}
            hideNavBar={true}
            initial={false}/>
         <Scene
            key="imgBrowser"
            component={ImageBrowserScreen}
            hideNavBar={true}
            initial={false}
         />
         <Scene
            key="position"
            component={PositionView}
            hideNavBar={true}
            initial={false}
         />
         <Scene
            key="post"
            hideNavBar={true}
            component={AddPostScreen}
            initial={false} />
         <Scene
            key="editPost"
            hideNavBar={true}
            component={EditPostScreen}
            initial={false} />

         <Scene
            key="info"
            hideNavBar={true}
            component={InfoScreen}
            initial={false}
         />
         <Scene
            key="settings"
            hideNavBar={true}
            component={SettingsScreen}
            initial={false} />
         <Scene
            key="postItem"
            hideNavBar={true}
            component={PostItem}
            initial={false} />
         <Scene
            key="ChooseTopic"
            hideNavBar={true}
            component={ChooseTopicBox}
            initial={false} />
         <Scene
            key="register"
            hideNavBar={true}
            component={RegisterScreen}
            initial={false} />


      </Scene>
   </Router>
)}

const RouteStack = createStackNavigator();

const Routes = ({ isLoginInitailRoute }) => {
   return (
      <RouteStack.Navigator
         screenOptions={{
            headerShown: false,
         }}
      >
         {
            isLoginInitailRoute ? (
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