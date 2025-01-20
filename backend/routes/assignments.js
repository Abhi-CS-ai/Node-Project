const express = require('express');
const pool = require('../db');

const router = express.Router();

// Get all assignments
router.get('/', async (req, res) => {
  try {
    const [rows] = await pool.query(
      `SELECT a.id, p.name AS project_name, e.name AS employee_name, a.assigned_date, a.role
       FROM project_employee_assignments a
       JOIN projects p ON a.project_id = p.id
       JOIN employees e ON a.employee_id = e.id
       ORDER BY a.id ASC`
    );
    res.status(200).json(rows);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch assignments', details: err.message });
  }
});

// Add a new assignment
router.post('/', async (req, res) => {
  const { project_id, employee_id, assigned_date, role } = req.body;

  try {
    await pool.query(
      'INSERT INTO project_employee_assignments (project_id, employee_id, assigned_date, role) VALUES (?, ?, ?, ?)',
      [project_id, employee_id, assigned_date, role]
    );
    res.status(201).json({ message: 'Assignment added successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to add assignment', details: err.message });
  }
});

// Delete an assignment
router.delete('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    await pool.query('DELETE FROM project_employee_assignments WHERE id = ?', [id]);
    res.status(200).json({ message: 'Assignment deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete assignment', details: err.message });
  }
});

module.exports = router;
