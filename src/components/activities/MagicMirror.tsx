import { useState } from 'react';
import { motion } from 'framer-motion';
import UnlockButton from './UnlockButton';
import { DoorData } from '@/data/doors';
import { vibrate, playShimmer } from '@/utils/interactions';

export default function MagicMirror({ data, onNext, isLast }: { data: DoorData; onNext: () => void; isLast: boolean }) {
  const [revealed, setRevealed] = useState(false);

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', padding: '0 20px' }}>
      {!revealed ? (
        <motion.div onClick={() => {
            setRevealed(true);
            vibrate(80);
            playShimmer();
          }} style={{ cursor: 'pointer', display: 'flex', flexDirection: 'column', alignItems: 'center' }}
          animate={{ scale: [1, 1.03, 1] }} transition={{ duration: 3, repeat: Infinity }}>
          <div style={{
            width: 180, height: 240, borderRadius: '50% 50% 50% 50% / 40% 40% 60% 60%',
            background: 'linear-gradient(135deg, rgba(255,255,255,0.3), rgba(200,200,255,0.15))',
            border: '3px solid rgba(255,255,255,0.4)', backdropFilter: 'blur(10px)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            boxShadow: '0 0 40px rgba(255,255,255,0.3), inset 0 0 30px rgba(255,200,255,0.2)',
          }}>
            <span style={{ fontSize: 50 }}>🪞</span>
          </div>
          <p style={{ color: '#fff', marginTop: 20, fontWeight: 700, fontSize: '1.1rem', letterSpacing: 2, textTransform: 'uppercase',
            textShadow: '0 0 10px rgba(255,105,180,0.8)', animation: 'pulseText 2s infinite' }}>TAP THE MIRROR</p>
        </motion.div>
      ) : (
        <motion.div initial={{ scale: 0.5, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ type: 'spring' }}
          style={{ background: 'rgba(255,255,255,0.95)', borderRadius: 16, padding: '30px 25px', maxWidth: 380, boxShadow: '0 20px 60px rgba(0,0,0,0.2)' }}>
          <p style={{ fontSize: '0.9rem', color: '#aaa', textTransform: 'uppercase', letterSpacing: 2 }}>Mirror says...</p>
          <h2 style={{ fontFamily: 'Caveat, cursive', fontSize: '2rem', color: '#ff1493', margin: '15px 0' }}>
            The Most Beautiful Person in the World
          </h2>
          <p style={{ fontSize: '1rem', color: '#555', lineHeight: 1.6 }}>{data.message}</p>
          <UnlockButton onUnlock={onNext} isLast={isLast} />
        </motion.div>
      )}
    </motion.div>
  );
}
