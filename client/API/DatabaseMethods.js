import * as firebase from 'firebase';
import 'firebase/database';
// import { Alert } from 'react-native';


export async function saveFoldertoDB (projectName) {
  const database = firebase.database();
  try {
    await database.ref('users/projects').push({
      projectName: projectName
    });
    return console.log('success');
  } catch (error) {
    console.log(error);
  }
}

export async function getProjectFolders () {
  const database = firebase.database();

  try {
    const result = await database.ref('users/projects').orderByKey();
    return console.log(result);
  } catch (error) {
    console.log(error);
  }
}

export async function getAllDetails () {

}

export async function savetoDB (id, step, imageUrl, audioUrl, description) {
  const database = firebase.database();
  try {
    await database.ref('users/projects' + id).push({
      step: step,
      imageUrl: imageUrl,
      description: description,
      audioUrl: audioUrl
    });
    return console.log('success');
  } catch (error) {
    console.log(error);
  }
}

// TODO: finish logic
// export async function saveAudiotoDB (id, step, audioUrl) {
//   // const database = firebase.database();
//   try {
//     // await database.ref('users/projects' + id + step).set({
//     //   audioUrl: audioUrl
//     // });
//     return Alert.alert('Audio saved');
//   } catch (error) {
//     console.log(error);
//   }
// }





