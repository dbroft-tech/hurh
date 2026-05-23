import type { Metadata } from 'next';
import './globals.css';
import { AudioProvider } from '@/context/AudioContext';
import { AudioPlayer } from '@/components/AudioPlayer';
import { ThemeToggle } from '@/components/ThemeToggle';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Andrew Wommack Ministries | Recreated and Refined',
  description: 'A modern, premium digital experience of Andrew Wommack Ministries (AWMI), featuring daily broadcasts, audio library teachings, devotional commentary, and partnership tools.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" style={{ height: '100%' }} data-scroll-behavior="smooth">
      <body
        style={{
          display: 'flex',
          flexDirection: 'column',
          minHeight: '100vh',
          backgroundColor: 'var(--bg-primary)',
          color: 'var(--text-primary)',
          fontFamily: 'var(--font-body)',
        }}
      >
        <AudioProvider>
          {/* Global Sticky Navigation Header */}
          <header
            style={{
              position: 'sticky',
              top: 0,
              zIndex: 1000,
              viewTransitionName: 'site-header',
            }}
            className="glass-header"
          >
            <div
              className="container"
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                height: '70px',
              }}
            >
              {/* Monogram / Logo */}
              <Link
                href="/"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.75rem',
                  fontWeight: 800,
                  fontSize: '1.4rem',
                  fontFamily: 'var(--font-display)',
                }}
              >
                <span
                  style={{
                    background: 'linear-gradient(135deg, hsl(var(--brand-amber)), hsl(var(--brand-amber-light)))',
                    color: 'white',
                    width: '36px',
                    height: '36px',
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderRadius: 'var(--radius-sm)',
                    fontSize: '1.1rem',
                    fontWeight: 900,
                    boxShadow: 'var(--shadow-sm)',
                  }}
                >
                  AW
                </span>
                <span className="text-gradient-blue hide-mobile">
                  AWM
                </span>
              </Link>

              {/* Navigation Links */}
              <nav
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '1.5rem',
                }}
              >
                <Link href="/" style={{ fontWeight: 500, fontSize: '0.95rem' }} className="nav-link">
                  Home
                </Link>
                <Link href="/watch" style={{ fontWeight: 500, fontSize: '0.95rem' }} className="nav-link">
                  Watch
                </Link>
                <Link href="/listen" style={{ fontWeight: 500, fontSize: '0.95rem' }} className="nav-link">
                  Listen
                </Link>
                <Link href="/read" style={{ fontWeight: 500, fontSize: '0.95rem' }} className="nav-link">
                  Read
                </Link>
                <Link href="/healing" style={{ fontWeight: 500, fontSize: '0.95rem' }} className="nav-link">
                  Healing
                </Link>
                <Link href="/give" style={{ fontWeight: 500, fontSize: '0.95rem' }} className="nav-link">
                  Give
                </Link>
              </nav>

              {/* Theme toggle & Partner CTA */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <ThemeToggle />
                <Link href="/give" className="btn btn-primary" style={{ padding: '0.5rem 1rem', fontSize: '0.85rem' }}>
                  Partner
                </Link>
              </div>
            </div>
          </header>

          {/* Main Content Area */}
          <main style={{ flex: '1 0 auto', paddingBottom: '120px' }}>
            {children}
          </main>

          {/* Persistent global audio player */}
          <AudioPlayer />
        </AudioProvider>
      </body>
    </html>
  );
}
