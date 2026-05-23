'use client';

import React, { useState } from 'react';

interface Devotional {
  date: string; // e.g. "2026-05-22"
  title: string;
  scripture: string;
  verseText: string;
  commentary: string;
  prayer: string;
}

const DEVOTIONALS: Record<string, Devotional> = {
  '2026-05-22': {
    date: '2026-05-22',
    title: 'Unconditional Love Manifested',
    scripture: 'Romans 5:8',
    verseText: '“But God commendeth his love toward us, in that, while we were yet sinners, Christ died for us.”',
    commentary: 'Most people find it hard to believe that God loves them independently of their actions. We are conditioned by this world to receive rewards based on performance. But God\'s love is not like that. He did not wait for you to clean up your act or apologize before sending Jesus. He loved you at your absolute worst. When you realize that God\'s love is unconditional, you stop trying to earn His blessings and start receiving them by grace.',
    prayer: 'Father, thank You for loving me even when I was far from You. I receive Your grace today, knowing that I do not have to earn Your affection. I rest in Your unconditional favor. Amen.',
  },
  '2026-05-23': {
    date: '2026-05-23',
    title: 'Already Provided',
    scripture: '1 Peter 2:24',
    verseText: '“Who his own self bare our sins in his own body on the tree, that we, being dead to sins, should live unto righteousness: by whose stripes ye were healed.”',
    commentary: 'Notice the tense of this scripture: you *were* healed. It does not say you *will be* healed or that God is currently deciding whether to heal you. Healing is not a future event that you have to beg God to perform; it is a past-tense reality that was completed at the cross. Your healing is already inside your born-again spirit. Faith is simply the bridge that draws that healing power out of your spirit and manifests it in your physical body.',
    prayer: 'Thank You, Jesus, that by Your stripes I was healed. I command my body to align with the truth of Your word. I release Your healing power into my cells right now. Amen.',
  },
  '2026-05-24': {
    date: '2026-05-24',
    title: 'Renewing the Mirror',
    scripture: 'Romans 12:2',
    verseText: '“And be not conformed to this world: but be ye transformed by the renewing of your mind, that ye may prove what is that good, and acceptable, and perfect, will of God.”',
    commentary: 'Your spirit is identical to Jesus—righteous, holy, and full of power. However, if your mind is still conformed to the thinking of this world, the power in your spirit remains locked away. The mind acts as a valve. When you renew your mind with God\'s word, you open the valve, allowing the life of God in your spirit to flood your soul and body. Transformation does not happen by effort; it happens by changing how you think.',
    prayer: 'Lord, I choose to meditate on Your Word today. I refuse to conform to the fear, sickness, and lack of this world. I renew my mind to think like Christ. Amen.',
  },
  '2026-05-25': {
    date: '2026-05-25',
    title: 'Righteousness is a Gift',
    scripture: '2 Corinthians 5:21',
    verseText: '“For he hath made him to be sin for us, who knew no sin; that we might be made the righteousness of God in him.”',
    commentary: 'Righteousness is not a level of holiness that you achieve through good behavior. It is a gift of standing that you receive at the moment of new birth. Jesus took your sin so that you could have His righteousness. In your spirit, you are as clean and righteous before God as Jesus is. When you pray from a place of righteousness, you pray with boldness, knowing that you have unrestricted access to the Father.',
    prayer: 'Father, thank You for the gift of righteousness. I declare that I am the righteousness of God in Christ. I stand before You bold, blameless, and deeply loved. Amen.',
  },
};

// Fallback generator for other days in May 2026
const getDevotionalForDate = (dateString: string): Devotional => {
  if (DEVOTIONALS[dateString]) return DEVOTIONALS[dateString];
  
  // Extract day number for dynamic generation
  const day = parseInt(dateString.split('-')[2]) || 1;
  return {
    date: dateString,
    title: `Grace Foundations: Day ${day}`,
    scripture: 'Galatians 2:20',
    verseText: '“I am crucified with Christ: nevertheless I live; yet not I, but Christ liveth in me: and the life which I now live in the flesh I live by the faith of the Son of God, who loved me, and gave himself for me.”',
    commentary: `Walking in faith is not about muster-up human strength. It is about letting the Christ inside you live His life through you. When you cease from your own labors and trust Him, you experience true rest. Today on May ${day}, remember that you are united with Christ. His strength is yours, His wisdom is yours, and His victory is yours in every challenge.`,
    prayer: `Jesus, I surrender my self-effort. Live Your life through me today. I walk in Your confidence and faith. Amen.`,
  };
};

