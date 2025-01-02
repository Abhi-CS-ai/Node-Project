const express = require("express");
const pool = require("../db");
const router = express.Router();

// Get all employees
router.get("/", async (req, res) => {
  try {
    const result = await pool.query("USE employee_nr SELECT * FROM employees ORDER BY EmployeeID ASC");
    res.json(result.rows);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

// Add a new employee
router.post("/", async (req, res) => {
  const { name, contactNo, email, department, password } = req.body;
  try {
    const result = await pool.query(
      "USE employee_nr INSERT INTO employees (Name, ContactNo, Email, Department, Password) VALUES ($1, $2, $3, $4, $5) RETURNING *",
      [name, contactNo, email, department, password]
    );
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

// Update employee
router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { name, contactNo, email, department, password } = req.body;
  try {
    await pool.query(
      "USE employee_nr UPDATE employees SET Name=$1, ContactNo=$2, Email=$3, Department=$4, Password=$5 WHERE EmployeeID=$6",
      [name, contactNo, email, department, password, id]
    );
    res.send("Employee updated successfully!");
  } catch (err) {
    res.status(500).send(err.message);
  }
});

// Delete employee
router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    await pool.query("USE employee_nr DELETE FROM employees WHERE EmployeeID=$1", [id]);
    res.send("Employee deleted successfully!");
  } catch (err) {
    res.status(500).send(err.message);
  }
});

module.exports = router;
