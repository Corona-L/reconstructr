import React, { useContext } from 'react';
import { StyleSheet, Text, View, ImageBackground, Image, Dimensions, TouchableOpacity, Modal, ScrollView } from 'react-native';
import { ModalContext } from '../store/ModalState';
import Playback from '../components/Playback';
import Recorder from '../components/Recorder';
// import { uploadAudio } from '../API/StorageMethods';
// import { saveAudiotoDB } from '../API/DatabaseMethods';

export default function StepDetailModal({ route }) {
  const { modal } = useContext(ModalContext);
  const { toggleModal } = useContext(ModalContext);
  // const [audioUri, setAudioUri] = useState(null);
  const audiourl = route.params.item.audiourl;

  // TODO: finish with database
  // const saveAudio = async (uri) => {  //
  //   // const audioLink = await uploadAudio(uri, 'name');
  //   // saveAudiotoDB(audioLink);
  //   // saveAudiotoDB(id, route.params.item.step, audioLink);
  // };


  const emptyDescriptionMessage = <Text style={styles.notesText}>No description provided. You can add a new description any time</Text>;
  const descriptionMessage = <Text style={styles.notesText}>{route.params.item.description}</Text>;


  return (
    <ImageBackground source={require('../assets/Background.png')} style={styles.image}>
      <Text style={styles.text}>Step {route.params.item.stepnum}</Text>
      <View style={styles.view} />
      <ScrollView>
        <TouchableOpacity onPress={toggleModal}>
          <Image
            style={styles.imageStyle}
            source={{ uri: route.params.item.imageurl }} />
        </TouchableOpacity>
        <Modal
          visible={modal}
          transparent={false}
          onRequestClose={toggleModal}>
          <TouchableOpacity onPress={toggleModal}>
            <Image
              style={styles.modalImage}
              source={{ uri: route.params.item.imageurl }} />
          </TouchableOpacity>
        </Modal>
        <View style={styles.notesView} >
          <Text style={[styles.notesText, { fontWeight: 'bold', fontSize: 22, color: '#FFDE59' }]}>Notes</Text>
          {!route.params.item.audiourl ? <Text style={[styles.notesText, { paddingTop: 10, marginLeft: '34%', fontStyle: 'italic' }]}>Add a voice note</Text> : <View />}
        </View>
        {!route.params.item.audiourl ? <Recorder saveAudio={saveAudio} /> : <Playback audiourl={audiourl} />}
        <View style={styles.descriptionView} >
          {route.params.item.description ? descriptionMessage : emptyDescriptionMessage}
        </View>
      </ScrollView>
    </ImageBackground>
  );
}

const { height } = Dimensions.get('window');
const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    flex: 1,
    resizeMode: 'cover',
  },
  imageStyle: {
    height: height / 2.4,
    width: width,
    marginTop: 40,
    borderRadius: 5,
  },
  modalImage: {
    height: height,
    width: width,
  },
  text: {
    marginTop: 10,
    marginLeft: 15,
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold'
  },
  view: {
    marginTop: 8,
    marginLeft: 10,
    borderBottomColor: '#FFDE59',
    borderBottomWidth: 5,
    borderBottomRightRadius: 10,
    width: '30%'
  },
  notesText: {
    fontFamily: 'monospace',
    fontSize: 16,
    color: 'white',
  },
  notesView: {
    marginLeft: '3%',
    marginBottom: '3%',
    marginTop: 25,
  },
  descriptionView: {
    marginLeft: '7%',
  }
});

