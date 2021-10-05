if(process.env.NODE_ENV !== 'production'){
    require('dotenv').config();
}
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const path = require('path');
const methodOverride = require('method-override');
const seedDB = require('./seed');
mongoose.connect(process.env.MONGO_URL)
    .then(() => console.log('DB Connected'))
    .catch((err) => console.log(err));

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));

// seedDB();


const employeeRoutes = require('./routes/employeeRoutes');

app.get('/', (req,res)=>{
    res.render('employees/home');
})

app.use(employeeRoutes);


app.listen(process.env.PORT || 2323, (req,res)=>{
    console.log('Server Connected at port 2323.....');
});