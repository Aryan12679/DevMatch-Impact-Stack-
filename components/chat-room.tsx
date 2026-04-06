'use client';

import { useState, useRef, useEffect } from 'react';
import { useDevMatch } from '@/lib/context';
import { User } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Send } from 'lucide-react';

interface ChatRoomProps {
  matchedUser: User;
}

export default function ChatRoom({ matchedUser }: ChatRoomProps) {
  const { currentUser, getChatRoom, sendMessage, createChatRoom } = useDevMatch();
  const [messageInput, setMessageInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [chatRoom, setChatRoom] = useState(() => {
    const existing = getChatRoom(matchedUser.id);
    return existing || createChatRoom(matchedUser.id);
  });
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      scrollToBottom();
    }, 0);
    return () => clearTimeout(timer);
  }, [chatRoom?.messages?.length]);

  const handleSendMessage = () => {
    if (messageInput.trim() && chatRoom) {
      sendMessage(chatRoom.id, messageInput);
      setMessageInput('');
      
      // Simulate typing indicator
      setIsTyping(true);
      setTimeout(() => {
        // Add an auto-reply
        if (chatRoom) {
          sendMessage(chatRoom.id, generateReply());
        }
        setIsTyping(false);
      }, 800);
    }
  };

  const generateReply = (): string => {
    const replies = [
      `That sounds great! Let's work on this together.`,
      `I totally agree! When do you want to start?`,
      `Amazing idea! I can help with that.`,
      `Let's build something awesome! 🚀`,
      `Completely on board with this approach.`,
      `This is going to be an awesome project!`,
    ];
    return replies[Math.floor(Math.random() * replies.length)];
  };

  if (!currentUser || !chatRoom) return null;

  return (
    <div className="bg-slate-800 border border-slate-700 rounded-lg h-full flex flex-col">
      {/* Header */}
      <div className="p-4 border-b border-slate-700">
        <div className="flex items-center gap-3">
          <span className="text-2xl">{matchedUser.avatar}</span>
          <div>
            <h3 className="font-semibold">{matchedUser.name}</h3>
            <p className="text-xs text-slate-400 capitalize">{matchedUser.role}</p>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {chatRoom?.messages?.map(message => {
          const isCurrentUser = message.senderId === currentUser.id;
          const sender = isCurrentUser ? currentUser : matchedUser;

          return (
            <div
              key={message.id}
              className={`flex ${isCurrentUser ? 'justify-end' : 'justify-start'}`}
            >
              <div className={`flex gap-3 max-w-xs ${isCurrentUser ? 'flex-row-reverse' : ''}`}>
                <span className={`text-lg flex-shrink-0 ${isCurrentUser ? 'order-2' : ''}`}>
                  {sender.avatar}
                </span>
                <div
                  className={`rounded-lg px-4 py-2 ${
                    isCurrentUser
                      ? 'bg-blue-600 text-white'
                      : 'bg-slate-700 text-slate-100'
                  }`}
                >
                  <p className="text-sm">{message.content}</p>
                  <p className="text-xs mt-1 opacity-70">
                    {new Date(message.timestamp).toLocaleTimeString([], {
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </p>
                </div>
              </div>
            </div>
          );
        })}

        {/* Typing Indicator */}
        {isTyping && (
          <div className="flex justify-start">
            <div className="flex gap-3 max-w-xs">
              <span className="text-lg flex-shrink-0">{matchedUser.avatar}</span>
              <div className="rounded-lg px-4 py-2 bg-slate-700 text-slate-100">
                <div className="flex gap-1">
                  <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
                </div>
              </div>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="p-4 border-t border-slate-700">
        <div className="flex gap-2">
          <Input
            value={messageInput}
            onChange={(e) => setMessageInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
            placeholder="Type a message..."
            className="bg-slate-700 border-slate-600 text-white placeholder-slate-400"
          />
          <Button
            onClick={handleSendMessage}
            disabled={!messageInput.trim()}
            className="bg-blue-600 hover:bg-blue-700 text-white"
          >
            <Send className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
