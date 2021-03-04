import 'react-native-gesture-handler';
import React from 'react';
// import { StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import AddNewFolder from './screens/AddNewFolderModal';
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
        <RootStack.Screen
          name="AddNewFolder"
          component={AddNewFolder}
          options={{
            title: 'Create a folder',
            headerStyle: { backgroundColor: '#041E34' },
            headerTintColor: '#FFDE59',
            headerTitleStyle: { fontWeight: 'bold', alignSelf: 'center' },
          }}
        />
      </RootStack.Navigator>
    </NavigationContainer>
  );
}

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#041E34',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
// });
