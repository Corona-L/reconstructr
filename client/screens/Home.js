import React, { useState, useContext } from 'react';
import { StyleSheet, TouchableOpacity, Text, FlatList, ImageBackground, Alert } from 'react-native';
import { GlobalContext } from '../store/GlobalState';
import {ModalContext} from '../store/ModalState';
import AddFolderModal from './AddFolderModal';

export default function Home ({ navigation }) {
  // mock data
  const { projects } = useContext(GlobalContext);
  // reducer function to change global state
  const { addNewFolder } = useContext(GlobalContext);

  // global modal function
  const {toggleModal} = useContext(ModalContext);

  const [inputValue, setInputValue] = useState('');

  const addFolder = () => {
    if (!inputValue.length) return Alert.alert('Please enter a project name');
    const ID = (+projects[0].id+1).toString();
    addNewFolder(inputValue, ID);
    setInputValue('');
    toggleModal();
  };

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
        style={[styles.button, { backgroundColor: '#FFDE59', height: 60 }]}
        onPress={toggleModal}>
        <Text style={[styles.buttonText, { textAlign: 'center'}]}>+ Add New </Text>
      </TouchableOpacity>

      <AddFolderModal value={inputValue} setInputValue={setInputValue} addFolder={addFolder}/>
    </ImageBackground>
  );
}

// const { width } = Dimensions.get('window');
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
  }
});
