import 'react-native-gesture-handler';
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Home from './Home';
import ProjectFolder from './ProjectFolder';
import Loading from './LaunchScreen';
import AuthScreen from './Authentication/AuthScreen';
import SignUp from './Authentication/SignUp';
import SignIn from './Authentication/SignIn';
import StepDetail from './StepDetail';

// TODO: FIX. header title is not in the center
const MainStack = createStackNavigator();
const options = {
  headerStyle: { backgroundColor: '#041E34' },
  headerTintColor: '#FFDE59',
  headerTitleStyle: { fontWeight: 'bold', alignSelf: 'center' },
};

export default function MainStackScreen () {
  return (
    <MainStack.Navigator>
      <MainStack.Screen name="Welcome" component={Loading} options={options} />
      <MainStack.Screen name="Start" component={AuthScreen} options={{ headerShown: false }} />
      <MainStack.Screen name='Sign Up' component={SignUp} options={{ headerShown: false }}/>
      <MainStack.Screen name='Sign In' component={SignIn} options={{ headerShown: false }}/>
      <MainStack.Screen name="Home" component={Home} options={{...options, title: 'My Projects'}} />
      <MainStack.Screen name="ProjectFolder" component={ProjectFolder} options={{...options, title: 'Overview'}} />
      <MainStack.Screen name="StepDetail" component={StepDetail} options={{...options, title: 'Details'}} />
    </MainStack.Navigator>
  );
}