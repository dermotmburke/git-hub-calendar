import Link from 'next/link';
import ThemeToggle from './ThemeToggle';

function Logo() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1860 400" width="120" height="26" aria-label="GIGHUB" role="img" fill="currentColor">
      {/* G */}
      <rect x="25"  y="50"  width="260" height="85"  />
      <rect x="25"  y="50"  width="85"  height="300" />
      <rect x="25"  y="265" width="260" height="85"  />
      <rect x="200" y="189" width="85"  height="161" />
      <rect x="130" y="189" width="155" height="85"  />
      {/* I */}
      <rect x="335" y="50"  width="260" height="139" />
      <rect x="335" y="265" width="260" height="85"  />
      <rect x="422" y="50"  width="85"  height="300" />
      {/* G */}
      <rect x="645" y="50"  width="260" height="85"  />
      <rect x="645" y="50"  width="85"  height="300" />
      <rect x="645" y="265" width="260" height="85"  />
      <rect x="820" y="189" width="85"  height="161" />
      <rect x="750" y="189" width="155" height="85"  />
      {/* H */}
      <rect x="955"  y="50"  width="85"  height="300" />
      <rect x="1130" y="50"  width="85"  height="300" />
      <rect x="955"  y="131" width="260" height="139" />
      {/* U */}
      <rect x="1265" y="50"  width="85"  height="300" />
      <rect x="1440" y="50"  width="85"  height="300" />
      <rect x="1265" y="211" width="260" height="139" />
      {/* B */}
      <rect x="1575" y="50"  width="85"  height="300" />
      <rect x="1575" y="50"  width="260" height="85"  />
      <rect x="1575" y="158" width="260" height="85"  />
      <rect x="1575" y="265" width="260" height="85"  />
      <rect x="1750" y="50"  width="85"  height="193" />
      <rect x="1750" y="158" width="85"  height="192" />
      {/* B notch — must match page background */}
      <rect x="1825" y="184" width="10"  height="26" className="fill-white dark:fill-black" />
    </svg>
  );
}

export default function Nav() {
  return (
    <nav className="fixed top-0 left-0 w-full z-50 flex justify-between items-center px-6 py-4 bg-white dark:bg-black border-b-4 border-black dark:border-white">
      <Link href="/" className="text-black dark:text-white">
        <Logo />
      </Link>
      <div className="flex items-center gap-1 font-headline uppercase tracking-wider text-black dark:text-white text-base">
        <Link href="/" className="hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black px-3 py-1 transition-colors">
          UPCOMING
        </Link>
        <Link href="/gigs" className="hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black px-3 py-1 transition-colors">
          ALL GIGS
        </Link>
        <Link href="/calendar" className="hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black px-3 py-1 transition-colors">
          CALENDAR
        </Link>
        <ThemeToggle />
      </div>
    </nav>
  );
}
