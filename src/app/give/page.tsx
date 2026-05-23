'use client';

import React, { useState } from 'react';

interface Tier {
  name: string;
  minAmount: number;
  maxAmount: number;
  badge: string;
  benefits: string[];
  color: string;
}

const TIERS: Tier[] = [
  {
    name: 'Grace Partner',
    minAmount: 10,
    maxAmount: 29,
    badge: 'Grace Circle',
    color: 'hsl(var(--brand-blue))',
    benefits: [
      'Monthly Andrew Wommack Newsletter (Print & Digital)',
      'Partner Devotional booklet (mailed quarterly)',
      'Personal prayer agreement support from our ministers',
    ],
  },
  {
    name: 'Gospel Truth Partner',
    minAmount: 30,
    maxAmount: 99,
    badge: 'Gospel Envoy',
    color: 'hsl(var(--brand-blue-dark))',
    benefits: [
      'All Grace Partner benefits',
      '15% discount on all resources in the Bookstore',
      'Exclusive monthly teaching MP3 download link',
      'Online access to standard study commentaries',
    ],
  },
  {
    name: 'Pillar Partner',
    minAmount: 100,
    maxAmount: 299,
    badge: 'Ministry Pillar',
    color: 'hsl(var(--brand-amber))',
    benefits: [
      'All Gospel Truth Partner benefits',
      'Full premium access to the Living Commentary online search',
      'Complimentary study guides for new book releases',
      'Reserved VIP seating at all AWMI national conferences',
    ],
  },
  {
    name: 'Foundation Pillar',
    minAmount: 300,
    maxAmount: 1000,
    badge: 'Foundation Circle',
    color: 'hsl(var(--brand-amber-light))',
    benefits: [
      'All Pillar Partner benefits',
      'Autographed Leather Study Bible by Andrew Wommack',
      'Special invitations to the annual Woodland Park Ranch partner banquet',
      'Quarterly video conference briefings with ministry leadership',
    ],
  },
];

