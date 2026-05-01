import type { Gig } from '@/lib/google-calendar';
import GigCard from './GigCard';

export default function GigList({ gigs }: { gigs: Gig[] }) {
  if (gigs.length === 0) {
    return (
      <div className="border-4 border-black dark:border-white p-12 text-center brutalist-shadow">
        <p className="font-headline text-4xl uppercase tracking-tighter mb-4">NO GIGS SAVED YET</p>
        <p className="font-label text-sm font-bold uppercase">Use the save link to add one.</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4">
      {gigs.map((gig) => (
        <GigCard key={gig.id} gig={gig} />
      ))}
    </div>
  );
}
