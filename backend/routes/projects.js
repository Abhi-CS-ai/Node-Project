const express = require('express');
const pool = require('../db');

const router = express.Router();

// Get all projects
router.get('/', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM projects ORDER BY id ASC');
    res.status(200).json(rows);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch projects', details: err.message });
  }
});

// Add a new project
router.post('/api/employees', async (req, res) => {
  const { name, client_name, start_date, lead_by_employee_id, contact_person, contact_no, email } = req.body;

  try {
    await pool.query(
      'INSERT INTO projects (name, client_name, start_date, lead_by_employee_id, contact_person, contact_no, email) VALUES (?, ?, ?, ?, ?, ?, ?)',
      [name, client_name, start_date, lead_by_employee_id, contact_person, contact_no, email]
    );
    res.status(201).json({ message: 'Project added successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to add project', details: err.message });
  }
});

// Update a project
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { name, client_name, start_date, lead_by_employee_id, contact_person, contact_no, email } = req.body;

  try {
    await pool.query(
      'UPDATE projects SET name = ?, client_name = ?, start_date = ?, lead_by_employee_id = ?, contact_person = ?, contact_no = ?, email = ? WHERE id = ?',
      [name, client_name, start_date, lead_by_employee_id, contact_person, contact_no, email, id]
    );
    res.status(200).json({ message: 'Project updated successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to update project', details: err.message });
  }
});

// Delete a project
router.delete('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    await pool.query('DELETE FROM projects WHERE id = ?', [id]);
    res.status(200).json({ message: 'Project deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete project', details: err.message });
  }
});

module.exports = router;
