
import React from 'react';

interface UserAvatarProps {
  url: string;
  name: string;
  size?: 'sm' | 'md' | 'lg';
}

const UserAvatar: React.FC<UserAvatarProps> = ({ url, name, size = 'sm' }) => {
  const sizeClasses = size === 'sm' ? 'w-8 h-8' : size === 'md' ? 'w-10 h-10' : 'w-24 h-24';
  const textClasses = size === 'sm' ? 'text-xs' : size === 'md' ? 'text-sm' : 'text-xl';
  const initials = name.split(' ').map(n => n[0]).join('').toUpperCase();
  
  return (
    <img
      src={url}
      alt={name}
      className={`rounded-full object-cover ${sizeClasses}`}
      onError={(e) => {
        const target = e.target as HTMLImageElement;
        target.onerror = null; // Prevent infinite loop
        target.src = ''; // Clear broken image
        // Fallback to initials
        target.classList.remove('object-cover');
        target.classList.add('flex', 'items-center', 'justify-center', 'bg-indigo-500', 'text-white', 'font-semibold', textClasses);
        target.style.backgroundImage = 'none'; // Ensure no image shows
        target.outerHTML = `<div class="rounded-full ${sizeClasses} flex items-center justify-center bg-indigo-500 text-white font-semibold ${textClasses}">${initials}</div>`;
      }}
    />
  );
};

export default UserAvatar;
