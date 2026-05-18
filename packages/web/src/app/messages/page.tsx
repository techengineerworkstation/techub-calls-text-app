'use client';

import React, { useState } from 'react';
import Sidebar from '@/components/layout/Sidebar';
import { Toaster } from 'react-hot-toast';
import {
  MagnifyingGlassIcon,
  PlusIcon,
  PaperAirplaneIcon,
  PhotoIcon,
  FaceSmileIcon,
} from '@heroicons/react/24/outline';
import { PhoneIcon } from '@heroicons/react/24/solid';

interface Conversation {
  id: string;
  name: string;
  phone: string;
  lastMessage: string;
  time: string;
  unread: number;
}

interface Message {
  id: string;
  text: string;
  direction: 'inbound' | 'outbound';
  time: string;
  status: 'sent' | 'delivered' | 'read';
}

const mockConversations: Conversation[] = [
  { id: '1', name: 'John Doe', phone: '+1 (555) 123-4567', lastMessage: 'Hey, how are you?', time: '2m ago', unread: 2 },
  { id: '2', name: 'Jane Smith', phone: '+1 (555) 987-6543', lastMessage: 'Meeting at 3pm', time: '1h ago', unread: 0 },
  { id: '3', name: 'Bob Johnson', phone: '+1 (555) 456-7890', lastMessage: 'Thanks for the update!', time: '3h ago', unread: 0 },
  { id: '4', name: 'Alice Brown', phone: '+1 (555) 321-6540', lastMessage: 'See you tomorrow', time: '1d ago', unread: 1 },
];

const mockMessages: Message[] = [
  { id: '1', text: 'Hey, how are you?', direction: 'inbound', time: '10:30 AM', status: 'read' },
  { id: '2', text: "I'm doing great! How about you?", direction: 'outbound', time: '10:32 AM', status: 'delivered' },
  { id: '3', text: 'Pretty good! Just working on some projects.', direction: 'inbound', time: '10:33 AM', status: 'read' },
  { id: '4', text: "That's awesome! Need any help?", direction: 'outbound', time: '10:35 AM', status: 'delivered' },
  { id: '5', text: 'Actually yes, can you review my code?', direction: 'inbound', time: '10:36 AM', status: 'read' },
  { id: '6', text: "Sure! Send me the link.", direction: 'outbound', time: '10:37 AM', status: 'sent' },
];

export default function MessagesPage() {
  const [selectedConversation, setSelectedConversation] = useState<Conversation | null>(mockConversations[0]);
  const [newMessage, setNewMessage] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      // In production, this would send via Telnyx API
      console.log('Sending message:', newMessage);
      setNewMessage('');
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const filteredConversations = mockConversations.filter(conv =>
    conv.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    conv.phone.includes(searchQuery)
  );

  return (
    <div className="flex h-screen bg-cream-50">
      <Toaster position="top-right" />

      <Sidebar />

      <main className="flex-1 flex">
        {/* Conversations List */}
        <div className="w-80 bg-white border-r border-cream-200 flex flex-col">
          {/* Header */}
          <div className="p-4 border-b border-cream-200">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-gray-800">Messages</h2>
              <button className="p-2 bg-teal-100 text-teal-600 rounded-lg hover:bg-teal-200 transition-colors">
                <PlusIcon className="w-5 h-5" />
              </button>
            </div>

            {/* Search */}
            <div className="relative">
              <MagnifyingGlassIcon className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search conversations..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-cream-50 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
              />
            </div>
          </div>

          {/* Conversation List */}
          <div className="flex-1 overflow-y-auto">
            {filteredConversations.map((conv) => (
              <button
                key={conv.id}
                onClick={() => setSelectedConversation(conv)}
                className={`w-full p-4 flex items-center gap-3 hover:bg-cream-50 transition-colors border-b border-cream-100 ${
                  selectedConversation?.id === conv.id ? 'bg-cream-100' : ''
                }`}
              >
                <div className="w-12 h-12 bg-teal-100 rounded-full flex items-center justify-center">
                  <span className="text-lg font-semibold text-teal-700">
                    {conv.name.charAt(0)}
                  </span>
                </div>

                <div className="flex-1 min-w-0 text-left">
                  <div className="flex items-center justify-between">
                    <p className="font-medium text-gray-800 truncate">{conv.name}</p>
                    <span className="text-xs text-gray-500">{conv.time}</span>
                  </div>
                  <p className="text-sm text-gray-500 truncate">{conv.lastMessage}</p>
                </div>

                {conv.unread > 0 && (
                  <span className="w-6 h-6 bg-teal-500 text-white text-xs font-bold rounded-full flex items-center justify-center">
                    {conv.unread}
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Message Thread */}
        {selectedConversation ? (
          <div className="flex-1 flex flex-col">
            {/* Thread Header */}
            <div className="p-4 bg-white border-b border-cream-200 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-teal-100 rounded-full flex items-center justify-center">
                  <span className="text-sm font-semibold text-teal-700">
                    {selectedConversation.name.charAt(0)}
                  </span>
                </div>
                <div>
                  <p className="font-medium text-gray-800">{selectedConversation.name}</p>
                  <p className="text-xs text-gray-500">{selectedConversation.phone}</p>
                </div>
              </div>

              <button className="p-2 text-teal-600 hover:bg-teal-50 rounded-lg transition-colors">
                <PhoneIcon className="w-5 h-5" />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {mockMessages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex ${msg.direction === 'outbound' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[70%] rounded-2xl px-4 py-2 ${
                      msg.direction === 'outbound'
                        ? 'bg-teal-600 text-white rounded-br-md'
                        : 'bg-white text-gray-800 rounded-bl-md shadow-sm'
                    }`}
                  >
                    <p className="text-sm">{msg.text}</p>
                    <div className={`flex items-center gap-1 mt-1 ${
                      msg.direction === 'outbound' ? 'justify-end' : 'justify-start'
                    }`}>
                      <span className={`text-[10px] ${
                        msg.direction === 'outbound' ? 'text-teal-200' : 'text-gray-400'
                      }`}>
                        {msg.time}
                      </span>
                      {msg.direction === 'outbound' && (
                        <span className="text-[10px] text-teal-200">
                          {msg.status === 'read' ? '✓✓' : msg.status === 'delivered' ? '✓✓' : '✓'}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Message Input */}
            <div className="p-4 bg-white border-t border-cream-200">
              <div className="flex items-center gap-2">
                <button className="p-2 text-gray-500 hover:text-teal-600 transition-colors">
                  <PhotoIcon className="w-5 h-5" />
                </button>
                <button className="p-2 text-gray-500 hover:text-teal-600 transition-colors">
                  <FaceSmileIcon className="w-5 h-5" />
                </button>

                <div className="flex-1 relative">
                  <input
                    type="text"
                    placeholder="Type a message..."
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    onKeyPress={handleKeyPress}
                    className="w-full px-4 py-2 bg-cream-50 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
                  />
                </div>

                <button
                  onClick={handleSendMessage}
                  disabled={!newMessage.trim()}
                  className="p-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  <PaperAirplaneIcon className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex-1 flex items-center justify-center">
            <div className="text-center">
              <div className="w-20 h-20 bg-cream-200 rounded-full flex items-center justify-center mx-auto mb-4">
                <PhoneIcon className="w-10 h-10 text-teal-600" />
              </div>
              <h3 className="text-lg font-medium text-gray-800">Select a Conversation</h3>
              <p className="text-sm text-gray-500 mt-1">Choose a conversation to start messaging</p>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
