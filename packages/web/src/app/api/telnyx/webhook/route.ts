import { NextRequest, NextResponse } from 'next/server';

/**
 * POST /api/telnyx/webhook
 * Handle Telnyx webhook events for calls and messages
 */
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const event = body.data;

    if (!event) {
      return NextResponse.json({ success: false, error: 'No event data' }, { status: 400 });
    }

    console.log('Telnyx webhook event:', event.event_type, event);

    switch (event.event_type) {
      // Call events
      case 'call.initiated':
        console.log('Call initiated:', event.payload);
        break;

      case 'call.answered':
        console.log('Call answered:', event.payload.call_control_id);
        break;

      case 'call.hangup':
        console.log('Call hangup:', event.payload.call_control_id);
        break;

      case 'call.recording.saved':
        console.log('Recording saved:', event.payload.recording_urls);
        break;

      // Message events
      case 'message.received':
        console.log('Message received:', {
          from: event.payload.from?.phone_number,
          to: event.payload.to?.[0]?.phone_number,
          text: event.payload.text,
        });
        break;

      case 'message.sent':
        console.log('Message sent:', event.payload.id);
        break;

      case 'message.finalized':
        console.log('Message finalized:', {
          id: event.payload.id,
          status: event.payload.to?.[0]?.status,
        });
        break;

      default:
        console.log('Unhandled event type:', event.event_type);
    }

    // Always return 200 to acknowledge receipt
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Webhook error:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}
