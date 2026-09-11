const Project = require("../Models/ProjectModel");
const { sendMail } = require("../utils/mailer");
const {
  collectImageUrls,
  publicUploadPath,
  deleteLocalUpload,
} = require("../utils/uploads");
const path = require("path");
const { t } = require("../lib/i18n");

const getAllProjects = async (req, res) => {
  try {
    const projects = await Project.find();
    res.status(200).json(projects);
  } catch (error) {
    res.status(500).json({ message: t(req, "errors.fetchFailed") });
  }
};

const getProjectById = async (req, res) => {
  try {
    const id = req.params.id;
    const project = await Project.findById(id);
    if (!project) {
      return res.status(404).json({ message: t(req, "errors.notFound") });
    }
    res.status(200).json(project);
  } catch (error) {
    res.status(404).json({ message: t(req, "errors.notFound") });
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
    } = req.body;

    let imageUrls = collectImageUrls(req);

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
    res.status(400).json({ message: t(req, "errors.createFailed") });
  }
};

const editProject = async (req, res) => {
  try {
    const id = req.params.id;
    const existing = await Project.findById(id);
    if (!existing) {
      return res.status(404).json({ message: t(req, "errors.notFound") });
    }

    const editedData = { ...req.body };
    const uploadedUrls = collectImageUrls(req);
    if (uploadedUrls.length > 0) {
      editedData.images = uploadedUrls;
    }

    const editedProject = await Project.findByIdAndUpdate(id, editedData, {
      new: true,
      runValidators: true,
    });

    res.status(200).json(editedProject);
  } catch (error) {
    return res.status(500).json({ message: t(req, "errors.updateFailed") });
  }
};

const deleteProject = async (req, res) => {
  try {
    const id = req.params.id;
    const deletedProject = await Project.findByIdAndDelete(id);
    if (!deletedProject) {
      return res.status(404).json({ message: t(req, "errors.notFound") });
    }

    (deletedProject.images || []).forEach(deleteLocalUpload);

    res.status(200).json(deletedProject);
  } catch (error) {
    return res.status(500).json({ message: t(req, "errors.deleteFailed") });
  }
};

const uploadImages = async (req, res) => {
  try {
    const urls = (req.files || []).map((file) =>
      publicUploadPath(path.basename(file.filename))
    );
    if (urls.length === 0) {
      return res.status(400).json({ message: t(req, "errors.noImages") });
    }
    res.status(201).json({ urls });
  } catch (error) {
    res.status(400).json({ message: t(req, "errors.uploadFailed") });
  }
};

// Contact Project Controller
const contactProject = async (req, res) => {
  try {
    const { name, email, phone, project, subject, message } = req.body;
    if (!name || !email || !phone) {
      return res.status(400).json({ message: t(req, "errors.missingFields") });
    }
    if (project) {
      // Project inquiry
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
      return res.json({ success: true, message: t(req, "success.contact") });
    } else {
      // General/complaint form
      if (!subject || !message) {
        return res
          .status(400)
          .json({ message: t(req, "errors.missingSubject") });
      }
      const mailOptions = {
        to:
          process.env.CONTACT_RECEIVER ||
          process.env.SMTP_USER ||
          "your@email.com",
        subject: `New Complaint/Contact: ${subject}`,
        text: `You have received a new contact/complaint form.\n\nName: ${name}\nEmail: ${email}\nPhone: ${phone}\nSubject: ${subject}\nMessage: ${message}`,
        html: `<h2>New Contact/Complaint Form</h2>
          <p><b>Name:</b> ${name}</p>
          <p><b>Email:</b> ${email}</p>
          <p><b>Phone:</b> ${phone}</p>
          <p><b>Subject:</b> ${subject}</p>
          <p><b>Message:</b> ${message}</p>`,
      };
      await sendMail(mailOptions);
      return res.json({ success: true, message: t(req, "success.contact") });
    }
  } catch (err) {
    console.error("Contact Project Error:", err);
    res.status(500).json({ message: t(req, "errors.emailFailed") });
  }
};

module.exports = {
  getAllProjects,
  getProjectById,
  createProject,
  editProject,
  deleteProject,
  uploadImages,
  contactProject,
};
