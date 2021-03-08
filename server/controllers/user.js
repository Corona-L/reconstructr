'use strict';
const db = require('../models/index');

exports.signUp = async (req, res) => {
  try {
    const { firstname, lastname, email, password } = req.body;
    const preCheck = await db.user.findOne({ where: { email: email } });
    if (preCheck === null) {
      console.log('create');
      const user = await db.user.create({firstname, lastname, email, password });
      const { id } = user;
      res.status = 201;
      res.send({ id });
    } else if (preCheck.email) {
      console.log('email already exists');
      res.sendStatus(409);
    }
  } catch (e) {
    res.sendStatus(500);
  }
};

exports.signIn = async (req, res) => {
  try {
    const { email } = req.params;
    const user = await db.user.findOne({ where: { email: email } });
    if (user === null) {
      res.sendStatus(502);
      res.end();
    } else if (user.email) {
      const { id } = user;
      res.status = 200;
      res.send({ id });
    }
  } catch (e) {
    console.log(e);
    res.sendStatus(500);
  }
};
