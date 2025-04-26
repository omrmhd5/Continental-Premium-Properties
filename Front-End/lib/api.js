const API_BASE_URL = "http://localhost:3001/api";

export const projectApi = {
  // Get all projects
  getAllProjects: async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/projects`);
      if (!response.ok) {
        const errorData = await response.json().catch(() => null);
        throw new Error(errorData?.message || "Failed to fetch projects");
      }
      return await response.json();
    } catch (error) {
      console.error("Error fetching projects:", error);
      throw error;
    }
  },

  // Get project by ID
  getProjectById: async (id) => {
    try {
      const response = await fetch(`${API_BASE_URL}/projects/${id}`);
      if (!response.ok) {
        const errorData = await response.json().catch(() => null);
        throw new Error(errorData?.message || "Failed to fetch project");
      }
      return await response.json();
    } catch (error) {
      console.error("Error fetching project:", error);
      throw error;
    }
  },

  // Create new project
  createProject: async (projectData) => {
    try {
      const response = await fetch(`${API_BASE_URL}/projects`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(projectData),
      });
      if (!response.ok) {
        const errorData = await response.json().catch(() => null);
        throw new Error(errorData?.message || "Failed to create project");
      }
      return await response.json();
    } catch (error) {
      console.error("Error creating project:", error);
      throw error;
    }
  },

  // Update project
  updateProject: async (id, projectData) => {
    try {
      const response = await fetch(`${API_BASE_URL}/projects/${id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(projectData),
      });
      if (!response.ok) {
        const errorData = await response.json().catch(() => null);
        throw new Error(errorData?.message || "Failed to update project");
      }
      return await response.json();
    } catch (error) {
      console.error("Error updating project:", error);
      throw error;
    }
  },

  // Delete project
  deleteProject: async (id) => {
    try {
      const response = await fetch(`${API_BASE_URL}/projects/${id}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        const errorData = await response.json().catch(() => null);
        throw new Error(errorData?.message || "Failed to delete project");
      }
      return await response.json();
    } catch (error) {
      console.error("Error deleting project:", error);
      throw error;
    }
  },
};
