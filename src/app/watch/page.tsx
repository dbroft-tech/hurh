'use client';

import React, { useState, useRef, useEffect } from 'react';

interface Episode {
  id: string;
  title: string;
  category: 'tv' | 'healing' | 'destiny' | 'events';
  duration: string;
  url: string;
  thumbnail: string;
  description: string;
  airDate: string;
}

const EPISODES: Episode[] = [
  {
    id: 'ep1',
    title: "Gospel Truth: God's Will is Healing (Part 1)",
    category: 'tv',
    duration: '28:15',
    url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4', // sample mp4
    thumbnail: '/images/hero_background.png',
    description: "In this teaching, Andrew Wommack shares how God's will is always healing. Learn how Jesus paid for your sicknesses and diseases on the cross, and how to stand in authority against somatic systems.",
    airDate: 'May 22, 2026',
  },
  {
    id: 'ep2',
    title: "Healing Journeys: Lance's Restoration from Liver Failure",
    category: 'healing',
    duration: '15:40',
    url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
    thumbnail: '/images/lance_testimony.png',
    description: "Doctors gave Lance weeks to live due to a critical liver failure. By listening to Andrew's teaching and taking authority in Jesus' name, his body was completely transformed and healed.",
    airDate: 'April 14, 2026',
  },
  {
    id: 'ep3',
    title: "Destiny Stories: Anchored in woodland mountains",
    category: 'destiny',
    duration: '22:10',
    url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
    thumbnail: '/images/charis_college.png',
    description: "Follow the journey of students discovering their God-given destiny at Charis Bible College. Nestled in the Rocky Mountains, they find clarity, training, and spiritual empowerment.",
    airDate: 'March 18, 2026',
  },
  {
    id: 'ep4',
    title: "Truth & Liberty Coalition: Healing our Land",
    category: 'events',
    duration: '45:30',
    url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4',
    thumbnail: '/images/truth_liberty.png',
    description: "Highlights from the national truth summit. Explore how faith and modern governance intersect, and how we are called to bring truth and godly leadership back to our local communities.",
    airDate: 'May 10, 2026',
  },
  {
    id: 'ep5',
    title: "Gospel Truth: The Power of Unconditional Grace",
    category: 'tv',
    duration: '27:50',
    url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4',
    thumbnail: '/images/hero_background.png',
    description: "Andrew reveals how God's love does not depend on your performance, but on Jesus' finished work. Break free from legalism and walk in the true liberty of the gospel.",
    airDate: 'May 21, 2026',
  },
  {
    id: 'ep6',
    title: "Healing Journeys: Hannah's Eyesight Restored",
    category: 'healing',
    duration: '18:25',
    url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4',
    thumbnail: '/images/lance_testimony.png',
    description: "Diagnosed with progressive macular degeneration, Hannah was losing her sight. Discover how simple, child-like faith in God's promises restored her vision entirely.",
    airDate: 'Feb 28, 2026',
  },
];

