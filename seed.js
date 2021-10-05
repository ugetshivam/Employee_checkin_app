const Employee = require('./models/employee');

const employees = [
    {
        name:"Shivam",
        email:"blah@gmail.com",
        mobile:"2XXXXXXXXX",
        department:"Software",
        status:false
    },
    {
        name:"Devika",
        email:"abc@suck.in",
        mobile:"99021XXXXX",
        department:"Design",
        status:false
    }
];

const seedDB = async ()=>{
    await Employee.deleteMany({});
    await Employee.insertMany(employees);
    console.log('DB Seeded');
};

module.exports = seedDB;
