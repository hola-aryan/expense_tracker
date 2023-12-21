const path = require('path');
const express = require('express');

const cors = require('cors');

const sequelize = require('./util/database');

const app = express();

// Middleware
app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json()); // Add JSON body parsing middleware

// Routes
const expenseRoutes = require('./routes/expenseRoutes');

// Middleware function that serves static files and assets from frontend directory.
app.use(express.static(path.join(__dirname, 'front_end')));

app.use('/', expenseRoutes);

app.get('/', (req, res) => {
  const indexPath = path.join(__dirname, './front_end/index.html');
  res.sendFile(indexPath);
});

// Database synchronization
// method that synchronizes all defined models with the database by creating or updating the database table schema based on the model definitions
sequelize.sync()
  .then(() => {
    console.log('Database synchronized.');
    // Start the server after the database syncs successfully
    app.listen(2500 || process.env.PORT , () => {
      console.log('Server is running on port 2500');
    });    
  })
  .catch(err => {
    console.error('Error syncing database:', err);
  });