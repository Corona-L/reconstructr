import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Audio } from 'expo-av';

export default function Playback({ audiourl }) {
  const [sound, setSound] = useState();
  const [isPlaying, setIsPlaying] = useState(false);

  // TODO: make actual audio url work.
  // const source = audiourl;

  async function toggleSound() {
    try {
      if (!isPlaying) {
        setIsPlaying(true);
        const { sound } = await Audio.Sound.createAsync(require('../assets/Kalimba.mp3'));
        // const { sound } = await Audio.Sound.createAsync(source, initialStatus = {}, downloadFirst = false);
        setSound(sound);
        await sound.playAsync();
      } else {
        setIsPlaying(false);
        sound.pauseAsync();
      }
    } catch (error) {
      console.log(error);
      Alert.alert('Something went wrong');
    }
  }

  React.useEffect(() => {
    return sound
      ? () => {
        console.log('Unloading Sound');
        sound.unloadAsync();
      }
      : undefined;
  }, [sound]);


  return (
    <View style={styles.controls}>
      <TouchableOpacity style={styles.control} onPress={toggleSound}>
        {isPlaying ? (
          <Ionicons name='ios-pause' size={40} color='#444' />
        ) : (
          <Ionicons name='ios-play-circle' size={40} color='#444' />
        )}
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    backgroundColor: '#ecf0f1',
    padding: 10,
  },
  controls: {
    marginLeft: '30%',
    width: '40%',
    borderRadius: 5,
    height: '8%',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    backgroundColor: '#fff',
    marginBottom: '5%',
  },
  control: {
    margin: 17,
  }
});
