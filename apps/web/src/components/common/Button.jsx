const Button = ({ 
  children,           // Button text/content
  onClick,            // Click handler function
  type = 'button',    // 'button' | 'submit' | 'reset'
  variant = 'primary', // 'primary' | 'secondary' | 'danger'
  disabled = false,   // Disable button
  className = '',     // Additional CSS classes
  ...props            // Any other props (spread to button)
}) => {
  // Define variant styles
  const variants = {
    primary: 'bg-blue-600 hover:bg-blue-700 text-white',
    secondary: 'bg-gray-200 hover:bg-gray-300 text-gray-800',
    danger: 'bg-red-600 hover:bg-red-700 text-white'
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`
        px-4 py-2 rounded-md font-medium
        focus:outline-none focus:ring-2 focus:ring-offset-2
        disabled:opacity-50 disabled:cursor-not-allowed
        transition-colors duration-200
        ${variants[variant]}
        ${className}
      `}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;