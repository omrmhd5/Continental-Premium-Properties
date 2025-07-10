const fs = require("fs");
const cloudinary = require("../utils/cloudinary");
const Project = require("../Models/ProjectModel");
const { sendMail } = require("../utils/mailer");

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
    return res
      .status(500)
      .json({ message: error.message || "Something went wrong" });
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

// Contact Project Controller
const contactProject = async (req, res) => {
  try {
    const { name, email, phone, project } = req.body;
    if (!name || !email || !phone || !project) {
      return res.status(400).json({ message: "Missing required fields." });
    }
    const mailOptions = {
      to:
        process.env.CONTACT_RECEIVER ||
        process.env.SMTP_USER ||
        "your@email.com",
      subject: `New Project Inquiry: ${project.title || project.name}`,
      text: `You have a new inquiry for project: ${
        project.title || project.name
      }\nLocation: ${
        project.location
      }\n\nName: ${name}\nEmail: ${email}\nPhone: ${phone}`,
      html: `<h2>New Project Inquiry</h2>
        <p><b>Project:</b> ${project.title || project.name}</p>
        <p><b>Location:</b> ${project.location}</p>
        <hr/>
        <p><b>Name:</b> ${name}</p>
        <p><b>Email:</b> ${email}</p>
        <p><b>Phone:</b> ${phone}</p>`,
    };
    await sendMail(mailOptions);
    res.json({ success: true });
  } catch (err) {
    console.error("Contact Project Error:", err);
    res.status(500).json({ message: "Failed to send email." });
  }
};

module.exports = {
  getAllProjects,
  getProjectById,
  createProject,
  editProject,
  deleteProject,
  contactProject,
};
