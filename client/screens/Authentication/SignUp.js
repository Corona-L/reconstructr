import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Alert,
  ScrollView,
  Keyboard,
  StyleSheet,
  SafeAreaView
} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { registration } from '../../API/DatabaseMethods.js';

export default function SignUp({ navigation }) {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const emptyState = () => {
    setFirstName('');
    setLastName('');
    setEmail('');
    setPassword('');
    setConfirmPassword('');
  };

  const handlePress = async () => {
    if (!firstName) {
      Alert.alert('First name is required');
    } else if (!email) {
      Alert.alert('Email field is required.');
    } else if (!password) {
      Alert.alert('Password field is required.');
    } else if (!confirmPassword) {
      setPassword('');
      Alert.alert('Confirm password field is required.');
    } else if (password !== confirmPassword) {
      Alert.alert('Password does not match!');
    } else {
      const newUser = await registration({ firstName, lastName, email, password });
      if (newUser === undefined) return Alert.alert('Something went wrong. Please try again');
      const id = newUser.id;
      navigation.navigate('Home', { id });
      emptyState();
    }
  };

  return (
    <SafeAreaView>
      <View style={styles.container}>
        <Text style={styles.text}>Create an account </Text>

        <ScrollView onBlur={Keyboard.dismiss}>
          <TextInput
            style={styles.textInput}
            placeholder="First name*"
            placeholderTextColor='grey'
            value={firstName}
            onChangeText={(name) => setFirstName(name)}
          />
          <TextInput
            style={styles.textInput}
            placeholder="Last name"
            placeholderTextColor='grey'
            value={lastName}
            onChangeText={(name) => setLastName(name)}
          />

          <TextInput
            style={styles.textInput}
            placeholder="Enter your email*"
            placeholderTextColor='grey'
            value={email}
            onChangeText={(email) => setEmail(email)}
            keyboardType="email-address"
            autoCapitalize="none"
          />

          <TextInput
            style={styles.textInput}
            placeholder="Enter your password*"
            placeholderTextColor='grey'
            value={password}
            onChangeText={(password) => setPassword(password)}
            secureTextEntry={true}
          />
          <TextInput
            style={styles.textInput}
            placeholder="Retype your password to confirm*"
            placeholderTextColor='grey'
            value={confirmPassword}
            onChangeText={(password2) => setConfirmPassword(password2)}
            secureTextEntry={true}
          />
          <TouchableOpacity style={styles.button} onPress={handlePress}>
            <Text style={styles.buttonText}>Sign Up</Text>
          </TouchableOpacity>

          <Text style={styles.inlineText}>Already have an account?</Text>
          <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Sign In')}>
            <Text style={styles.buttonText}>Sign In</Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    height: '100%',
    width: '100%',
    backgroundColor: '#041E34',
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    width: 200,
    padding: 5,
    backgroundColor: '#FFDE59',
    borderWidth: 2,
    borderColor: 'white',
    borderRadius: 15,
    alignSelf: 'center',
    margin: '5%',
  },
  buttonText: {
    fontSize: 20,
    color: 'black',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  inlineText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFDE59',
    textAlign: 'center',
    marginTop: '5%',
  },
  text: {
    textAlign: 'center',
    fontSize: 25,
    margin: '5%',
    marginTop: '15%',
    fontWeight: 'bold',
    color: '#FFDE59',
  },
  textInput: {
    width: 300,
    fontSize: 18,
    borderWidth: 1,
    borderColor: '#FFDE59',
    padding: 10,
    margin: 5,
    color: 'white',
  },
});