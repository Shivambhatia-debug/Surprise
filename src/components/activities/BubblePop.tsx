import { useState } from 'react';
import { motion } from 'framer-motion';
import UnlockButton from './UnlockButton';
import { DoorData } from '@/data/doors';
import { vibrate, playPop, playSuccess } from '@/utils/interactions';

export default function BubblePop({ data, onNext, isLast }: { data: DoorData; onNext: () => void; isLast: boolean }) {
  const words = data.items || [];
  const [popped, setPopped] = useState<boolean[]>(new Array(words.length).fill(false));
  const allPopped = popped.every(Boolean);

  const pop = (i: number) => {
    if (popped[i]) return;
    const next = [...popped];
    next[i] = true;
    setPopped(next);
    vibrate(40);
    playPop();
    if (next.every(Boolean)) {
      setTimeout(() => {
        vibrate([50, 50, 100]);
        playSuccess();
      }, 300);
    }
  };

  const positions = words.map((_, i) => ({
    x: (Math.sin(i * 1.2) * 35),
    y: (Math.cos(i * 0.9) * 30) - 10,
  }));

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', padding: '0 20px' }}>
      <h2 style={{ color: '#fff', fontFamily: 'Caveat, cursive', fontSize: '1.8rem', marginBottom: 20,
        textShadow: '0 0 15px rgba(255,105,180,0.6)' }}>Pop the bubbles!</h2>
      <div style={{ position: 'relative', width: 300, height: 280 }}>
        {words.map((word, i) => (
          <motion.div key={i} onClick={() => pop(i)}
            initial={{ scale: 0 }} animate={popped[i] ? { scale: 0, opacity: 0 } : { scale: 1, opacity: 1, y: [0, -8, 0] }}
            transition={popped[i] ? { duration: 0.2 } : { y: { duration: 2 + i * 0.3, repeat: Infinity }, scale: { duration: 0.4, delay: i * 0.1 } }}
            style={{
              position: 'absolute', left: `calc(50% + ${positions[i].x}px)`, top: `calc(50% + ${positions[i].y}px)`,
              transform: 'translate(-50%, -50%)', cursor: 'pointer',
              width: 70, height: 70, borderRadius: '50%',
              background: `radial-gradient(circle at 30% 30%, rgba(255,255,255,0.4), ${i % 2 ? '#ff69b4' : '#ff1493'})`,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              boxShadow: '0 5px 20px rgba(255,20,147,0.3), inset -5px -5px 15px rgba(0,0,0,0.1)',
              fontSize: '0.75rem', color: '#fff', fontWeight: 700,
            }}>
            {word}
          </motion.div>
        ))}
      </div>
      {allPopped && (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          style={{ background: 'rgba(255,255,255,0.95)', borderRadius: 16, padding: '25px', maxWidth: 340, boxShadow: '0 15px 40px rgba(0,0,0,0.2)', marginTop: 10 }}>
          <h2 style={{ fontFamily: 'Caveat, cursive', fontSize: '1.8rem', color: '#ff1493' }}>{words.join(' ')}</h2>
          <UnlockButton onUnlock={onNext} isLast={isLast} />
        </motion.div>
      )}
    </motion.div>
  );
}
