import { useState } from 'react';
import { motion } from 'framer-motion';
import confetti from 'canvas-confetti';
import UnlockButton from './UnlockButton';
import { DoorData } from '@/data/doors';
import { vibrate, playPop } from '@/utils/interactions';

export default function BalloonActivity({ data, onNext, isLast }: { data: DoorData; onNext: () => void; isLast: boolean }) {
  const [popped, setPopped] = useState(false);

  const handlePop = () => {
    confetti({ particleCount: 40, spread: 100, origin: { y: 0.4 }, colors: ['#ff1493', '#ff69b4', '#ffd700'] });
    vibrate(60);
    playPop();
    setPopped(true);
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', padding: '0 20px' }}>
      {!popped ? (
        <motion.div onClick={handlePop} style={{ cursor: 'pointer', display: 'flex', flexDirection: 'column', alignItems: 'center' }}
          animate={{ y: [0, -20, 0], rotate: [0, 3, -3, 0] }} transition={{ duration: 3.5, repeat: Infinity }}>
          <div style={{
            width: 110, height: 140, background: 'radial-gradient(circle at 30% 30%, #ff69b4, #ff1493 70%)',
            borderRadius: '50% 50% 50% 50% / 60% 60% 40% 40%', position: 'relative',
            boxShadow: 'inset -15px -10px 30px rgba(0,0,0,0.15), 0 10px 30px rgba(255,20,147,0.3)',
          }}>
            <div style={{ position: 'absolute', width: 25, height: 35, background: 'rgba(255,255,255,0.3)',
              borderRadius: '50%', top: 20, left: 20, transform: 'rotate(-30deg)' }} />
          </div>
          <div style={{ width: 2, height: 50, background: 'rgba(255,255,255,0.4)' }} />
          <p style={{ color: '#fff', marginTop: 15, fontWeight: 700, fontSize: '1.1rem', letterSpacing: 2,
            textShadow: '0 0 10px rgba(255,105,180,0.8)', animation: 'pulseText 2s infinite' }}>TAP TO POP! 🎈</p>
        </motion.div>
      ) : (
        <motion.div initial={{ y: 60, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ type: 'spring', delay: 0.3 }}
          style={{ background: 'rgba(255,255,255,0.95)', borderRadius: 16, padding: '30px 25px', maxWidth: 380, boxShadow: '0 20px 60px rgba(0,0,0,0.2)' }}>
          <h2 style={{ fontFamily: 'Caveat, cursive', fontSize: '2rem', color: '#333', marginBottom: 15 }}>{data.title}</h2>
          <p style={{ fontSize: '1rem', color: '#555', lineHeight: 1.6 }}>{data.message}</p>
          <UnlockButton onUnlock={onNext} isLast={isLast} />
        </motion.div>
      )}
    </motion.div>
  );
}
