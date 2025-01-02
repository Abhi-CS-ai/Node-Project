const express = require("express");
const pool = require("../db");
const router = express.Router();

// Get all projects
router.get("/", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM Projects ORDER BY ProjectID ASC");
    res.json(result.rows);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

// Add a new project
router.post("/", async (req, res) => {
  const { projectName, clientName, startDate, leadByEmployeeID, contactPerson, contactNo, emailId } = req.body;
  try {
    const result = await pool.query(
      "INSERT INTO Projects (ProjectName, ClientName, StartDate, LeadByEmployeeID, ContactPerson, ContactNo, EmailId) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *",
      [projectName, clientName, startDate, leadByEmployeeID, contactPerson, contactNo, emailId]
    );
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

// Update project
router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { projectName, clientName, startDate, leadByEmployeeID, contactPerson, contactNo, emailId } = req.body;
  try {
    await pool.query(
      "UPDATE Projects SET ProjectName=$1, ClientName=$2, StartDate=$3, LeadByEmployeeID=$4, ContactPerson=$5, ContactNo=$6, EmailId=$7 WHERE ProjectID=$8",
      [projectName, clientName, startDate, leadByEmployeeID, contactPerson, contactNo, emailId, id]
    );
    res.send("Project updated successfully!");
  } catch (err) {
    res.status(500).send(err.message);
  }
});

// Delete project
router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    await pool.query("DELETE FROM projects WHERE ProjectID=$1", [id]);
    res.send("Project deleted successfully!");
  } catch (err) {
    res.status(500).send(err.message);
  }
});

module.exports = router;
