import React, { useContext } from 'react';
import { View, StyleSheet, Modal, TextInput, Button, Dimensions } from 'react-native';
import { ModalContext } from '../store/ModalState';

export default function AddFolderModal ({ inputValue, setInputValue, addFolder}) {
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
      <View style={styles.viewWrapper}>
        <View style={styles.modalView}>
          <TextInput maxLength={30} placeholder="Enter a project name"
            value={inputValue} style={styles.textInput}
            onChangeText={(value) => setInputValue(value)} />
          <Button title="Add New" onPress={addFolder} />
        </View>
      </View>
    </Modal>
  );
}

const { width } = Dimensions.get('window');
const styles = StyleSheet.create({
  viewWrapper: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
  },
  modalView: {
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    top: '50%',
    left: '50%',
    elevation: 5,
    transform: [{ translateX: -(width * 0.4) },
      { translateY: -90 }],
    height: 200,
    width: width * 0.8,
    backgroundColor: '#fff',
    borderRadius: 7,
  },
  textInput: {
    width: '80%',
    borderRadius: 5,
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderColor: 'rgba(0, 0, 0, 0.2)',
    borderWidth: 1,
    marginBottom: 8,
  },
});