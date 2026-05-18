import { NextRequest, NextResponse } from 'next/server';

const TELNYX_API_KEY = process.env.TELNYX_API_KEY!;
const TELNYX_PHONE_NUMBER = process.env.TELNYX_PHONE_NUMBER!;

/**
 * POST /api/telnyx/sms
 * Send an SMS or MMS message via Telnyx Messaging API
 */
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { to, text, media_urls } = body;

    if (!to || !text) {
      return NextResponse.json(
        { success: false, error: 'Recipient and message text are required' },
        { status: 400 }
      );
    }

    const messagePayload: any = {
      from: TELNYX_PHONE_NUMBER,
      to: to,
      text: text,
    };

    // Add media URLs for MMS
    if (media_urls && media_urls.length > 0) {
      messagePayload.media_urls = media_urls;
    }

    const response = await fetch('https://api.telnyx.com/v2/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${TELNYX_API_KEY}`,
      },
      body: JSON.stringify(messagePayload),
    });

    const data = await response.json();

    if (!response.ok) {
      console.error('Telnyx SMS error:', data);
      return NextResponse.json(
        { success: false, error: data.errors?.[0]?.detail || 'Failed to send message' },
        { status: response.status }
      );
    }

    return NextResponse.json({
      success: true,
      message_id: data.data.id,
      status: data.data.to[0]?.status || 'queued',
    });
  } catch (error) {
    console.error('SMS API error:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}
