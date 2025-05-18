const Project = require("../Models/ProjectModel");

const getAllProjects = async (req, res) => {
  try {
    const projects = await Project.find();
    res.status(200).json(projects);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getProjectById = async (req, res) => {
  try {
    const id = req.params.id;
    const project = await Project.findById(id);
    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }
    res.status(200).json(project);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

const createProject = async (req, res) => {
  try {
    const {
      title,
      status,
      location,
      price,
      date,
      description,
      area,
      bedrooms,
      bathrooms,
      floors,
      images,
      features,
    } = req.body;

    const newProject = new Project({
      title,
      status,
      location,
      price,
      date: new Date(date),
      description,
      area,
      bedrooms,
      bathrooms,
      floors,
      images,
      features,
    });

    const savedProject = await newProject.save();
    res.status(201).json(savedProject);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const editProject = async (req, res) => {
  try {
    const id = req.params.id;
    const editedData = req.body;

    const editedProject = await Project.findByIdAndUpdate(id, editedData, {
      new: true,
      runValidators: true,
    });

    if (!editedProject) {
      return res.status(404).json({ message: "Project not found" });
    }

    res.status(200).json(editedProject);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Something went wrong" });
  }
};

const deleteProject = async (req, res) => {
  try {
    const id = req.params.id;
    const deletedProject = await Project.findByIdAndDelete(id);
    if (!deletedProject) {
      return res.status(404).json({ message: "Project not found" });
    }
    res.status(200).json(deletedProject);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getAllProjects,
  getProjectById,
  createProject,
  editProject,
  deleteProject,
};
