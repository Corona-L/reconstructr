import React, { useState } from 'react';
import { StyleSheet, Image, ImageBackground, TouchableOpacity, View, Text, FlatList  } from 'react-native';
import AddStepModal from './AddStepModal';

export default function ProjectFolder () {
  const [isModalVisible, setModalVisible] = useState(false);
  const [steps, setSteps ] = useState(mockFolders);

  const toggleModalVisibility = () => {
    setModalVisible(!isModalVisible);
  };

  const addNewStep = (textInput, url) => {
    const randomId = (Math.random() * 10).toString();
    const newStep = {id: randomId, description: textInput, imageUrl: url};
    setSteps(steps => [newStep, ...steps]);
    toggleModalVisibility();
  };


  let counter = 1;
  return (
    <ImageBackground source={require('../assets/Background.png')} style={styles.image}>
      <TouchableOpacity
        style={styles.button}
        onPress={toggleModalVisibility} >
        <Text style={styles.buttonText}> Add Step </Text>
      </TouchableOpacity>
      <AddStepModal addNewStep={addNewStep} isModalVisible={isModalVisible} toggleModalVisibility={toggleModalVisibility} />
      <FlatList
        horizontal={false}
        style={styles.container}
        numColumns = {2}
        data={steps}
        // eslint-disable-next-line react/no-unescaped-entities
        ListEmptyComponent={<Text style={styles.text}>Click "Add Step" to get started</Text>}
        keyExtractor={item => item.id}
        renderItem={ ({ item }) => (
          <View>
            {console.log(item.description)}
            <TouchableOpacity>
              <Image source={{uri: item.imageUrl}} style = {styles.ImagesStyle} />
            </TouchableOpacity>
            <Text style={styles.text}> Step {counter++}</Text>
          </View>
        )}>
      </FlatList>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 30,
  },
  image: {
    flex: 1,
    resizeMode: 'cover',
    alignItems: 'center',
    justifyContent: 'center',
  },
  ImagesStyle: {
    height: 160,
    width: 160,
    margin: 10,
    borderRadius: 5,
  },
  text: {
    marginBottom: 10,
    padding: 5,
    color: 'white',
    fontSize: 15,

  },
  button: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 85,
    width: 320,
    padding: 17,
    borderRadius: 15,
    marginTop: 15,
    backgroundColor: '#FFDE59',
  },
  buttonText: {
    fontWeight: 'bold',
    color: '#342F1E',
  },
});

const mockFolders = [
  {
    id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f65',
    description: 'hello',
    imageUrl: 'https://i.ytimg.com/vi/7lhzTBn_TqM/maxresdefault.jpg'
  },
  {
    id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
    description: 'try this',
    imageUrl: 'https://i.ytimg.com/vi/BUmbBcVGvWw/maxresdefault.jpg',
  },
  {
    id: '58694a0f-3da1-471f-bd96-141e29d72',
    description: 'and this ',
    imageUrl: 'https://i.ytimg.com/vi/vLTOx71mL_8/maxresdefault.jpg',
  }
];