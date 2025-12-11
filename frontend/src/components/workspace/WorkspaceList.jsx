import { Link } from 'react-router-dom';
import Button from '../common/Button';

const WorkspaceCard = ({ 
  workspace,        // Workspace object with id, name, description, etc.
  onEdit,          // Function to edit workspace
  onDelete         // Function to delete workspace
}) => {
  
  return (
    <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
      {/* Workspace header */}
      <div className="mb-4">
        <h3 className="text-xl font-bold text-gray-900 mb-2">
          {workspace.name}
        </h3>
        <p className="text-gray-600 text-sm line-clamp-2">
          {workspace.description || 'No description'}
        </p>
      </div>

      {/* Workspace stats */}
      <div className="flex items-center gap-4 mb-4 text-sm text-gray-500">
        <div className="flex items-center gap-1">
          <svg className="w-4 h-4" /* Project icon */>
            {/* Icon SVG path */}
          </svg>
          <span>{workspace.projectCount || 0} Projects</span>
        </div>
        <div className="flex items-center gap-1">
          <svg className="w-4 h-4" /* Members icon */>
            {/* Icon SVG path */}
          </svg>
          <span>{workspace.memberCount || 0} Members</span>
        </div>
      </div>

      {/* Action buttons */}
      <div className="flex gap-2">
        {/* Navigate to workspace details */}
        <Link 
          to={`/workspaces/${workspace.id}`}
          className="flex-1"
        >
          <Button className="w-full">
            View
          </Button>
        </Link>

        {/* Edit button */}
        <Button 
          variant="secondary"
          onClick={() => onEdit(workspace)}
        >
          Edit
        </Button>

        {/* Delete button */}
        <Button 
          variant="danger"
          onClick={() => onDelete(workspace.id)}
        >
          Delete
        </Button>
      </div>
    </div>
  );
};

export default WorkspaceCard;