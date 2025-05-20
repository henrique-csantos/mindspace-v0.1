import React from 'react';

type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
type ButtonSize = 'sm' | 'md' | 'lg';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  icon?: React.ReactNode;
  fullWidth?: boolean;
  children: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  icon,
  fullWidth = false,
  children,
  className = '',
  ...props
}) => {
  const baseStyles = 'inline-flex items-center justify-center rounded-lg font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-60 disabled:cursor-not-allowed';
  
  const variantStyles = {
    primary: 'bg-teal-600 text-white hover:bg-teal-700 active:bg-teal-800 focus:ring-teal-500 dark:bg-teal-500 dark:hover:bg-teal-600 dark:active:bg-teal-700',
    secondary: 'bg-purple-600 text-white hover:bg-purple-700 active:bg-purple-800 focus:ring-purple-500 dark:bg-purple-500 dark:hover:bg-purple-600 dark:active:bg-purple-700',
    outline: 'bg-transparent border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 active:bg-gray-200 dark:active:bg-gray-700 focus:ring-gray-500',
    ghost: 'bg-transparent text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 active:bg-gray-200 dark:active:bg-gray-700 focus:ring-gray-500',
    danger: 'bg-red-600 text-white hover:bg-red-700 active:bg-red-800 focus:ring-red-500 dark:bg-red-500 dark:hover:bg-red-600 dark:active:bg-red-700',
  };
  
  const sizeStyles = {
    sm: 'text-xs px-2.5 py-1.5',
    md: 'text-sm px-4 py-2',
    lg: 'text-base px-5 py-2.5',
  };
  
  const widthStyle = fullWidth ? 'w-full' : '';
  
  return (
    <button
      className={`
        ${baseStyles} 
        ${variantStyles[variant]} 
        ${sizeStyles[size]} 
        ${widthStyle} 
        ${className}
      `}
      {...props}
    >
      {icon && <span className="mr-2">{icon}</span>}
      {children}
    </button>
  );
};

export default Button;