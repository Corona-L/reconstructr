const baseUrl = 'http://192.168.2.107:3001';

// projects
export const getProjects = (userId) =>
  fetch(`${baseUrl}/project/${userId}`)
    .then(res => res.status <= 400 ? res : Promise.reject())
    .then(res => res.status === 204 ? res : res.json())
    .catch(err => console.log('error is:', err));



export const addProjectName = (userId, projectname) =>
  fetch(`${baseUrl}/project/${userId}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({projectname})
  })
    .then(res => res.status <= 400 ? res : Promise.reject())
    .then(res => res.status === 204 ? res : res.json())
    .catch(err => console.log(err));


// steps
export const getAllSteps = (projectId) =>
  fetch(`${baseUrl}/step/${projectId}`)
    .then(res => res.status <= 400 ? res : Promise.reject())
    .then(res => res.status === 204 ? res : res.json())
    .catch(err => console.log('error is:', err));


export const addStep = (newStep) =>
  fetch(`${baseUrl}/step`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(newStep)
  })
    .then(res => res.status <= 400 ? res : Promise.reject())
    .then(res => res.status === 204 ? res : res.json())
    .catch(err => console.log(err));


export const addAudio = (stepId, audioUrl) =>
  fetch(`${baseUrl}/project/${stepId}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(audioUrl)
  })
    .then(res => res.status <= 400 ? res : Promise.reject())
    .then(res => res.status === 204 ? res : res.json())
    .catch(err => console.log(err));


// users signIn. Is going to be handled by Firebase later on
export const signIn = (email) =>
  fetch(`${baseUrl}/user/${email}`)
    .then(res => res.status <= 400 ? res : Promise.reject())
    .then(res => res.status === 204 ? res : res.json())
    .catch(err => console.log('error is:', err));


export const registration = (newUser) =>
  fetch(`${baseUrl}/user`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(newUser)
  })
    .then(res => res.status <= 400 ? res : Promise.reject())
    .then(res => res.status === 204 ? res : res.json())
    .catch(err => console.log(err));



// export async function saveFoldertoDB (projectName) {
//   const database = firebase.database();
//   try {
//     await database.ref('users/projects').push({
//       projectName: projectName
//     });
//     return console.log('success');
//   } catch (error) {
//     console.log(error);
//   }
// }

// export async function getProjectFolders () {
//   const database = firebase.database();

//   try {
//     const result = await database.ref('users/projects').orderByKey();
//     return console.log(result);
//   } catch (error) {
//     console.log(error);
//   }
// }

// export async function getAllDetails () {

// }

// export async function savetoDB (id, step, imageUrl, audioUrl, description) {
//   const database = firebase.database();
//   try {
//     await database.ref('users/projects' + id).push({
//       step: step,
//       imageUrl: imageUrl,
//       description: description,
//       audioUrl: audioUrl
//     });
//     return console.log('success');
//   } catch (error) {
//     console.log(error);
//   }
// }

// // TODO: finish logic
// // export async function saveAudiotoDB (id, step, audioUrl) {
// //   // const database = firebase.database();
// //   try {
// //     // await database.ref('users/projects' + id + step).set({
// //     //   audioUrl: audioUrl
// //     // });
// //     return Alert.alert('Audio saved');
// //   } catch (error) {
// //     console.log(error);
// //   }
// // }





