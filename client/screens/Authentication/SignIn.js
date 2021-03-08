import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, Alert } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import {signIn} from '../../API/Auth';

export default function SignIn () {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handlePress = () => {
    if (!email) {
      Alert.alert('Email field is required.');
    }

    if (!password) {
      Alert.alert('Password field is required.');
    }

    signIn(email, password);
    setEmail('');
    setPassword('');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Sign in to your account:</Text>

      <TextInput
        style={styles.formInput}
        placeholder='Enter your email'
        placeholderTextColor='grey'
        value={email}
        onChangeText={(email) => setEmail(email)}
        autoCapitalize="none"
      />
      <TextInput
        style={styles.formInput}
        placeholder='Enter your password'
        placeholderTextColor='grey'
        value={password}
        onChangeText={(password) => setPassword(password)}
        secureTextEntry={true}
      />

      <TouchableOpacity style={styles.button} onPress={handlePress}>
        <Text style={styles.buttonText}>Submit</Text>
      </TouchableOpacity>

    </View>
  );
}

const styles = StyleSheet.create({
  button: {
    width: 200,
    padding: 5,
    backgroundColor: '#FFDE59',
    borderWidth: 2,
    borderColor: 'white',
    borderRadius: 15,
    alignSelf: 'center',
    margin: '2%',
  },
  buttonText: {
    fontSize:20,
    color: 'black',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  container: {
    height: '100%',
    width: '100%',
    backgroundColor: '#041E34',
    alignItems: 'center',
    justifyContent: 'center',
  },
  formInput: {
    width: 300,
    color: 'white',
    fontSize:18,
    borderWidth: 1,
    borderColor:'#FFDE59',
    padding: 10,
    margin: 5,
  },
  text: {
    textAlign: 'center',
    fontSize: 20,
    margin: 10,
    fontWeight: 'bold',
    color: '#FFDE59',
  }
});