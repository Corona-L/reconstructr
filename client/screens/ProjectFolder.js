import React, { useState } from 'react';
import { StyleSheet, Image, ImageBackground, TouchableOpacity, View, Text, FlatList  } from 'react-native';
import AddStepModal from './AddStepModal';

export default function ProjectFolder ({ navigation }) {
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
            <TouchableOpacity onPress={() => navigation.navigate('StepDetail', {item})}>
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
    id: '1',
    description: 'Bacon ipsum dolor amet andouille kielbasa cupim turducken hamburger, picanha t-bone burgdoggen bresaola spare ribs pork belly corned beef pork loin.',
    imageUrl: 'https://i.ytimg.com/vi/7lhzTBn_TqM/maxresdefault.jpg'
  },
  {
    id: '2',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut laborpsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore e et dolore magna aliqua. Lacus sed viverra tellus in hac habitasse. Amet consectetur adipiscing elit duis tristique. Nulla aliquet porttitor lacus luctus accumsan tortor posuere ac ut. Ornare arcu odio ut sem. Eget egestas purus viverra accumsan in nisl nisi. Auctor elit sed vulputate mi sit amet mauris. Tristique et egestas quis ipsum suspendisse. Mi eget mauris pharetra et. In pellentesque massa placerat duis ultricies lacus sed. Placerat duis ultricies lacus sed. Quam quisque id diam vel quam elementum pulvinar etiam non. Erat nam at lectus urna duis convallis convallis tellus. Varius vel pharetra vel turpis nunc. Pellentesque massa placerat duis ultricies lacus. Quam id leo in vitae turpis massa sed elementum. Ornare arcu dui vivamus arcu. At tellus at urna condimentum mattis pellentesque. Nisl vel pretium lectus quam id. Tortor at risus viverra adipiscing .',
    imageUrl: 'https://i.ytimg.com/vi/BUmbBcVGvWw/maxresdefault.jpg',
  },
  {
    id: '3',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. ',
    imageUrl: 'https://i.ytimg.com/vi/vLTOx71mL_8/maxresdefault.jpg',
  }
];