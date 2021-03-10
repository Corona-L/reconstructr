import React, { useContext } from 'react';
import { View,
  StyleSheet,
  Modal,
  Text,
  ImageBackground
} from 'react-native';
import UseCamera from '../components/CameraImagePicker';
import { ModalContext } from '../store/ModalState';

// model that opens up and prompts you to take a picture
export default function AddStepModal ({ projectId, title,  setAllSteps, stepNum }) {
  const { modal } = useContext(ModalContext);
  const { toggleModal } = useContext(ModalContext);

  return (
    <Modal
      animationType="slide"
      transparent visible={modal}
      onRequestClose={() => {
        toggleModal();
      }}
      presentationStyle="overFullScreen">
      <ImageBackground source={require('../assets/Background.png')} style={styles.image}>
        <View >
          <View style={{alignItems: 'center'}}>
            <Text style={styles.text}>Add a Step</Text>
            <UseCamera projectId={projectId} title={title} setAllSteps={setAllSteps} stepNum={stepNum}></UseCamera>
          </View>
        </View>
      </ImageBackground>
    </Modal>
  );
}

const styles = StyleSheet.create({
  image: {
    flex: 1,
    resizeMode: 'cover',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 20,
    paddingBottom: 80,
  },
  modal: {
    backgroundColor: '#041E34',
    flex: 1,
    alignItems: 'center',
    paddingTop: 20,
    paddingBottom: 80,
    top: '2%'
  },
  text: {
    color: '#FFDE59',
    fontWeight: 'bold',
    fontSize: 20,
    paddingBottom: 30,
  },
});