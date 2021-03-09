import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Audio } from 'expo-av';

export default function Playback ({ audiourl }) {
  const [sound, setSound] = useState();
  const [isPlaying, setIsPlaying] = useState(false);
  console.log(audiourl);
  //  need to get audio from firebase
  const source = audiourl;

  async function toggleSound () {
    if (!isPlaying) {
      setIsPlaying(true);
      // need to get sound link from firebase
      // const { sound } = await Audio.Sound.createAsync(require('../assets/Kalimba.mp3'));
      const { sound } = await Audio.Sound.createAsync(source);
      setSound(sound);
      await sound.playAsync();
    } else {
      setIsPlaying(false);
      sound.pauseAsync();
    }
  }

  React.useEffect(() => {
    return sound
      ? () => {
        console.log('Unloading Sound');
        sound.unloadAsync(); }
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
    // flex: 1,
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
    // opacity: 0.5,

  },
  control: {
    margin: 17,

  }
});