export default function WatchPage() {
  const [activeCategory, setActiveCategory] = useState<'all' | 'tv' | 'healing' | 'destiny' | 'events'>('all');
  const [currentEpisode, setCurrentEpisode] = useState<Episode>(EPISODES[0]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(0.8);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [playerError, setPlayerError] = useState<string | null>(null);

  const videoRef = useRef<HTMLVideoElement | null>(null);
  const playerContainerRef = useRef<HTMLDivElement | null>(null);

  // Sync state on episode change
  useEffect(() => {
    setPlayerError(null);
    if (videoRef.current) {
      videoRef.current.src = currentEpisode.url;
      videoRef.current.load();
      if (isPlaying) {
        videoRef.current.play()
          .catch(err => {
            console.error("Video play error:", err);
            setIsPlaying(false);
          });
      }
    }
  }, [currentEpisode]);

  const togglePlay = () => {
    if (!videoRef.current) return;
    setPlayerError(null);
    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    } else {
      setIsPlaying(true);
      videoRef.current.play()
        .catch(err => {
          console.error("Video play failed:", err);
          setIsPlaying(false);
        });
    }
  };

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      setCurrentTime(videoRef.current.currentTime);
    }
  };

  const handleLoadedMetadata = () => {
    if (videoRef.current) {
      setDuration(videoRef.current.duration || 0);
    }
  };

  const handleScrub = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseFloat(e.target.value);
    if (videoRef.current) {
      videoRef.current.currentTime = val;
      setCurrentTime(val);
    }
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseFloat(e.target.value);
    setVolume(val);
    if (videoRef.current) {
      videoRef.current.volume = val;
    }
  };

  const toggleFullscreen = () => {
    if (!playerContainerRef.current) return;
    if (!document.fullscreenElement) {
      playerContainerRef.current.requestFullscreen()
        .then(() => setIsFullscreen(true))
        .catch(err => console.error(err));
    } else {
      document.exitFullscreen()
        .then(() => setIsFullscreen(false));
    }
  };

  // Listen to fullscreen changes outside toggle
  useEffect(() => {
    const handleFsChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener('fullscreenchange', handleFsChange);
    return () => document.removeEventListener('fullscreenchange', handleFsChange);
  }, []);

  const formatTime = (time: number) => {
    if (isNaN(time)) return '0:00';
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  // Filter episodes
  const filteredEpisodes = activeCategory === 'all'
    ? EPISODES
    : EPISODES.filter(ep => ep.category === activeCategory);

  const handleCategoryChange = (category: typeof activeCategory) => {
    // Wrap state change in standard browser view transition if available
    if (document.startViewTransition) {
      document.startViewTransition(() => {
        setActiveCategory(category);
      });
    } else {
      setActiveCategory(category);
    }
  };

  return (
    <div style={{ padding: '3rem 0' }}>
      <div className="container">
        {/* Hub Header */}
        <div style={{ marginBottom: '2.5rem' }}>
          <span style={{ fontSize: '0.85rem', fontWeight: 700, color: 'hsl(var(--brand-blue))', textTransform: 'uppercase', letterSpacing: '1px' }}>
            Broadcasting Center
          </span>
          <h1 style={{ fontSize: '2.5rem', marginTop: '0.25rem' }}>Watch Gospel Truth & Journeys</h1>
        </div>

        {/* Video layout: Player & Sidebar info */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '3fr 1.2fr',
            gap: '2.5rem',
            marginBottom: '4rem',
            alignItems: 'start',
          }}
        >
          {/* Main Custom Player Column */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <div
              ref={playerContainerRef}
              style={{
                position: 'relative',
                width: '100%',
                aspectRatio: '16/9',
                backgroundColor: 'black',
                borderRadius: 'var(--radius-md)',
                overflow: 'hidden',
                boxShadow: 'var(--shadow-lg)',
              }}
            >
              {/* Native video tag */}
              <video
                ref={videoRef}
                src={currentEpisode.url}
                onTimeUpdate={handleTimeUpdate}
                onLoadedMetadata={handleLoadedMetadata}
                onClick={togglePlay}
                poster={currentEpisode.thumbnail}
                preload="none"
                onError={() => {
                  setPlayerError("Media preview not supported in this browser, or stream is offline.");
                  setIsPlaying(false);
                }}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'contain',
                }}
              />

              {/* Error Overlay */}
              {playerError && (
                <div
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    backgroundColor: 'rgba(0, 0, 0, 0.85)',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: '2rem',
                    color: 'white',
                    textAlign: 'center',
                    zIndex: 10,
                  }}
                >
                  <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="hsl(var(--brand-amber))" strokeWidth="2" style={{ marginBottom: '1rem' }}>
                    <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
                    <line x1="12" y1="9" x2="12" y2="13" />
                    <line x1="12" y1="17" x2="12.01" y2="17" />
                  </svg>
                  <h4 style={{ color: 'white', marginBottom: '0.5rem' }}>Playback Error</h4>
                  <p style={{ fontSize: '0.85rem', color: '#cbd5e1', maxWidth: '320px', margin: 0 }}>
                    {playerError}
                  </p>
                  <button
                    onClick={() => {
                      setPlayerError(null);
                      if (videoRef.current) {
                        videoRef.current.load();
                        setIsPlaying(true);
                        videoRef.current.play().catch(err => {
                          console.error(err);
                          setIsPlaying(false);
                        });
                      }
                    }}
                    className="btn btn-outline"
                    style={{ marginTop: '1rem', padding: '0.4rem 1rem', fontSize: '0.8rem', color: 'white', borderColor: 'white' }}
                  >
                    Retry Loading
                  </button>
                </div>
              )}

              {/* Custom Overlay Controls */}
              <div
                style={{
                  position: 'absolute',
                  bottom: 0,
                  left: 0,
                  right: 0,
                  background: 'linear-gradient(transparent, rgba(0, 0, 0, 0.85))',
                  padding: '1.5rem 1.5rem 1rem 1.5rem',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '0.75rem',
                  opacity: 1,
                  transition: 'opacity 0.2s ease',
                }}
              >
                {/* Timeline Slider */}
                <input
                  type="range"
                  min="0"
                  max={duration || 100}
                  value={currentTime}
                  onChange={handleScrub}
                  style={{
                    width: '100%',
                    accentColor: 'hsl(var(--brand-amber))',
                    cursor: 'pointer',
                    height: '5px',
                    borderRadius: '2.5px',
                  }}
                />

                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                  }}
                >
                  {/* Left Controls */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
                    <button
                      onClick={togglePlay}
                      style={{
                        background: 'transparent',
                        border: 'none',
                        color: 'white',
                        cursor: 'pointer',
                      }}
                    >
                      {isPlaying ? (
                        <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
                          <rect x="6" y="4" width="4" height="16" rx="1" />
                          <rect x="14" y="4" width="4" height="16" rx="1" />
                        </svg>
                      ) : (
                        <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M8 5v14l11-7z" />
                        </svg>
                      )}
                    </button>

                    {/* Time Counter */}
                    <span style={{ color: '#e2e8f0', fontSize: '0.85rem', fontFamily: 'monospace' }}>
                      {formatTime(currentTime)} / {formatTime(duration)}
                    </span>
                  </div>

                  {/* Right Controls */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    {/* Volume */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24" style={{ color: 'white' }}>
                        <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02z" />
                      </svg>
                      <input
                        type="range"
                        min="0"
                        max="1"
                        step="0.05"
                        value={volume}
                        onChange={handleVolumeChange}
                        style={{
                          width: '60px',
                          accentColor: 'white',
                          cursor: 'pointer',
                        }}
                      />
                    </div>

                    {/* Fullscreen */}
                    <button
                      onClick={toggleFullscreen}
                      style={{
                        background: 'transparent',
                        border: 'none',
                        color: 'white',
                        cursor: 'pointer',
                      }}
                    >
                      <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                        <path d="M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Video description */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap' }}>
                <span
                  style={{
                    backgroundColor: 'hsla(var(--brand-amber), 0.15)',
                    color: 'hsl(var(--brand-amber))',
                    padding: '0.2rem 0.6rem',
                    borderRadius: '4px',
                    fontSize: '0.75rem',
                    fontWeight: 700,
                    textTransform: 'uppercase',
                  }}
                >
                  {currentEpisode.category === 'tv' ? 'Daily Broadcast' : currentEpisode.category}
                </span>
                <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                  Aired: {currentEpisode.airDate}
                </span>
              </div>
              <h2 style={{ fontSize: '1.8rem', fontWeight: 700, margin: '0.25rem 0' }}>
                {currentEpisode.title}
              </h2>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', lineHeight: 1.6 }}>
                {currentEpisode.description}
              </p>
            </div>
          </div>

          {/* Sidebar Panel: Show Info & Quick links */}
          <div className="glass-panel" style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            <h3 style={{ fontSize: '1.15rem' }}>Broadcasting Schedule</h3>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
              The Gospel Truth program airs Monday through Friday on networks worldwide, including Daystar, TBN, and online portals.
            </p>
            <div style={{ borderTop: '1px solid var(--border-glass)', paddingTop: '1.25rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div>
                <h4 style={{ fontSize: '0.9rem', color: 'hsl(var(--brand-amber))' }}>TV Air Times</h4>
                <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Monday - Friday • 7:00 AM & 10:00 PM EST</p>
              </div>
              <div>
                <h4 style={{ fontSize: '0.9rem', color: 'hsl(var(--brand-blue))' }}>Healing Is Here Event</h4>
                <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Live Stream August 12-15. Save the Date.</p>
              </div>
            </div>
            <a
              href="https://www.awmi.net/tv-schedule/"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-outline"
              style={{ width: '100%', fontSize: '0.85rem', textAlign: 'center' }}
            >
              Full Global TV Guide
            </a>
          </div>
        </div>

        {/* 3. Category Selector & Grid */}
        <div style={{ borderTop: '1px solid var(--border-glass)', paddingTop: '3rem' }}>
          {/* Tabs header */}
          <div
            style={{
              display: 'flex',
              gap: '1rem',
              overflowX: 'auto',
              paddingBottom: '1.5rem',
              marginBottom: '2rem',
              borderBottom: '1px solid var(--border-glass)',
            }}
          >
            {[
              { id: 'all', label: 'All Episodes' },
              { id: 'tv', label: 'TV Broadcasts' },
              { id: 'healing', label: 'Healing Journeys' },
              { id: 'destiny', label: 'Destiny Stories' },
              { id: 'events', label: 'Special Events' },
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => handleCategoryChange(tab.id as any)}
                style={{
                  padding: '0.5rem 1.25rem',
                  borderRadius: '100px',
                  border: '1px solid',
                  borderColor: activeCategory === tab.id ? 'hsl(var(--brand-blue))' : 'var(--border-glass)',
                  background: activeCategory === tab.id ? 'linear-gradient(135deg, hsl(var(--brand-blue)), hsl(var(--brand-blue-dark)))' : 'transparent',
                  color: activeCategory === tab.id ? 'white' : 'var(--text-secondary)',
                  cursor: 'pointer',
                  fontSize: '0.9rem',
                  fontWeight: 600,
                  whiteSpace: 'nowrap',
                  transition: 'all 0.2s ease',
                }}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Grid list container (animated with viewTransition key) */}
          <div
            style={{
              viewTransitionName: 'tab-content',
            }}
          >
            <div className="grid-cols-3">
              {filteredEpisodes.map(ep => (
                <div
                  key={ep.id}
                  className="card"
                  onClick={() => {
                    setCurrentEpisode(ep);
                    setIsPlaying(true);
                    if (videoRef.current) {
                      videoRef.current.currentTime = 0;
                    }
                  }}
                  style={{
                    cursor: 'pointer',
                    display: 'flex',
                    flexDirection: 'column',
                    padding: 0,
                    borderColor: currentEpisode.id === ep.id ? 'hsl(var(--brand-amber))' : 'var(--border-glass)',
                  }}
                >
                  {/* Image Thumb */}
                  <div
                    style={{
                      position: 'relative',
                      height: '160px',
                      width: '100%',
                      background: `linear-gradient(rgba(0,0,0,0.1), rgba(0,0,0,0.4)), url(${ep.thumbnail}) center/cover no-repeat`,
                      display: 'flex',
                      alignItems: 'flex-end',
                      justifyContent: 'space-between',
                      padding: '0.75rem',
                    }}
                  >
                    {/* AirDate/Category */}
                    <span
                      style={{
                        backgroundColor: 'rgba(0,0,0,0.6)',
                        color: 'white',
                        padding: '0.2rem 0.4rem',
                        borderRadius: '3px',
                        fontSize: '0.7rem',
                      }}
                    >
                      {ep.airDate}
                    </span>
                    <span
                      style={{
                        backgroundColor: 'hsl(var(--brand-blue-dark))',
                        color: 'white',
                        padding: '0.2rem 0.4rem',
                        borderRadius: '3px',
                        fontSize: '0.7rem',
                        fontFamily: 'monospace',
                      }}
                    >
                      {ep.duration}
                    </span>
                  </div>

                  {/* Body details */}
                  <div style={{ padding: '1rem', flex: 1, display: 'flex', flexDirection: 'column' }}>
                    <h3 style={{ fontSize: '1rem', lineHeight: 1.4, marginBottom: '0.5rem', fontWeight: 700 }}>
                      {ep.title}
                    </h3>
                    <p
                      style={{
                        fontSize: '0.8rem',
                        color: 'var(--text-secondary)',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        display: '-webkit-box',
                        WebkitLineClamp: 3,
                        WebkitBoxOrient: 'vertical',
                        flex: 1,
                      }}
                    >
                      {ep.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
