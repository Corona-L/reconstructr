
import React, { useState } from 'react';
import { StyleSheet, TouchableOpacity, Text, FlatList, ImageBackground, Modal, View, TextInput, Button, Dimensions } from 'react-native';

export default function Home ({ navigation }) {
  const [isModalVisible, setModalVisible] = useState(false);
  const [inputValue, setInputValue] = useState('');

  const toggleModalVisibility = () => {
    setModalVisible(!isModalVisible);
  };

  return (
    <ImageBackground source={require('../assets/Background.png')} style={styles.image}>
      <FlatList
        style={styles.container}
        data={mockFolders}
        // eslint-disable-next-line react/no-unescaped-entities
        ListEmptyComponent={<Text style={styles.text}>Click "Add New" to get started</Text>}
        keyExtractor={item => item.id}
        renderItem={({ item }) =>
          <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('ProjectFolder')}>
            <Text style={[styles.buttonText]}>{item.title}</Text>
          </TouchableOpacity>
        }>
      </FlatList>
      <TouchableOpacity style={[styles.button, { backgroundColor: '#3C53B0' }]} onPress={toggleModalVisibility}>
        <Text style={[styles.buttonText, { textAlign: 'center' }]}>+ Add New </Text>
      </TouchableOpacity>
      <Modal
        animationType="slide"
        transparent visible={isModalVisible}
        presentationStyle="overFullScreen"
        onDismiss={toggleModalVisibility}>
        <View style={styles.viewWrapper}>
          <View style={styles.modalView}>
            <TextInput placeholder="Enter a project name"
              value={inputValue} style={styles.textInput}
              onChangeText={(value) => setInputValue(value)} />

            <Button title="Add" onPress={toggleModalVisibility} />
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
    height: 180,
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

const mockFolders = [
  {
    url: 'https://unsplash.com/photos/SvMlXH_eW6o',
    id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f65',
    title: 'Honda',
  },
  {
    id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
    title: 'Second Project',
  },
  {
    id: '58694a0f-3da1-471f-bd96-141e29d72',
    title: 'Third Project',
  },
  {
    id: '3ac68afc-c605-48da4f8-fbd91aa97f63',
    title: 'Fourth Project',
  },
  {
    id: '3ac68afc-c605-d3-a4f8-fbd91aa97f63',
    title: 'Some Project',
  },
  {
    id: '3ac68afc-c6058d3-a4f8-fbd91aa97f63',
    title: 'Sixth Project',
  },
  {
    id: '3ac68afc-c6058d3-a4f8-fb91aa97f63',
    title: 'Seventh Project',
  },
  {
    id: '3ac68afc5-48d3-a4f8-fbd91aa97f63',
    title: 'Eigth Project',
  },
];
