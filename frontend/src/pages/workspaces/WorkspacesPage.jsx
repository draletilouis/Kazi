import React, { useState } from 'react';
import { useWorkspaces } from '../../hooks/useWorkspaces';
import WorkspaceCard from '../../components/workspace/WorkspaceCard';
import Button from '../../components/common/Button';
import Modal from '../../components/common/Modal';
import Spinner from '../../components/common/Spinner';
import { useToast } from '../../context/ToastContext';
import { validateLength } from '../../utils/validation';

const WorkspacesPage = () => {
  const {
    workspaces,
    loading,
    error,
    addWorkspace,
    editWorkspace,
    removeWorkspace
  } = useWorkspaces();
  const toast = useToast();

  // Modal states
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedWorkspace, setSelectedWorkspace] = useState(null);

  // Form data
  const [formData, setFormData] = useState({ name: '', description: '' });
  const [errors, setErrors] = useState({ name: '', description: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Validate form
  const validateForm = () => {
    const nameValidation = validateLength(formData.name, 3, 50);
    const descValidation = formData.description
      ? validateLength(formData.description, 0, 500)
      : { valid: true, message: '' };

    setErrors({
      name: nameValidation.valid ? '' : nameValidation.message,
      description: descValidation.valid ? '' : descValidation.message
    });

    return nameValidation.valid && descValidation.valid;
  };

  // Handle create workspace
  const handleCreate = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      setIsSubmitting(true);
      await addWorkspace(formData);
      setShowCreateModal(false);
      setFormData({ name: '', description: '' });
      setErrors({ name: '', description: '' });
      toast.success('Workspace created successfully');
    } catch (err) {
      toast.error(err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Handle edit workspace
  const handleEditClick = (workspace) => {
    setSelectedWorkspace(workspace);
    setFormData({
      name: workspace.name,
      description: workspace.description || ''
    });
    setShowEditModal(true);
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      setIsSubmitting(true);
      await editWorkspace(selectedWorkspace.id, formData);
      setShowEditModal(false);
      setFormData({ name: '', description: '' });
      setSelectedWorkspace(null);
      setErrors({ name: '', description: '' });
      toast.success('Workspace updated successfully');
    } catch (err) {
      toast.error(err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Handle delete workspace
  const handleDelete = async (workspaceId) => {
    // Confirm before deleting
    if (window.confirm('Are you sure you want to delete this workspace?')) {
      try {
        await removeWorkspace(workspaceId);
        toast.success('Workspace deleted successfully');
      } catch (err) {
        toast.error(err.message);
      }
    }
  };

  // Loading state
  if (loading) return <Spinner />;

  // Error state
  if (error) {
    return (
      <div className="container mx-auto p-6">
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <p className="text-red-600">Error: {error}</p>
          <Button 
            variant="secondary" 
            onClick={() => window.location.reload()}
            className="mt-2"
          >
            Retry
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">My Workspaces</h1>
          <p className="text-gray-600 mt-1">
            Manage your workspaces and projects
          </p>
        </div>
        <Button onClick={() => setShowCreateModal(true)}>
          + Create Workspace
        </Button>
      </div>

      {/* Workspaces grid */}
      {workspaces.length === 0 ? (
        // Empty state
        <div className="text-center py-12">
          <svg className="mx-auto h-12 w-12 text-gray-400" /* Empty icon */>
            {/* Icon SVG */}
          </svg>
          <h3 className="mt-2 text-lg font-medium text-gray-900">
            No workspaces yet
          </h3>
          <p className="mt-1 text-gray-500">
            Get started by creating your first workspace
          </p>
          <Button 
            onClick={() => setShowCreateModal(true)}
            className="mt-4"
          >
            Create Workspace
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {workspaces.map(workspace => (
            <WorkspaceCard 
              key={workspace.id}
              workspace={workspace}
              onEdit={handleEditClick}
              onDelete={handleDelete}
            />
          ))}
        </div>
      )}

      {/* Create Modal */}
      {showCreateModal && (
        <Modal 
          onClose={() => setShowCreateModal(false)}
          title="Create Workspace"
        >
          <form onSubmit={handleCreate}>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Workspace Name * <span className="text-xs text-gray-500">({formData.name.length}/50)</span>
              </label>
              <input
                type="text"
                placeholder="My Workspace"
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 ${
                  errors.name ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-blue-500'
                }`}
                maxLength={50}
                required
              />
              {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name}</p>}
            </div>

            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Description <span className="text-xs text-gray-500">({formData.description.length}/500)</span>
              </label>
              <textarea
                placeholder="What is this workspace for?"
                value={formData.description}
                onChange={(e) => setFormData({...formData, description: e.target.value})}
                className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 ${
                  errors.description ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-blue-500'
                }`}
                rows="3"
                maxLength={500}
              />
              {errors.description && <p className="mt-1 text-sm text-red-600">{errors.description}</p>}
            </div>

            <div className="flex gap-3">
              <Button type="submit" className="flex-1" disabled={isSubmitting}>
                {isSubmitting ? 'Creating...' : 'Create'}
              </Button>
              <Button 
                type="button"
                variant="secondary"
                onClick={() => setShowCreateModal(false)}
              >
                Cancel
              </Button>
            </div>
          </form>
        </Modal>
      )}

      {/* Edit Modal */}
      {showEditModal && (
        <Modal 
          onClose={() => setShowEditModal(false)}
          title="Edit Workspace"
        >
          <form onSubmit={handleUpdate}>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Workspace Name * <span className="text-xs text-gray-500">({formData.name.length}/50)</span>
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 ${
                  errors.name ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-blue-500'
                }`}
                maxLength={50}
                required
              />
              {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name}</p>}
            </div>

            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Description <span className="text-xs text-gray-500">({formData.description.length}/500)</span>
              </label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({...formData, description: e.target.value})}
                className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 ${
                  errors.description ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-blue-500'
                }`}
                rows="3"
                maxLength={500}
              />
              {errors.description && <p className="mt-1 text-sm text-red-600">{errors.description}</p>}
            </div>

            <div className="flex gap-3">
              <Button type="submit" className="flex-1" disabled={isSubmitting}>
                {isSubmitting ? 'Updating...' : 'Update'}
              </Button>
              <Button 
                type="button"
                variant="secondary"
                onClick={() => setShowEditModal(false)}
              >
                Cancel
              </Button>
            </div>
          </form>
        </Modal>
      )}
    </div>
  );
};

export default WorkspacesPage;