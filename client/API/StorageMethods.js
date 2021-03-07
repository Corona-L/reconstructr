import * as firebase from 'firebase';
import 'firebase/storage';


export async function uploadImage (uri, folderName, userUID,) {
  const blob = await new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.onload = () => {
      resolve(xhr.response);
    };
    xhr.responseType = 'blob';
    xhr.open('GET', uri, true);
    xhr.send(null);
  });

  const ref = firebase
    .storage()
    .ref()
    .child(`${folderName}/${userUID}`);

  let snapshot = await ref.put(blob);

  return await snapshot.ref.getDownloadURL();
}
