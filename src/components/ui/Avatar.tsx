import React from 'react';

type AvatarSize = 'sm' | 'md' | 'lg' | 'xl';

interface AvatarProps {
  src?: string;
  alt: string;
  size?: AvatarSize;
  status?: 'online' | 'offline' | 'busy' | 'away';
  className?: string;
}

const Avatar: React.FC<AvatarProps> = ({
  src,
  alt,
  size = 'md',
  status,
  className = ''
}) => {
  // Handle size
  const sizeClasses = {
    sm: 'h-8 w-8',
    md: 'h-10 w-10',
    lg: 'h-12 w-12',
    xl: 'h-16 w-16'
  };

  // Handle status indicator color
  const statusClasses = {
    online: 'bg-green-500',
    offline: 'bg-gray-400',
    busy: 'bg-red-500',
    away: 'bg-yellow-500'
  };

  // Handle status indicator size based on avatar size
  const statusSizeClasses = {
    sm: 'h-2 w-2',
    md: 'h-2.5 w-2.5',
    lg: 'h-3 w-3',
    xl: 'h-4 w-4'
  };

  // Generate initials from the alt text if no src is provided
  const getInitials = () => {
    return alt
      .split(' ')
      .map((name) => name[0])
      .join('')
      .toUpperCase()
      .substring(0, 2);
  };

  return (
    <div className={`relative inline-block ${className}`}>
      {src ? (
        <img
          src={src}
          alt={alt}
          className={`${sizeClasses[size]} rounded-full object-cover border-2 border-white dark:border-gray-800`}
        />
      ) : (
        <div
          className={`${sizeClasses[size]} rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center text-gray-600 dark:text-gray-200 font-medium border-2 border-white dark:border-gray-800`}
        >
          <span className={size === 'sm' ? 'text-xs' : size === 'md' ? 'text-sm' : 'text-base'}>
            {getInitials()}
          </span>
        </div>
      )}
      
      {status && (
        <span 
          className={`absolute bottom-0 right-0 block ${statusSizeClasses[size]} ${statusClasses[status]} rounded-full ring-2 ring-white dark:ring-gray-800`}
        ></span>
      )}
    </div>
  );
};

export default Avatar;