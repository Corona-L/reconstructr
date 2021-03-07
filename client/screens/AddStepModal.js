import React, { useContext } from 'react';
import { View, StyleSheet, Modal, Text, ImageBackground } from 'react-native';
import UseCamera from '../components/CameraImagePicker';

import { ModalContext } from '../store/ModalState';

export default function AddStepModal ({ id }) {
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
            <UseCamera id={id}></UseCamera>
          </View>
        </View>
      </ImageBackground>
    </Modal>
  );
}

// const { width } = Dimensions.get('window');
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