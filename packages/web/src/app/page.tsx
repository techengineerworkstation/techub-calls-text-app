'use client';

import React, { useState } from 'react';
import Sidebar from '@/components/layout/Sidebar';
import DialPad from '@/components/dialer/DialPad';
import ActiveCall from '@/components/dialer/ActiveCall';
import { Toaster } from 'react-hot-toast';
import {
  PhoneArrowDownLeftIcon,
  PhoneArrowUpRightIcon,
  ClockIcon,
} from '@heroicons/react/24/outline';

export default function HomePage() {
  const [activeCall, setActiveCall] = useState<any>(null);

  // Mock call state for UI demo
  type CallStatus = 'idle' | 'ringing' | 'connecting' | 'connected' | 'on_hold' | 'ended';
  const [callState, setCallState] = useState<{
    status: CallStatus;
    direction: 'inbound' | 'outbound' | null;
    remoteNumber: string | null;
    callId: string | null;
    duration: number;
    isMuted: boolean;
    isOnHold: boolean;
  }>({
    status: 'idle',
    direction: null,
    remoteNumber: null,
    callId: null,
    duration: 0,
    isMuted: false,
    isOnHold: false,
  });

  const handleCall = (number: string) => {
    // For demo, simulate a call
    setCallState({
      status: 'connecting',
      direction: 'outbound',
      remoteNumber: number,
      callId: 'demo-call-id',
      duration: 0,
      isMuted: false,
      isOnHold: false,
    });

    // Simulate connection after 2 seconds
    setTimeout(() => {
      setCallState(prev => ({
        ...prev,
        status: 'connected',
      }));

      // Start duration timer
      const interval = setInterval(() => {
        setCallState(prev => ({
          ...prev,
          duration: prev.duration + 1,
        }));
      }, 1000);

      setActiveCall(interval);
    }, 2000);
  };

  const handleHangup = () => {
    if (activeCall) {
      clearInterval(activeCall);
    }
    setCallState({
      status: 'ended',
      direction: null,
      remoteNumber: null,
      callId: null,
      duration: callState.duration,
      isMuted: false,
      isOnHold: false,
    });

    // Reset to idle after 2 seconds
    setTimeout(() => {
      setCallState({
        status: 'idle',
        direction: null,
        remoteNumber: null,
        callId: null,
        duration: 0,
        isMuted: false,
        isOnHold: false,
      });
    }, 2000);
  };

  const handleToggleMute = () => {
    setCallState(prev => ({
      ...prev,
      isMuted: !prev.isMuted,
    }));
  };

  const handleToggleHold = () => {
    setCallState(prev => ({
      ...prev,
      isOnHold: !prev.isOnHold,
      status: prev.isOnHold ? 'connected' : 'on_hold',
    }));
  };

  const handleSendDTMF = (digit: string) => {
    console.log('DTMF:', digit);
  };

  // Recent calls mock data
  const recentCalls = [
    { id: '1', number: '+1 (555) 123-4567', type: 'outbound', time: '2 min ago', duration: '3:45' },
    { id: '2', number: '+1 (555) 987-6543', type: 'inbound', time: '15 min ago', duration: '1:22' },
    { id: '3', number: '+1 (555) 456-7890', type: 'missed', time: '1 hour ago', duration: '' },
  ];

  return (
    <div className="flex h-screen bg-cream-50">
      <Toaster position="top-right" />

      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <main className="flex-1 flex">
        {/* Dialer Section */}
        <div className="flex-1 flex flex-col items-center justify-center p-8">
          <div className="w-full max-w-md">
            <h2 className="text-2xl font-bold text-gray-800 mb-8 text-center">
              Make a Call
            </h2>
            <DialPad
              onCall={handleCall}
              isCallActive={callState.status !== 'idle'}
            />
          </div>
        </div>

        {/* Recent Calls Sidebar */}
        <div className="w-80 bg-white border-l border-cream-200 p-6 overflow-y-auto hidden lg:block">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Recent Calls</h3>

          <div className="space-y-3">
            {recentCalls.map((call) => (
              <div
                key={call.id}
                className="flex items-center gap-3 p-3 rounded-xl hover:bg-cream-50 transition-colors cursor-pointer"
              >
                <div className={`p-2 rounded-full ${
                  call.type === 'outbound' ? 'bg-teal-100 text-teal-600' :
                  call.type === 'inbound' ? 'bg-green-100 text-green-600' :
                  'bg-red-100 text-red-600'
                }`}>
                  {call.type === 'outbound' ? (
                    <PhoneArrowUpRightIcon className="w-4 h-4" />
                  ) : call.type === 'inbound' ? (
                    <PhoneArrowDownLeftIcon className="w-4 h-4" />
                  ) : (
                    <PhoneArrowDownLeftIcon className="w-4 h-4" />
                  )}
                </div>

                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-800 truncate">
                    {call.number}
                  </p>
                  <div className="flex items-center gap-2 text-xs text-gray-500">
                    <ClockIcon className="w-3 h-3" />
                    <span>{call.time}</span>
                    {call.duration && <span>• {call.duration}</span>}
                  </div>
                </div>

                <button
                  onClick={() => handleCall(call.number)}
                  className="p-2 text-teal-600 hover:bg-teal-50 rounded-full transition-colors"
                >
                  <PhoneArrowUpRightIcon className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>

          {/* Quick Stats */}
          <div className="mt-8 p-4 bg-cream-50 rounded-2xl">
            <h4 className="text-sm font-medium text-gray-600 mb-3">Today&apos;s Stats</h4>
            <div className="grid grid-cols-2 gap-3">
              <div className="text-center">
                <p className="text-2xl font-bold text-teal-600">12</p>
                <p className="text-xs text-gray-500">Calls Made</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-green-600">8</p>
                <p className="text-xs text-gray-500">Calls Received</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-orange-600">45m</p>
                <p className="text-xs text-gray-500">Total Time</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-red-600">2</p>
                <p className="text-xs text-gray-500">Missed</p>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Active Call Overlay */}
      {callState.status !== 'idle' && (
        <ActiveCall
          callState={callState}
          onHangup={handleHangup}
          onToggleMute={handleToggleMute}
          onToggleHold={handleToggleHold}
          onSendDTMF={handleSendDTMF}
        />
      )}
    </div>
  );
}
