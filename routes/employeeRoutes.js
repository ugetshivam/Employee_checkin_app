const express = require('express');
const router = express.Router();
const Employee = require('../models/employee');
const sgMail = require('@sendgrid/mail')
sgMail.setApiKey(process.env.API_KEY)
// Show All Employees
router.get('/employees', async (req,res)=>{
    const employees = await Employee.find({});
    res.render('employees/index', {employees});
});

// Create a new employee
router.get('/employees/new', (req,res)=>{
    res.render('employees/new');
});

//Make changes with payload
router.post('/employees', async (req,res)=>{
    const newEmployee = {
        ...req.body
    };
    const msg = {
        to: newEmployee.email, // Change to your recipient
        from: process.env.SENDER, // Change to your verified sender
        subject: 'New Employee',
        text: 'Welcome to the company, you have been added to the database',
        html: '<strong>Welcome to the company, you have been added to the database</strong>',
      }
      sgMail
        .send(msg)
        .then(() => {
          console.log('Email sent for new employee')
        })
        .catch((error) => {
          console.error(error)
        })
    await Employee.create(newEmployee);
    res.redirect('/employees');
});
// show employee
router.get('/employees/:id', async (req, res) => {
    
    const { id } = req.params;

    const employee = await Employee.findById(id);

    res.render('employees/show', { employee });
});

// get a prefilled form for editing
router.get('/employees/:id/edit', async (req,res)=>{
    const {id} = req.params;

    const employee = await Employee.findById(id);

    res.render('employees/edit', {employee});
});
// updating the employee with the given payload
router.patch('/employees/:id', async (req, res) => {
    var today = new Date();
    var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
    var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    var dateTime = date+' '+time;
    const { id } = req.params;
    const currEmployee = await Employee.findById(id);
    // console.log(currEmployee.status);
    const updatedEmployee = req.body;
    if(updatedEmployee.status === 'on'){
      updatedEmployee.status = true;
    }
    else{
      updatedEmployee.status = false;
    }
    // console.log(updatedEmployee.status);
    if(updatedEmployee.status && !currEmployee.status){
        updatedEmployee.timeIn = dateTime;
        const msg = {
            to: updatedEmployee.email, // Change to your recipient
            from: process.env.SENDER, // Change to your verified sender
            subject: 'Status',
            text: 'You Just Checked In',
            html: '<strong>You Just Checked In</strong>',
          }
          sgMail
            .send(msg)
            .then(() => {
              console.log('Email sent')
            })
            .catch((error) => {
              console.error(error)
            })
    }
    
       else if(!updatedEmployee.status && currEmployee.status){
        updatedEmployee.timeOut = dateTime;
        const msg = {
            to: updatedEmployee.email, // Change to your recipient
            from: process.env.SENDER, // Change to your verified sender
            subject: 'Status',
            text: 'You Just Checked Out',
            html: '<strong>You Just Checked Out</strong>',
          }
          sgMail
            .send(msg)
            .then(() => {
              console.log('Email sent')
            })
            .catch((error) => {
              console.error(error)
            })
          }
    


    // console.log(updatedEmployee);
    await Employee.findByIdAndUpdate(id, updatedEmployee);


    res.redirect(`/employees/${id}`);
});


router.delete('/employees/:id', async (req, res) => {

    const { id } = req.params;
    
    await Employee.findOneAndDelete(id);

    res.redirect('/employees');
});

module.exports = router;