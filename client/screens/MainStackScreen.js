import 'react-native-gesture-handler';
import React from 'react';
// import { StyleSheet } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import Home from './Home';
import ProjectFolder from './ProjectFolder';
import LaunchScreen from './LaunchScreen';

const MainStack = createStackNavigator();
const options = {
  headerStyle: { backgroundColor: '#041E34' },
  headerTintColor: '#FFDE59',
  headerTitleStyle: { fontWeight: 'bold', alignSelf: 'center' },
};

export default function MainStackScreen () {
  return (
    <MainStack.Navigator>
      <MainStack.Screen name="Welcome" component={LaunchScreen} options={options} />
      <MainStack.Screen name="Home" component={Home} options={{...options, title: 'My Projects'}} />
      <MainStack.Screen name="ProjectFolder" component={ProjectFolder} options={{...options, title: 'Honda'}} />
    </MainStack.Navigator>
  );
}