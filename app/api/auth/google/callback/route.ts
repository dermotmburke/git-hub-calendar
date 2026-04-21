import { NextResponse } from 'next/server';
import { google } from 'googleapis';
import { updateRefreshToken } from '@/lib/google-calendar';

const baseUrl = () => process.env.APP_URL ?? 'http://localhost:3000';

function callbackUrl() {
  return `${baseUrl()}/api/auth/google/callback`;
}

function adminRedirect(state: string, params: Record<string, string>) {
  const url = new URL(`${baseUrl()}/admin/auth`);
  if (state) url.searchParams.set('secret', state);
  for (const [k, v] of Object.entries(params)) url.searchParams.set(k, v);
  return NextResponse.redirect(url.toString());
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const code = searchParams.get('code');
  const state = searchParams.get('state') ?? '';
  const error = searchParams.get('error');

  if (error) {
    return adminRedirect(state, { error });
  }

  if (!code) {
    return adminRedirect(state, { error: 'no_code' });
  }

  try {
    const oauth2Client = new google.auth.OAuth2(
      process.env.GOOGLE_CLIENT_ID,
      process.env.GOOGLE_CLIENT_SECRET,
      callbackUrl()
    );

    const { tokens } = await oauth2Client.getToken(code);

    if (!tokens.refresh_token) {
      return adminRedirect(state, { error: 'no_refresh_token' });
    }

    updateRefreshToken(tokens.refresh_token);
    return adminRedirect(state, { success: '1' });
  } catch (err) {
    const message = err instanceof Error ? err.message : 'token_exchange_failed';
    return adminRedirect(state, { error: message });
  }
}