export default function GivePage() {
  const [partnerAmount, setPartnerAmount] = useState(50);
  const [giveType, setGiveType] = useState<'monthly' | 'onetime'>('monthly');
  const [presetAmount, setPresetAmount] = useState(50);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [customAmountText, setCustomAmountText] = useState('');

  // Determine which tier applies
  const currentTier = TIERS.find(
    tier => partnerAmount >= tier.minAmount && partnerAmount <= tier.maxAmount
  ) || TIERS[TIERS.length - 1];

  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseInt(e.target.value);
    setPartnerAmount(val);
    setPresetAmount(0); // clear presets if slider moves
  };

  const handlePresetClick = (amount: number) => {
    setPresetAmount(amount);
    setPartnerAmount(amount);
    setCustomAmountText('');
  };

  const handleCustomAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCustomAmountText(e.target.value);
    const parsed = parseInt(e.target.value);
    if (!isNaN(parsed) && parsed > 0) {
      setPartnerAmount(parsed);
      setPresetAmount(0);
    }
  };

  const handleGiveSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (partnerAmount <= 0) {
      alert('Please enter a valid gift amount.');
      return;
    }
    setIsSubmitted(true);
  };

  return (
    <div style={{ padding: '3rem 0' }}>
      <div className="container">
        {/* Page Header */}
        <div style={{ marginBottom: '3.5rem', textAlign: 'center' }}>
          <span style={{ fontSize: '0.85rem', fontWeight: 700, color: 'hsl(var(--brand-blue))', textTransform: 'uppercase', letterSpacing: '1px' }}>
            Faithful Stewardship
          </span>
          <h1 style={{ fontSize: '2.8rem', marginTop: '0.25rem' }}>Partnering in Grace & Truth</h1>
          <p style={{ color: 'var(--text-secondary)', maxWidth: '600px', margin: '0.5rem auto' }}>
            Your support makes it possible for us to broadcast, translate, and distribute teachings globally without charge.
          </p>
        </div>

        {/* Layout: Slider (Left/Top) & Gift Card (Right/Bottom) */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '3rem',
            alignItems: 'start',
            marginBottom: '4rem',
          }}
        >
          {/* Partnership Slider Calculator Card */}
          <div className="glass-panel" style={{ padding: '2.5rem' }}>
            <h2 style={{ fontSize: '1.8rem', marginBottom: '1rem' }}>Partnership Benefit Calculator</h2>
            <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', marginBottom: '2rem' }}>
              Drag the slider to see how your monthly agreement level places you in different partner categories and unlocks critical resources.
            </p>

            {/* Slider control */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '2.5rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '1rem', fontWeight: 600 }}>Monthly Support Level:</span>
                <span
                  style={{
                    fontSize: '2rem',
                    fontWeight: 800,
                    color: 'hsl(var(--brand-amber))',
                  }}
                >
                  ${partnerAmount} <span style={{ fontSize: '1rem', fontWeight: 500, color: 'var(--text-muted)' }}>/mo</span>
                </span>
              </div>
              <input
                type="range"
                min="10"
                max="500"
                step="5"
                value={partnerAmount > 500 ? 500 : partnerAmount}
                onChange={handleSliderChange}
                style={{
                  width: '100%',
                  accentColor: 'hsl(var(--brand-blue))',
                  cursor: 'pointer',
                  height: '8px',
                  borderRadius: '4px',
                }}
              />
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                <span>$10</span>
                <span>$100</span>
                <span>$250</span>
                <span>$500+</span>
              </div>
            </div>

            {/* Dynamic Card for Active Tier */}
            <div
              style={{
                border: '1px solid var(--border-glass)',
                borderRadius: 'var(--radius-md)',
                padding: '1.5rem',
                backgroundColor: 'var(--bg-primary)',
                viewTransitionName: 'tab-content',
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                <h3 style={{ fontSize: '1.3rem', fontWeight: 700 }}>{currentTier.name}</h3>
                <span
                  style={{
                    backgroundColor: 'hsla(var(--brand-blue), 0.12)',
                    color: 'hsl(var(--brand-blue-dark))',
                    padding: '0.25rem 0.75rem',
                    borderRadius: '100px',
                    fontSize: '0.75rem',
                    fontWeight: 700,
                  }}
                >
                  {currentTier.badge}
                </span>
              </div>

              <h4 style={{ fontSize: '0.9rem', color: 'hsl(var(--brand-amber))', marginBottom: '0.75rem', textTransform: 'uppercase' }}>
                Your Partner Benefits:
              </h4>
              
              <ul style={{ paddingLeft: '1.25rem', display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
                {currentTier.benefits.map((benefit, idx) => (
                  <li key={idx} style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: 1.4 }}>
                    {benefit}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Form Donation Card */}
          <div className="card" style={{ padding: '2.5rem', boxShadow: 'var(--shadow-md)' }}>
            {!isSubmitted ? (
              <form onSubmit={handleGiveSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                <h2 style={{ fontSize: '1.8rem', margin: 0 }}>Select Gift Amount</h2>
                
                {/* Give Type selector */}
                <div style={{ display: 'flex', background: 'var(--bg-tertiary)', borderRadius: 'var(--radius-sm)', padding: '4px' }}>
                  <button
                    type="button"
                    onClick={() => setGiveType('monthly')}
                    style={{
                      flex: 1,
                      padding: '0.6rem',
                      border: 'none',
                      borderRadius: 'calc(var(--radius-sm) - 2px)',
                      cursor: 'pointer',
                      fontSize: '0.9rem',
                      fontWeight: 600,
                      background: giveType === 'monthly' ? 'var(--bg-secondary)' : 'transparent',
                      color: giveType === 'monthly' ? 'var(--text-primary)' : 'var(--text-secondary)',
                      transition: 'all 0.15s ease',
                    }}
                  >
                    Monthly Gift
                  </button>
                  <button
                    type="button"
                    onClick={() => setGiveType('onetime')}
                    style={{
                      flex: 1,
                      padding: '0.6rem',
                      border: 'none',
                      borderRadius: 'calc(var(--radius-sm) - 2px)',
                      cursor: 'pointer',
                      fontSize: '0.9rem',
                      fontWeight: 600,
                      background: giveType === 'onetime' ? 'var(--bg-secondary)' : 'transparent',
                      color: giveType === 'onetime' ? 'var(--text-primary)' : 'var(--text-secondary)',
                      transition: 'all 0.15s ease',
                    }}
                  >
                    One-Time Gift
                  </button>
                </div>

                {/* Preset Grid */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '0.5rem' }}>
                  {[20, 50, 100, 250].map((amt) => {
                    const isSelected = presetAmount === amt && !customAmountText;
                    return (
                      <button
                        key={amt}
                        type="button"
                        onClick={() => handlePresetClick(amt)}
                        style={{
                          padding: '0.75rem 0',
                          border: '1px solid',
                          borderColor: isSelected ? 'hsl(var(--brand-amber))' : 'var(--border-glass)',
                          borderRadius: 'var(--radius-sm)',
                          background: isSelected ? 'linear-gradient(135deg, hsl(var(--brand-amber)), hsl(var(--brand-amber-light)))' : 'var(--bg-primary)',
                          color: isSelected ? 'white' : 'var(--text-primary)',
                          fontWeight: 700,
                          cursor: 'pointer',
                          transition: 'all 0.15s ease',
                        }}
                      >
                        ${amt}
                      </button>
                    );
                  })}
                </div>

                {/* Custom input */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                  <label style={{ fontSize: '0.85rem', fontWeight: 600 }}>Or Enter Custom Amount ($)</label>
                  <input
                    type="number"
                    min="1"
                    placeholder="Enter other amount"
                    value={customAmountText}
                    onChange={handleCustomAmountChange}
                    style={{
                      padding: '0.75rem',
                      borderRadius: 'var(--radius-sm)',
                      border: '1px solid var(--border-glass)',
                      background: 'var(--bg-primary)',
                      color: 'var(--text-primary)',
                      outline: 'none',
                      fontSize: '1rem',
                      fontWeight: 600,
                    }}
                  />
                </div>

                {/* Agreement text */}
                <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', lineHeight: 1.4 }}>
                  {giveType === 'monthly' ? (
                    'Your credit card will be charged the selected amount monthly. You can modify or cancel your partnership at any time in the partner portal.'
                  ) : (
                    'Your selected card will be charged as a single contribution. We appreciate your sowing into this ministry!'
                  )}
                </div>

                <button type="submit" className="btn btn-amber" style={{ width: '100%', fontSize: '1rem', padding: '0.85rem' }}>
                  Complete ${partnerAmount} {giveType === 'monthly' ? 'Monthly' : 'One-Time'} Gift
                </button>
              </form>
            ) : (
              <div style={{ textAlign: 'center', padding: '2rem 0', display: 'flex', flexDirection: 'column', gap: '1.5rem', alignItems: 'center' }}>
                <div
                  style={{
                    width: '64px',
                    height: '64px',
                    borderRadius: '50%',
                    backgroundColor: 'hsla(var(--brand-blue), 0.15)',
                    color: 'hsl(var(--brand-blue))',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                  </svg>
                </div>
                <h2 style={{ fontSize: '1.8rem', margin: 0 }}>Gift Received!</h2>
                <p style={{ fontSize: '0.95rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                  Thank you for your generous gift of <strong>${partnerAmount}</strong>. Because of you, lives are being changed through the message of unconditional grace and truth.
                </p>
                <div
                  style={{
                    background: 'var(--bg-primary)',
                    padding: '1rem 1.25rem',
                    borderRadius: 'var(--radius-sm)',
                    border: '1px solid var(--border-glass)',
                  }}
                >
                  <span style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-muted)' }}>
                    Type: {giveType === 'monthly' ? 'Monthly Grace Partner' : 'One-Time Contribution'}
                  </span>
                </div>
                <button onClick={() => setIsSubmitted(false)} className="btn btn-outline" style={{ marginTop: '1rem' }}>
                  Support Again
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
