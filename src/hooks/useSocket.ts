import { useEffect, useRef, useCallback } from 'react';
import io, { Socket } from 'socket.io-client';
import { IMessage } from '@/Redux/Features/chat/chat.api';

interface UseSocketProps {
  userId: string;
  onNewMessage?: (data: {
    conversationId: string;
    message: IMessage;
  }) => void;
  onUserTyping?: (data: {
    conversationId: string;
    userId: string;
    isTyping: boolean;
  }) => void;
  onMessagesRead?: (data: {
    conversationId: string;
    userType: 'CUSTOMER' | 'VENDOR';
  }) => void;
  onNewConversationMessage?: (data: {
    conversationId: string;
    unreadCount: number;
  }) => void;
}

export const useSocket = ({
  userId,
  onNewMessage,
  onUserTyping,
  onMessagesRead,
  onNewConversationMessage,
}: UseSocketProps) => {
  const socketRef = useRef<Socket | null>(null);

  useEffect(() => {
    // Initialize socket connection
    const socket = io(import.meta.env.VITE_BASE_API || 'http://localhost:5000', {
      transports: ['websocket'],
      reconnection: true,
      reconnectionDelay: 1000,
      reconnectionAttempts: 5,
    });

    socketRef.current = socket;

    // Authenticate user
    socket.on('connect', () => {
      console.log('Socket connected:', socket.id);
      socket.emit('authenticate', userId);
    });

    // Listen for new messages
    if (onNewMessage) {
      socket.on('new-message', onNewMessage);
    }

    // Listen for typing indicators
    if (onUserTyping) {
      socket.on('user-typing', onUserTyping);
    }

    // Listen for read receipts
    if (onMessagesRead) {
      socket.on('messages-read', onMessagesRead);
    }

    // Listen for new messages in other conversations
    if (onNewConversationMessage) {
      socket.on('new-conversation-message', onNewConversationMessage);
    }

    // Handle connection errors
    socket.on('connect_error', (error) => {
      console.error('Socket connection error:', error);
    });

    socket.on('disconnect', (reason) => {
      console.log('Socket disconnected:', reason);
    });

    // Cleanup
    return () => {
      socket.disconnect();
      socketRef.current = null;
    };
  }, [userId, onNewMessage, onUserTyping, onMessagesRead, onNewConversationMessage]);

  // Join a conversation room
  const joinConversation = useCallback((conversationId: string) => {
    if (socketRef.current) {
      socketRef.current.emit('join-conversation', conversationId);
    }
  }, []);

  // Leave a conversation room
  const leaveConversation = useCallback((conversationId: string) => {
    if (socketRef.current) {
      socketRef.current.emit('leave-conversation', conversationId);
    }
  }, []);

  // Send a message
  const sendMessage = useCallback(
    (data: {
      conversationId: string;
      senderId: string;
      senderType: 'CUSTOMER' | 'VENDOR';
      message: string;
    }) => {
      if (socketRef.current) {
        socketRef.current.emit('send-message', data);
      }
    },
    []
  );

  // Send typing indicator
  const sendTypingIndicator = useCallback(
    (conversationId: string, isTyping: boolean) => {
      if (socketRef.current) {
        socketRef.current.emit('typing', {
          conversationId,
          userId,
          isTyping,
        });
      }
    },
    [userId]
  );

  // Mark messages as read
  const markAsRead = useCallback(
    (conversationId: string, userType: 'CUSTOMER' | 'VENDOR') => {
      if (socketRef.current) {
        socketRef.current.emit('mark-as-read', {
          conversationId,
          userType,
        });
      }
    },
    []
  );

  return {
    socket: socketRef.current,
    joinConversation,
    leaveConversation,
    sendMessage,
    sendTypingIndicator,
    markAsRead,
  };
};