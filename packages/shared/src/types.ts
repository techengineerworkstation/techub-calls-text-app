// Shared types for Telnyx App

export interface CallLog {
  id: string;
  from: string;
  to: string;
  direction: 'inbound' | 'outbound';
  status: 'ringing' | 'answered' | 'completed' | 'missed' | 'voicemail';
  duration: number | null;
  recording_url: string | null;
  created_at: string;
}

export interface Message {
  id: string;
  from: string;
  to: string;
  direction: 'inbound' | 'outbound';
  text: string;
  media_urls: string[];
  status: 'queued' | 'sent' | 'delivered' | 'failed';
  created_at: string;
}

export interface Contact {
  id: string;
  name: string;
  phone: string;
  email: string | null;
  avatar_url: string | null;
  created_at: string;
}

export interface Voicemail {
  id: string;
  call_id: string;
  from: string;
  duration: number;
  audio_url: string;
  listened: boolean;
  created_at: string;
}

export interface TelnyxCallState {
  status: 'idle' | 'ringing' | 'connecting' | 'connected' | 'on_hold' | 'ended';
  direction: 'inbound' | 'outbound' | null;
  remoteNumber: string | null;
  callId: string | null;
  duration: number;
  isMuted: boolean;
  isOnHold: boolean;
}

export interface TelnyxConfig {
  apiKey: string;
  sipUsername: string;
  sipPassword: string;
  phoneNumber: string;
}
