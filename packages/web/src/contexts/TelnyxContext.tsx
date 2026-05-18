'use client';

import React, { createContext, useContext, useEffect, useState, useCallback } from 'react';
import { TelnyxClient, TelnyxClientOptions } from '@/lib/telnyx/client';
import { TelnyxCallState } from '@telnyx-app/shared';
import toast from 'react-hot-toast';

interface TelnyxContextType {
  client: TelnyxClient | null;
  callState: TelnyxCallState;
  isConnected: boolean;
  connect: () => Promise<void>;
  makeCall: (destination: string) => Promise<void>;
  answerCall: () => Promise<void>;
  hangupCall: () => Promise<void>;
  toggleMute: () => Promise<void>;
  toggleHold: () => Promise<void>;
  sendDTMF: (digit: string) => Promise<void>;
  disconnect: () => void;
}

const TelnyxContext = createContext<TelnyxContextType | null>(null);

export function useTelnyx() {
  const context = useContext(TelnyxContext);
  if (!context) {
    throw new Error('useTelnyx must be used within a TelnyxProvider');
  }
  return context;
}

export function TelnyxProvider({ children }: { children: React.ReactNode }) {
  const [client, setClient] = useState<TelnyxClient | null>(null);
  const [callState, setCallState] = useState<TelnyxCallState>({
    status: 'idle',
    direction: null,
    remoteNumber: null,
    callId: null,
    duration: 0,
    isMuted: false,
    isOnHold: false,
  });
  const [isConnected, setIsConnected] = useState(false);

  const connect = useCallback(async () => {
    const sipUsername = process.env.NEXT_PUBLIC_TELNYX_SIP_USERNAME;
    const sipPassword = process.env.NEXT_PUBLIC_TELNYX_SIP_PASSWORD;
    const phoneNumber = process.env.NEXT_PUBLIC_TELNYX_PHONE_NUMBER;

    if (!sipUsername || !sipPassword || !phoneNumber) {
      toast.error('Telnyx configuration missing');
      return;
    }

    const options: TelnyxClientOptions = {
      login: sipUsername,
      password: sipPassword,
      callerName: phoneNumber,
      callerNumber: phoneNumber,
    };

    const newClient = new TelnyxClient(options);

    // Set up event listeners
    newClient.on('ready', () => {
      setIsConnected(true);
      toast.success('Connected to Telnyx');
    });

    newClient.on('callUpdate', (_event: string, state: TelnyxCallState) => {
      setCallState(state);

      // Show toast for incoming calls
      if (state.status === 'ringing' && state.direction === 'inbound') {
        toast(`Incoming call from ${state.remoteNumber}`, {
          icon: '📞',
          duration: 10000,
        });
      }

      // Show toast for call ended
      if (state.status === 'ended') {
        const duration = formatDuration(state.duration);
        toast(`Call ended - ${duration}`, { icon: '📱' });
      }
    });

    newClient.on('error', (_event: string, error: any) => {
      console.error('Telnyx error:', error);
      toast.error('Connection error');
    });

    newClient.on('disconnected', () => {
      setIsConnected(false);
      toast('Disconnected from Telnyx', { icon: '🔌' });
    });

    newClient.on('mediaError', () => {
      toast.error('Microphone access denied. Please allow microphone access.');
    });

    try {
      await newClient.connect();
      setClient(newClient);
    } catch (error) {
      console.error('Failed to connect:', error);
      toast.error('Failed to connect to Telnyx');
    }
  }, []);

  const makeCall = useCallback(async (destination: string) => {
    if (!client) {
      toast.error('Not connected');
      return;
    }
    try {
      await client.makeCall(destination);
    } catch (error) {
      toast.error('Failed to make call');
    }
  }, [client]);

  const answerCall = useCallback(async () => {
    if (!client) return;
    try {
      await client.answerCall();
    } catch (error) {
      toast.error('Failed to answer call');
    }
  }, [client]);

  const hangupCall = useCallback(async () => {
    if (!client) return;
    try {
      await client.hangupCall();
    } catch (error) {
      toast.error('Failed to hangup call');
    }
  }, [client]);

  const toggleMute = useCallback(async () => {
    if (!client) return;
    try {
      await client.toggleMute();
    } catch (error) {
      toast.error('Failed to toggle mute');
    }
  }, [client]);

  const toggleHold = useCallback(async () => {
    if (!client) return;
    try {
      await client.toggleHold();
    } catch (error) {
      toast.error('Failed to toggle hold');
    }
  }, [client]);

  const sendDTMF = useCallback(async (digit: string) => {
    if (!client) return;
    try {
      await client.sendDTMF(digit);
    } catch (error) {
      toast.error('Failed to send DTMF');
    }
  }, [client]);

  const disconnect = useCallback(() => {
    if (client) {
      client.disconnect();
      setClient(null);
      setIsConnected(false);
    }
  }, [client]);

  // Auto-connect on mount
  useEffect(() => {
    connect();
    return () => {
      if (client) {
        client.disconnect();
      }
    };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const value: TelnyxContextType = {
    client,
    callState,
    isConnected,
    connect,
    makeCall,
    answerCall,
    hangupCall,
    toggleMute,
    toggleHold,
    sendDTMF,
    disconnect,
  };

  return (
    <TelnyxContext.Provider value={value}>
      {children}
    </TelnyxContext.Provider>
  );
}

function formatDuration(seconds: number): string {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins}:${secs.toString().padStart(2, '0')}`;
}
