'use client';

import React, { useState } from 'react';

interface ScriptureDeclaration {
  reference: string;
  verse: string;
  declaration: string;
  category: 'general' | 'terminal' | 'chronic' | 'mental';
}

const HEALING_SCRIPTURES: ScriptureDeclaration[] = [
  {
    reference: 'Isaiah 53:5',
    verse: '“But he was wounded for our transgressions, he was bruised for our iniquities: the chastisement of our peace was upon him; and with his stripes we are healed.”',
    declaration: 'Jesus took my sicknesses and carried my diseases. By His stripes, I was healed. Healing belongs to me right now. I refuse sickness in my body.',
    category: 'general',
  },
  {
    reference: 'Proverbs 4:20-22',
    verse: '“My son, attend to my words; incline thine ear unto my sayings... For they are life unto those that find them, and health to all their flesh.”',
    declaration: 'God\'s word is medicine to my physical flesh. I attend to it, meditate on it, and it brings health, recovery, and strength to every cell in my body.',
    category: 'chronic',
  },
  {
    reference: 'Romans 8:11',
    verse: '“But if the Spirit of him that raised up Jesus from the dead dwell in you, he that raised up Christ from the dead shall also quicken your mortal bodies by his Spirit that dwelleth in you.”',
    declaration: 'The same Holy Spirit who raised Jesus from the grave lives in me. He is currently quickening, restoring, and vitalizing my physical mortal body.',
    category: 'terminal',
  },
  {
    reference: '2 Timothy 1:7',
    verse: '“For God hath not given us the spirit of fear; but of power, and of love, and of a sound mind.”',
    declaration: 'I refuse depression, anxiety, and fear. God has gifted me with power, unconditional love, and a perfectly sound, peaceful, and sharp mind.',
    category: 'mental',
  },
  {
    reference: 'Psalms 103:2-3',
    verse: '“Bless the LORD, O my soul, and forget not all his benefits: Who forgiveth all thine iniquities; who healeth all thy diseases;”',
    declaration: 'I declare that healing all my diseases is a direct benefit of my covenant with God. My body is clean, strong, and fully restored.',
    category: 'general',
  },
];

