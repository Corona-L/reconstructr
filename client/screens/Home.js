import React, { useState, useContext, useEffect } from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
  FlatList,
  ImageBackground,
  Alert,
  Dimensions,
  Image
} from 'react-native';
import { ModalContext } from '../store/ModalState';
import AddFolderModal from './AddFolderModal';
import { getProjects, addProjectName } from '../API/DatabaseMethods';

export default function Home({ navigation, route }) {
  const [projectNames, setProjectNames] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const { toggleModal } = useContext(ModalContext);
  const userId = route.params.id;

  useEffect(() => {
    getProjects(userId)
      .then(result => Object.values(result).flat())
      .then(projects => setProjectNames(projects));
  }, []);

  const addFolder = async () => {
    if (!inputValue.length) return Alert.alert('Please enter a project name');
    await addProjectName(userId, inputValue);
    getProjects(userId)
      .then(result => Object.values(result).flat())
      .then(projects => setProjectNames(projects));
    setInputValue('');
    toggleModal();
  };

  return (
    <ImageBackground source={require('../assets/Background.png')} style={styles.image}>

      <FlatList
        horizontal={false}
        style={styles.container}
        data={projectNames}
        // eslint-disable-next-line react/no-unescaped-entities
        ListEmptyComponent={<Text style={styles.text}>Click "Add New" to get started</Text>}
        keyExtractor={item => item.id.toString()}
        renderItem={({ item }) =>
          <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('ProjectFolder', { item })}>
            <View style={styles.imageCard}>
              <View style={styles.imageBox}>
                <Image source={require('../assets/images/button.png')} style={styles.ImagesStyle} />
              </View>
              <Text style={[styles.buttonText]}>{item.projectname}</Text>
            </View>
            <Text style={{ alignSelf: 'flex-end', marginBottom: '15%' }}>{item.createdAt.slice(0, 10)}</Text>
          </TouchableOpacity>
        }>
      </FlatList>

      <TouchableOpacity
        style={[styles.button, { backgroundColor: '#FFDE59', height: 70, alignItems: 'center' }]}
        onPress={toggleModal}>
        <Text style={[styles.buttonText, { alignItems: 'flex-start' }]}>+ Add New </Text>
      </TouchableOpacity>
      <AddFolderModal value={inputValue} setInputValue={setInputValue} addFolder={addFolder} />
    </ImageBackground>
  );
}

const { height } = Dimensions.get('window');
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
    fontFamily: 'monospace',
  },
  button: {
    justifyContent: 'center',
    height: height / 7,
    width: 320,
    padding: 17,
    paddingTop: 5,
    borderRadius: 5,
    marginBottom: 12,
    backgroundColor: '#A6A6A6',
    borderColor: 'black',
    borderWidth: 1,
  },
  buttonText: {
    fontWeight: 'bold',
    color: '#342F1E',
    fontSize: 20,
  },
  imageCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  ImagesStyle: {
    marginTop: 60,
    height: 80,
    width: 80,
  }
});


// TODO: FIX. firebase.auth not working
// let currentUserUID = firebase.auth().currentUser.uid;
// const [firstName, setFirstName] = useState('');

// firebase authentication
// useEffect(() => {
//   async function getUserInfo () {
//     let doc = await firebase
//       .firestore()
//       .collection('users')
//       .doc(currentUserUID)
//       .get();
//     if (!doc.exists) {
//       Alert.alert('No user data found!');
//     } else {
//       let dataObj = doc.data();
//       setFirstName(dataObj.firstName);
//     }
//   }
//   getUserInfo();
// });

// const addFolder = async () => {
//   if (!inputValue.length) return Alert.alert('Please enter a project name');
//   const ID = (+projects[0].id + 1).toString();
//   //using real database
//   // saveFoldertoDB(inputValue);
//   addNewFolder(inputValue, ID);
//   setInputValue('');
//   toggleModal();
// };