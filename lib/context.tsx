'use client';

import React, { createContext, useContext, useState, useCallback, ReactNode } from 'react';
import { User, ChatRoom, ChatMessage, Match } from './types';
import { MOCK_USERS } from './mock-data';
import { findMatches } from './matching';

interface DevMatchContextType {
  currentUser: User | null;
  setCurrentUser: (user: User | null) => void;
  allUsers: User[];
  potentialMatches: Array<{ user: User; score: number }>;
  acceptedMatches: User[];
  chatRooms: ChatRoom[];
  createChatRoom: (otherUserId: string) => ChatRoom;
  getChatRoom: (userId: string) => ChatRoom | undefined;
  sendMessage: (chatRoomId: string, content: string) => void;
  acceptMatch: (userId: string) => void;
  rejectMatch: (userId: string) => void;
  updateCurrentUser: (updates: Partial<User>) => void;
}

const DevMatchContext = createContext<DevMatchContextType | undefined>(undefined);

export function DevMatchProvider({ children }: { children: ReactNode }) {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [allUsers] = useState<User[]>(MOCK_USERS);
  const [acceptedMatches, setAcceptedMatches] = useState<User[]>([]);
  const [chatRooms, setChatRooms] = useState<ChatRoom[]>([]);

  const potentialMatches = currentUser ? findMatches(currentUser, allUsers) : [];

  const createChatRoom = useCallback((otherUserId: string): ChatRoom => {
    if (!currentUser) throw new Error('Current user not set');
    
    const existingRoom = chatRooms.find(
      room =>
        room.participants.includes(currentUser.id) &&
        room.participants.includes(otherUserId)
    );

    if (existingRoom) return existingRoom;

    const newRoom: ChatRoom = {
      id: `chat-${Date.now()}`,
      participants: [currentUser.id, otherUserId],
      createdAt: new Date().toISOString(),
      messages: [
        {
          id: `msg-${Date.now()}`,
          senderId: otherUserId,
          content: `Hey ${currentUser.name}! I'd love to team up for this hackathon. 🚀`,
          timestamp: new Date().toISOString(),
        },
      ],
    };

    setChatRooms(prev => [...prev, newRoom]);
    return newRoom;
  }, [currentUser, chatRooms]);

  const getChatRoom = useCallback((otherUserId: string): ChatRoom | undefined => {
    if (!currentUser) return undefined;
    return chatRooms.find(
      room =>
        room.participants.includes(currentUser.id) &&
        room.participants.includes(otherUserId)
    );
  }, [chatRooms, currentUser]);

  const sendMessage = useCallback((chatRoomId: string, content: string) => {
    if (!currentUser) return;
    setChatRooms(prev =>
      prev.map(room => {
        if (room.id === chatRoomId) {
          const newMessage: ChatMessage = {
            id: `msg-${Date.now()}-${Math.random()}`,
            senderId: currentUser.id,
            content,
            timestamp: new Date().toISOString(),
          };
          return {
            ...room,
            messages: [...room.messages, newMessage],
          };
        }
        return room;
      })
    );
  }, [currentUser]);

  const acceptMatch = useCallback((userId: string) => {
    const matchedUser = allUsers.find(u => u.id === userId);
    if (matchedUser) {
      setAcceptedMatches(prev => {
        const alreadyExists = prev.find(m => m.id === userId);
        if (!alreadyExists) {
          return [...prev, matchedUser];
        }
        return prev;
      });
      // Create chat room if it doesn't exist
      const existingRoom = chatRooms.find(
        room =>
          room.participants.includes(currentUser?.id || '') &&
          room.participants.includes(userId)
      );
      if (!existingRoom && currentUser) {
        createChatRoom(userId);
      }
    }
  }, [allUsers, acceptedMatches, chatRooms, currentUser, createChatRoom]);

  const rejectMatch = useCallback((userId: string) => {
    // This is handled by the component state that filters out rejected matches
    // The function exists for API consistency and future server-side tracking
  }, []);

  const updateCurrentUser = useCallback((updates: Partial<User>) => {
    if (currentUser) {
      setCurrentUser({ ...currentUser, ...updates });
    }
  }, [currentUser]);

  const value: DevMatchContextType = {
    currentUser,
    setCurrentUser,
    allUsers,
    potentialMatches,
    acceptedMatches,
    chatRooms,
    createChatRoom,
    getChatRoom,
    sendMessage,
    acceptMatch,
    rejectMatch,
    updateCurrentUser,
  };

  return (
    <DevMatchContext.Provider value={value}>
      {children}
    </DevMatchContext.Provider>
  );
}

export function useDevMatch() {
  const context = useContext(DevMatchContext);
  if (context === undefined) {
    throw new Error('useDevMatch must be used within DevMatchProvider');
  }
  return context;
}
