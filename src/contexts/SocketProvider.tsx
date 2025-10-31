import React, { createContext, useContext, useEffect, useRef, useState } from 'react'
import { toast } from 'sonner'
import io, { Socket } from 'socket.io-client'
interface SocketContextType {
    socket: Socket | null
    isConnected: boolean
    joinConversation: (conversationId: string) => void
    leaveConversation: (conversationId: string) => void
    sendMessage: (data: any) => void
    markAsRead: (conversationId: string, userType: "CUSTOMER" | "VENDOR") => void
}

const SocketContext = createContext<SocketContextType | null>(null);

export const useSocketContext = () => {
    const context = useContext(SocketContext);
    if (!context) {
        throw new Error('useSocketContext must be used within SocketProvider');
    }
    return context
}

interface SocketProviderProps {
    children: React.ReactNode
    userId: string
    userType: 'CUSTOMER' | 'VENDOR' | null
    onNewMessage?: (data: any) => void
    onUnreadCountUpdate?: (count: number) => void
}

export const SocketProvider: React.FC<SocketProviderProps> = ({
    children,
    userId,
    onNewMessage,
    onUnreadCountUpdate
}) => {
    const [socket, setSocket] = useState<Socket | null>(null)
    const [isConnected, setIsConnected] = useState(false)
    const currentConversationRef = useRef<string | null>(null)

    useEffect(() => {
        const socketUrl = import.meta.env.VITE_BASE_API;
        const newSocket = io(socketUrl, {
            transports: ['websocket'],
            reconnection: true,
            reconnectionDelay: 1000,
            reconnectionAttempts: 5
        })
        setSocket(newSocket)

        newSocket.on('connect', () => {
            console.log('Socket Connected:', newSocket.id)
            setIsConnected(true)
            newSocket.emit('authenticate', userId)
            newSocket.emit('join-user-room', userId)
        })

        newSocket.on('disconnect', (reason) => {
            console.log('Socket is disconnected', reason)
            setIsConnected(false)
        })

        newSocket.on('connect_error', (error) => {
            console.log('Socket connection error', error)
            setIsConnected(false)
        })

        newSocket.on('new-message', (data) => {
            console.log('new message received', data)
            if (data.conversationId !== currentConversationRef.current) {
                toast.info(`New message from ${data.senderName || 'User'}`, {
                    description: data.message.message,
                    action: {
                        label: 'View',
                        onClick: () => {
                            window.location.href = `/messages?conversation=${data.conversationId}`;
                        },
                    },
                });
                if (onNewMessage) {
                    onNewMessage(data)
                }
            }
        })
        newSocket.on('new-conversation-message', (data) => {
            console.log('🔔 Notification: New message in conversation', data.conversationId);
            toast.info(`New message from ${data.senderName}`, {
                description: data.message.message,
            });
            if (onUnreadCountUpdate) {
                onUnreadCountUpdate(data.unreadCount);
            }
        });

        newSocket.on('messages-read', (data) => {
            console.log('✓✓ Messages read:', data);
        });
        return () => {
            console.log('🔌 Disconnecting socket...');
            newSocket.disconnect();
        };
    }, [userId, onNewMessage, onUnreadCountUpdate])

    const joinConversation = (conversationId : string) => {
        if(socket && isConnected){
            socket.emit('join-conversation', conversationId)
            currentConversationRef.current = conversationId
            console.log('Joined Conversation', conversationId)
        }
    }
    const leaveConversation = (conversationId: string) => {
        if(socket && isConnected){
            socket.emit('leave-conversation', conversationId)
            if(currentConversationRef.current === conversationId){
                currentConversationRef.current = null
            }
            console.log('Conversation Left:',conversationId)
        }
    }
    const sendMessage = (data: any) => {
        if(socket && isConnected){
            socket.emit('send-message', data);
        }
    }
    const markAsRead = (conversationId : string, userType: 'CUSTOMER' | 'VENDOR') => {
        if(socket && isConnected){
            socket.emit('mark-as-read', {conversationId, userType})
        }
    }

    const value = {
        socket,
        isConnected,
        joinConversation,
        leaveConversation,
        sendMessage,
        markAsRead
    }
    return <SocketContext.Provider value={value}>{children}</SocketContext.Provider>
}