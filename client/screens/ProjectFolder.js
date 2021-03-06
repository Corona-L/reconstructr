import React, {useContext} from 'react';
import { StyleSheet, Image, ImageBackground, TouchableOpacity, View, Text, FlatList, Dimensions  } from 'react-native';
import AddStepModal from './AddStepModal';
import {ModalContext} from '../store/ModalState';

export default function ProjectFolder ({ navigation, route }) {
  const id = route.params.item.id;

  // global toggle function
  const {toggleModal} = useContext(ModalContext);

  return (
    <ImageBackground source={require('../assets/Background.png')} style={styles.image}>
      <Text style={styles.title}>{route.params.item.title}</Text>
      <TouchableOpacity
        style={styles.button}
        onPress={toggleModal} >
        <Text style={styles.buttonText}> Add Step </Text>
      </TouchableOpacity>
      <AddStepModal id={id}/>
      <FlatList
        horizontal={false}
        style={styles.container}
        numColumns = {2}
        data={route.params.item.steps}
        // eslint-disable-next-line react/no-unescaped-entities
        ListEmptyComponent={<Text style={styles.text}>Nothing here! Click "Add Step" to get started.</Text>}
        keyExtractor={item => item.step}
        renderItem={ ({ item }) => (
          <View>
            <TouchableOpacity onPress={() => navigation.navigate('StepDetail', {item})}>
              <Image source={{uri: item.imageUrl}} style = {styles.ImagesStyle} />
            </TouchableOpacity>
            <Text style={styles.text}> Step {item.step}</Text>
          </View>
        )}>
      </FlatList>
    </ImageBackground>
  );
}

const { height } = Dimensions.get('window');
const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    marginTop: 30,
  },
  title: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 20
  },
  image: {
    flex: 1,
    resizeMode: 'cover',
    alignItems: 'center',
    justifyContent: 'center',
  },
  ImagesStyle: {
    height: height/4.9,
    width: width/2.3,
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
    height: 50,
    width: 300,
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
