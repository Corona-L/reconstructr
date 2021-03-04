import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import MainStackScreen from './screens/MainStackScreen';

const RootStack = createStackNavigator();

export default function App () {
  return (
    <NavigationContainer>
      <RootStack.Navigator mode='modal' >
        <RootStack.Screen
          name='Main'
          component={MainStackScreen}
          options={{ headerShown: false }}
        />
      </RootStack.Navigator>
    </NavigationContainer>
  );
}
