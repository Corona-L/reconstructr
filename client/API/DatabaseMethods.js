// require('dotenv').config();

export const getProjects = (userId) =>
  fetch(`${baseUrl}/project/${userId}`)
    .then(res => res.status <= 400 ? res : Promise.reject())
    .then(res => res.status === 204 ? res : res.json())
    .catch(err => console.log('error is:', err));


export const addProjectName = (userId, projectname) =>
  fetch(`${baseUrl}/project/${userId}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ projectname })
  })
    .then(res => res.status <= 400 ? res : Promise.reject())
    .then(res => res.status === 204 ? res : res.json())
    .catch(err => console.log(err));

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
