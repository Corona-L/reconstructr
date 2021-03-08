const express = require('express');
const router = express.Router();
const user = require('./controllers/user');
const project = require('./controllers/project');
const step = require('./controllers/step');


router
  .get('/project/:id', project.getProjects)
  .post('/project/:id', project.addProject);

router
  .get('/step/:projectId', step.getAllSteps)
  .post('/step/:projectId', step.addStep)
  .post('/audio/:stepId', step.updateStepAudio);

router
  .post('/user/', user.signUp)
  .get('/user/:email', user.signIn);






module.exports = router;
