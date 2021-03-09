'use strict';
const db = require('../models/index');

exports.addStep = async (req, res) => {
  try {
    const details = req.body;
    const newStep = await db.step.create(details);
    const { stepnum, imageurl, audiourl, description, id, projectId} = newStep;
    res.status = 201;
    res.send({ stepnum, imageurl, audiourl, description, id, projectId });
  } catch (e) {
    res.status = 500;
  }
};



exports.getAllSteps = async (req, res) => {
  try {
    const { projectId } = req.params;

    const numId = Number(projectId);
    // const steps = await db.step.findAll({
    //   attributes: ['stepnum', 'imageurl', 'audiourl', 'description'],
    //   where: {id: projectId}
    // });
    const steps = await db.step.findAll({ where: { projectId: numId } });
    res.status = 200;
    res.send({steps});
    // if (steps.length === 0) {
    //   res.sendStatus(204);
    // } else {
    //   res.status = 200;
    //   res.send({steps});
    // }
    // res.status = 200;
    // res.body = steps;
  } catch (e) {
    res.status = 500;
  }
};

exports.updateStepAudio = async (req, res) => {
  try {
    const { projectId, stepId} = req.params;
    const audioUrl = req.body;
    // const step = await db.step.find({ where: { stepId: stepId } });
    // const update = await step.update({audiourl: audioUrl});
    // console.log(update);
    // res.status = 201;
    // res.send({update});
  } catch (e) {
    res.status = 500;
  }
};