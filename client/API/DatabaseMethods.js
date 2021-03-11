require('dotenv').config();
const baseUrl = process.env.baseUrl;

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


// TODO: fix/implement
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
// at the moment it just checks if email exists
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


// Tried to use firebase real time storage.
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







