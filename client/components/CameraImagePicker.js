import React, { useState, useEffect, useContext } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, TextInput, Image, Dimensions, KeyboardAvoidingView, ScrollView} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { ModalContext } from '../store/ModalState';
import Recorder from '../components/Recorder';
import { uploadImage, uploadAudio } from '../API/StorageMethods';
import { addStep } from '../API/DatabaseMethods';


// TODO: make it optional to add audio and description -- save empty string instead? add option in step detail to add audio/text later on

export default function UseCamera ({projectId, title, setAllSteps, stepNum}) {
  const [imageUri, setImageUri] = useState(null);
  const [audioUri, setAudioUri] = useState(null);
  const [description, setDescription] = useState('');
  // last stepnum is handed down from project folder
  const stepnum = stepNum+1;

  // context used for toggle function so it can be reused
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

  // images/audio is being uploaded to firebase first and link is saved in backend
  const addSteptoDB = async () => {
    const imageurl = await uploadImage(imageUri, title, projectId);
    const audiourl = await uploadAudio(audioUri, title, projectId);
    const result = await addStep({projectId, stepnum, imageurl, audiourl, description});
    // auto updates the steps in project folder
    setAllSteps(oldSteps => [...oldSteps, result]);
    setDescription('');
    setImageUri(null);
    setAudioUri(null);
    toggleModal();
  };

  // save image first. only when user confirms will it be uploaded to firebase
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
    <ScrollView style={styles.container}>
      <KeyboardAvoidingView>
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
            {/* TODO: FIX: longer input changes layout of screen and add step button disappears*/}
            <TextInput multiline={true} clearButtonMode='always' maxLength={400} placeholder="Add a Description"
              value={description} style={styles.textInput}
              onChangeText={(value) => {setDescription(value);}} />
            <TouchableOpacity style={styles.button} onPress={addSteptoDB} >
              <Text style={styles.buttonText}>Save next step</Text>
            </TouchableOpacity>
          </View>
          }
        </View>
      </KeyboardAvoidingView>
    </ScrollView>
  );
}

const { height } = Dimensions.get('window');
const { width } = Dimensions.get('window');
const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginBottom: '5%'
  },
  button: {
    justifyContent: 'center',
    height: 60,
    width: 300,
    padding: 17,
    borderRadius: 15,
    marginTop: '20%',
    alignSelf: 'center',
    backgroundColor: '#FFDE59',
  },
  buttonText: {
    fontWeight: 'bold',
    color: '#342F1E',
    textAlign: 'center',
    fontSize: 18,
  },
  textInput: {
    borderRadius: 3,
    width: '80%',
    alignSelf: 'center',
    height: '20%',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderColor: 'black',
    borderWidth: 2,
    backgroundColor: 'white',
  },
  image: {
    width: width-10,
    height: height/2.6,
    marginBottom: '10%'
  },
  text: {
    color: 'white',
    textAlign: 'center',
    marginBottom: '2%',
    fontSize: 15,
  }
});
