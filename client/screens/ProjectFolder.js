import React, {useContext, useEffect, useState} from 'react';
import { StyleSheet, Image, ImageBackground, TouchableOpacity, View, Text, FlatList, Dimensions  } from 'react-native';
import AddStepModal from './AddStepModal';
import {ModalContext} from '../store/ModalState';
import {getAllSteps } from '../API/DatabaseMethods';


export default function ProjectFolder ({ navigation, route }) {
  const [allSteps, setAllSteps] = useState([]);
  const projectId = route.params.item.id;
  const userId = route.params.item.userId;
  const title = route.params.item.projectname;


  useEffect(() => {
    getAllSteps(projectId)
      .then(result => Object.values(result).flat())
      .then(steps => setAllSteps(steps));
  }, []);


  // global toggle function
  const {toggleModal} = useContext(ModalContext);

  return (
    <ImageBackground source={require('../assets/Background.png')} style={styles.image}>
      <Text style={styles.title}>{route.params.item.projectname}</Text>
      <TouchableOpacity
        style={styles.button}
        onPress={toggleModal} >
        <Text style={styles.buttonText}> Add Step </Text>
      </TouchableOpacity>
      <AddStepModal setAllSteps={setAllSteps} projectId={projectId} title={title}/>
      <FlatList
        horizontal={false}
        style={styles.container}
        numColumns = {2}
        data={allSteps}
        // eslint-disable-next-line react/no-unescaped-entities
        ListEmptyComponent={<Text style={styles.text}>Nothing here! Click "Add Step" to get started.</Text>}
        keyExtractor={item => item.stepnum.toString()}
        renderItem={ ({ item }) => (
          <View>
            <TouchableOpacity onPress={() => navigation.navigate('StepDetail', {item})}>
              <Image source={{uri: item.imageurl}} style = {styles.ImagesStyle} />
            </TouchableOpacity>
            <Text style={styles.text}> Step {item.stepnum}</Text>
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
