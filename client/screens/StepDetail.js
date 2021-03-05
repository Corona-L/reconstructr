import React, { useState } from 'react';
import { StyleSheet, Text, View, ImageBackground, Image, Dimensions, TouchableOpacity, Modal, ScrollView } from 'react-native';

export default function StepDetailModal ({ route }) {
  const [isModalVisible, setModalVisible] = useState(false);
  const emptyDescriptionMessage = <Text style={styles.notesText}>No description provided. You can add a new desription any time</Text>;
  const descriptionMessage = <Text style={styles.notesText}>{route.params.item.description}</Text>;

  const toggleModalVisibility = () => {
    setModalVisible(!isModalVisible);
  };

  return (
    <ImageBackground source={require('../assets/Background.png')} style={styles.image}>
      <Text style={styles.text}>Step 1</Text>
      <View style={styles.view} />
      <ScrollView>
        <TouchableOpacity onPress={toggleModalVisibility}>
          <Image
            style={styles.imageStyle}
            source={{ uri: route.params.item.imageUrl }}/>
        </TouchableOpacity>
        <Modal
          visible={isModalVisible}
          transparent={false}
          onRequestClose={toggleModalVisibility}>
          <TouchableOpacity onPress={toggleModalVisibility}>
            <Image
              style={styles.modalImage}
              source={{ uri: route.params.item.imageUrl }} />
          </TouchableOpacity>
        </Modal>
        <View style={styles.notesView} >
          <Text style={[styles.notesText, { fontWeight: 'bold', fontSize: 20 }]}>Notes</Text>
        </View>
        <View style={styles.descriptionView} >
          {route.params.item.description ? descriptionMessage : emptyDescriptionMessage}
        </View>
      </ScrollView>
    </ImageBackground>
  );
}

const { height } = Dimensions.get('window');
const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    flex: 1,
    resizeMode: 'cover',
  },
  imageStyle: {
    height: height/2.4,
    width: width,
    marginTop: 40,
    borderRadius: 5,
  },
  modalImage: {
    height: height,
    width: width,
  },
  text: {
    marginTop: 10,
    marginLeft: 15,
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold'
  },
  view: {
    marginTop: 8,
    marginLeft: 10,
    borderBottomColor: '#FFDE59',
    borderBottomWidth: 5,
    borderBottomRightRadius: 10,
    width: '30%'
  },
  notesText: {
    color: 'white',
  },
  notesView: {
    marginLeft: '3%',
    marginBottom: '3%',
    marginTop: 25,
  },
  descriptionView: {
    marginLeft: '7%',
  }
});

