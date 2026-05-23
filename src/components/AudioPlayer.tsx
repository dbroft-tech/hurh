'use client';

import React from 'react';
import { useAudio } from '@/context/AudioContext';

const formatTime = (time: number) => {
  if (isNaN(time)) return '0:00';
  const minutes = Math.floor(time / 60);
  const seconds = Math.floor(time % 60);
  return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
};

export const AudioPlayer: React.FC = () => {
  const {
    currentTrack,
    isPlaying,
    currentTime,
    duration,
    volume,
    togglePlay,
    seek,
    changeVolume,
  } = useAudio();

  // If no track is loaded, don't show the bar
  if (!currentTrack) return null;

  const progressPercent = duration > 0 ? (currentTime / duration) * 100 : 0;

  const handleScrub = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTime = parseFloat(e.target.value);
    seek(newTime);
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseFloat(e.target.value);
    changeVolume(val);
  };

  return (
    <div
      style={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 1001,
        viewTransitionName: 'audio-bar',
      }}
    >
      <div
        className="glass-panel"
        style={{
          margin: '1rem',
          padding: '1rem 1.5rem',
          borderRadius: 'var(--radius-md)',
          display: 'flex',
          flexDirection: 'column',
          gap: '0.75rem',
          boxShadow: '0 -10px 25px -5px rgba(0,0,0,0.1), var(--shadow-lg)',
          border: '1px solid var(--border-glass)',
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '1rem',
            flexWrap: 'wrap',
          }}
        >
          {/* Track Details */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', minWidth: '220px', flex: '1 1 0' }}>
            <div
              style={{
                width: '48px',
                height: '48px',
                borderRadius: 'var(--radius-sm)',
                background: currentTrack.coverUrl
                  ? `url(${currentTrack.coverUrl}) center/cover no-repeat`
                  : 'linear-gradient(135deg, hsl(var(--brand-blue)), hsl(var(--brand-amber)))',
                boxShadow: 'var(--shadow-sm)',
                flexShrink: 0,
              }}
            />
            <div style={{ overflow: 'hidden' }}>
              <h4
                style={{
                  fontSize: '0.95rem',
                  fontWeight: 600,
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  margin: 0,
                }}
              >
                {currentTrack.title}
              </h4>
              <p
                style={{
                  fontSize: '0.8rem',
                  color: 'var(--text-secondary)',
                  margin: 0,
                }}
              >
                {currentTrack.speaker}
              </p>
            </div>
          </div>

          {/* Player Main Controls */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '1.25rem',
              justifyContent: 'center',
            }}
          >
            {/* Backward 10s */}
            <button
              onClick={() => seek(Math.max(0, currentTime - 10))}
              aria-label="Rewind 10 seconds"
              style={{
                background: 'transparent',
                border: 'none',
                cursor: 'pointer',
                color: 'var(--text-secondary)',
              }}
            >
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M2 16.1A9 9 0 1 1 12 21H10M2 17v-4h4" />
                <path d="M12 9v6M9 12h6" strokeWidth="0" />
              </svg>
            </button>

            {/* Play/Pause Toggle */}
            <button
              onClick={togglePlay}
              aria-label={isPlaying ? 'Pause' : 'Play'}
              className="btn"
              style={{
                width: '48px',
                height: '48px',
                borderRadius: '50%',
                padding: 0,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: 'linear-gradient(135deg, hsl(var(--brand-blue)), hsl(var(--brand-blue-dark)))',
                color: 'var(--text-on-brand)',
                boxShadow: 'var(--shadow-sm)',
                cursor: 'pointer',
                border: 'none',
              }}
            >
              {isPlaying ? (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <rect x="6" y="4" width="4" height="16" rx="1" />
                  <rect x="14" y="4" width="4" height="16" rx="1" />
                </svg>
              ) : (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" style={{ marginLeft: '4px' }}>
                  <path d="M8 5v14l11-7z" />
                </svg>
              )}
            </button>

            {/* Forward 10s */}
            <button
              onClick={() => seek(Math.min(duration, currentTime + 10))}
              aria-label="Fast forward 10 seconds"
              style={{
                background: 'transparent',
                border: 'none',
                cursor: 'pointer',
                color: 'var(--text-secondary)',
              }}
            >
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M22 16.1A9 9 0 1 0 12 21H14M22 17v-4h-4" />
              </svg>
            </button>
          </div>

          {/* Volume Control */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              minWidth: '150px',
              justifyContent: 'flex-end',
              flex: '1 1 0',
            }}
          >
            <button
              onClick={() => changeVolume(volume === 0 ? 0.8 : 0)}
              aria-label={volume === 0 ? 'Unmute' : 'Mute'}
              style={{
                background: 'transparent',
                border: 'none',
                cursor: 'pointer',
                color: 'var(--text-secondary)',
              }}
            >
              {volume === 0 ? (
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
                  <line x1="23" y1="9" x2="17" y2="15" />
                  <line x1="17" y1="9" x2="23" y2="15" />
                </svg>
              ) : (
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
                  <path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07" />
                </svg>
              )}
            </button>
            <input
              type="range"
              min="0"
              max="1"
              step="0.05"
              value={volume}
              onChange={handleVolumeChange}
              style={{
                width: '80px',
                accentColor: 'hsl(var(--brand-blue))',
                cursor: 'pointer',
              }}
            />
          </div>
        </div>

        {/* Playback Progress Scrubber */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', width: '100%' }}>
          <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', minWidth: '35px' }}>
            {formatTime(currentTime)}
          </span>
          <div style={{ position: 'relative', flex: 1, display: 'flex', alignItems: 'center' }}>
            <input
              type="range"
              min="0"
              max={duration || 100}
              value={currentTime}
              onChange={handleScrub}
              style={{
                width: '100%',
                accentColor: 'hsl(var(--brand-blue))',
                height: '4px',
                borderRadius: '2px',
                cursor: 'pointer',
                background: `linear-gradient(to right, hsl(var(--brand-blue)) 0%, hsl(var(--brand-blue)) ${progressPercent}%, var(--bg-tertiary) ${progressPercent}%, var(--bg-tertiary) 100%)`,
                outline: 'none',
              }}
            />
          </div>
          <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', minWidth: '35px' }}>
            {formatTime(duration)}
          </span>
        </div>
      </div>
    </div>
  );
};
