const express = require('express');
const router = require('./router');
const cors = require( 'cors');
require('dotenv').config();
const app = express();
const db = require('./models');

const PORT = process.env.PORT || 3001;


app.use(cors());
app.use(express.json());
app.use(router);

(async function () {
  try {
    await db.sequelize.sync();
    app.listen(PORT, () => {
      console.log(`Server listening at ${PORT} 🚀👨‍🎤`); // eslint-disable-line no-console
    });
  } catch (error) {
    console.log(error); // eslint-disable-line no-console
  }
}) ();
