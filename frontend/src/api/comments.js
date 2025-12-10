import apiClient from './apiClient';

// Fetch all comments for task
export const getComments = async (taskId) => {
  const response = await apiClient.get(`/tasks/${taskId}/comments`);
  return response.data;
};

// Create new comment
export const createComment = async (taskId, commentData) => {
  const response = await apiClient.post(`/tasks/${taskId}/comments`, commentData);
  return response.data;
};

// Update comment
export const updateComment = async (taskId, commentId, commentData) => {
  const response = await apiClient.put(
    `/tasks/${taskId}/comments/${commentId}`,
    commentData
  );
  return response.data;
};

// Delete comment
export const deleteComment = async (taskId, commentId) => {
  const response = await apiClient.delete(
    `/tasks/${taskId}/comments/${commentId}`
  );
  return response.data;
};