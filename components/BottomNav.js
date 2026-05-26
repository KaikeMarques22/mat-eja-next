'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const tabs = [
  {
    href: '/perfil',
    label: 'Início',
    match: ['/perfil', '/inicio'],
    icon: (active) => (
      <svg
        className={`h-6 w-6 ${active ? 'text-blue-600' : 'text-slate-500'}`}
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
        aria-hidden
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-4 0h4"
        />
      </svg>
    ),
  },
  {
    href: '/aprendizagem',
    label: 'Aprendizagem',
    match: ['/aprendizagem', '/formulas'],
    icon: (active) => (
      <svg
        className={`h-6 w-6 ${active ? 'text-blue-600' : 'text-slate-500'}`}
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
        aria-hidden
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
        />
      </svg>
    ),
  },
  {
    href: '/exercicios',
    label: 'Exercícios',
    match: ['/exercicios'],
    icon: (active) => (
      <svg
        className={`h-6 w-6 ${active ? 'text-blue-600' : 'text-slate-500'}`}
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
        aria-hidden
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"
        />
      </svg>
    ),
  },
];

export default function BottomNav() {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 border-t border-slate-200 bg-white">
      <div className="mx-auto flex max-w-lg items-center justify-around px-4 py-2">
        {tabs.map((tab) => {
          const active = tab.match.some(
            (path) => pathname === path || pathname.startsWith(`${path}/`)
          );
          return (
            <Link
              key={tab.href}
              href={tab.href}
              className="flex min-w-[5rem] flex-col items-center gap-1 rounded-lg px-3 py-1"
            >
              {tab.icon(active)}
              <span
                className={`text-xs font-medium ${
                  active ? 'text-blue-600' : 'text-slate-500'
                }`}
              >
                {tab.label}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
