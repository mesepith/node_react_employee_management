//call express
const express = require('express');
//call cors
const cors = require('cors');

//require db config file
require('./db/config');

//call members
const Members = require('./db/Members');
//load employee model
const Employee = require('./db/Employee');

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


// verify token middleware function 
const verifyToken = (req, res, next) => {
    //get auth header value
    const bearerHeader = req.headers['authorization'];
    //check if bearer is undefined
    if(typeof bearerHeader !== 'undefined'){
        //split at the space
        const bearer = bearerHeader.split(' ');
        //get token from array
        const bearerToken = bearer[1];
        //set the token
        req.token = bearerToken;

        //verify jwtKey of jwt token
        jwt.verify(req.token, jwtKey, (err, authData) => {
            if(err){
                res.sendStatus(403);
            } else {
                //next middleware
                next();
            }
        });

    } else {
        //forbidden
        res.sendStatus(403);
    }
}


//create add employee api with verify token middleware function 
app.post('/api/add-employee', verifyToken, async (req, res) => {
    console.log('req.body: ', req.body);
    try {
        let returnz = new Employee(req.body);
        let employee = await returnz.save();
        res.status(201).send(employee);
    } catch (e) { // catch any error
        res.status(400).send({ error: 'Add employee failed! Check authentication credentials' });
    }
});
       

//create get employee api with verify token middleware function
app.get('/api/get-all-employee-list', verifyToken, async (req, res) => {
    try {
        const employee = await Employee.find();
        res.status(201).send(employee);
    } catch (e) { // catch any error
        res.status(400).send({ error: 'Get employee failed! Check authentication credentials' });
    }
});

//delete employee by id api with verify token middleware function 
app.delete('/api/delete-employee/:id', verifyToken, async (req, res) => {
    try {
        const employee = await Employee.findByIdAndDelete(req.params.id);
        if(!employee){
            return res.status(404).send({ error: 'Delete employee failed! Check data and try again' });
        }
        res.status(201).send(employee);
    } catch (e) { // catch any error
        res.status(400).send({ error: 'Delete employee failed! Check authentication credentials' });
    }
});

//get employee by id api with verify token middleware function 
app.get('/api/get-employee/:id', verifyToken, async (req, res) => {
    try {
        const employee = await Employee.findById(req.params.id);
        if(!employee){
            return res.status(404).send({ error: 'Get employee failed! Check data and try again' });
        }
        res.status(201).send(employee);
    } catch (e) { // catch any error
        res.status(400).send({ error: 'Get employee failed! Check authentication credentials' });
    }
});

app.listen(5000);