// Commentary Database
interface CommentaryNote {
  reference: string;
  verse: string;
  greekNote?: string;
  note: string;
}

const COMMENTARY_DB: Record<string, CommentaryNote> = {
  'john 3:16': {
    reference: 'John 3:16',
    verse: '“For God so loved the world, that he gave his only begotten Son, that whosoever believeth in him should not perish, but have everlasting life.”',
    greekNote: 'The Greek word for loved here is "agapao", representing a divine, self-sacrificing, unconditional love based on the character of the giver, not the merit of the recipient.',
    note: 'Many focus on the word "perish" and use this verse to preach fear. But Andrew\'s note points out that the primary focus is God\'s motivation: love. God gave Jesus because He loved the world, not because He was looking for an excuse to punish. Furthermore, the term "eternal life" is not just quantitative (duration), but qualitative—communion with God starting immediately today.',
  },
  'romans 8:1': {
    reference: 'Romans 8:1',
    verse: '“There is therefore now no condemnation to them which are in Christ Jesus, who walk not after the flesh, but after the Spirit.”',
    greekNote: 'The Greek "katakrima" (condemnation) refers to a judicial sentence of punishment. In Christ, that sentence is entirely abolished.',
    note: 'In the oldest manuscripts, the phrase "who walk not after the flesh, but after the Spirit" is not present in verse 1. It was likely copied down from verse 4. This means there is simply *no condemnation* for those in Christ Jesus, period. God does not condemn you when you fail; His grace is there to lift you up, free you from guilt, and restore your fellowship.',
  },
  'galatians 2:20': {
    reference: 'Galatians 2:20',
    verse: '“I am crucified with Christ: nevertheless I live; yet not I, but Christ liveth in me...”',
    greekNote: 'Crucified here is "systauroo", meaning jointly crucified or completely identified with Christ\'s death on the cross.',
    note: 'When Jesus died, your old self died with Him. You do not have to "die to self" daily in the sense of trying to kill an active sinful nature. The old man is already dead; your job is to reckon him dead and let the new creation spirit, which is fully alive with Christ, take charge of your life.',
  },
};

