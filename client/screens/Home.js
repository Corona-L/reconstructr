import React from 'react';
import { StyleSheet, TouchableOpacity, Text, FlatList, ImageBackground} from 'react-native';

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

export default function Home ({ navigation }) {

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
      <TouchableOpacity style={[styles.button, {backgroundColor: '#3C53B0'}]} onPress={() => navigation.navigate('AddNewFolder')}>
        <Text style={[styles.buttonText, {textAlign: 'center'}]}>+ Add New </Text>
      </TouchableOpacity>
    </ImageBackground>

  );
}

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
