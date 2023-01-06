//call express
const express = require('express');
//call cors
const cors = require('cors');

//require db config file
require('./db/config');

//call members
const Members = require('./db/Members');

//define jwt token 
const jwt = require('jsonwebtoken');
//define jwt secret key
const jwtKey = 'employee_management_by_zahir';

//define app
const app = express();

app.use(express.json());

//use cors
app.use(cors());

//create async post request
app.post('/api/insert-members', async (req, res) => {
    console.log('req.body: ', req.body);
    try {
        let returnz = new Members(req.body);
        let member = await returnz.save();
        member = member.toObject();
        delete member.password;

         //jwt sign method to create token with payload and secret key and error first callback function 
        const token = jwt.sign({ member }, jwtKey, {expiresIn: "5h"}, (err, token) => {
            if(err){
                return res.status(400).send({ error: 'Login failed! Check authentication credentials' });
            }
            //send token in response
            res.send({ member, auth: token });
        });

        // res.status(201).send(output);
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

        //jwt sign method to create token with payload and secret key and error first callback function 
        const token = jwt.sign({ member }, jwtKey, {expiresIn: "5h"}, (err, token) => {
            if(err){
                return res.status(400).send({ error: 'Login failed! Check authentication credentials' });
            }
            //send token in response
            res.send({ member, auth: token });
        });

        
        // res.status(201).send(member);
    } catch (e) {
        res.status(400).send({ error: 'Login failed! Check authentication credentials' });
    }
});



app.listen(5000);