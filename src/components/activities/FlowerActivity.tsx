import { useState } from 'react';
import { motion } from 'framer-motion';
import UnlockButton from './UnlockButton';
import { DoorData } from '@/data/doors';

export default function FlowerActivity({ data, onNext, isLast }: { data: DoorData; onNext: () => void; isLast: boolean }) {
  const [bloomed, setBloomed] = useState(false);
  const petals = Array.from({ length: 8 });

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', padding: '0 20px' }}>
      {!bloomed ? (
        <motion.div onClick={() => setBloomed(true)} style={{ cursor: 'pointer', display: 'flex', flexDirection: 'column', alignItems: 'center' }}
          animate={{ y: [0, -10, 0] }} transition={{ duration: 3, repeat: Infinity }}>
          <div style={{ position: 'relative', width: 100, height: 100 }}>
            {petals.map((_, i) => (
              <motion.div key={i}
                animate={{ scale: [0.5, 0.8, 0.5] }}
                transition={{ duration: 2.5, delay: i * 0.1, repeat: Infinity }}
                style={{
                  position: 'absolute', width: 35, height: 50, background: 'linear-gradient(135deg, #ff69b4, #ff1493)',
                  borderRadius: '50% 50% 50% 50% / 60% 60% 40% 40%',
                  top: '50%', left: '50%', transformOrigin: 'bottom center',
                  transform: `translate(-50%, -100%) rotate(${i * 45}deg)`,
                  boxShadow: '0 2px 10px rgba(255,20,147,0.3)',
                }} />
            ))}
            <div style={{
              position: 'absolute', width: 28, height: 28, borderRadius: '50%',
              background: 'radial-gradient(circle, #ffd700, #ffaa00)', top: '50%', left: '50%',
              transform: 'translate(-50%, -50%)', zIndex: 5, boxShadow: '0 0 15px rgba(255,215,0,0.6)',
            }} />
          </div>
          <div style={{ width: 4, height: 60, background: 'linear-gradient(to bottom, #4caf50, #2e7d32)', borderRadius: 2, margin: '0 auto' }} />
          <p style={{ color: '#fff', marginTop: 15, fontWeight: 700, fontSize: '1.1rem', letterSpacing: 2,
            textShadow: '0 0 10px rgba(255,105,180,0.8)', animation: 'pulseText 2s infinite' }}>TAP TO BLOOM 🌸</p>
        </motion.div>
      ) : (
        <motion.div initial={{ scale: 0.3, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ type: 'spring', stiffness: 150 }}
          style={{ background: 'rgba(255,255,255,0.95)', borderRadius: 16, padding: '30px 25px', maxWidth: 380, boxShadow: '0 20px 60px rgba(0,0,0,0.2)' }}>
          <p style={{ fontSize: '2rem', marginBottom: 10 }}>🌸</p>
          <h2 style={{ fontFamily: 'Caveat, cursive', fontSize: '2rem', color: '#333', marginBottom: 15 }}>{data.title}</h2>
          <p style={{ fontSize: '1rem', color: '#555', lineHeight: 1.6 }}>{data.message}</p>
          <UnlockButton onUnlock={onNext} isLast={isLast} />
        </motion.div>
      )}
    </motion.div>
  );
}
