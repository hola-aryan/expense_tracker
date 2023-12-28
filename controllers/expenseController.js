const expenseModels = require('../models/expenseModels');
const { Op } = require('sequelize');

exports.login = async (req, res) => {
  const { name, password } = req.body;

  try {
    // Check if the user exists with the provided name
    const existingUser = await expenseModels.findOne({
      where: {
        names: {
          [Op.eq]: name,
        },
      },
    });

    if (existingUser && existingUser.passwords === password) {
      console.log('User login successful');
      return res.status(200).json({ message: 'User login successful' });
    } else {
      console.log('Invalid credentials');
      return res.status(401).json({ message: 'User not authorized' });
    }
  } catch (error) {
    console.error('Error during login:', error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
}; 

exports.addUser = async (req, res, next) => {
    console.log('Request received:', req.body); // Log the request body to check if data is reaching the server
  
    const names = req.body.names;
    const emails = req.body.emails;
    const passwords = req.body.passwords;
    
    let exist = false;
    
    const existingUser = await expenseModels.findOne({
      where: {
        names: {
          [Op.eq]: names,
        },
      },
    });
    

    if (existingUser) {
        console.log("Pehle se hai"); 
        return;
    }
    else{
        try {
            const data = await expenseModels.create({ names, emails, passwords });
            console.log("Data added to the database:", data);
            res.status(201).json({ newExpenseDetail: data });
          } catch (error) {
            console.error('Error adding data to the database:', error);
            console.log("The value is not added");
            res.status(500).json({ error: 'Internal Server Error' });
          }
    }
    
  }; 

  