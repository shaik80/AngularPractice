require('./config/db.js')
const express = require("express");
const bodyParser = require("body-parser");
const api = require('./routes/api')
const PORT = 5000;

const app = express();

app.use(bodyParser.json());

app.listen(PORT, () => {
  console.log(`server started ${PORT}`);
});

app.use('/',api)