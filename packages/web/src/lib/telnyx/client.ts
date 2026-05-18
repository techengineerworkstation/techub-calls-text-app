import { TelnyxCallState } from '@telnyx-app/shared';

// Telnyx WebRTC client wrapper
// Note: @telnyx/webrtc is loaded dynamically to avoid SSR issues

export interface TelnyxClientOptions {
  login: string;
  password: string;
  callerName: string;
  callerNumber: string;
}

export type TelnyxEventCallback = (event: string, data: any) => void;

export class TelnyxClient {
  private client: any = null;
  private options: TelnyxClientOptions;
  private eventListeners: Map<string, TelnyxEventCallback[]> = new Map();
  private _callState: TelnyxCallState = {
    status: 'idle',
    direction: null,
    remoteNumber: null,
    callId: null,
    duration: 0,
    isMuted: false,
    isOnHold: false,
  };
  private durationInterval: NodeJS.Timeout | null = null;

  constructor(options: TelnyxClientOptions) {
    this.options = options;
  }

  get callState(): TelnyxCallState {
    return { ...this._callState };
  }

  on(event: string, callback: TelnyxEventCallback) {
    if (!this.eventListeners.has(event)) {
      this.eventListeners.set(event, []);
    }
    this.eventListeners.get(event)!.push(callback);
  }

  private emit(event: string, data: any) {
    const listeners = this.eventListeners.get(event) || [];
    listeners.forEach(cb => cb(event, data));
  }

  async connect() {
    try {
      // Dynamic import to avoid SSR issues
      const { TelnyxRTC } = await import('@telnyx/webrtc');

      this.client = new TelnyxRTC({
        login: this.options.login,
        password: this.options.password,
      });

      // Set up event handlers
      this.client.on('telnyx.ready', () => {
        console.log('Telnyx client ready');
        this.emit('ready', {});
      });

      this.client.on('telnyx.notification', (notification: any) => {
        this.handleNotification(notification);
      });

      this.client.on('telnyx.error', (error: any) => {
        console.error('Telnyx error:', error);
        this.emit('error', error);
      });

      this.client.on('telnyx.socket.close', () => {
        console.log('Telnyx socket closed');
        this.emit('disconnected', {});
      });

      // Connect
      await this.client.connect();
    } catch (error) {
      console.error('Failed to connect Telnyx client:', error);
      throw error;
    }
  }

  private handleNotification(notification: any) {
    switch (notification.type) {
      case 'callUpdate':
        this.handleCallUpdate(notification.call);
        break;
      case 'userMediaError':
        console.error('User media error:', notification);
        this.emit('mediaError', notification);
        break;
    }
  }

  private handleCallUpdate(call: any) {
    switch (call.state) {
      case 'ringing':
        this._callState = {
          ...this._callState,
          status: 'ringing',
          direction: call.direction,
          remoteNumber: call.direction === 'inbound' ? call.options?.remoteCallerIdNumber : call.options?.destinationNumber,
          callId: call.id,
        };
        break;

      case 'connecting':
        this._callState = {
          ...this._callState,
          status: 'connecting',
        };
        break;

      case 'active':
        this._callState = {
          ...this._callState,
          status: 'connected',
          callId: call.id,
        };
        this.startDurationTimer();
        break;

      case 'held':
        this._callState = {
          ...this._callState,
          status: 'on_hold',
          isOnHold: true,
        };
        break;

      case 'resumed':
        this._callState = {
          ...this._callState,
          status: 'connected',
          isOnHold: false,
        };
        break;

      case 'hangup':
      case 'destroy':
        this.stopDurationTimer();
        this._callState = {
          status: 'ended',
          direction: null,
          remoteNumber: null,
          callId: null,
          duration: this._callState.duration,
          isMuted: false,
          isOnHold: false,
        };
        // Reset to idle after a delay
        setTimeout(() => {
          this._callState = {
            status: 'idle',
            direction: null,
            remoteNumber: null,
            callId: null,
            duration: 0,
            isMuted: false,
            isOnHold: false,
          };
          this.emit('idle', {});
        }, 2000);
        break;
    }

    this.emit('callUpdate', this._callState);
  }

  private startDurationTimer() {
    this._callState.duration = 0;
    this.durationInterval = setInterval(() => {
      this._callState.duration += 1;
      this.emit('duration', this._callState.duration);
    }, 1000);
  }

  private stopDurationTimer() {
    if (this.durationInterval) {
      clearInterval(this.durationInterval);
      this.durationInterval = null;
    }
  }

  async makeCall(destination: string) {
    if (!this.client) {
      throw new Error('Client not connected');
    }

    try {
      const call = await this.client.newCall({
        destinationNumber: destination,
        callerNumber: this.options.callerNumber,
        callerName: this.options.callerName,
        audio: true,
      });

      this._callState = {
        ...this._callState,
        status: 'connecting',
        direction: 'outbound',
        remoteNumber: destination,
        callId: call.id,
      };

      this.emit('callUpdate', this._callState);
      return call;
    } catch (error) {
      console.error('Failed to make call:', error);
      throw error;
    }
  }

  async answerCall() {
    if (!this.client) {
      throw new Error('Client not connected');
    }

    try {
      await this.client.answer();
    } catch (error) {
      console.error('Failed to answer call:', error);
      throw error;
    }
  }

  async hangupCall() {
    if (!this.client) {
      throw new Error('Client not connected');
    }

    try {
      await this.client.hangup();
      this.stopDurationTimer();
    } catch (error) {
      console.error('Failed to hangup call:', error);
      throw error;
    }
  }

  async toggleMute() {
    if (!this.client) {
      throw new Error('Client not connected');
    }

    try {
      if (this._callState.isMuted) {
        await this.client.unmuteAudio();
      } else {
        await this.client.muteAudio();
      }
      this._callState.isMuted = !this._callState.isMuted;
      this.emit('callUpdate', this._callState);
    } catch (error) {
      console.error('Failed to toggle mute:', error);
      throw error;
    }
  }

  async toggleHold() {
    if (!this.client) {
      throw new Error('Client not connected');
    }

    try {
      if (this._callState.isOnHold) {
        await this.client.unhold();
      } else {
        await this.client.hold();
      }
      this._callState.isOnHold = !this._callState.isOnHold;
      this.emit('callUpdate', this._callState);
    } catch (error) {
      console.error('Failed to toggle hold:', error);
      throw error;
    }
  }

  async sendDTMF(digit: string) {
    if (!this.client) {
      throw new Error('Client not connected');
    }

    try {
      await this.client.dtmf(digit);
    } catch (error) {
      console.error('Failed to send DTMF:', error);
      throw error;
    }
  }

  disconnect() {
    this.stopDurationTimer();
    if (this.client) {
      this.client.disconnect();
      this.client = null;
    }
  }
}