export default function ReadPage() {
  const [selectedDate, setSelectedDate] = useState('2026-05-22');
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResult, setSearchResult] = useState<CommentaryNote | null>(null);
  const [hasSearched, setHasSearched] = useState(false);

  const currentDevotional = getDevotionalForDate(selectedDate);

  // Simple Month Grid (May 2026)
  const daysInMay = Array.from({ length: 31 }, (_, i) => i + 1);
  const startDayOffset = 5; // May 1st 2026 is a Friday

  const handleDateClick = (day: number) => {
    const formattedDay = day < 10 ? `0${day}` : `${day}`;
    const dateStr = `2026-05-22`.substring(0, 8) + formattedDay;
    
    // View transition crossfade for devotional card change
    if (document.startViewTransition) {
      document.startViewTransition(() => {
        setSelectedDate(dateStr);
      });
    } else {
      setSelectedDate(dateStr);
    }
  };

  const handleCommentarySearch = (e: React.FormEvent) => {
    e.preventDefault();
    const query = searchQuery.trim().toLowerCase().replace(/\s+/g, ' ');
    
    // Exact or loose match check
    let found = null;
    for (const key in COMMENTARY_DB) {
      if (query.includes(key) || key.includes(query)) {
        found = COMMENTARY_DB[key];
        break;
      }
    }

    setSearchResult(found);
    setHasSearched(true);
  };

  return (
    <div style={{ padding: '3rem 0' }}>
      <div className="container">
        {/* Read Header */}
        <div style={{ marginBottom: '3rem' }}>
          <span style={{ fontSize: '0.85rem', fontWeight: 700, color: 'hsl(var(--brand-blue))', textTransform: 'uppercase', letterSpacing: '1px' }}>
            Daily Devotion & Study
          </span>
          <h1 style={{ fontSize: '2.5rem', marginTop: '0.25rem' }}>Daily Devotional & Living Commentary</h1>
        </div>

        {/* 1. Devotional Split Layout */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1.2fr 2fr',
            gap: '3rem',
            alignItems: 'start',
            marginBottom: '5rem',
          }}
        >
          {/* Calendar Picker Card */}
          <div className="glass-panel" style={{ padding: '2rem' }}>
            <h3 style={{ fontSize: '1.2rem', marginBottom: '1.25rem', textAlign: 'center' }}>
              May 2026 Devotional Calendar
            </h3>
            
            {/* Weekday headers */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(7, 1fr)',
                textAlign: 'center',
                fontWeight: 600,
                fontSize: '0.75rem',
                color: 'var(--text-muted)',
                marginBottom: '0.5rem',
              }}
            >
              <div>Sun</div>
              <div>Mon</div>
              <div>Tue</div>
              <div>Wed</div>
              <div>Thu</div>
              <div>Fri</div>
              <div>Sat</div>
            </div>

            {/* Calendar Grid */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(7, 1fr)',
                gap: '4px',
              }}
            >
              {/* Empty offset spaces */}
              {Array.from({ length: startDayOffset }).map((_, idx) => (
                <div key={`offset-${idx}`} />
              ))}

              {/* Days */}
              {daysInMay.map((day) => {
                const formattedDay = day < 10 ? `0${day}` : `${day}`;
                const dateStr = `2026-05-22`.substring(0, 8) + formattedDay;
                const isSelected = selectedDate === dateStr;

                return (
                  <button
                    key={day}
                    onClick={() => handleDateClick(day)}
                    style={{
                      aspectRatio: '1/1',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '0.85rem',
                      fontWeight: 600,
                      borderRadius: '50%',
                      border: 'none',
                      cursor: 'pointer',
                      background: isSelected
                        ? 'linear-gradient(135deg, hsl(var(--brand-blue)), hsl(var(--brand-blue-dark)))'
                        : 'transparent',
                      color: isSelected ? 'white' : 'var(--text-primary)',
                      transition: 'all 0.15s ease',
                    }}
                    onMouseEnter={(e) => {
                      if (!isSelected) {
                        e.currentTarget.style.backgroundColor = 'var(--bg-tertiary)';
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (!isSelected) {
                        e.currentTarget.style.backgroundColor = 'transparent';
                      }
                    }}
                  >
                    {day}
                  </button>
                );
              })}
            </div>

            <div style={{ marginTop: '1.5rem', textAlign: 'center' }}>
              <button
                onClick={() => {
                  const todayStr = '2026-05-22';
                  if (document.startViewTransition) {
                    document.startViewTransition(() => setSelectedDate(todayStr));
                  } else {
                    setSelectedDate(todayStr);
                  }
                }}
                className="btn btn-outline"
                style={{ padding: '0.4rem 1rem', fontSize: '0.8rem' }}
              >
                Jump to Today
              </button>
            </div>
          </div>

          {/* Devotional Card (rendered with view-transition tab-content for smooth swapping) */}
          <div
            style={{
              viewTransitionName: 'tab-content',
            }}
          >
            <div
              className="card"
              style={{
                padding: '2.5rem',
                minHeight: '400px',
                borderColor: 'hsla(var(--brand-amber), 0.25)',
                boxShadow: 'var(--shadow-md)',
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', flexWrap: 'wrap' }}>
                <span
                  style={{
                    color: 'hsl(var(--brand-amber))',
                    fontSize: '0.9rem',
                    fontWeight: 700,
                  }}
                >
                  {new Date(currentDevotional.date).toLocaleDateString('en-US', {
                    weekday: 'long',
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </span>
                <span
                  style={{
                    backgroundColor: 'var(--bg-tertiary)',
                    padding: '0.25rem 0.75rem',
                    borderRadius: '100px',
                    fontSize: '0.8rem',
                    fontWeight: 600,
                  }}
                >
                  {currentDevotional.scripture}
                </span>
              </div>

              <h2 style={{ fontSize: '2rem', marginBottom: '1rem' }}>{currentDevotional.title}</h2>
              
              {/* Scripture text block */}
              <div
                style={{
                  background: 'var(--bg-primary)',
                  padding: '1.25rem 1.5rem',
                  borderRadius: 'var(--radius-sm)',
                  fontSize: '1.05rem',
                  fontStyle: 'italic',
                  borderLeft: '4px solid hsl(var(--brand-blue))',
                  marginBottom: '1.5rem',
                  color: 'var(--text-secondary)',
                }}
              >
                {currentDevotional.verseText}
              </div>

              {/* Commentary */}
              <div style={{ marginBottom: '2rem' }}>
                <h4 style={{ fontSize: '1rem', color: 'hsl(var(--brand-blue-dark))', marginBottom: '0.5rem' }}>
                  Andrew's Devotional Commentary:
                </h4>
                <p style={{ color: 'var(--text-secondary)', lineHeight: 1.6, fontSize: '0.95rem' }}>
                  {currentDevotional.commentary}
                </p>
              </div>

              {/* Prayer */}
              <div
                style={{
                  background: 'linear-gradient(135deg, rgba(214, 123, 18, 0.05) 0%, rgba(34, 122, 173, 0.05) 100%)',
                  padding: '1.25rem',
                  borderRadius: 'var(--radius-sm)',
                  border: '1px solid hsla(var(--brand-amber), 0.1)',
                }}
              >
                <h4 style={{ fontSize: '0.95rem', color: 'hsl(var(--brand-amber))', marginBottom: '0.4rem', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                  Prayer of Declaration
                </h4>
                <p style={{ color: 'var(--text-secondary)', fontStyle: 'italic', fontSize: '0.9rem', margin: 0 }}>
                  {currentDevotional.prayer}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* 2. Living Commentary Search Tool */}
        <div style={{ borderTop: '1px solid var(--border-glass)', paddingTop: '4rem' }}>
          <div style={{ maxWidth: '750px', margin: '0 auto' }}>
            <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
              <span
                style={{
                  fontSize: '0.85rem',
                  fontWeight: 700,
                  color: 'hsl(var(--brand-blue))',
                  textTransform: 'uppercase',
                  letterSpacing: '1px',
                }}
              >
                Study Helper
              </span>
              <h2 style={{ fontSize: '2.2rem', marginTop: '0.25rem' }}>Andrew's Online Living Commentary</h2>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', marginTop: '0.5rem' }}>
                Search detailed verses. Try typing <strong style={{ color: 'hsl(var(--brand-amber))' }}>John 3:16</strong>, <strong style={{ color: 'hsl(var(--brand-amber))' }}>Romans 8:1</strong>, or <strong style={{ color: 'hsl(var(--brand-amber))' }}>Galatians 2:20</strong> below.
              </p>
            </div>

            <form onSubmit={handleCommentarySearch} style={{ display: 'flex', gap: '0.5rem', marginBottom: '2rem' }}>
              <input
                type="text"
                placeholder="Search verse commentary (e.g. John 3:16)..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                style={{
                  flex: 1,
                  padding: '0.85rem 1.25rem',
                  borderRadius: 'var(--radius-sm)',
                  border: '1px solid var(--border-glass)',
                  background: 'var(--bg-secondary)',
                  color: 'var(--text-primary)',
                  fontSize: '1rem',
                  outline: 'none',
                }}
              />
              <button type="submit" className="btn btn-primary">
                Search Note
              </button>
            </form>

            {/* Commentary Result Card */}
            {hasSearched && (
              <div
                style={{
                  viewTransitionName: 'tab-content',
                }}
              >
                {searchResult ? (
                  <div className="card" style={{ padding: '2.5rem', borderLeft: '5px solid hsl(var(--brand-amber))' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
                      <h3 style={{ fontSize: '1.4rem' }}>Study: {searchResult.reference}</h3>
                      <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-muted)' }}>Living Commentary</span>
                    </div>

                    <div style={{ fontStyle: 'italic', fontSize: '1rem', color: 'var(--text-secondary)', padding: '1rem', backgroundColor: 'var(--bg-primary)', borderRadius: '4px', marginBottom: '1.5rem' }}>
                      {searchResult.verse}
                    </div>

                    {searchResult.greekNote && (
                      <div style={{ marginBottom: '1.25rem', padding: '0.75rem 1rem', border: '1px dashed var(--border-glass)', borderRadius: '4px', fontSize: '0.85rem' }}>
                        <strong style={{ color: 'hsl(var(--brand-blue))' }}>Greek Word Study: </strong>
                        <span style={{ color: 'var(--text-secondary)' }}>{searchResult.greekNote}</span>
                      </div>
                    )}

                    <div>
                      <h4 style={{ fontSize: '1rem', marginBottom: '0.5rem', color: 'var(--text-primary)' }}>Andrew's Note:</h4>
                      <p style={{ fontSize: '0.95rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                        {searchResult.note}
                      </p>
                    </div>
                  </div>
                ) : (
                  <div className="card" style={{ padding: '2rem', textAlign: 'center', color: 'var(--text-muted)' }}>
                    No specific commentary entry found for "{searchQuery}". To test, please type "John 3:16" or "Romans 8:1".
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
