const express = require("express");
const router = express.Router();
const {
  getAllProjects,
  getProjectById,
  createProject,
  editProject,
  deleteProject,
} = require("../Controllers/ProjectController");

router.get("/", getAllProjects);
router.get("/:id", getProjectById);
router.post("/", createProject);
router.post("/:id", editProject);
router.delete("/:id", deleteProject);

module.exports = router;
