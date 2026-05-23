'use client';

import React, { createContext, useContext, useState, useEffect, useRef } from 'react';

export interface Track {
  id: string;
  title: string;
  speaker: string;
  url: string;
  coverUrl?: string;
  duration?: string;
}

interface AudioContextType {
  currentTrack: Track | null;
  isPlaying: boolean;
  currentTime: number;
  duration: number;
  volume: number;
  playTrack: (track: Track) => void;
  pauseTrack: () => void;
  resumeTrack: () => void;
  togglePlay: () => void;
  seek: (time: number) => void;
  changeVolume: (volume: number) => void;
}

const AudioContext = createContext<AudioContextType | undefined>(undefined);

export const AudioProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentTrack, setCurrentTrack] = useState<Track | null>(null);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [duration, setDuration] = useState<number>(0);
  const [volume, setVolume] = useState<number>(0.8);

  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Initialize Audio
  useEffect(() => {
    const audio = new Audio();
    audio.volume = volume;
    audioRef.current = audio;

    const onTimeUpdate = () => {
      setCurrentTime(audio.currentTime);
    };

    const onLoadedMetadata = () => {
      setDuration(audio.duration || 0);
    };

    const onEnded = () => {
      setIsPlaying(false);
      setCurrentTime(0);
    };

    audio.addEventListener('timeupdate', onTimeUpdate);
    audio.addEventListener('loadedmetadata', onLoadedMetadata);
    audio.addEventListener('ended', onEnded);

    return () => {
      audio.pause();
      audio.removeEventListener('timeupdate', onTimeUpdate);
      audio.removeEventListener('loadedmetadata', onLoadedMetadata);
      audio.removeEventListener('ended', onEnded);
    };
  }, []);

  // Update volume
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, [volume]);

  // Handle Play/Pause
  const playTrack = (track: Track) => {
    if (!audioRef.current) return;

    if (currentTrack?.url === track.url) {
      // Same track, toggle play
      togglePlay();
      return;
    }

    // Set state synchronously so UI updates immediately
    setCurrentTrack(track);
    setIsPlaying(true);

    audioRef.current.src = track.url;
    audioRef.current.load();
    audioRef.current.play()
      .catch((err) => {
        console.error('Audio play failed:', err);
        // If aborted or failed, we keep the track but set playing state to false
        setIsPlaying(false);
      });
  };

  const pauseTrack = () => {
    if (!audioRef.current) return;
    audioRef.current.pause();
    setIsPlaying(false);
  };

  const resumeTrack = () => {
    if (!audioRef.current || !currentTrack) return;
    setIsPlaying(true);
    audioRef.current.play()
      .catch((err) => {
        console.error('Audio play failed on resume:', err);
        setIsPlaying(false);
      });
  };

  const togglePlay = () => {
    if (isPlaying) {
      pauseTrack();
    } else {
      if (currentTrack) {
        resumeTrack();
      }
    }
  };

  const seek = (time: number) => {
    if (!audioRef.current) return;
    audioRef.current.currentTime = time;
    setCurrentTime(time);
  };

  const changeVolume = (val: number) => {
    const v = Math.max(0, Math.min(1, val));
    setVolume(v);
  };

  return (
    <AudioContext.Provider
      value={{
        currentTrack,
        isPlaying,
        currentTime,
        duration,
        volume,
        playTrack,
        pauseTrack,
        resumeTrack,
        togglePlay,
        seek,
        changeVolume,
      }}
    >
      {children}
    </AudioContext.Provider>
  );
};

export const useAudio = () => {
  const context = useContext(AudioContext);
  if (!context) {
    throw new Error('useAudio must be used within an AudioProvider');
  }
  return context;
};
