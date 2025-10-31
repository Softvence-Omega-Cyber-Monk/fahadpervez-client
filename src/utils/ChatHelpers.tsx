// utils/chatHelpers.ts
// Utility functions for chat functionality

/**
 * Format timestamp to readable format
 */
export const formatMessageTime = (timestamp: Date): string => {
  const now = new Date();
  const messageDate = new Date(timestamp);
  const diffMs = now.getTime() - messageDate.getTime();
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMs / 3600000);
  const diffDays = Math.floor(diffMs / 86400000);

  if (diffMins < 1) return 'Just now';
  if (diffMins < 60) return `${diffMins}m ago`;
  if (diffHours < 24) return `${diffHours}h ago`;
  if (diffDays === 0) {
    return messageDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  }
  if (diffDays < 7) return `${diffDays}d ago`;
  
  return messageDate.toLocaleDateString();
};

/**
 * Format full date for message groups
 */
export const formatDateHeader = (timestamp: Date): string => {
  const now = new Date();
  const messageDate = new Date(timestamp);
  const diffDays = Math.floor((now.getTime() - messageDate.getTime()) / 86400000);

  if (diffDays === 0) return 'Today';
  if (diffDays === 1) return 'Yesterday';
  if (diffDays < 7) return messageDate.toLocaleDateString('en-US', { weekday: 'long' });
  
  return messageDate.toLocaleDateString('en-US', { 
    month: 'short', 
    day: 'numeric', 
    year: 'numeric' 
  });
};

/**
 * Group messages by date
 */
export const groupMessagesByDate = (messages: any[]) => {
  const groups: { [key: string]: any[] } = {};
  
  messages.forEach((message) => {
    const date = formatDateHeader(new Date(message.timestamp));
    if (!groups[date]) {
      groups[date] = [];
    }
    groups[date].push(message);
  });
  
  return groups;
};

/**
 * Truncate long text
 */
export const truncateText = (text: string, maxLength: number = 50): string => {
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength) + '...';
};

/**
 * Get initials from name
 */
export const getInitials = (name: string): string => {
  if (!name) return '?';
  const parts = name.trim().split(' ');
  if (parts.length === 1) return parts[0].charAt(0).toUpperCase();
  return (parts[0].charAt(0) + parts[parts.length - 1].charAt(0)).toUpperCase();
};

/**
 * Generate random color for avatar
 */
export const getAvatarColor = (userId: string): string => {
  const colors = [
    'bg-red-500',
    'bg-blue-500',
    'bg-green-500',
    'bg-yellow-500',
    'bg-purple-500',
    'bg-pink-500',
    'bg-indigo-500',
    'bg-teal-500',
  ];
  
  let hash = 0;
  for (let i = 0; i < userId.length; i++) {
    hash = userId.charCodeAt(i) + ((hash << 5) - hash);
  }
  
  return colors[Math.abs(hash) % colors.length];
};

/**
 * Check if user is online (mock - integrate with your online status system)
 */
export const isUserOnline = (userId: string, onlineUsers: string[]): boolean => {
  return onlineUsers.includes(userId);
};

/**
 * Play notification sound
 */
export const playNotificationSound = () => {
  const audio = new Audio('/notification.mp3');
  audio.volume = 0.5;
  audio.play().catch((error) => {
    console.log('Audio play failed:', error);
  });
};

/**
 * Request notification permission
 */
export const requestNotificationPermission = async (): Promise<boolean> => {
  if (!('Notification' in window)) {
    return false;
  }

  if (Notification.permission === 'granted') {
    return true;
  }

  if (Notification.permission !== 'denied') {
    const permission = await Notification.requestPermission();
    return permission === 'granted';
  }

  return false;
};

/**
 * Show browser notification
 */
export const showBrowserNotification = (title: string, body: string, icon?: string) => {
  if (Notification.permission === 'granted') {
    new Notification(title, {
      body,
      icon: icon || '/logo192.png',
      badge: '/logo192.png',
    });
  }
};

/**
 * Detect URLs in message and make them clickable
 */
export const linkifyMessage = (message: string): string => {
  const urlRegex = /(https?:\/\/[^\s]+)/g;
  return message.replace(
    urlRegex,
    '<a href="$1" target="_blank" rel="noopener noreferrer" class="text-blue-500 underline">$1</a>'
  );
};

