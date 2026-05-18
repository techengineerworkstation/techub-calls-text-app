'use client';

import React from 'react';
import {
  PhoneIcon,
  MicrophoneIcon,
  SpeakerWaveIcon,
  PauseIcon,
  PlayIcon,
  XMarkIcon,
  VideoCameraIcon,
} from '@heroicons/react/24/solid';
import { TelnyxCallState } from '@telnyx-app/shared';

interface ActiveCallProps {
  callState: TelnyxCallState;
  onHangup: () => void;
  onToggleMute: () => void;
  onToggleHold: () => void;
  onSendDTMF: (digit: string) => void;
}

export default function ActiveCall({
  callState,
  onHangup,
  onToggleMute,
  onToggleHold,
  onSendDTMF,
}: ActiveCallProps) {
  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const getStatusText = () => {
    switch (callState.status) {
      case 'ringing':
        return callState.direction === 'inbound' ? 'Incoming Call...' : 'Ringing...';
      case 'connecting':
        return 'Connecting...';
      case 'connected':
        return formatDuration(callState.duration);
      case 'on_hold':
        return 'On Hold';
      case 'ended':
        return 'Call Ended';
      default:
        return '';
    }
  };

  return (
    <div className="fixed inset-0 bg-gradient-to-b from-teal-800 to-teal-900 flex flex-col items-center justify-between z-50 p-8">
      {/* Caller Info */}
      <div className="flex flex-col items-center mt-16">
        {/* Avatar */}
        <div className="relative">
          <div className="w-32 h-32 bg-teal-600 rounded-full flex items-center justify-center">
            <span className="text-5xl font-bold text-white">
              {callState.remoteNumber?.slice(-2) || '??'}
            </span>
          </div>
          {callState.status === 'ringing' && (
            <>
              <div className="absolute inset-0 rounded-full border-4 border-teal-400 animate-pulse-ring" />
              <div className="absolute inset-0 rounded-full border-4 border-teal-400 animate-pulse-ring" style={{ animationDelay: '0.5s' }} />
            </>
          )}
        </div>

        {/* Number */}
        <h2 className="mt-6 text-3xl font-bold text-white">
          {callState.remoteNumber || 'Unknown'}
        </h2>

        {/* Status */}
        <p className="mt-2 text-teal-200 text-lg">
          {getStatusText()}
        </p>
      </div>

      {/* Controls */}
      <div className="w-full max-w-sm space-y-8">
        {/* Secondary Controls */}
        <div className="flex justify-around">
          <button
            onClick={onToggleMute}
            className={`p-4 rounded-full transition-all ${
              callState.isMuted
                ? 'bg-white text-teal-800'
                : 'bg-teal-700 text-white hover:bg-teal-600'
            }`}
          >
            <MicrophoneIcon className="w-6 h-6" />
          </button>

          <button
            onClick={onToggleHold}
            className={`p-4 rounded-full transition-all ${
              callState.isOnHold
                ? 'bg-white text-teal-800'
                : 'bg-teal-700 text-white hover:bg-teal-600'
            }`}
          >
            {callState.isOnHold ? (
              <PlayIcon className="w-6 h-6" />
            ) : (
              <PauseIcon className="w-6 h-6" />
            )}
          </button>

          <button className="p-4 rounded-full bg-teal-700 text-white hover:bg-teal-600 transition-all">
            <SpeakerWaveIcon className="w-6 h-6" />
          </button>

          <button className="p-4 rounded-full bg-teal-700 text-white hover:bg-teal-600 transition-all">
            <VideoCameraIcon className="w-6 h-6" />
          </button>
        </div>

        {/* Answer / Hangup Buttons */}
        <div className="flex justify-center gap-8">
          {callState.status === 'ringing' && callState.direction === 'inbound' && (
            <button
              onClick={() => {/* Answer handled by parent */}}
              className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center shadow-lg shadow-green-500/30 hover:bg-green-600 transition-all"
            >
              <PhoneIcon className="w-10 h-10 text-white" />
            </button>
          )}

          <button
            onClick={onHangup}
            className="w-20 h-20 bg-red-500 rounded-full flex items-center justify-center shadow-lg shadow-red-500/30 hover:bg-red-600 transition-all"
          >
            <XMarkIcon className="w-10 h-10 text-white" />
          </button>
        </div>
      </div>
    </div>
  );
}
