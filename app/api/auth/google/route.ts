import { NextResponse } from 'next/server';
import { google } from 'googleapis';

function callbackUrl() {
  return `${process.env.APP_URL ?? 'http://localhost:3000'}/api/auth/google/callback`;
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const secret = searchParams.get('secret') ?? '';
  const adminSecret = process.env.ADMIN_SECRET;

  if (adminSecret && secret !== adminSecret) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const oauth2Client = new google.auth.OAuth2(
    process.env.GOOGLE_CLIENT_ID,
    process.env.GOOGLE_CLIENT_SECRET,
    callbackUrl()
  );

  const authUrl = oauth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: ['https://www.googleapis.com/auth/calendar'],
    // prompt=consent forces Google to return a refresh_token every time
    prompt: 'consent',
    // Pass the secret through state so the callback can redirect back to the
    // protected admin page without the user having to re-enter it.
    state: secret,
  });

  return NextResponse.redirect(authUrl);
}
