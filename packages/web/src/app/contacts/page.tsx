'use client';

import React, { useState } from 'react';
import Sidebar from '@/components/layout/Sidebar';
import { Toaster } from 'react-hot-toast';
import {
  MagnifyingGlassIcon,
  PlusIcon,
  PhoneIcon,
  ChatBubbleLeftRightIcon,
  PencilIcon,
  TrashIcon,
  EnvelopeIcon,
  UserCircleIcon,
} from '@heroicons/react/24/outline';

interface Contact {
  id: string;
  name: string;
  phone: string;
  email?: string;
  company?: string;
  avatar?: string;
}

const mockContacts: Contact[] = [
  { id: '1', name: 'John Doe', phone: '+1 (555) 123-4567', email: 'john@example.com', company: 'Acme Corp' },
  { id: '2', name: 'Jane Smith', phone: '+1 (555) 987-6543', email: 'jane@example.com', company: 'Tech Inc' },
  { id: '3', name: 'Bob Johnson', phone: '+1 (555) 456-7890', company: 'StartupXYZ' },
  { id: '4', name: 'Alice Brown', phone: '+1 (555) 321-6540', email: 'alice@example.com' },
  { id: '5', name: 'Charlie Wilson', phone: '+1 (555) 789-0123', email: 'charlie@example.com', company: 'Design Co' },
  { id: '6', name: 'Diana Martinez', phone: '+1 (555) 654-3210', company: 'Marketing Pro' },
];

export default function ContactsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [showAddContact, setShowAddContact] = useState(false);
  const [newContact, setNewContact] = useState({ name: '', phone: '', email: '', company: '' });

  const filteredContacts = mockContacts.filter(contact =>
    contact.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    contact.phone.includes(searchQuery) ||
    contact.email?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleAddContact = () => {
    if (newContact.name && newContact.phone) {
      // In production, this would save to database
      console.log('Adding contact:', newContact);
      setNewContact({ name: '', phone: '', email: '', company: '' });
      setShowAddContact(false);
    }
  };

  return (
    <div className="flex h-screen bg-cream-50">
      <Toaster position="top-right" />

      <Sidebar />

      <main className="flex-1 overflow-y-auto">
        <div className="max-w-4xl mx-auto p-8">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-2xl font-bold text-gray-800">Contacts</h1>
              <p className="text-gray-500 mt-1">{mockContacts.length} contacts</p>
            </div>

            <button
              onClick={() => setShowAddContact(true)}
              className="flex items-center gap-2 px-4 py-2 bg-teal-600 text-white rounded-xl hover:bg-teal-700 transition-colors"
            >
              <PlusIcon className="w-4 h-4" />
              <span>Add Contact</span>
            </button>
          </div>

          {/* Search */}
          <div className="relative mb-6">
            <MagnifyingGlassIcon className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search contacts..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-white rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 shadow-sm"
            />
          </div>

          {/* Contact List */}
          <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
            {filteredContacts.map((contact, index) => (
              <div
                key={contact.id}
                className={`flex items-center gap-4 p-4 hover:bg-cream-50 transition-colors ${
                  index < filteredContacts.length - 1 ? 'border-b border-cream-100' : ''
                }`}
              >
                {/* Avatar */}
                <div className="w-12 h-12 bg-teal-100 rounded-full flex items-center justify-center">
                  <span className="text-lg font-semibold text-teal-700">
                    {contact.name.charAt(0)}
                  </span>
                </div>

                {/* Contact Info */}
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-gray-800">{contact.name}</p>
                  <p className="text-sm text-gray-500">{contact.phone}</p>
                  {contact.email && (
                    <p className="text-xs text-gray-400 flex items-center gap-1 mt-0.5">
                      <EnvelopeIcon className="w-3 h-3" />
                      {contact.email}
                    </p>
                  )}
                </div>

                {/* Company */}
                {contact.company && (
                  <div className="hidden sm:block">
                    <span className="text-xs bg-cream-100 text-gray-600 px-2 py-1 rounded-full">
                      {contact.company}
                    </span>
                  </div>
                )}

                {/* Actions */}
                <div className="flex items-center gap-2">
                  <button className="p-2 text-teal-600 hover:bg-teal-50 rounded-lg transition-colors">
                    <PhoneIcon className="w-4 h-4" />
                  </button>
                  <button className="p-2 text-teal-600 hover:bg-teal-50 rounded-lg transition-colors">
                    <ChatBubbleLeftRightIcon className="w-4 h-4" />
                  </button>
                  <button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-50 rounded-lg transition-colors">
                    <PencilIcon className="w-4 h-4" />
                  </button>
                  <button className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                    <TrashIcon className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Empty State */}
          {filteredContacts.length === 0 && (
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-cream-200 rounded-full flex items-center justify-center mx-auto mb-4">
                <UserCircleIcon className="w-8 h-8 text-teal-600" />
              </div>
              <h3 className="text-lg font-medium text-gray-800">No contacts found</h3>
              <p className="text-sm text-gray-500 mt-1">
                {searchQuery ? 'Try a different search term' : 'Add your first contact to get started'}
              </p>
            </div>
          )}
        </div>
      </main>

      {/* Add Contact Modal */}
      {showAddContact && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-6 w-full max-w-md">
            <h2 className="text-xl font-bold text-gray-800 mb-6">Add Contact</h2>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Name *</label>
                <input
                  type="text"
                  value={newContact.name}
                  onChange={(e) => setNewContact({ ...newContact, name: e.target.value })}
                  className="w-full px-4 py-2 border border-cream-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500"
                  placeholder="John Doe"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Phone *</label>
                <input
                  type="tel"
                  value={newContact.phone}
                  onChange={(e) => setNewContact({ ...newContact, phone: e.target.value })}
                  className="w-full px-4 py-2 border border-cream-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500"
                  placeholder="+1 (555) 123-4567"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <input
                  type="email"
                  value={newContact.email}
                  onChange={(e) => setNewContact({ ...newContact, email: e.target.value })}
                  className="w-full px-4 py-2 border border-cream-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500"
                  placeholder="john@example.com"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Company</label>
                <input
                  type="text"
                  value={newContact.company}
                  onChange={(e) => setNewContact({ ...newContact, company: e.target.value })}
                  className="w-full px-4 py-2 border border-cream-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500"
                  placeholder="Acme Corp"
                />
              </div>
            </div>

            <div className="flex gap-3 mt-6">
              <button
                onClick={() => setShowAddContact(false)}
                className="flex-1 px-4 py-2 border border-cream-200 text-gray-700 rounded-xl hover:bg-cream-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleAddContact}
                disabled={!newContact.name || !newContact.phone}
                className="flex-1 px-4 py-2 bg-teal-600 text-white rounded-xl hover:bg-teal-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                Add Contact
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
