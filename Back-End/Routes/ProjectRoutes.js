const express = require("express");
const router = express.Router();
const {
  getAllProjects,
  getProjectById,
  createProject,
  editProject,
  deleteProject,
} = require("../Controllers/ProjectController");
const upload = require("../Middlewares/upload");
const { authenticateUser } = require("../Middlewares/authUserMiddleware");

router.get("/", getAllProjects);
router.get("/:id", getProjectById);
router.post("/", authenticateUser, upload.array("images"), createProject);
router.post("/:id", authenticateUser, editProject);
router.delete("/:id", authenticateUser, deleteProject);

module.exports = router;
