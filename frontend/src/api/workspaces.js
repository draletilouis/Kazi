import apiClient from "./client";

// Fetch all workspaces for current user
export const getWorkspaces = async () => {
  const response = await apiClient.get("/workspaces");
  return response.data;
};

// Create new workspace
export const createWorkspace = async (workspaceData) => {
  const response = await apiClient.post("/workspaces", workspaceData);
  return response.data;
};

// Update workspace details
export const updateWorkspace = async (workspaceId, workspaceData) => {
  const response = await apiClient.put(`/workspaces/${workspaceId}`, workspaceData);
  return response.data;
};

// Delete workspace
export const deleteWorkspace = async (workspaceId) => {
  const response = await apiClient.delete(`/workspaces/${workspaceId}`);
  return response.data;
};

// Add member to workspace
export const addWorkspaceMember = async (workspaceId, memberData) => {
  const response = await apiClient.post(
    `/workspaces/${workspaceId}/members`,
    memberData
  );
  return response.data;
};

// Remove member from workspace
export const removeWorkspaceMember = async (workspaceId, memberId) => {
  const response = await apiClient.delete(
    `/workspaces/${workspaceId}/members/${memberId}`
  );
  return response.data;
};