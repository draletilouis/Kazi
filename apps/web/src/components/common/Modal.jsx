const Modal = ({ 
  children,   
  onClose,    
  title      
}) => {
  return (
    // Backdrop - full screen overlay
    <div 
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
      onClick={onClose}  // Click backdrop to close
    >
      {/* Modal content box */}
      <div 
        className="bg-white rounded-lg shadow-xl p-6 max-w-md w-full mx-4 relative"
        onClick={(e) => e.stopPropagation()}  // Don't close when clicking inside
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 text-2xl font-light"
          aria-label="Close modal"
        >
          ×
        </button>

        {/* Optional title */}
        {title && (
          <h2 className="text-2xl font-bold mb-4 pr-8">{title}</h2>
        )}

        {/* Modal content */}
        <div>{children}</div>
      </div>
    </div>
  );
};

export default Modal;