import React, { useState, useContext } from 'react';
import { View, StyleSheet, Button, TouchableOpacity } from 'react-native';
import { Audio } from 'expo-av';
import { Ionicons } from '@expo/vector-icons';
import { Fontisto } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import {GlobalContext} from '../store/GlobalState';

export default function Recorder ({id}) {
  const {saveRecording} = useContext(GlobalContext);
  const [recording, setRecording] = useState();
  const [recordingUri, setRecordingUri] = useState(null);

  async function startRecording () {
    try {
      console.log('Requesting permissions..');
      await Audio.requestPermissionsAsync();
      await Audio.setAudioModeAsync({
        allowsRecordingIOS: true,
        playsInSilentModeIOS: true,
      });
      console.log('Starting recording..');
      const recording = new Audio.Recording();
      await recording.prepareToRecordAsync(Audio.RECORDING_OPTIONS_PRESET_HIGH_QUALITY);
      await recording.startAsync();
      setRecording(recording);
      console.log('Recording started');
    } catch (err) {
      console.error('Failed to start recording', err);
    }
  }

  async function stopRecording () {
    console.log('Stopping recording..');
    setRecording(undefined);
    await recording.stopAndUnloadAsync();
    const uri = recording.getURI();
    setRecordingUri(uri);
  }

  const saveAudio = () => {
    saveRecording(recordingUri, id);
    setRecordingUri(null);
  };

  const deleteCurrentAudio = () => {
    setRecording(undefined);
    setRecordingUri(null);
  };

  return (
    <View style={styles.controls}>
      <TouchableOpacity style={styles.control} onPress={() => !recording ? startRecording() : stopRecording()}>
        {!recording ? (
          <Fontisto name="record" size={30} color="red" />

        ) : (
          <Ionicons name='pause-circle' size={45} color='#444' />
        )}
      </TouchableOpacity>
      <TouchableOpacity style={styles.control} onPress={saveAudio}>
        <MaterialCommunityIcons name="content-save-move" size={35} color="#444" />
      </TouchableOpacity>
      <TouchableOpacity style={styles.control} onPress={deleteCurrentAudio}>
        <Ionicons name='trash-outline' size={35} color='#444' />
      </TouchableOpacity>
    </View>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#ecf0f1',
    padding: 10,
  },
  controls: {
    marginLeft: '15%',
    width: '70%',
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
