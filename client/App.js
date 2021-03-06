import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import MainStackScreen from './screens/MainStackScreen';
import { GlobalProvider } from './store/GlobalState';
import { ModalProvider } from './store/ModalState';

const RootStack = createStackNavigator();


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
