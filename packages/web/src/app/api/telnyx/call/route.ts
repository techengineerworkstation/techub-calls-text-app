import { NextRequest, NextResponse } from 'next/server';

const TELNYX_API_KEY = process.env.TELNYX_API_KEY!;
const TELNYX_PHONE_NUMBER = process.env.TELNYX_PHONE_NUMBER!;

/**
 * POST /api/telnyx/call
 * Initiate an outbound call via Telnyx Voice API
 */
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { to, from } = body;

    if (!to) {
      return NextResponse.json(
        { success: false, error: 'Destination number is required' },
        { status: 400 }
      );
    }

    // Use the Call Control API to initiate a call
    const response = await fetch('https://api.telnyx.com/v2/calls', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${TELNYX_API_KEY}`,
      },
      body: JSON.stringify({
        connection_id: 'techengineerworkstation',
        to: to,
        from: from || TELNYX_PHONE_NUMBER,
        answering_machine_detection: 'detect',
        webhook_url: `${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/api/telnyx/webhook`,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      console.error('Telnyx call error:', data);
      return NextResponse.json(
        { success: false, error: data.errors?.[0]?.detail || 'Failed to initiate call' },
        { status: response.status }
      );
    }

    return NextResponse.json({
      success: true,
      call_control_id: data.data.call_control_id,
      call_session_id: data.data.call_session_id,
    });
  } catch (error) {
    console.error('Call API error:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}
