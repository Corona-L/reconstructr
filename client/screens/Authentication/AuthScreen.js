import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

export default function AuthScreen({ navigation }) {
  return (
    <View style={styles.background}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>Welcome to RE:constructR</Text>
      </View>
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Sign Up')} >
        <Text style={styles.buttonText}>Sign Up</Text>
      </TouchableOpacity>
      <Text style={styles.inlineText}>Already have an account?</Text>
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Sign In')}>
        <Text style={styles.buttonText}>Sign In</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#041E34',
  },
  button: {
    width: 200,
    borderRadius: 15,
    borderWidth: 3,
    borderColor: 'white',
    backgroundColor: '#FFDE59',
    padding: 5,
    margin: '2%'
  },
  buttonText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'black',
    textAlign: 'center'
  },
  inlineText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFDE59',
    textAlign: 'center',
    marginTop: '5%',
  },
  title: {
    fontSize: 35,
    fontWeight: 'bold',
    color: '#FFDE59',
    textAlign: 'center'
  },
  titleContainer: {
    position: 'absolute',
    top: 170,
  },
});