'use client';

import React, { useState } from 'react';
import Sidebar from '@/components/layout/Sidebar';
import { Toaster } from 'react-hot-toast';
import {
  PhoneArrowDownLeftIcon,
  PhoneArrowUpRightIcon,
  PhoneIcon,
  MagnifyingGlassIcon,
  PlayIcon,
  TrashIcon,
  ClockIcon,
  ArrowPathIcon,
} from '@heroicons/react/24/outline';

interface CallRecord {
  id: string;
  number: string;
  contactName?: string;
  direction: 'inbound' | 'outbound';
  status: 'completed' | 'missed' | 'voicemail';
  duration: string;
  time: string;
  date: string;
  hasRecording: boolean;
}

const mockCalls: CallRecord[] = [
  { id: '1', number: '+1 (555) 123-4567', contactName: 'John Doe', direction: 'outbound', status: 'completed', duration: '3:45', time: '10:30 AM', date: 'Today', hasRecording: true },
  { id: '2', number: '+1 (555) 987-6543', contactName: 'Jane Smith', direction: 'inbound', status: 'completed', duration: '1:22', time: '9:15 AM', date: 'Today', hasRecording: false },
  { id: '3', number: '+1 (555) 456-7890', direction: 'inbound', status: 'missed', duration: '', time: '8:45 AM', date: 'Today', hasRecording: false },
  { id: '4', number: '+1 (555) 321-6540', contactName: 'Alice Brown', direction: 'outbound', status: 'completed', duration: '5:12', time: '4:20 PM', date: 'Yesterday', hasRecording: true },
  { id: '5', number: '+1 (555) 789-0123', direction: 'inbound', status: 'voicemail', duration: '0:45', time: '2:10 PM', date: 'Yesterday', hasRecording: true },
  { id: '6', number: '+1 (555) 654-3210', contactName: 'Bob Johnson', direction: 'outbound', status: 'completed', duration: '2:30', time: '11:00 AM', date: 'Yesterday', hasRecording: false },
];

export default function CallsPage() {
  const [filter, setFilter] = useState<'all' | 'missed' | 'voicemail'>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredCalls = mockCalls.filter(call => {
    if (filter === 'missed' && call.status !== 'missed') return false;
    if (filter === 'voicemail' && call.status !== 'voicemail') return false;

    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      return (
        call.number.includes(query) ||
        call.contactName?.toLowerCase().includes(query)
      );
    }

    return true;
  });

  const groupedCalls = filteredCalls.reduce((acc, call) => {
    if (!acc[call.date]) {
      acc[call.date] = [];
    }
    acc[call.date].push(call);
    return acc;
  }, {} as Record<string, CallRecord[]>);

  return (
    <div className="flex h-screen bg-cream-50">
      <Toaster position="top-right" />

      <Sidebar />

      <main className="flex-1 overflow-y-auto">
        <div className="max-w-4xl mx-auto p-8">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-2xl font-bold text-gray-800">Call History</h1>
              <p className="text-gray-500 mt-1">View and manage your call records</p>
            </div>

            <button className="flex items-center gap-2 px-4 py-2 bg-teal-600 text-white rounded-xl hover:bg-teal-700 transition-colors">
              <ArrowPathIcon className="w-4 h-4" />
              <span>Refresh</span>
            </button>
          </div>

          {/* Filters */}
          <div className="flex items-center gap-4 mb-6">
            <div className="flex-1 relative">
              <MagnifyingGlassIcon className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search calls..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-white rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 shadow-sm"
              />
            </div>

            <div className="flex gap-2">
              {(['all', 'missed', 'voicemail'] as const).map((f) => (
                <button
                  key={f}
                  onClick={() => setFilter(f)}
                  className={`px-4 py-2 rounded-xl text-sm font-medium transition-colors ${
                    filter === f
                      ? 'bg-teal-600 text-white'
                      : 'bg-white text-gray-600 hover:bg-cream-100'
                  }`}
                >
                  {f.charAt(0).toUpperCase() + f.slice(1)}
                </button>
              ))}
            </div>
          </div>

          {/* Call List */}
          {Object.entries(groupedCalls).map(([date, calls]) => (
            <div key={date} className="mb-6">
              <h3 className="text-sm font-medium text-gray-500 mb-3">{date}</h3>

              <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
                {calls.map((call, index) => (
                  <div
                    key={call.id}
                    className={`flex items-center gap-4 p-4 hover:bg-cream-50 transition-colors ${
                      index < calls.length - 1 ? 'border-b border-cream-100' : ''
                    }`}
                  >
                    {/* Direction Icon */}
                    <div className={`p-2 rounded-full ${
                      call.direction === 'outbound' ? 'bg-teal-100 text-teal-600' :
                      call.status === 'missed' ? 'bg-red-100 text-red-600' :
                      call.status === 'voicemail' ? 'bg-orange-100 text-orange-600' :
                      'bg-green-100 text-green-600'
                    }`}>
                      {call.direction === 'outbound' ? (
                        <PhoneArrowUpRightIcon className="w-5 h-5" />
                      ) : (
                        <PhoneArrowDownLeftIcon className="w-5 h-5" />
                      )}
                    </div>

                    {/* Call Info */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <p className="font-medium text-gray-800">
                          {call.contactName || call.number}
                        </p>
                        {call.status === 'missed' && (
                          <span className="text-xs bg-red-100 text-red-600 px-2 py-0.5 rounded-full">
                            Missed
                          </span>
                        )}
                        {call.status === 'voicemail' && (
                          <span className="text-xs bg-orange-100 text-orange-600 px-2 py-0.5 rounded-full">
                            Voicemail
                          </span>
                        )}
                      </div>
                      {call.contactName && (
                        <p className="text-sm text-gray-500">{call.number}</p>
                      )}
                    </div>

                    {/* Duration & Time */}
                    <div className="text-right">
                      {call.duration && (
                        <p className="text-sm font-medium text-gray-700">{call.duration}</p>
                      )}
                      <div className="flex items-center gap-1 text-xs text-gray-500">
                        <ClockIcon className="w-3 h-3" />
                        <span>{call.time}</span>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-2">
                      {call.hasRecording && (
                        <button className="p-2 text-teal-600 hover:bg-teal-50 rounded-lg transition-colors">
                          <PlayIcon className="w-4 h-4" />
                        </button>
                      )}
                      <button className="p-2 text-gray-400 hover:text-teal-600 hover:bg-teal-50 rounded-lg transition-colors">
                        <PhoneIcon className="w-4 h-4" />
                      </button>
                      <button className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                        <TrashIcon className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}

          {/* Empty State */}
          {filteredCalls.length === 0 && (
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-cream-200 rounded-full flex items-center justify-center mx-auto mb-4">
                <PhoneIcon className="w-8 h-8 text-teal-600" />
              </div>
              <h3 className="text-lg font-medium text-gray-800">No calls found</h3>
              <p className="text-sm text-gray-500 mt-1">
                {searchQuery ? 'Try a different search term' : 'Your call history will appear here'}
              </p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
