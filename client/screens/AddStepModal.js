import React, {useContext} from 'react';
import { View, StyleSheet, Modal, Text } from 'react-native';
import UseCamera from '../components/Camera';
import {ModalContext} from '../store/ModalState';

export default function AddStepModal ({ id }) {
  const { modal } = useContext(ModalContext);
  const {toggleModal} = useContext(ModalContext);

  return (
    <Modal
      animationType="slide"
      transparent visible={modal}
      onRequestClose={() => {
        toggleModal();
      }}
      presentationStyle="overFullScreen">
      <View style={styles.modal}>
        <View>
          <Text style={styles.text}>Add a Step</Text>
          <UseCamera id={id}></UseCamera>
        </View>
      </View>
    </Modal>
  );
}

// const { width } = Dimensions.get('window');
const styles = StyleSheet.create({
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