//call mongoose
const mongoose = require('mongoose');
//create a connection
mongoose.connect('mongodb://localhost:27017/employee', {useNewUrlParser: true}, (err) => {
    if(!err) { console.log('MongoDB Connection Succeeded.')}
    else { console.log('Error in DB connection : ' + err)}
});