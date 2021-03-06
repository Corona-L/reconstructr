import React from 'react';
import {
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  Text,
  ActivityIndicator
} from 'react-native';



export default function Loading({ navigation }) {
  return (
    <View style={styles.container}>
      <Image source={require('../assets/images/reconstructR.gif')} style={styles.image} />
      <ActivityIndicator size='large' />
      <TouchableOpacity style={styles.button} onPress={() => navigation.reset({ index: 0, routes: [{ name: 'Start' }] })}>
        <Text style={styles.buttonText}> Create </Text>
      </TouchableOpacity>
    </View>
  );
}

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
    backgroundColor: '#FFDE59',
  },
  buttonText: {
    fontWeight: 'bold',
    color: 'black',
  }
});