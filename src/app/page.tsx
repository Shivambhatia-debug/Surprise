'use client';

import { useState } from 'react';
import DoorJourney from '@/components/DoorJourney';
import LandingPage from '@/components/LandingPage';

export default function Home() {
  const [started, setStarted] = useState(false);

  return (
    <main style={{ width: '100%', height: '100%', position: 'relative' }}>
      {/* Spotify Embed - Floating at the bottom right corner */}
      {started && (
        <div style={{
          position: 'fixed',
          bottom: '20px',
          right: '20px',
          zIndex: 1000,
          opacity: 0.8,
          transition: 'opacity 0.3s ease',
          boxShadow: '0 10px 30px rgba(0,0,0,0.3)',
          borderRadius: '12px',
          overflow: 'hidden'
        }}
        onMouseEnter={(e) => e.currentTarget.style.opacity = '1'}
        onMouseLeave={(e) => e.currentTarget.style.opacity = '0.8'}
        >
          {/* Replace this URL with your specific Spotify track or playlist embed URL */}
          <iframe 
            style={{ borderRadius: '12px' }} 
            src="https://open.spotify.com/embed/track/2R5iTxkCln6NLTw6l0kjWw?utm_source=generator&theme=0" 
            width="300" 
            height="80" 
            frameBorder="0" 
            allowFullScreen={false} 
            allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" 
            loading="lazy"
          ></iframe>
        </div>
      )}

      {!started ? (
        <LandingPage onStart={() => setStarted(true)} />
      ) : (
        <DoorJourney />
      )}
    </main>
  );
}
