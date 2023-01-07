//import mongoose
const mongoose = require('mongoose');

//create member schema with name, email, password as string
const employeeSchema = new mongoose.Schema({
    employee_id: String,
    name: String,
    age: Number,
    salary: Number,
    department: String,
    added_by_user_id: String,
});

//export model with name Member and schema memberSchema
module.exports = mongoose.model('employees', employeeSchema);