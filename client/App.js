import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import MainStackScreen from './screens/MainStackScreen';
import {GlobalProvider} from './store/GlobalState';

const RootStack = createStackNavigator();


export default function App () {
  return (
    <GlobalProvider>
      <NavigationContainer>
        <RootStack.Navigator mode='modal' >
          <RootStack.Screen
            name='Main'
            component={MainStackScreen}
            options={{ headerShown: false }}
          />
        </RootStack.Navigator>
      </NavigationContainer>
    </GlobalProvider>
  );
}
