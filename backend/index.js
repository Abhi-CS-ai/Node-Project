const express = require('express');
const bodyParser = require('body-parser');
const userRoutes = require('./routes/users');
const pool = require('./db');

const app = express();
app.use(bodyParser.json());

// Routes
app.use('/users', userRoutes);

// Test DB connection
pool.query('SELECT NOW()', (err, res) => {
  if (err) {
    console.error('Error connecting to database:', err);
  } else {
    console.log('Database connected:', res.rows[0]);
  }
});

// Start server
const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