/**
 * Validate message before sending
 */
export const validateMessage = (message: string): { valid: boolean; error?: string } => {
  if (!message.trim()) {
    return { valid: false, error: 'Message cannot be empty' };
  }
  
  if (message.length > 5000) {
    return { valid: false, error: 'Message is too long (max 5000 characters)' };
  }
  
  return { valid: true };
};

/**
 * Format file size
 */
export const formatFileSize = (bytes: number): string => {
  if (bytes === 0) return '0 Bytes';
  
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  
  return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
};

/**
 * Debounce function
 */
export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout | null = null;
  
  return function executedFunction(...args: Parameters<T>) {
    const later = () => {
      timeout = null;
      func(...args);
    };
    
    if (timeout) clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

/**
 * Scroll to bottom of container
 */
export const scrollToBottom = (elementRef: React.RefObject<HTMLElement>, smooth = true) => {
  if (elementRef.current) {
    elementRef.current.scrollTo({
      top: elementRef.current.scrollHeight,
      behavior: smooth ? 'smooth' : 'auto',
    });
  }
};

// ============================================
// CUSTOM HOOKS
// ============================================

/**
 * Hook to handle notification sounds
 */
import { useEffect, useRef, useState } from 'react';

export const useNotificationSound = (enabled: boolean = true) => {
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    if (enabled) {
      audioRef.current = new Audio('/notification.mp3');
      audioRef.current.volume = 0.5;
    }
  }, [enabled]);

  const playSound = () => {
    if (enabled && audioRef.current) {
      audioRef.current.play().catch((err) => console.log('Sound play failed:', err));
    }
  };

  return { playSound };
};

/**
 * Hook to handle browser notifications
 */
export const useBrowserNotification = () => {
  const [permission, setPermission] = useState<NotificationPermission>('default');

  useEffect(() => {
    if ('Notification' in window) {
      setPermission(Notification.permission);
    }
  }, []);

  const requestPermission = async () => {
    if ('Notification' in window && permission !== 'granted') {
      const result = await Notification.requestPermission();
      setPermission(result);
      return result === 'granted';
    }
    return false;
  };

  const showNotification = (title: string, options?: NotificationOptions) => {
    if (permission === 'granted') {
      new Notification(title, options);
    }
  };

  return { permission, requestPermission, showNotification };
};

/**
 * Hook to detect if user is typing
 */
export const useTypingDetection = (
  onTypingStart: () => void,
  onTypingStop: () => void,
  delay: number = 2000
) => {
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleTyping = () => {
    onTypingStart();

    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = setTimeout(() => {
      onTypingStop();
    }, delay);
  };

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return handleTyping;
};

/**
 * Hook to handle unread messages
 */
export const useUnreadMessages = (isOpen: boolean) => {
  const [unreadCount, setUnreadCount] = useState(0);

  useEffect(() => {
    if (isOpen) {
      // Reset unread count when conversation is opened
      setUnreadCount(0);
    }
  }, [isOpen]);

  const incrementUnread = () => {
    if (!isOpen) {
      setUnreadCount((prev) => prev + 1);
    }
  };

  return { unreadCount, incrementUnread, resetUnread: () => setUnreadCount(0) };
};

/**
 * Hook for detecting online/offline status
 */
export const useOnlineStatus = () => {
  const [isOnline, setIsOnline] = useState(navigator.onLine);

  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  return isOnline;
};

/**
 * Hook for auto-scrolling to new messages
 */
export const useAutoScroll = (
  containerRef: React.RefObject<HTMLElement>,
  dependencies: any[]
) => {
  const isUserScrolledUp = useRef(false);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleScroll = () => {
      const { scrollTop, scrollHeight, clientHeight } = container;
      isUserScrolledUp.current = scrollTop + clientHeight < scrollHeight - 100;
    };

    container.addEventListener('scroll', handleScroll);
    return () => container.removeEventListener('scroll', handleScroll);
  }, [containerRef]);

  useEffect(() => {
    if (!isUserScrolledUp.current) {
      scrollToBottom(containerRef);
    }
  }, dependencies);
};