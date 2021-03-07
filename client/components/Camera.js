import React, { useState, useEffect, useRef, useContext } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, TextInput, Alert } from 'react-native';
import { Camera } from 'expo-camera';
import { GlobalContext } from '../store/GlobalState';
import { ModalContext } from '../store/ModalState';

export default function UseCamera ({id}) {
  // reducer function to change global state
  const { addNewStep } = useContext(GlobalContext);
  const { toggleModal } = useContext(ModalContext);

  const cameraRef = useRef();
  const [hasPermission, setHasPermission] = useState(null);
  const [, setIsPreview] = useState(false);
  const [textInput, setTextInput] = useState('');
  const [imageUri, setSourceUrl] = useState(null);

  const addStep = () => {
    if (!imageUri) return Alert.alert('Please add a picture');
    addNewStep(textInput, imageUri, id);
    setTextInput('');
    setSourceUrl(null);
    toggleModal();
  };

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
    if (imageUri) return Alert.alert('Please delete current picture before taking another one');
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

  const cancelPreview = async () => {
    await cameraRef.current.resumePreview();
    setIsPreview(false);
    setSourceUrl(null);
  };

  return (
    <View style={styles.container}>
      <Camera style={styles.camera} type={Camera.Constants.Type.back} ref = {cameraRef} />
      <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
        <TouchableOpacity
          style={styles.button}
          onPress={takePicture}>
          <Text style={styles.buttonText}>Take picture</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.button}
          onPress={cancelPreview}>
          <Text style={styles.buttonText}>
            Delete
          </Text>
        </TouchableOpacity>
      </View>


      <View>
        <TextInput multiline={true} maxLength={400} placeholder="Add a Description"
          value={textInput} style={styles.textInput}
          onChangeText={(value) => {setTextInput(value);}} />
        <TouchableOpacity style={styles.SubmitButton} onPress={addStep} >
          <Text style={styles.buttonText}>Add new</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  button: {
    marginTop: 20,
    marginBottom: 30,
    width: 130,
    borderRadius: 4,
    backgroundColor: '#14274e',
    justifyContent: 'center',
    alignItems: 'center',
    height: 40
  },
  SubmitButton: {
    height: 50,
    width: 200,
    alignSelf: 'center',
    marginTop: 20,
    marginBottom: 30,
    borderRadius: 4,
    backgroundColor: '#14274e',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
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