const API_BASE_URL = "http://localhost:5000/api";

// Helper function to get headers with auth token
const getHeaders = () => {
  const token = localStorage.getItem("adminToken");
  return {
    "Content-Type": "application/json",
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };
};

// Helper function to format date to YYYY-MM-DD
const formatDate = (date) => {
  const d = new Date(date);
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

// Helper function to format project data
const formatProjectData = (projectData) => {
  const formattedData = { ...projectData };

  // Format date if it exists
  if (formattedData.date) {
    // If it's already a valid date string, use it
    if (new Date(formattedData.date).toString() !== "Invalid Date") {
      formattedData.date = formatDate(formattedData.date);
    } else {
      // If no valid date, use current date
      formattedData.date = formatDate(new Date());
    }
  } else {
    // If no date provided, use current date
    formattedData.date = formatDate(new Date());
  }

  return formattedData;
};

// Helper function to format project response
const formatProjectResponse = (project) => {
  if (Array.isArray(project)) {
    return project.map((p) => ({
      ...p,
      date: formatDate(p.date),
    }));
  }
  return {
    ...project,
    date: formatDate(project.date),
  };
};

export const projectApi = {
  // Get all projects
  getAllProjects: async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/projects`, {
        headers: getHeaders(),
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to fetch projects");
      }
      const data = await response.json();
      return formatProjectResponse(data);
    } catch (error) {
      throw error;
    }
  },

  // Get project by ID
  getProjectById: async (id) => {
    try {
      const response = await fetch(`${API_BASE_URL}/projects/${id}`, {
        headers: getHeaders(),
      });
      if (!response.ok) {
        const errorData = await response.json();
        if (response.status === 404) {
          throw new Error("Project not found");
        }
        throw new Error(errorData.message || "Failed to fetch project");
      }
      const data = await response.json();
      return formatProjectResponse(data);
    } catch (error) {
      throw error;
    }
  },

  // Create new project
  createProject: async (projectData) => {
    try {
      const formattedData = formatProjectData(projectData);
      const response = await fetch(`${API_BASE_URL}/projects`, {
        method: "POST",
        headers: getHeaders(),
        body: JSON.stringify(formattedData),
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to create project");
      }
      const data = await response.json();
      return formatProjectResponse(data);
    } catch (error) {
      throw error;
    }
  },

  // Update project
  updateProject: async (id, projectData) => {
    try {
      const formattedData = formatProjectData(projectData);
      const response = await fetch(`${API_BASE_URL}/projects/${id}`, {
        method: "PUT",
        headers: getHeaders(),
        body: JSON.stringify(formattedData),
      });
      if (!response.ok) {
        const errorData = await response.json();
        if (response.status === 404) {
          throw new Error("Project not found");
        }
        throw new Error(errorData.message || "Failed to update project");
      }
      const data = await response.json();
      return formatProjectResponse(data);
    } catch (error) {
      throw error;
    }
  },

  // Delete project
  deleteProject: async (id) => {
    try {
      const response = await fetch(`${API_BASE_URL}/projects/${id}`, {
        method: "DELETE",
        headers: getHeaders(),
      });
      if (!response.ok) {
        const errorData = await response.json();
        if (response.status === 404) {
          throw new Error("Project not found");
        }
        throw new Error(errorData.message || "Failed to delete project");
      }
      const data = await response.json();
      return formatProjectResponse(data);
    } catch (error) {
      throw error;
    }
  },
};
