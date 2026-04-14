import { listGigs } from '@/lib/google-calendar';
import GigList from '@/components/GigList';

export const dynamic = 'force-dynamic';

export default async function HomePage() {
  const gigs = await listGigs(true);

  return (
    <div>
      <h1 className="text-6xl md:text-8xl font-black uppercase tracking-tighter leading-none mb-8">
        UPCOMING GIGS
      </h1>
      <GigList gigs={gigs} />
    </div>
  );
}
