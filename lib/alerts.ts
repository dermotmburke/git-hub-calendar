import { getGigsForAlertCheck, updateGig } from './google-calendar';

export async function checkAndSendAlerts(): Promise<void> {
  const gigs = await getGigsForAlertCheck();
  const now = new Date();

  for (const gig of gigs) {
    if (!gig.ticketSaleAlertSent && gig.ticketSaleDate && gig.ticketSaleDate <= now) {
      try {
        console.log(`[alerts] Tickets on sale now for ${gig.artist} at ${gig.location}${gig.ticketUrl ? ` — ${gig.ticketUrl}` : ''}`);
        await updateGig(gig.id, { ticketSaleAlertSent: true });
      } catch (err) {
        console.error(`[alerts] Failed ticket sale alert for ${gig.artist}:`, err);
      }
    }

    if (!gig.preEventAlertSent && gig.eventDate > now) {
      const daysUntil = Math.ceil(
        (gig.eventDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24)
      );
      if (daysUntil <= gig.reminderDaysBefore) {
        try {
          const dayWord = daysUntil === 1 ? 'day' : 'days';
          console.log(`[alerts] Reminder: ${gig.artist} at ${gig.location} is in ${daysUntil} ${dayWord}${gig.ticketUrl ? ` — ${gig.ticketUrl}` : ''}`);
          await updateGig(gig.id, { preEventAlertSent: true });
        } catch (err) {
          console.error(`[alerts] Failed pre-event alert for ${gig.artist}:`, err);
        }
      }
    }
  }
}
