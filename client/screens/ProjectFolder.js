import React, {useContext, useEffect, useState} from 'react';
import { StyleSheet,
  Image,
  ImageBackground,
  TouchableOpacity,
  View,
  Text,
  FlatList,
  Dimensions,
  Switch
} from 'react-native';
import AddStepModal from './AddStepModal';
import {ModalContext} from '../store/ModalState';
import {getAllSteps } from '../API/DatabaseMethods';

// TODO: add check box under each step. maybe save an ischecked value in database and write function to keep state even if user leaves screen

export default function ProjectFolder ({ navigation, route }) {
  const [allSteps, setAllSteps] = useState([]);
  const projectId = route.params.item.id;
  const [isEnabled, setIsEnabled] = useState(false);
  const title = route.params.item.projectname;
  // create step number for database
  const stepNum = allSteps.length === 0 ? 0 : allSteps[allSteps.length-1].stepnum;

  useEffect(() => {
    getAllSteps(projectId)
      .then(result => Object.values(result).flat())
      .then(steps => setAllSteps(steps));
  }, []);

  // global toggle function
  const {toggleModal} = useContext(ModalContext);


  // sorting function
  const toggleSwitch = () => {
    if (isEnabled === false) {
      const newstep = allSteps.slice().sort((a, b) => b.stepnum-a.stepnum);
      setAllSteps(newstep);
    } else {
      const newstep = allSteps.slice().sort((a, b) => a.stepnum-b.stepnum);
      setAllSteps(newstep);
    }
    setIsEnabled(previousState => !previousState);
  };


  return (
    <ImageBackground source={require('../assets/Background.png')} style={styles.image}>
      <Text style={styles.title}>{route.params.item.projectname}</Text>
      <TouchableOpacity
        style={styles.button}
        onPress={toggleModal} >
        <Text style={styles.buttonText}> Add Step </Text>
      </TouchableOpacity>
      <View style={styles.toggle}>
        <Switch
          trackColor={{ false: '#767577', true: '#81b0ff' }}
          thumbColor={isEnabled ? '#f5dd4b' : '#f4f3f4'}
          ios_backgroundColor="#3e3e3e"
          onValueChange={toggleSwitch}
          value={isEnabled}></Switch>
      </View>
      <AddStepModal setAllSteps={setAllSteps} projectId={projectId} title={title} stepNum={stepNum}/>
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
    marginTop: '3%',
  },
  title: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 25,
  },
  toggle: {
    alignSelf: 'flex-end',
    marginTop: '5%',
    marginEnd: '3%'
  },
  image: {
    flex: 1,
    resizeMode: 'cover',
    alignItems: 'center',
    justifyContent: 'center',
  },
  ImagesStyle: {
    borderColor: 'white',
    borderWidth: 1,
    height: height/4.5,
    width: width/2.3,
    margin: 8,
    borderRadius: 5,
  },
  text: {
    marginBottom: 10,
    padding: 4,
    color: 'white',
    fontSize: 15,
    alignSelf: 'center',
    fontWeight: 'bold',
    fontFamily: 'monospace',
    textAlign: 'center'
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
