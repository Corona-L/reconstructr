'use strict';
const db = require('../models/index');

exports.addProject = async (req, res) => {
  try {
    const { id } = req.params;
    const { projectname } = req.body;
    const project = await db.project.create({projectname, userId: id });
    const name = project.projectname;
    res.status = 201;
    res.send({name});
  } catch (e) {
    res.sendStatus(500);
  }
};

exports.getProjects = async (req, res) => {
  try {
    const { id } = req.params;
    const projects = await db.project.findAll({
      attributes: ['projectname', 'id', 'userId', 'createdAt'],
      where: {userId: id}
    });
    res.status = 200;
    res.send({projects});
    //   res.send({projects});
    // if (projects.length === 0) {
    //   res.sendStatus(204);
    // } else {
    //   res.status = 200;
    //   res.send({projects});
    // }
  } catch (e) {
    res.sendStatus(500);
  }
};



