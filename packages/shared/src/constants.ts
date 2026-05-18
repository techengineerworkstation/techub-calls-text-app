// Shared constants

export const TELNYX_API_BASE = 'https://api.telnyx.com/v2';
export const TELNYX_RTC_URL = 'wss://rtc.telnyx.com';

export const APP_NAME = 'TelnyxPhone';
export const APP_VERSION = '1.0.0';

export const CALL_STATUS = {
  IDLE: 'idle',
  RINGING: 'ringing',
  CONNECTING: 'connecting',
  CONNECTED: 'connected',
  ON_HOLD: 'on_hold',
  ENDED: 'ended',
} as const;

export const MESSAGE_STATUS = {
  QUEUED: 'queued',
  SENT: 'sent',
  DELIVERED: 'delivered',
  FAILED: 'failed',
} as const;
