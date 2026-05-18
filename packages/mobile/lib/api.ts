import Constants from "expo-constants";

const API_URL =
  Constants.expoConfig?.extra?.API_URL ||
  "https://techub-calls-text.vercel.app";

export async function makeCall(to: string, from?: string) {
  const res = await fetch(`${API_URL}/api/telnyx/call`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ to, from }),
  });
  return res.json();
}

export async function sendSms(to: string, text: string, mediaUrls?: string[]) {
  const res = await fetch(`${API_URL}/api/telnyx/sms`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ to, text, media_urls: mediaUrls }),
  });
  return res.json();
}
