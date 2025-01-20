const express = require('express');
const pool = require('../db');

const router = express.Router();

// Get all employees
router.get('/', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM Employees ORDER BY id ASC');
    res.status(200).json(rows);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch employees', details: err.message });
  }
});

// Add a new employee
router.post('/', async (req, res) => {
  const { name, contact_no, email, department, password, gender, role } = req.body;

  try {
    await pool.query(
      'INSERT INTO Employees (name, contact_no, email, department, password, gender, role) VALUES (?, ?, ?, ?, ?, ?, ?)',
      [name, contact_no, email, department, password, gender, role]
    );
    res.status(201).json({ message: 'Employee added successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to add employee', details: err.message });
  }
});

// Update an employee
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { name, contact_no, email, department, password, gender, role } = req.body;

  try {
    await pool.query(
      'UPDATE Employees SET name = ?, contact_no = ?, email = ?, department = ?, password = ?, gender = ?, role = ? WHERE id = ?',
      [name, contact_no, email, department, password, gender, role, id]
    );
    res.status(200).json({ message: 'Employee updated successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to update employee', details: err.message });
  }
});

// Delete an employee
router.delete('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    await pool.query('DELETE FROM Employees WHERE id = ?', [id]);
    res.status(200).json({ message: 'Employee deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete employee', details: err.message });
  }
});

module.exports = router;
