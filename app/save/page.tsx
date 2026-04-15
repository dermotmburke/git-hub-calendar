import { createGig, listGigs } from '@/lib/google-calendar';
import Link from 'next/link';

export const dynamic = 'force-dynamic';

export default async function SavePage({
  searchParams,
}: {
  searchParams: Promise<{ artist?: string; location?: string; date?: string; url?: string }>;
}) {
  const params = await searchParams;
  const { artist, location, date, url } = params;

  if (!artist || !location || !date) {
    return (
      <div className="border-4 border-black dark:border-white p-8 md:p-12 text-center brutalist-shadow max-w-md mx-auto">
        <p className="font-headline text-2xl uppercase tracking-tighter mb-4">MISSING EVENT DATA</p>
        <Link href="/" className="font-label text-xs font-black uppercase hover:underline decoration-2 mt-4 block">
          ← BACK TO GIGS
        </Link>
      </div>
    );
  }

  const eventDate = new Date(date);
  if (isNaN(eventDate.getTime())) {
    return (
      <div className="border-4 border-black dark:border-white p-8 md:p-12 text-center brutalist-shadow max-w-md mx-auto">
        <p className="font-headline text-2xl uppercase tracking-tighter mb-4">INVALID EVENT DATE</p>
        <Link href="/" className="font-label text-xs font-black uppercase hover:underline decoration-2 mt-4 block">
          ← BACK TO GIGS
        </Link>
      </div>
    );
  }

  // Deduplicate: check if already saved (same artist + date within 1 min)
  const existing = await listGigs();
  const duplicate = existing.find(
    (g) =>
      g.artist === artist && Math.abs(g.eventDate.getTime() - eventDate.getTime()) < 60_000
  );

  if (duplicate) {
    return (
      <div className="border-4 border-black dark:border-white p-8 md:p-12 text-center brutalist-shadow max-w-md mx-auto">
        <p className="font-headline text-4xl uppercase tracking-tighter leading-none mb-6">
          ALREADY SAVED
        </p>
        <p className="font-headline text-lg uppercase tracking-tighter">{artist}</p>
        <p className="font-label text-xs font-bold uppercase mt-1 text-gray-600 dark:text-gray-400">{location}</p>
        <Link
          href={`/gigs/${duplicate.id}`}
          className="inline-block bg-black text-white dark:bg-white dark:text-black font-black text-xs uppercase px-5 py-3 mt-8 hover:invert transition-all"
        >
          VIEW GIG →
        </Link>
      </div>
    );
  }

  const gig = await createGig({ artist, location, eventDate, ticketUrl: url });

  const formattedDate = gig.eventDate.toLocaleDateString('en-GB', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  return (
    <div className="border-4 border-black dark:border-white p-8 md:p-12 text-center brutalist-shadow max-w-md mx-auto">
      <p className="text-6xl font-black mb-6">✓</p>
      <h1 className="font-headline text-4xl uppercase tracking-tighter leading-none mb-6">
        GIG SAVED
      </h1>
      <p className="font-headline text-xl uppercase tracking-tighter">{gig.artist}</p>
      <p className="font-label text-xs font-bold uppercase mt-1 text-gray-600 dark:text-gray-400">{gig.location}</p>
      <p className="font-label text-xs font-medium mt-1 text-gray-500 dark:text-gray-400">{formattedDate}</p>

      <div className="mt-8 flex flex-wrap gap-3 justify-center">
        <Link
          href={`/gigs/${gig.id}/edit`}
          className="bg-black text-white dark:bg-white dark:text-black font-black text-xs uppercase px-5 py-3 hover:invert transition-all active:translate-x-0.5 active:translate-y-0.5"
        >
          SET ALERTS →
        </Link>
        <Link
          href="/"
          className="border-2 border-black dark:border-white font-black text-xs uppercase px-5 py-3 hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-colors"
        >
          VIEW ALL GIGS
        </Link>
      </div>
    </div>
  );
}
