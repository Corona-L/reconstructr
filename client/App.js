import 'react-native-gesture-handler';
import React from 'react';
import { LogBox } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import * as firebase from 'firebase';
import 'firebase/auth';
import 'firebase/storage';
import 'firebase/firestore';
import apiKeys from './config/keys';

import MainStackScreen from './screens/MainStackScreen';
import { GlobalProvider } from './store/GlobalState';
import { ModalProvider } from './store/ModalState';

const RootStack = createStackNavigator();


LogBox.ignoreLogs(['Setting a timer for a long period of time']);

export default function App () {

  if (!firebase.apps.length) {
    console.log('Connected with Firebase');
    firebase.initializeApp(apiKeys.firebaseConfig);
  }
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
