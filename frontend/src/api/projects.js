import apiClient from "./client";

// Fetch all projects in workspace
export const getProjects = async (workspaceId) => {
  const response = await apiClient.get(`/workspaces/${workspaceId}/projects`);
  return response.data;
};

// Create new project
export const createProject = async (workspaceId, projectData) => {
  const response = await apiClient.post(
    `/workspaces/${workspaceId}/projects`,
    projectData
  );
  return response.data;
};

// Update project details
export const updateProject = async (workspaceId, projectId, projectData) => {
  const response = await apiClient.put(
    `/workspaces/${workspaceId}/projects/${projectId}`,
    projectData
  );
  return response.data;
};

// Delete project
export const deleteProject = async (workspaceId, projectId) => {
  const response = await apiClient.delete(
    `/workspaces/${workspaceId}/projects/${projectId}`
  );
  return response.data;
};