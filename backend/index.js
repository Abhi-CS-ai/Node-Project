const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const userRoutes = require('./routes/users');
const employeeRoutes = require('./routes/employees');
const projectRoutes = require('./routes/projects');
const assignmentRoutes = require('./routes/assignments');

const app = express();

app.use(cors({
  origin: 'http://localhost:4200', // Allow specific origin
}));

app.use(bodyParser.json());

// Routes
app.use('/api/users', userRoutes);
app.use('/api/employees', employeeRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api/assignments', assignmentRoutes);

// Start server
const PORT = 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
