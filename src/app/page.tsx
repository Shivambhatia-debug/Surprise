'use client';

import { useState } from 'react';
import DoorJourney from '@/components/DoorJourney';
import LandingPage from '@/components/LandingPage';

export default function Home() {
  const [started, setStarted] = useState(false);

  return (
    <main style={{ width: '100%', height: '100%', position: 'relative' }}>


      {!started ? (
        <LandingPage onStart={() => setStarted(true)} />
      ) : (
        <DoorJourney />
      )}
    </main>
  );
}
