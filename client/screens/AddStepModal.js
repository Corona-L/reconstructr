import React, { useState } from 'react';
import { View, StyleSheet, Modal, TextInput, Button, Text } from 'react-native';

// TODO: make it reusable

export default function AddStepModal ({ isModalVisible, toggleModalVisibility, }) {
  const [inputValue, setInputValue] = useState('');

  return (
    <Modal
      animationType="slide"
      transparent visible={isModalVisible}
      onRequestClose={() => {
        toggleModalVisibility();
      }}
      presentationStyle="overFullScreen">
      {/* <View style={styles.viewWrapper}> */}
      <View style={styles.modal}>
        {/* <View style={styles.modalView}> */}
        <View>
          <Text style={styles.text}>Add a Step</Text>
          <TextInput multiline={true} maxLength={400} placeholder="Description"
            value={inputValue} style={styles.textInput}
            onChangeText={(value) => setInputValue(value)} />
        </View>
        <Button title="Add New" />
      </View>
    </Modal>
  );
}

// const { width } = Dimensions.get('window');
const styles = StyleSheet.create({
  modal: {
    flex: 1,
    alignItems: 'center',
    paddingTop: 40,
    backgroundColor: 'white',
    top: '2%'
  },
  text: {
    color: '#787878',
    fontWeight: 'bold',
    fontSize: 20,

  },
  textInput: {
    width: 300,
    borderRadius: 5,
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderColor: 'rgba(0, 0, 0, 0.2)',
    borderWidth: 1,
    marginBottom: 15,
    marginTop: 20,
  },
});