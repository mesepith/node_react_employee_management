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
        let member = new Members(req.body);
        let output = await member.save();
        output = output.toObject();
        delete output.password;

        res.status(201).send(output);
    } catch (e) {
        res.status(400).send(e);
    }
});

//create login api
app.post('/api/login', async (req, res) => {
    
    //check empty email and password
    if(!req.body.email || !req.body.password){
        return res.status(400).send({ error: 'Please provide email and password' });
    }

    try {
        const member = await Members.findOne(req.body).select("-password");

        if(!member){
            return res.status(400).send({ error: 'Login failed! Check authentication credentials' });
        }
        
        res.status(201).send(member);
    } catch (e) {
        res.status(400).send({ error: 'Login failed! Check authentication credentials' });
    }
});



app.listen(5000);