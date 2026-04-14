import { listGigs } from '@/lib/google-calendar';
import CalendarView from '@/components/CalendarView';

export const dynamic = 'force-dynamic';

export default async function CalendarPage() {
  const gigs = await listGigs();

  // Serialize dates to strings for the client component
  const gigsJson = gigs.map((g) => ({
    ...g,
    eventDate: g.eventDate.toISOString(),
    ticketSaleDate: g.ticketSaleDate?.toISOString(),
  }));

  return <CalendarView initialGigs={gigsJson} />;
}
