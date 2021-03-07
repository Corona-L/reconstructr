import React, { useState, useEffect, useContext } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, TextInput, Alert, Image, Dimensions} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { ModalContext } from '../store/ModalState';
import Recorder from '../components/Recorder';
// import { uploadImage } from '../API/firebaseMethods';


export default function UseCamera ({id}) {
  // save your image here first
  const [imageUri, setImageUri] = useState(null);
  const [textInput, setTextInput] = useState('');

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

  const addStep = () => {
    if (!imageUri) return Alert.alert('Please add a picture');
    // uploadImage(imageUri)
    // save imagelink, textInput, id to database
    setTextInput('');
    setImageUri(null);
    toggleModal();
  };

  const takePicture = async () => {
    let result = await ImagePicker.launchCameraAsync({
      base64: false
    });
    console.log(result);
    if (!result.cancelled) {
      setImageUri(result.uri);
    }
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
          <Recorder />
          <TextInput multiline={true} maxLength={400} placeholder="Add a Description"
            value={textInput} style={styles.textInput}
            onChangeText={(value) => {setTextInput(value);}} />
          <TouchableOpacity style={styles.button} onPress={addStep} >
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
