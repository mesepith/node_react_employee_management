//import mongoose
const mongoose = require('mongoose');

//create member schema with name, email, password as string
const memberSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String
});

//export model with name Member and schema memberSchema
module.exports = mongoose.model('members', memberSchema);