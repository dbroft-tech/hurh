'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useAudio } from '@/context/AudioContext';

export default function Home() {
  const { playTrack } = useAudio();

  const handlePlayDailyBroadcast = () => {
    playTrack({
      id: 'daily-broadcast-today',
      title: "Gospel Truth: God's Will is Healing (Part 1)",
      speaker: 'Andrew Wommack',
      url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3',
      coverUrl: '/images/hero_background.png',
    });
  };

  return (
    <div>
      {/* 1. Hero Section */}
      <section
        style={{
          position: 'relative',
          height: '80vh',
          minHeight: '550px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundImage: 'linear-gradient(rgba(15, 83, 138, 0.45), rgba(6, 11, 19, 0.85)), url("/images/hero_background.png")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          color: 'white',
          textAlign: 'center',
          padding: '2rem',
        }}
      >
        <div
          className="glass-panel"
          style={{
            maxWidth: '800px',
            padding: '3rem 2rem',
            display: 'flex',
            flexDirection: 'column',
            gap: '1.5rem',
            alignItems: 'center',
          }}
        >
          <span
            style={{
              textTransform: 'uppercase',
              fontSize: '0.85rem',
              fontWeight: 700,
              letterSpacing: '3px',
              color: 'hsl(var(--brand-amber))',
            }}
          >
            Andrew Wommack Ministries
          </span>
          <h1
            style={{
              fontSize: 'clamp(2rem, 5vw, 3.5rem)',
              color: 'white',
              fontWeight: 800,
            }}
          >
            Grace & Truth for a Changing World
          </h1>
          <p
            style={{
              fontSize: 'clamp(1rem, 2vw, 1.2rem)',
              color: '#cbd5e1',
              maxWidth: '650px',
              lineHeight: 1.6,
            }}
          >
            Discover the unconditional love and grace of God. Walk in health, victory, and the power of His promises through biblical teaching.
          </p>
          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', justifyContent: 'center', marginTop: '1rem' }}>
            <Link href="/watch" className="btn btn-amber">
              Watch Broadcast
            </Link>
            <button onClick={handlePlayDailyBroadcast} className="btn btn-outline" style={{ color: 'white', borderColor: 'rgba(255,255,255,0.4)' }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ marginRight: '6px' }}>
                <polygon points="5 3 19 12 5 21 5 3" fill="currentColor"/>
              </svg>
              Listen Now
            </button>
          </div>
        </div>
      </section>

      {/* 2. Today's Highlight & Explorer Section */}
      <section style={{ padding: '5rem 0', backgroundColor: 'var(--bg-primary)' }}>
        <div className="container">
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
              gap: '3rem',
              alignItems: 'center',
            }}
          >
            {/* TV Broadcast Card */}
            <div>
              <span
                style={{
                  fontSize: '0.85rem',
                  fontWeight: 700,
                  color: 'hsl(var(--brand-blue))',
                  textTransform: 'uppercase',
                  letterSpacing: '1px',
                }}
              >
                Featured Broadcast
              </span>
              <h2 style={{ fontSize: '2.2rem', margin: '0.5rem 0 1.5rem 0' }}>
                Gospel Truth Daily TV Show
              </h2>
              <p style={{ color: 'var(--text-secondary)', marginBottom: '1.5rem' }}>
                Join Andrew Wommack in today's message exploring how God has already provided everything you need for healing, prosperity, and peace. Learn to receive by faith what grace has already provided.
              </p>
              <div style={{ display: 'flex', gap: '1rem' }}>
                <Link href="/watch" className="btn btn-primary">
                  Watch Now
                </Link>
                <button
                  onClick={handlePlayDailyBroadcast}
                  className="btn btn-ghost"
                  style={{ textDecoration: 'underline' }}
                >
                  Listen to Audio Teach
                </button>
              </div>
            </div>

            {/* Mock Video Container */}
            <div
              className="card"
              style={{
                height: '300px',
                backgroundImage: 'linear-gradient(rgba(0,0,0,0.1), rgba(0,0,0,0.5)), url("/images/hero_background.png")',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
              }}
              onClick={handlePlayDailyBroadcast}
            >
              <div
                style={{
                  width: '72px',
                  height: '72px',
                  borderRadius: '50%',
                  backgroundColor: 'rgba(255, 255, 255, 0.9)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: 'var(--shadow-lg)',
                  transition: 'transform 0.2s ease',
                }}
                onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.1)')}
                onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="hsl(var(--brand-blue-dark))">
                  <polygon points="5 3 19 12 5 21 5 3" />
                </svg>
              </div>
              <div
                style={{
                  position: 'absolute',
                  bottom: '1.5rem',
                  left: '1.5rem',
                  color: 'white',
                }}
              >
                <h4 style={{ color: 'white', fontSize: '1.1rem' }}>God's Will is Healing</h4>
                <p style={{ fontSize: '0.85rem', opacity: 0.8, margin: 0 }}>Andrew Wommack • 28 mins</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Featured Healing Testimony */}
      <section style={{ padding: '5rem 0', backgroundColor: 'var(--bg-secondary)', borderTop: '1px solid var(--border-glass)' }}>
        <div className="container">
          <div
            className="glass-panel"
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: '2.5rem',
              padding: '3rem',
              alignItems: 'center',
              borderRadius: 'var(--radius-lg)',
            }}
          >
            <div style={{ position: 'relative', width: '100%', aspectRatio: '1/1', maxHeight: '350px', borderRadius: 'var(--radius-md)', overflow: 'hidden', boxShadow: 'var(--shadow-md)' }}>
              <Image
                src="/images/lance_testimony.png"
                alt="Lance Testimony Portrait"
                fill
                sizes="(max-width: 768px) 100vw, 500px"
                style={{ objectFit: 'cover' }}
              />
            </div>
            <div>
              <span
                style={{
                  background: 'hsla(var(--brand-amber), 0.15)',
                  color: 'hsl(var(--brand-amber))',
                  padding: '0.25rem 0.75rem',
                  borderRadius: '100px',
                  fontSize: '0.75rem',
                  fontWeight: 700,
                  textTransform: 'uppercase',
                  letterSpacing: '1px',
                }}
              >
                Healing Journey
              </span>
              <h2 style={{ fontSize: '2rem', marginTop: '1rem', marginBottom: '1rem' }}>
                Lance's Story: Restored From the Edge
              </h2>
              <blockquote
                style={{
                  fontSize: '1.1rem',
                  fontStyle: 'italic',
                  color: 'var(--text-secondary)',
                  borderLeft: '4px solid hsl(var(--brand-amber))',
                  paddingLeft: '1rem',
                  marginBottom: '1.5rem',
                  lineHeight: 1.5,
                }}
              >
                "The doctors told me my liver was failing and I had weeks to live. But when I understood Andrew's teaching on authority and stood on 1 Peter 2:24, the report changed completely. I am 100% whole today."
              </blockquote>
              <Link href="/healing" className="btn btn-amber">
                Read Recovery Journeys
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Ministries Grid */}
      <section style={{ padding: '5rem 0', backgroundColor: 'var(--bg-primary)' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
            <span
              style={{
                fontSize: '0.85rem',
                fontWeight: 700,
                color: 'hsl(var(--brand-blue))',
                textTransform: 'uppercase',
                letterSpacing: '2px',
              }}
            >
              Our Footprint
            </span>
            <h2 style={{ fontSize: '2.5rem', marginTop: '0.5rem' }}>Explore Associated Ministries</h2>
            <p style={{ color: 'var(--text-secondary)', maxWidth: '600px', margin: '0.5rem auto' }}>
              We extend our reach through specialized training, advocacy, and direct physical and spiritual healing centers.
            </p>
          </div>

          <div className="grid-cols-3">
            {/* College Card */}
            <div className="card" style={{ display: 'flex', flexDirection: 'column', height: '100%', padding: 0 }}>
              <div style={{ position: 'relative', width: '100%', height: '200px' }}>
                <Image
                  src="/images/charis_college.png"
                  alt="Charis Bible College"
                  fill
                  sizes="(max-width: 768px) 100vw, 400px"
                  style={{ objectFit: 'cover' }}
                />
              </div>
              <div style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', flex: 1 }}>
                <h3 style={{ fontSize: '1.3rem', marginBottom: '0.5rem' }}>Charis Bible College</h3>
                <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', marginBottom: '1.5rem', flex: 1 }}>
                  Located in the beautiful mountains of Woodland Park, Colorado. Discover your destiny and prepare for ministry with strong biblical foundations.
                </p>
                <a
                  href="https://www.charisbiblecollege.org"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-outline"
                  style={{ width: '100%' }}
                >
                  Learn More
                </a>
              </div>
            </div>

            {/* Coalition Card */}
            <div className="card" style={{ display: 'flex', flexDirection: 'column', height: '100%', padding: 0 }}>
              <div style={{ position: 'relative', width: '100%', height: '200px' }}>
                <Image
                  src="/images/truth_liberty.png"
                  alt="Truth and Liberty Coalition"
                  fill
                  sizes="(max-width: 768px) 100vw, 400px"
                  style={{ objectFit: 'cover' }}
                />
              </div>
              <div style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', flex: 1 }}>
                <h3 style={{ fontSize: '1.3rem', marginBottom: '0.5rem' }}>Truth & Liberty Coalition</h3>
                <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', marginBottom: '1.5rem', flex: 1 }}>
                  Educating, unifying, and activating believers to impact culture and reform government. Stand strong for godly values in our society.
                </p>
                <a
                  href="https://truthandliberty.net"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-outline"
                  style={{ width: '100%' }}
                >
                  Explore Action
                </a>
              </div>
            </div>

            {/* Healing Center Card */}
            <div
              className="card"
              style={{
                display: 'flex',
                flexDirection: 'column',
                height: '100%',
                padding: '2.5rem 1.5rem',
                background: 'linear-gradient(135deg, rgba(34, 122, 173, 0.08) 0%, rgba(214, 123, 18, 0.08) 100%)',
                borderColor: 'hsla(var(--brand-amber), 0.2)',
                alignItems: 'center',
                textAlign: 'center',
              }}
            >
              <div
                style={{
                  width: '60px',
                  height: '60px',
                  borderRadius: '50%',
                  background: 'hsla(var(--brand-amber), 0.15)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: '1.5rem',
                  color: 'hsl(var(--brand-amber))',
                }}
              >
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
                </svg>
              </div>
              <h3 style={{ fontSize: '1.3rem', marginBottom: '0.75rem' }}>Charis Healing Center</h3>
              <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', marginBottom: '1.5rem', flex: 1 }}>
                Receive prayer, review healing scriptures, and request direct prayer support. We are here to stand with you for your physical recovery.
              </p>
              <Link href="/healing" className="btn btn-primary" style={{ width: '100%' }}>
                Enter Healing Center
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Bottom Partnership Slider CTA */}
      <section
        style={{
          padding: '5rem 0',
          background: 'linear-gradient(135deg, hsl(var(--brand-blue-dark)), #020617)',
          color: 'white',
          borderTop: '1px solid var(--border-glass)',
        }}
      >
        <div className="container" style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', gap: '1.5rem', alignItems: 'center' }}>
          <h2 style={{ fontSize: '2.5rem', color: 'white' }}>Become a Partner in Grace</h2>
          <p style={{ color: '#cbd5e1', maxWidth: '600px', fontSize: '1.05rem' }}>
            When you partner with Andrew Wommack Ministries, you help us bring the message of God's unconditional love and grace to millions. Together, we make a global difference.
          </p>
          <div style={{ marginTop: '1rem' }}>
            <Link href="/give" className="btn btn-amber" style={{ fontSize: '1.1rem', padding: '1rem 2.5rem' }}>
              Partner Benefit Calculator
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
