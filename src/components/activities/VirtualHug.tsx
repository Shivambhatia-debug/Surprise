import { useState } from 'react';
import { motion } from 'framer-motion';
import UnlockButton from './UnlockButton';
import { DoorData } from '@/data/doors';

export default function VirtualHug({ data, onNext, isLast }: { data: DoorData; onNext: () => void; isLast: boolean }) {
  const [hugged, setHugged] = useState(false);

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', padding: '0 20px' }}>
      {!hugged ? (
        <motion.div onClick={() => setHugged(true)} style={{ cursor: 'pointer', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <motion.div
            animate={{ scale: [1, 1.1, 1] }} transition={{ duration: 2, repeat: Infinity }}
            style={{ fontSize: 100, marginBottom: 10 }}>
            🤗
          </motion.div>
          <p style={{ color: '#fff', fontWeight: 700, fontSize: '1.1rem', letterSpacing: 2, textTransform: 'uppercase',
            textShadow: '0 0 10px rgba(255,105,180,0.8)', animation: 'pulseText 2s infinite' }}>TAP FOR A HUG</p>
        </motion.div>
      ) : (
        <motion.div initial={{ scale: 0.5, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ type: 'spring' }}>
          {/* Animated arms */}
          <div style={{ position: 'relative', width: 200, height: 120, margin: '0 auto 20px' }}>
            <motion.div initial={{ rotate: -45, x: -50 }} animate={{ rotate: 0, x: 0 }} transition={{ duration: 0.8 }}
              style={{ position: 'absolute', left: 0, top: 20, fontSize: 70 }}>🫲</motion.div>
            <motion.div initial={{ rotate: 45, x: 50 }} animate={{ rotate: 0, x: 0 }} transition={{ duration: 0.8 }}
              style={{ position: 'absolute', right: 0, top: 20, fontSize: 70 }}>🫱</motion.div>
          </div>
          <div style={{ background: 'rgba(255,255,255,0.95)', borderRadius: 16, padding: '25px', maxWidth: 350, boxShadow: '0 15px 40px rgba(0,0,0,0.2)' }}>
            <h2 style={{ fontFamily: 'Caveat, cursive', fontSize: '1.8rem', color: '#ff1493', marginBottom: 12 }}>{data.title}</h2>
            <p style={{ fontSize: '1rem', color: '#555', lineHeight: 1.6 }}>{data.message}</p>
            <UnlockButton onUnlock={onNext} isLast={isLast} />
          </div>
        </motion.div>
      )}
    </motion.div>
  );
}
