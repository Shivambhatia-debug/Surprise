import { useState } from 'react';
import { motion } from 'framer-motion';
import UnlockButton from './UnlockButton';
import { DoorData } from '@/data/doors';

export default function FortuneCookie({ data, onNext, isLast }: { data: DoorData; onNext: () => void; isLast: boolean }) {
  const [cracked, setCracked] = useState(false);

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', padding: '0 20px' }}>
      {!cracked ? (
        <motion.div onClick={() => setCracked(true)} style={{ cursor: 'pointer', display: 'flex', flexDirection: 'column', alignItems: 'center' }}
          animate={{ y: [0, -10, 0], rotate: [0, 3, -3, 0] }} transition={{ duration: 3, repeat: Infinity }}>
          <span style={{ fontSize: 100, filter: 'drop-shadow(0 10px 20px rgba(255,215,0,0.5))' }}>🥠</span>
          <p style={{ color: '#fff', marginTop: 20, fontWeight: 700, fontSize: '1.1rem', letterSpacing: 2, textTransform: 'uppercase',
            textShadow: '0 0 10px rgba(255,215,0,0.8)', animation: 'pulseText 2s infinite' }}>TAP TO CRACK OPEN</p>
        </motion.div>
      ) : (
        <motion.div initial={{ scale: 0.3, opacity: 0, rotateY: 180 }} animate={{ scale: 1, opacity: 1, rotateY: 0 }} transition={{ duration: 0.8 }}
          style={{ background: 'rgba(255,255,255,0.95)', borderRadius: 16, padding: '30px 25px', maxWidth: 380, boxShadow: '0 20px 60px rgba(0,0,0,0.2)' }}>
          <p style={{ fontSize: '0.85rem', color: '#aaa', textTransform: 'uppercase', letterSpacing: 2, marginBottom: 10 }}>Your Fortune 🥠</p>
          <h2 style={{ fontFamily: 'Caveat, cursive', fontSize: '1.6rem', color: '#333', lineHeight: 1.5 }}>{data.message}</h2>
          <UnlockButton onUnlock={onNext} isLast={isLast} />
        </motion.div>
      )}
    </motion.div>
  );
}
