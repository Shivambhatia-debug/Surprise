import { useState } from 'react';
import { motion } from 'framer-motion';
import UnlockButton from './UnlockButton';
import { DoorData } from '@/data/doors';

export default function PromiseCards({ data, onNext, isLast }: { data: DoorData; onNext: () => void; isLast: boolean }) {
  const promises = data.items || [];
  const [flipped, setFlipped] = useState<boolean[]>(new Array(promises.length).fill(false));
  const allFlipped = flipped.every(Boolean);

  const flip = (i: number) => {
    const next = [...flipped];
    next[i] = true;
    setFlipped(next);
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', padding: '0 20px' }}>
      <h2 style={{ color: '#fff', fontFamily: 'Caveat, cursive', fontSize: '1.8rem', marginBottom: 20,
        textShadow: '0 0 15px rgba(255,105,180,0.6)' }}>{data.title}</h2>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 15, width: '100%', maxWidth: 340 }}>
        {promises.map((promise, i) => (
          <motion.div key={i} onClick={() => flip(i)}
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.2 }}
            style={{ perspective: 800, cursor: flipped[i] ? 'default' : 'pointer' }}>
            <motion.div animate={{ rotateY: flipped[i] ? 180 : 0 }} transition={{ duration: 0.6 }}
              style={{ position: 'relative', height: 80, transformStyle: 'preserve-3d' }}>
              {/* Front */}
              <div style={{
                position: 'absolute', width: '100%', height: '100%', backfaceVisibility: 'hidden',
                background: 'linear-gradient(135deg, #ff1493, #ff69b4)', borderRadius: 12,
                display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff',
                fontWeight: 700, fontSize: '1rem', letterSpacing: 2, boxShadow: '0 5px 20px rgba(255,20,147,0.3)',
              }}>
                TAP TO FLIP ✋
              </div>
              {/* Back */}
              <div style={{
                position: 'absolute', width: '100%', height: '100%', backfaceVisibility: 'hidden',
                background: '#fff', borderRadius: 12, transform: 'rotateY(180deg)',
                display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '10px 15px',
                boxShadow: '0 5px 20px rgba(0,0,0,0.1)',
              }}>
                <p style={{ fontFamily: 'Caveat, cursive', fontSize: '1.1rem', color: '#ff1493', lineHeight: 1.3 }}>{promise}</p>
              </div>
            </motion.div>
          </motion.div>
        ))}
      </div>
      {allFlipped && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}>
          <UnlockButton onUnlock={onNext} isLast={isLast} />
        </motion.div>
      )}
    </motion.div>
  );
}
