import apiClient from "./client";

// Fetch all tasks in project
export const getTasks = async (workspaceId, projectId) => {
  const response = await apiClient.get(
    `/workspaces/${workspaceId}/projects/${projectId}/tasks`
  );
  return response.data;
};

// Create new task
export const createTask = async (workspaceId, projectId, taskData) => {
  const response = await apiClient.post(
    `/workspaces/${workspaceId}/projects/${projectId}/tasks`,
    taskData
  );
  return response.data;
};

// Update task details
export const updateTask = async (workspaceId, projectId, taskId, taskData) => {
  const response = await apiClient.put(
    `/workspaces/${workspaceId}/projects/${projectId}/tasks/${taskId}`,
    taskData
  );
  return response.data;
};

// Delete task
export const deleteTask = async (workspaceId, projectId, taskId) => {
  const response = await apiClient.delete(
    `/workspaces/${workspaceId}/projects/${projectId}/tasks/${taskId}`
  );
  return response.data;
};
