import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, TextInput } from 'react-native';
import { Camera } from 'expo-camera';

export default function UseCamera ({addNewStep}) {
  const [hasPermission, setHasPermission] = useState(null);
  const [textInput, setTextInput] = useState('');
  const [isPreview, setIsPreview] = useState(false);
  const [sourceUrl, setSourceUrl] = useState();
  const cameraRef = useRef();

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  const takePicture = async () => {
    if (cameraRef.current) {
      const options = { quality: 0.5, base64: true, skipProcessing: true };
      const data = await cameraRef.current.takePictureAsync(options);
      const source = data.uri;
      if (source) {
        await cameraRef.current.pausePreview();
        setIsPreview(true);
        setSourceUrl(source);
      }
    }
  };

  // textInput, url
  return (
    <View>
      <Camera style={styles.camera} type={Camera.Constants.Type.back} ref = {cameraRef} >
      </Camera>
      <TouchableOpacity
        style={styles.button}
        onPress={takePicture}>
        <Text style={styles.buttonText}>
          Take picture
        </Text>
      </TouchableOpacity>
      <TextInput multiline={true} maxLength={400} placeholder="Add a Description"
        value={textInput} style={styles.textInput}
        onChangeText={(value) => setTextInput(value)} />
      <TouchableOpacity style={styles.button} onPress={() => console.log(addNewStep(textInput, sourceUrl))}>
        <Text style={styles.buttonText}>
          Add new
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingLeft: 10,
  },
  button: {
    marginTop: 20,
    width: 130,
    borderRadius: 4,
    backgroundColor: '#14274e',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    height: 40
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center'
  },
  camera: {
    height: '70%',
    width: '100%'
  },
  textInput: {
    width: 300,
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderColor: 'rgba(0, 0, 0, 0.2)',
    borderWidth: 1,
    backgroundColor: 'white'
  },
});

// button: {
//   width: 130,
//   borderRadius: 4,
//   backgroundColor: '#14274e',
//   flexDirection: 'row',
//   justifyContent: 'center',
//   alignItems: 'center',
//   height: 40,
// },