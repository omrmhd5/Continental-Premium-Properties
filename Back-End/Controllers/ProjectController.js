const fs = require("fs");
const cloudinary = require("../utils/cloudinary");
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
      features,
      images,
    } = req.body;

    let imageUrls = [];

    if (req.files && req.files.length > 0) {
      for (const file of req.files) {
        const result = await cloudinary.uploader.upload(file.path);
        imageUrls.push(result.secure_url);
        fs.unlinkSync(file.path);
      }
    } else if (images && images.length > 0) {
      imageUrls = images;
    }

    const newProject = new Project({
      title,
      status,
      location,
      price,
      date: date ? new Date(date) : undefined,
      description,
      area,
      bedrooms,
      bathrooms,
      floors,
      images: imageUrls,
      features,
    });

    const savedProject = await newProject.save();
    res.status(201).json(savedProject);
  } catch (error) {
    console.error("Error in createProject:", error);
    res.status(400).json({ message: error.message });
  }
};

const editProject = async (req, res) => {
  try {
    const id = req.params.id;
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
      features,
      images, // existing images from frontend
    } = req.body;

    let imageUrls = [];

    // Handle new file uploads
    if (req.files && req.files.length > 0) {
      for (const file of req.files) {
        const result = await cloudinary.uploader.upload(file.path);
        imageUrls.push(result.secure_url);
        fs.unlinkSync(file.path);
      }
    }

    // Handle existing images (URLs that were already uploaded)
    if (images && images.length > 0) {
      // Filter out any empty strings or invalid URLs
      const existingImages = images.filter(
        (img) => img && typeof img === "string"
      );
      imageUrls = [...imageUrls, ...existingImages];
    }

    const updateData = {
      title,
      status,
      location,
      price,
      date: date ? new Date(date) : undefined,
      description,
      area,
      bedrooms,
      bathrooms,
      floors,
      images: imageUrls,
      features,
    };

    const editedProject = await Project.findByIdAndUpdate(id, updateData, {
      new: true,
      runValidators: true,
    });

    if (!editedProject) {
      return res.status(404).json({ message: "Project not found" });
    }

    res.status(200).json(editedProject);
  } catch (error) {
    console.error("Error in editProject:", error);
    res.status(500).json({ message: error.message || "Something went wrong" });
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
