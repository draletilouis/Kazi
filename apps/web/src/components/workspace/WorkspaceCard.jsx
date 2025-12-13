import { Link } from 'react-router-dom';

const WorkspaceCard = ({ workspace, onEdit, onDelete }) => {
  return (
    <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow p-6">
      {/* Workspace name - clickable to detail */}
      <Link to={`/workspaces/${workspace.id}`}>
        <h3 className="text-xl font-bold text-gray-900 hover:text-blue-600 mb-2">
          {workspace.name}
        </h3>
      </Link>

      {/* Description */}
      <p className="text-gray-600 text-sm mb-4 line-clamp-2">
        {workspace.description || 'No description'}
      </p>

      {/* Footer with actions */}
      <div className="flex items-center justify-between pt-4 border-t border-gray-200">
        <div className="text-sm text-gray-500">
          {workspace.memberCount || 0} members
        </div>

        {/* Action buttons */}
        <div className="flex space-x-2">
          <button
            onClick={() => onEdit(workspace)}
            className="px-3 py-1 text-sm text-blue-600 hover:bg-blue-50 rounded transition-colors"
          >
            Edit
          </button>
          <button
            onClick={() => onDelete(workspace.id)}
            className="px-3 py-1 text-sm text-red-600 hover:bg-red-50 rounded transition-colors"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default WorkspaceCard;
