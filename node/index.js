//call express
const express = require('express');
//call cors
const cors = require('cors');

//require db config file
require('./db/config');

//call members
const Members = require('./db/Members');

//define app
const app = express();

app.use(express.json());

//use cors
app.use(cors());

//create async post request
app.post('/api/insert-members', async (req, res) => {
    console.log('req.body: ', req.body);
    try {
        const member = new Members(req.body);
        await member.save();
        res.status(201).send(member);
    } catch (e) {
        res.status(400).send(e);
    }
});


app.listen(5000);