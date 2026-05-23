'use client';

import React, { useState } from 'react';
import { useAudio, Track } from '@/context/AudioContext';

const AUDIOS: (Track & { category: string; description: string; year: string })[] = [
  {
    id: 'aud1',
    title: 'Spirit, Soul & Body: Part 1',
    speaker: 'Andrew Wommack',
    url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3',
    coverUrl: '/images/hero_background.png',
    duration: '42:18',
    category: 'Spirit, Soul & Body',
    description: 'Understand the relational structure of your spirit, soul, and body. Learn how your spirit was instantly perfected at salvation, and how to align your mind to release that perfection.',
    year: '2025',
  },
  {
    id: 'aud2',
    title: 'Spirit, Soul & Body: Part 2',
    speaker: 'Andrew Wommack',
    url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3',
    coverUrl: '/images/hero_background.png',
    duration: '45:30',
    category: 'Spirit, Soul & Body',
    description: 'Deep dive into why your physical senses and emotional soul compete with your born-again spirit. Discover how the Word of God serves as a spiritual mirror.',
    year: '2025',
  },
  {
    id: 'aud3',
    title: "The Believer's Authority: Part 1",
    speaker: 'Andrew Wommack',
    url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3',
    coverUrl: '/images/truth_liberty.png',
    duration: '38:10',
    category: "Believer's Authority",
    description: 'Explore the authority God has delegated to you as a believer. Stop begging God to do what He has already commanded you to do, and begin commanding your healing and victory.',
    year: '2026',
  },
  {
    id: 'aud4',
    title: "The Believer's Authority: Part 2",
    speaker: 'Andrew Wommack',
    url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3',
    coverUrl: '/images/truth_liberty.png',
    duration: '40:15',
    category: "Believer's Authority",
    description: 'How to stand against satanic operations. Learn the mechanics of spiritual warfare and understand that Jesus already defeated the devil; you are simply enforcing His triumph.',
    year: '2026',
  },
  {
    id: 'aud5',
    title: "You've Already Got It!: Part 1",
    speaker: 'Andrew Wommack',
    url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3',
    coverUrl: '/images/charis_college.png',
    duration: '44:50',
    category: "You've Already Got It",
    description: 'Learn that God has already blessed you with all spiritual blessings in Christ Jesus. Your healing, prosperity, and provision are already in your spirit waiting to manifest.',
    year: '2024',
  },
  {
    id: 'aud6',
    title: "You've Already Got It!: Part 2",
    speaker: 'Andrew Wommack',
    url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-6.mp3',
    coverUrl: '/images/charis_college.png',
    duration: '43:10',
    category: "You've Already Got It",
    description: 'How to bypass unbelief and clear the channel of faith so God\'s power can flow from your spirit into your physical circumstance.',
    year: '2024',
  },
  {
    id: 'aud7',
    title: 'A Better Way to Pray: Part 1',
    speaker: 'Andrew Wommack',
    url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-7.mp3',
    coverUrl: '/images/hero_background.png',
    duration: '37:40',
    category: 'Prayer & Communion',
    description: 'Andrew challenges conventional prayer methods. Discover how prayer is not about twisting God\'s arm or pleading, but about communion and releasing His grace.',
    year: '2025',
  },
  {
    id: 'aud8',
    title: 'A Better Way to Pray: Part 2',
    speaker: 'Andrew Wommack',
    url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-8.mp3',
    coverUrl: '/images/hero_background.png',
    duration: '39:55',
    category: 'Prayer & Communion',
    description: 'Commanding prayer vs pleading prayer. Harness the power of faith and declare God\'s promises over your health and situation.',
    year: '2025',
  },
];

