// // @refresh reset
import 'react-native-gesture-handler';
import React from 'react';
import { LogBox } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
// Firebase
import * as firebase from 'firebase';
import 'firebase/storage';
import apiKeys from './config/keys';

import MainStackScreen from './screens/MainStackScreen';
import { GlobalProvider } from './store/GlobalState';
import { ModalProvider } from './store/ModalState';

const RootStack = createStackNavigator();

// Initialize Firebase
if (!firebase.apps.length) {
  console.log('Connected with Firebase');
  firebase.initializeApp(apiKeys.firebaseConfig);
}

LogBox.ignoreLogs(['Setting a timer for a long period of time']);

export default function App () {
  return (
    <GlobalProvider>
      <ModalProvider>
        <NavigationContainer>
          <RootStack.Navigator mode='modal' >
            <RootStack.Screen
              name='Main'
              component={MainStackScreen}
              options={{ headerShown: false }}
            />
          </RootStack.Navigator>
        </NavigationContainer>
      </ModalProvider>
    </GlobalProvider>
  );
}
