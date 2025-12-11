import { useParams, Link } from 'react-router-dom';
import { useProjects } from '../../hooks/useProjects';
import { useState } from 'react';
import Button from '../../components/common/Button';
import Modal from '../../components/common/Modal';
import Spinner from '../../components/common/Spinner';

const WorkspaceDetail = () => {
  // Get workspaceId from URL
  const { workspaceId } = useParams();
  
  // Fetch projects for this workspace
  const { 
    projects, 
    loading, 
    error, 
    addProject,
    removeProject 
  } = useProjects(workspaceId);

  const [showCreateModal, setShowCreateModal] = useState(false);
  const [formData, setFormData] = useState({ 
    name: '', 
    description: '' 
  });

  // Handle create project
  const handleCreateProject = async (e) => {
    e.preventDefault();
    try {
      await addProject(formData);
      setShowCreateModal(false);
      setFormData({ name: '', description: '' });
    } catch (err) {
      alert(err.message);
    }
  };

  // Handle delete project
  const handleDeleteProject = async (projectId) => {
    if (window.confirm('Delete this project?')) {
      try {
        await removeProject(projectId);
      } catch (err) {
        alert(err.message);
      }
    }
  };

  if (loading) return <Spinner />;
  if (error) return <div className="text-red-600">Error: {error}</div>;

  return (
    <div className="container mx-auto p-6">
      {/* Breadcrumb navigation */}
      <nav className="mb-6 text-sm">
        <Link to="/workspaces" className="text-blue-600 hover:underline">
          Workspaces
        </Link>
        <span className="mx-2 text-gray-400">/</span>
        <span className="text-gray-600">Workspace Name</span>
      </nav>

      {/* Header */}
      <div className="flex justify-between items-start mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            Workspace Name
          </h1>
          <p className="text-gray-600 mt-2">
            Workspace description here
          </p>
        </div>
        <Button onClick={() => setShowCreateModal(true)}>
          + New Project
        </Button>
      </div>

      {/* Projects section */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Projects</h2>
        
        {projects.length === 0 ? (
          <div className="text-center py-8 bg-gray-50 rounded-lg">
            <p className="text-gray-500">No projects yet</p>
            <Button 
              onClick={() => setShowCreateModal(true)}
              className="mt-4"
            >
              Create First Project
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {projects.map(project => (
              <div 
                key={project.id}
                className="bg-white border rounded-lg p-4 hover:shadow-md transition-shadow"
              >
                <h3 className="font-semibold text-lg mb-2">
                  {project.name}
                </h3>
                <p className="text-gray-600 text-sm mb-4">
                  {project.description}
                </p>
                
                <div className="flex gap-2">
                  <Link 
                    to={`/workspaces/${workspaceId}/projects/${project.id}`}
                    className="flex-1"
                  >
                    <Button className="w-full">View</Button>
                  </Link>
                  <Button 
                    variant="danger"
                    onClick={() => handleDeleteProject(project.id)}
                  >
                    Delete
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Members section */}
      <div>
        <h2 className="text-xl font-semibold mb-4">Members</h2>
        <div className="bg-gray-50 rounded-lg p-4">
          <p className="text-gray-500">Members management coming soon...</p>
        </div>
      </div>

      {/* Create Project Modal */}
      {showCreateModal && (
        <Modal 
          onClose={() => setShowCreateModal(false)}
          title="Create Project"
        >
          <form onSubmit={handleCreateProject}>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Project Name *
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Description
              </label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({...formData, description: e.target.value})}
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                rows="3"
              />
            </div>

            <div className="flex gap-3">
              <Button type="submit" className="flex-1">Create</Button>
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
    </div>
  );
};

export default WorkspaceDetail;