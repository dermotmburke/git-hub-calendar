import Link from 'next/link';

export default function Nav() {
  return (
    <nav className="fixed top-0 left-0 w-full z-50 flex justify-between items-center px-6 py-4 bg-white border-b-4 border-black">
      <Link href="/" className="text-3xl font-black tracking-tighter text-black font-headline">
        GIGHUB
      </Link>
      <div className="flex items-center gap-1 font-headline uppercase tracking-tighter font-bold text-black text-sm">
        <Link href="/" className="hover:bg-black hover:text-white px-3 py-1 transition-colors">
          UPCOMING
        </Link>
        <Link href="/gigs" className="hover:bg-black hover:text-white px-3 py-1 transition-colors">
          ALL GIGS
        </Link>
        <Link href="/calendar" className="hover:bg-black hover:text-white px-3 py-1 transition-colors">
          CALENDAR
        </Link>
      </div>
    </nav>
  );
}
