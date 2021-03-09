import React, { useState, useEffect, useContext } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, TextInput, Image, Dimensions} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { ModalContext } from '../store/ModalState';
import Recorder from '../components/Recorder';
import { uploadImage, uploadAudio } from '../API/StorageMethods';
import { addStep } from '../API/DatabaseMethods';


export default function UseCamera ({projectId, title, setAllSteps}) {
  // save your image here first
  const [imageUri, setImageUri] = useState(null);
  const [audioUri, setAudioUri] = useState(null);
  const [description, setDescription] = useState('');

  const { toggleModal } = useContext(ModalContext);

  useEffect(() => {
    (async () => {
      if (Platform.OS !== 'web') {
        const { status } = await ImagePicker.requestCameraPermissionsAsync();
        if (status !== 'granted') {
          alert('Sorry, we need camera  permissions to make this work!');
        }
      }
    })();
  }, []);

  const addSteptoDB = async () => {
    const imageurl = await uploadImage(imageUri, title, projectId);
    const audiourl = await uploadAudio(audioUri, title);
    const stepnum = 6;
    const result = await addStep({projectId, stepnum, imageurl, audiourl, description});
    console.log(result);
    setAllSteps(oldSteps => [...oldSteps, result]);
    setDescription('');
    setImageUri(null);
    setAudioUri(null);
    toggleModal();
  };

  const takePicture = async () => {
    let result = await ImagePicker.launchCameraAsync({
      base64: false,
      quality: 0.5,
    });
    if (!result.cancelled) {
      setImageUri(result.uri);
    }
  };

  const saveAudio = (uri) => {
    setAudioUri(uri);
  };

  return (
    <View style={styles.container}>
      <View>
        {!imageUri && <TouchableOpacity
          style={styles.button}
          onPress={takePicture} >
          <Text style={styles.buttonText}>Add an image</Text>
        </TouchableOpacity>}
        {imageUri && <Image source={{ uri: imageUri }} style={styles.image} />}
      </View>
      <View>
        {imageUri &&
        <View>
          <Text style={styles.text} >Save a voice note</Text>
          <Recorder saveAudio={saveAudio} />
          <TextInput multiline={true} maxLength={400} placeholder="Add a Description"
            value={description} style={styles.textInput}
            onChangeText={(value) => {setDescription(value);}} />
          <TouchableOpacity style={styles.button} onPress={addSteptoDB} >
            <Text style={styles.buttonText}>Save next step</Text>
          </TouchableOpacity>
        </View>
        }
      </View>
    </View>
  );
}
const { height } = Dimensions.get('window');
const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    marginBottom: '5%'
  },
  button: {
    justifyContent: 'center',
    height: 60,
    width: 300,
    padding: 17,
    borderRadius: 15,
    marginTop: '40%',

    backgroundColor: '#FFDE59',
  },
  buttonText: {
    fontWeight: 'bold',
    color: '#342F1E',
    textAlign: 'center'
  },
  textInput: {
    borderRadius: 3,
    width: '100%',
    height: '20%',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderColor: 'black',
    borderWidth: 2,
    backgroundColor: 'white',
  },
  image: {
    width: width,
    height: height/2.7,
    marginBottom: '10%'
  },
  text: {
    color: 'white',
    textAlign: 'center',
    marginBottom: '2%'


  }
});
