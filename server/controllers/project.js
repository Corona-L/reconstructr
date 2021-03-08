'use strict';
const db = require('../models/index');

exports.addProject = async (req, res) => {
  try {
    const { id } = req.params;
    const { projectname } = req.body;
    console.log(projectname);
    const project = await db.project.create({projectname, userId: id });
    const name = project.projectname;
    res.status = 201;
    res.send(name);
  } catch (e) {
    res.sendStatus(500);
  }
};

exports.getProjects = async (req, res) => {
  try {
    const { id } = req.params;
    const projects = await db.project.findAll({ where: { userId: id } });
    if (projects.length === 0) {
      res.sendStatus(204);
    } else {
      res.status = 200;
      res.send({projects});
    }
  } catch (e) {
    res.sendStatus(500);
  }
};




