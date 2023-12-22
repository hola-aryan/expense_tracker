const expenseModels = require('../models/expenseModels');
const { Op } = require('sequelize');

exports.addUser = async (req, res, next) => {
    console.log('Request received:', req.body); // Log the request body to check if data is reaching the server
  
    const names = req.body.names;
    const emails = req.body.emails;
    const passwords = req.body.passwords;
    
    let exist = false;
    
    const existingUser = await expenseModels.findOne({
        where: {
            emails: {
                [Op.eq]: emails,
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

  exports.signInUser = async (req, res, next) => {
    console.log('Sign-in request received:', req.body);
  
    const { names, passwords } = req.body;
  
    try {
      // Check if the user exists with the provided name
      const existingUser = await expenseModels.findOne({
        where: {
          names: {
            [Op.eq]: names,
          },
        },
      });
  
      if (existingUser && existingUser.passwords === passwords) {
        console.log('User credentials are correct, redirecting to third page');
        // You can customize the redirect URL based on your route structure
        res.redirect('/signedIn');
      } else {
        console.log('Invalid credentials, redirecting to signIn page');
        // You can customize the redirect URL based on your route structure
        res.redirect('/signIn');
      }
    } catch (error) {
      console.error('Error processing sign-in:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };
  