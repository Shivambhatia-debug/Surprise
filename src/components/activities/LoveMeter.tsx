import { useState } from 'react';
import { motion } from 'framer-motion';
import UnlockButton from './UnlockButton';
import { DoorData } from '@/data/doors';
import { vibrate, playTick, playError } from '@/utils/interactions';

export default function LoveMeter({ data, onNext, isLast }: { data: DoorData; onNext: () => void; isLast: boolean }) {
  const [level, setLevel] = useState(0);
  const [exploded, setExploded] = useState(false);
  const labels = ['A Little', 'A Lot', 'So Much', 'Infinite', '💥 ERROR 💥'];

  const handleTap = () => {
    if (exploded) return;
    if (level < labels.length - 1) {
      setLevel(level + 1);
      vibrate(50);
      playTick();
    }
    if (level === labels.length - 2) {
      setTimeout(() => {
        setExploded(true);
        vibrate([100, 50, 100, 50, 200]);
        playError();
      }, 600);
    }
  };

  const fillPercent = ((level + 1) / labels.length) * 100;

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', padding: '0 20px' }}>
      <h2 style={{ color: '#fff', fontFamily: 'Caveat, cursive', fontSize: '1.8rem', marginBottom: 5,
        textShadow: '0 0 15px rgba(255,105,180,0.6)' }}>{data.title}</h2>
      <p style={{ color: 'rgba(255,255,255,0.7)', marginBottom: 20, fontSize: '0.9rem' }}>How special is Chululu to me?</p>

      {!exploded ? (
        <>
          {/* Meter container */}
          <div style={{
            width: 80, height: 280, background: 'rgba(255,255,255,0.15)', borderRadius: 40,
            border: '2px solid rgba(255,255,255,0.3)', position: 'relative', overflow: 'hidden',
            boxShadow: '0 10px 30px rgba(0,0,0,0.2)',
          }}>
            <motion.div animate={{ height: `${fillPercent}%` }} transition={{ duration: 0.5, type: 'spring' }}
              style={{
                position: 'absolute', bottom: 0, width: '100%',
                background: `linear-gradient(to top, #ff1493, #ff69b4, ${level >= 3 ? '#ffd700' : '#ff69b4'})`,
                borderRadius: '0 0 38px 38px',
                boxShadow: level >= 3 ? '0 0 30px rgba(255,215,0,0.6)' : '0 0 20px rgba(255,20,147,0.4)',
              }} />
          </div>
          <p style={{ color: '#fff', marginTop: 15, fontWeight: 700, fontSize: '1.3rem',
            textShadow: level >= 3 ? '0 0 15px rgba(255,215,0,0.8)' : '0 0 10px rgba(255,105,180,0.6)' }}>
            {labels[level]}
          </p>
          <motion.button onClick={handleTap} whileTap={{ scale: 0.92 }}
            style={{
              marginTop: 15, padding: '12px 30px', background: 'linear-gradient(135deg, #ff1493, #ff69b4)',
              border: 'none', borderRadius: 30, color: '#fff', fontWeight: 700, fontSize: '1rem',
              cursor: 'pointer', boxShadow: '0 5px 20px rgba(255,20,147,0.4)',
            }}>
            TAP TO FILL MORE ✨
          </motion.button>
        </>
      ) : (
        <motion.div initial={{ scale: 3, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ type: 'spring', stiffness: 100 }}>
          <div style={{
            background: 'rgba(255,255,255,0.95)', borderRadius: 16, padding: '30px 25px',
            maxWidth: 380, boxShadow: '0 20px 60px rgba(0,0,0,0.2)',
          }}>
            <p style={{ fontSize: '2rem', marginBottom: 10 }}>💥❤️‍🔥💥</p>
            <h2 style={{ fontFamily: 'Caveat, cursive', fontSize: '1.5rem', color: '#ff1493', marginBottom: 10 }}>
              SYSTEM OVERLOADED
            </h2>
            <p style={{ fontSize: '1rem', color: '#555', lineHeight: 1.6 }}>{data.message}</p>
            <UnlockButton onUnlock={onNext} isLast={isLast} />
          </div>
        </motion.div>
      )}
    </motion.div>
  );
}
