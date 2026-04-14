import { NextResponse } from 'next/server';
import { listGigs, createGig } from '@/lib/google-calendar';

export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const upcoming = searchParams.get('upcoming') === 'true';
  const gigs = await listGigs(upcoming);
  return NextResponse.json(gigs);
}

export async function POST(request: Request) {
  const body = await request.json();
  const { artist, location, eventDate, ticketUrl, notes } = body;

  if (!artist || !location || !eventDate) {
    return NextResponse.json({ error: 'artist, location, and eventDate are required' }, { status: 400 });
  }

  const gig = await createGig({
    artist,
    location,
    eventDate: new Date(eventDate),
    ticketUrl: ticketUrl || undefined,
    notes: notes || undefined,
  });

  return NextResponse.json(gig, { status: 201 });
}
