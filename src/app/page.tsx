'use client';

import { useState } from 'react';
import DoorJourney from '@/components/DoorJourney';
import LandingPage from '@/components/LandingPage';

export default function Home() {
  const [started, setStarted] = useState(false);

  return (
    <main style={{ width: '100%', height: '100%', position: 'relative' }}>
      {/* Background Audio */}
      {/* Note: Autoplay requires user interaction, so we wait for them to click "Start" */}
      {started && (
        <audio autoPlay loop>
          {/* Placeholder for a romantic track - user can replace this file later */}
          <source src="https://cdn.pixabay.com/download/audio/2021/08/04/audio_0625c1539c.mp3?filename=beautiful-and-emotional-romantic-piano-100806.mp3" type="audio/mpeg" />
        </audio>
      )}

      {!started ? (
        <LandingPage onStart={() => setStarted(true)} />
      ) : (
        <DoorJourney />
      )}
    </main>
  );
}
