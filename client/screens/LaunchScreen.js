
import React from 'react';
import {
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  Text
} from 'react-native';


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#041E34',
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: 600,
    height: 600,
    resizeMode: 'contain'
  },
  button: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 50,
    width: 180,
    borderRadius: 15,
    marginBottom: 20,
    backgroundColor: '#3C53B0',
  },
  buttonText: {
    fontWeight: 'bold',
    color: 'white',
  }
});

export default function LaunchScreen ({navigation}) {
  return (
    <View style={styles.container}>
      <Image source={require('../assets/reconstructr-logo-static.png')} style={styles.image} />
      <TouchableOpacity style={styles.button} onPress={() => navigation.reset({index:0, routes:[{name:'Home'}]})}>
        <Text style={styles.buttonText}> Create </Text>
      </TouchableOpacity>
    </View>
  );
}