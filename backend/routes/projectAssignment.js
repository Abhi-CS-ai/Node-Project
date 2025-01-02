const express = require("express");
const pool = require("../db");
const router = express.Router();

// Get all project assignments
router.get("/", async (req, res) => {
    try {
        const result = await pool.query(
            "SELECT PA.AssignmentID, P.ProjectName, E.Name AS LeadBy, PA.AssignedDate, PA.Role " +
            "FROM projectemployeeassignments PA JOIN Projects P ON PA.ProjectID = P.ProjectID JOIN Employees E ON P.LeadByEmployeeID = E.EmployeeIDORDER BY PA.AssignmentID ASC"
        );
        res.json(result.rows);
    } catch (err) {
        res.status(500).send(err.message);
    }
});

// Add a new assignment
router.post("/", async (req, res) => {
    const { projectID, employeeID, assignedDate, role } = req.body;
    try {
        const result = await pool.query(
            "INSERT INTO projectemployeeassignments (ProjectID, EmployeeID, AssignedDate, Role) VALUES ($1, $2, $3, $4) RETURNING *",
            [projectID, employeeID, assignedDate, role]


        );
        res.json(result.rows[0]);
    } catch (err) {
        res.status(500).send(err.message);
    }
});

module.exports = router;