export default function HealingPage() {
  const [activeTab, setActiveTab] = useState<'all' | 'general' | 'terminal' | 'chronic' | 'mental'>('all');
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    condition: 'general',
    message: '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email) {
      alert('Please provide at least your name and email so we can agree in prayer.');
      return;
    }
    // Simulate submission
    setFormSubmitted(true);
  };

  const filteredScriptures = activeTab === 'all'
    ? HEALING_SCRIPTURES
    : HEALING_SCRIPTURES.filter(scrip => scrip.category === activeTab);

  return (
    <div style={{ padding: '3rem 0' }}>
      <div className="container">
        {/* Page Header */}
        <div style={{ marginBottom: '3.5rem', textAlign: 'center' }}>
          <span style={{ fontSize: '0.85rem', fontWeight: 700, color: 'hsl(var(--brand-blue))', textTransform: 'uppercase', letterSpacing: '1px' }}>
            Grace & Recovery
          </span>
          <h1 style={{ fontSize: '2.8rem', marginTop: '0.25rem' }}>Charis Healing Center</h1>
          <p style={{ color: 'var(--text-secondary)', maxWidth: '600px', margin: '0.5rem auto' }}>
            "He sent his word, and healed them, and delivered them from their destructions." — Psalms 107:20
          </p>
        </div>

        {/* Top Grid: Declarations (Left) & Prayer Form (Right) */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '3rem',
            marginBottom: '5rem',
            alignItems: 'start',
          }}
        >
          {/* Healing Declarations Panel */}
          <div>
            <h2 style={{ fontSize: '1.8rem', marginBottom: '1.5rem' }}>Healing Scriptures & Faith Declarations</h2>
            
            {/* Inner categories tab selector */}
            <div
              style={{
                display: 'flex',
                gap: '0.5rem',
                overflowX: 'auto',
                paddingBottom: '0.75rem',
                marginBottom: '1.5rem',
                borderBottom: '1px solid var(--border-glass)',
              }}
            >
              {[
                { id: 'all', label: 'All' },
                { id: 'general', label: 'General' },
                { id: 'terminal', label: 'Terminal' },
                { id: 'chronic', label: 'Chronic' },
                { id: 'mental', label: 'Mental' },
              ].map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  style={{
                    padding: '0.35rem 0.85rem',
                    borderRadius: '4px',
                    border: 'none',
                    background: activeTab === tab.id ? 'hsla(var(--brand-blue), 0.15)' : 'transparent',
                    color: activeTab === tab.id ? 'hsl(var(--brand-blue-dark))' : 'var(--text-secondary)',
                    cursor: 'pointer',
                    fontSize: '0.85rem',
                    fontWeight: 600,
                  }}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* List */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              {filteredScriptures.map((scrip, idx) => (
                <div
                  key={idx}
                  className="card"
                  style={{
                    padding: '1.5rem',
                    borderLeft: '4px solid hsl(var(--brand-blue))',
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                    <strong style={{ fontSize: '1rem', color: 'hsl(var(--brand-blue-dark))' }}>
                      {scrip.reference}
                    </strong>
                    <span style={{ fontSize: '0.7rem', textTransform: 'uppercase', color: 'var(--text-muted)' }}>
                      {scrip.category}
                    </span>
                  </div>
                  <p style={{ fontSize: '0.9rem', fontStyle: 'italic', color: 'var(--text-secondary)', marginBottom: '0.75rem' }}>
                    {scrip.verse}
                  </p>
                  <div style={{ padding: '0.75rem 1rem', background: 'var(--bg-primary)', borderRadius: '4px', border: '1px solid var(--border-glass)' }}>
                    <p style={{ fontSize: '0.85rem', fontWeight: 600, color: 'hsl(var(--brand-amber))', margin: 0 }}>
                      Declare: <span style={{ fontWeight: 400, color: 'var(--text-primary)' }}>"{scrip.declaration}"</span>
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Interactive Prayer Request Form Panel */}
          <div className="glass-panel" style={{ padding: '2.5rem' }}>
            {!formSubmitted ? (
              <form onSubmit={handleFormSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                <h2 style={{ fontSize: '1.8rem', margin: 0 }}>Submit a Prayer Request</h2>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', margin: 0 }}>
                  Our prayer ministers stand in faith with you. Submit your detail, and we will agree with you for complete healing.
                </p>
                
                {/* Inputs */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                  <label style={{ fontSize: '0.85rem', fontWeight: 600 }}>Your Name *</label>
                  <input
                    type="text"
                    name="name"
                    required
                    placeholder="Enter your name"
                    value={formData.name}
                    onChange={handleInputChange}
                    style={{
                      padding: '0.75rem',
                      borderRadius: 'var(--radius-sm)',
                      border: '1px solid var(--border-glass)',
                      background: 'var(--bg-primary)',
                      color: 'var(--text-primary)',
                      outline: 'none',
                    }}
                  />
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                  <label style={{ fontSize: '0.85rem', fontWeight: 600 }}>Email Address *</label>
                  <input
                    type="email"
                    name="email"
                    required
                    placeholder="Enter your email"
                    value={formData.email}
                    onChange={handleInputChange}
                    style={{
                      padding: '0.75rem',
                      borderRadius: 'var(--radius-sm)',
                      border: '1px solid var(--border-glass)',
                      background: 'var(--bg-primary)',
                      color: 'var(--text-primary)',
                      outline: 'none',
                    }}
                  />
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                  <label style={{ fontSize: '0.85rem', fontWeight: 600 }}>Condition Category</label>
                  <select
                    name="condition"
                    value={formData.condition}
                    onChange={handleInputChange}
                    style={{
                      padding: '0.75rem',
                      borderRadius: 'var(--radius-sm)',
                      border: '1px solid var(--border-glass)',
                      background: 'var(--bg-primary)',
                      color: 'var(--text-primary)',
                      cursor: 'pointer',
                      outline: 'none',
                    }}
                  >
                    <option value="general">General Healing</option>
                    <option value="terminal">Critical / Terminal diagnosis</option>
                    <option value="chronic">Chronic Illness / Pain</option>
                    <option value="mental">Mental Peace / Depression</option>
                  </select>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                  <label style={{ fontSize: '0.85rem', fontWeight: 600 }}>Describe what we are agreeing for</label>
                  <textarea
                    name="message"
                    rows={4}
                    placeholder="Explain your prayer request..."
                    value={formData.message}
                    onChange={handleInputChange}
                    style={{
                      padding: '0.75rem',
                      borderRadius: 'var(--radius-sm)',
                      border: '1px solid var(--border-glass)',
                      background: 'var(--bg-primary)',
                      color: 'var(--text-primary)',
                      fontFamily: 'inherit',
                      outline: 'none',
                      resize: 'vertical',
                    }}
                  />
                </div>

                <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>
                  Submit Prayer Agreement
                </button>
              </form>
            ) : (
              <div style={{ textAlign: 'center', padding: '2rem 0', display: 'flex', flexDirection: 'column', gap: '1.5rem', alignItems: 'center' }}>
                <div
                  style={{
                    width: '64px',
                    height: '64px',
                    borderRadius: '50%',
                    backgroundColor: 'hsla(var(--brand-amber), 0.15)',
                    color: 'hsl(var(--brand-amber))',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                </div>
                <h2 style={{ fontSize: '1.8rem', margin: 0 }}>Standing in Agreement</h2>
                <p style={{ fontSize: '0.95rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                  Thank you, <strong>{formData.name}</strong>. Your prayer request for <strong>{formData.condition} healing</strong> has been received. Our team of prayer ministers is standing in agreement with you.
                </p>
                <div
                  style={{
                    background: 'var(--bg-primary)',
                    padding: '1.25rem',
                    borderRadius: 'var(--radius-sm)',
                    border: '1px solid var(--border-glass)',
                  }}
                >
                  <p style={{ fontSize: '0.85rem', fontStyle: 'italic', color: 'var(--text-muted)', margin: 0 }}>
                    “Again I say unto you, That if two of you shall agree on earth as touching any thing that they shall ask, it shall be done for them of my Father which is in heaven.” — Matthew 18:19
                  </p>
                </div>
                <button onClick={() => setFormSubmitted(false)} className="btn btn-outline" style={{ marginTop: '1rem' }}>
                  Submit Another Request
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Secondary Journeys Section */}
        <div style={{ borderTop: '1px solid var(--border-glass)', paddingTop: '4rem' }}>
          <h2 style={{ fontSize: '2rem', textAlign: 'center', marginBottom: '3rem' }}>More Recovery Journeys</h2>
          <div className="grid-cols-2">
            <div className="card">
              <h3 style={{ fontSize: '1.25rem', marginBottom: '0.5rem' }}>restored eyesight: Hannah's Vision</h3>
              <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                Hannah had progressive macular degeneration that was leading to blindness. By realizing that God has already provided healing, she claimed 1 Peter 2:24. At her next check-up, her doctor was stunned—her retina was completely healthy and her vision restored.
              </p>
            </div>
            <div className="card">
              <h3 style={{ fontSize: '1.25rem', marginBottom: '0.5rem' }}>freedom from chronic back pain</h3>
              <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                For fifteen years, Michael lived with debilitating lumbar spinal stenosis, relying on heavy pain killers. During a Charis Healing conference, he learned about his authority as a believer and commanded the pain to leave. The pain vanished immediately, and he has been completely drug-free since.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
