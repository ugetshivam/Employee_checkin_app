const mongoose = require('mongoose');

const employeeSchema = mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    mobile:{
        type:String,
        minLength:10,
        maxLength:10
    },
    department:{
        type:String,
        required:true
    },
    status:{
        type:Boolean,
        default:false
    },
    timeIn:{
        type:String,
        default:"No data"
    },
    timeOut:{
        type:String,
        default:"No data"
    }
});

const Employee = mongoose.model('Employee', employeeSchema);

module.exports = Employee;