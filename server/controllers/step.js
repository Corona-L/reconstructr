'use strict';
const db = require('../models/index');

exports.addStep = async (req, res) => {
  try {
    const {projectId, stepDetails} = req.body;
    const step = await db.step.create({projectId, stepDetails});
    res.status = 201;
    res.body = step;
  } catch (e) {
    res.status = 500;
  }
};

exports.getAllSteps = async (req, res) => {
  try {
    const {projectId} = req.body;
    const steps = await db.step.findAll({ where: { id: projectId } });
    res.status = 200;
    res.body = steps;
  } catch (e) {
    res.status = 500;
  }
};

exports.updateStepAudio = async (req, res) => {
  try {
    const {stepId, audioUrl} = req.body;
    const step = await db.step.find({ where: { id: stepId } });
    const update = await step.update({audiourl: audioUrl});
    res.status = 200;
    res.body = update;
  } catch (e) {
    res.status = 500;
  }
};