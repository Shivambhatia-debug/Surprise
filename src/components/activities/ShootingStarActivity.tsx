import { useState } from 'react';
import { motion } from 'framer-motion';
import confetti from 'canvas-confetti';
import UnlockButton from './UnlockButton';
import { DoorData } from '@/data/doors';

export default function ShootingStarActivity({ data, onNext, isLast }: { data: DoorData; onNext: () => void; isLast: boolean }) {
  const [caught, setCaught] = useState(false);

  const handleCatch = () => {
    confetti({ particleCount: 70, spread: 360, origin: { x: 0.5, y: 0.45 }, colors: ['#ffd700', '#fff', '#ff69b4'] });
    setCaught(true);
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', padding: '0 20px' }}>
      {!caught ? (
        <motion.div onClick={handleCatch} style={{ cursor: 'pointer', display: 'flex', flexDirection: 'column', alignItems: 'center' }}
          initial={{ x: 250, y: -150, opacity: 0 }} animate={{ x: 0, y: 0, opacity: 1 }}
          transition={{ type: 'spring', stiffness: 80, damping: 12 }}>
          <motion.span animate={{ scale: [1, 1.2, 1] }} transition={{ duration: 1.5, repeat: Infinity }}
            style={{ fontSize: 80, filter: 'drop-shadow(0 0 20px rgba(255,215,0,0.8))' }}>⭐</motion.span>
          <p style={{ color: '#ffd700', marginTop: 15, fontWeight: 700, fontSize: '1.1rem', letterSpacing: 2,
            textShadow: '0 0 10px rgba(255,215,0,0.8)', animation: 'pulseText 2s infinite' }}>TAP TO CATCH!</p>
        </motion.div>
      ) : (
        <motion.div initial={{ scale: 0, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ type: 'spring' }}
          style={{ background: 'rgba(255,255,255,0.95)', borderRadius: 16, padding: '30px 25px', maxWidth: 380, boxShadow: '0 20px 60px rgba(0,0,0,0.2)' }}>
          <h2 style={{ fontFamily: 'Caveat, cursive', fontSize: '2rem', color: '#333', marginBottom: 15 }}>{data.title}</h2>
          <p style={{ fontSize: '1rem', color: '#555', lineHeight: 1.6 }}>{data.message}</p>
          <UnlockButton onUnlock={onNext} isLast={isLast} />
        </motion.div>
      )}
    </motion.div>
  );
}
