//call express
const express = require('express');
//require db config file
require('./db/config');

//call members
const Members = require('./db/Members');


//define app
const app = express();

app.listen(5000);