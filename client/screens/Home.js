
import React, { useState, useContext } from 'react';
import { StyleSheet, TouchableOpacity, Text, FlatList, ImageBackground, Modal, View, TextInput, Button, Dimensions, Alert } from 'react-native';
import { GlobalContext } from '../store/GlobalState';

export default function Home ({ navigation }) {
  // mock data
  const { projects } = useContext(GlobalContext);
  // reducer function to change global state
  const { addNewFolder } = useContext(GlobalContext);

  const [isModalVisible, setModalVisible] = useState(false);
  const [inputValue, setInputValue] = useState('');

  const toggleModalVisibility = () => {
    setModalVisible(!isModalVisible);
  };

  const addFolder = () => {
    if (!inputValue.length) return Alert.alert('Please enter a project name');
    const ID = (+projects[0].id+1).toString();
    addNewFolder(inputValue, ID);
    setInputValue('');
    toggleModalVisibility(); };



  return (
    <ImageBackground source={require('../assets/Background.png')} style={styles.image}>
      <FlatList
        horizontal={false}
        style={styles.container}
        data={projects}
        // eslint-disable-next-line react/no-unescaped-entities
        ListEmptyComponent={<Text style={styles.text}>Click "Add New" to get started</Text>}
        keyExtractor={item => item.id}
        renderItem={({ item }) =>
          <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('ProjectFolder', {item})}>
            <Text style={[styles.buttonText]}>{item.title}</Text>
          </TouchableOpacity>
        }>
      </FlatList>
      <TouchableOpacity
        style={[styles.button, { backgroundColor: '#FFDE59' }]}
        onPress={toggleModalVisibility}>
        <Text style={[styles.buttonText, { textAlign: 'center' }]}>+ Add New </Text>
      </TouchableOpacity>
      <Modal
        animationType="slide"
        transparent visible={isModalVisible}
        onRequestClose={() => {
          setModalVisible('false');
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
    </ImageBackground>
  );
}

const { width } = Dimensions.get('window');
const styles = StyleSheet.create({
  container: {
    marginTop: 15,
    paddingTop: 3,
  },
  image: {
    flex: 1,
    resizeMode: 'cover',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    padding: 50,
    color: 'white',
  },
  button: {
    justifyContent: 'center',
    height: 85,
    width: 320,
    padding: 17,
    borderRadius: 15,
    marginBottom: 15,
    backgroundColor: 'white',
  },
  buttonText: {
    fontWeight: 'bold',
    color: '#342F1E',
  },
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