export default function ListenPage() {
  const { currentTrack, isPlaying, playTrack, togglePlay } = useAudio();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  // Extract unique categories
  const categories = ['All', ...Array.from(new Set(AUDIOS.map(item => item.category)))];

  // Filter track list
  const filteredAudios = AUDIOS.filter(item => {
    const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          item.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div style={{ padding: '3rem 0' }}>
      <div className="container">
        {/* Page Header */}
        <div style={{ marginBottom: '3rem' }}>
          <span style={{ fontSize: '0.85rem', fontWeight: 700, color: 'hsl(var(--brand-blue))', textTransform: 'uppercase', letterSpacing: '1px' }}>
            Audio Archives
          </span>
          <h1 style={{ fontSize: '2.5rem', marginTop: '0.25rem' }}>Audio Teachings Library</h1>
          <p style={{ color: 'var(--text-secondary)', maxWidth: '600px', marginTop: '0.5rem' }}>
            Stream hundreds of Andrew Wommack's core audio teaching series absolutely free. Play teachings while browsing other parts of the site.
          </p>
        </div>

        {/* Search and Category Filter Bar */}
        <div
          className="glass-panel"
          style={{
            padding: '1.5rem',
            borderRadius: 'var(--radius-md)',
            display: 'flex',
            flexDirection: 'column',
            gap: '1rem',
            marginBottom: '2.5rem',
          }}
        >
          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
            {/* Search Input */}
            <div style={{ flex: '1 1 300px', position: 'relative' }}>
              <input
                type="text"
                placeholder="Search teachings by series, title, or keyword..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                style={{
                  width: '100%',
                  padding: '0.75rem 1rem 0.75rem 2.5rem',
                  borderRadius: 'var(--radius-sm)',
                  border: '1px solid var(--border-glass)',
                  background: 'var(--bg-primary)',
                  color: 'var(--text-primary)',
                  outline: 'none',
                  fontSize: '0.95rem',
                  fontFamily: 'inherit',
                }}
              />
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="var(--text-muted)"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                style={{
                  position: 'absolute',
                  left: '0.85rem',
                  top: '50%',
                  transform: 'translateY(-50%)',
                }}
              >
                <circle cx="11" cy="11" r="8" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
            </div>

            {/* Quick Category drop down/selector */}
            <div style={{ minWidth: '180px' }}>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                style={{
                  width: '100%',
                  padding: '0.75rem 1rem',
                  borderRadius: 'var(--radius-sm)',
                  border: '1px solid var(--border-glass)',
                  background: 'var(--bg-primary)',
                  color: 'var(--text-primary)',
                  outline: 'none',
                  fontSize: '0.95rem',
                  fontFamily: 'inherit',
                  cursor: 'pointer',
                }}
              >
                {categories.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Tracks Table / List */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {filteredAudios.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '3rem', color: 'var(--text-muted)' }}>
              No teachings found matching your filters. Try search terms like "spirit" or "authority".
            </div>
          ) : (
            filteredAudios.map((track) => {
              const isCurrentTrack = currentTrack?.id === track.id;
              const isThisPlaying = isCurrentTrack && isPlaying;

              return (
                <div
                  key={track.id}
                  className="card"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '1.25rem 1.5rem',
                    gap: '1.5rem',
                    flexWrap: 'wrap',
                    borderColor: isCurrentTrack ? 'hsla(var(--brand-blue), 0.3)' : 'var(--border-glass)',
                    background: isCurrentTrack ? 'var(--bg-tertiary)' : 'var(--bg-secondary)',
                  }}
                >
                  {/* Play & Meta Column */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem', flex: '1 1 400px' }}>
                    {/* Play/Pause Circle Button */}
                    <button
                      onClick={() => {
                        if (isCurrentTrack) {
                          togglePlay();
                        } else {
                          playTrack(track);
                        }
                      }}
                      aria-label={isThisPlaying ? 'Pause Teaching' : 'Play Teaching'}
                      style={{
                        width: '42px',
                        height: '42px',
                        borderRadius: '50%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        background: isThisPlaying
                          ? 'linear-gradient(135deg, hsl(var(--brand-amber)), hsl(var(--brand-amber-light)))'
                          : 'linear-gradient(135deg, hsl(var(--brand-blue)), hsl(var(--brand-blue-dark)))',
                        color: 'white',
                        border: 'none',
                        cursor: 'pointer',
                        boxShadow: 'var(--shadow-sm)',
                        flexShrink: 0,
                        transition: 'transform 0.2s ease',
                      }}
                      onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.08)')}
                      onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
                    >
                      {isThisPlaying ? (
                        <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24">
                          <rect x="6" y="4" width="4" height="16" rx="1" />
                          <rect x="14" y="4" width="4" height="16" rx="1" />
                        </svg>
                      ) : (
                        <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24" style={{ marginLeft: '2px' }}>
                          <path d="M8 5v14l11-7z" />
                        </svg>
                      )}
                    </button>

                    {/* Metadata text */}
                    <div>
                      <span
                        style={{
                          fontSize: '0.75rem',
                          fontWeight: 700,
                          color: 'hsl(var(--brand-amber))',
                          textTransform: 'uppercase',
                        }}
                      >
                        {track.category}
                      </span>
                      <h3 style={{ fontSize: '1.1rem', fontWeight: 700, margin: '0.1rem 0 0.25rem 0' }}>
                        {track.title}
                      </h3>
                      <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', margin: 0, lineHeight: 1.4 }}>
                        {track.description}
                      </p>
                    </div>
                  </div>

                  {/* Duration & Actions Column */}
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '1.5rem',
                      justifyContent: 'flex-end',
                      flex: '1 0 150px',
                    }}
                  >
                    <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)', fontFamily: 'monospace' }}>
                      {track.duration}
                    </span>
                    <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                      Year: {track.year}
                    </span>
                    <button
                      onClick={() => playTrack(track)}
                      className="btn btn-outline"
                      style={{ padding: '0.4rem 0.8rem', fontSize: '0.8rem' }}
                    >
                      Listen
                    </button>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
}
