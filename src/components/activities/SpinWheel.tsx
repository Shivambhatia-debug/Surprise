import { useState } from 'react';
import { motion } from 'framer-motion';
import UnlockButton from './UnlockButton';
import { DoorData } from '@/data/doors';
import { vibrate, playTick, playSuccess } from '@/utils/interactions';

export default function SpinWheel({ data, onNext, isLast }: { data: DoorData; onNext: () => void; isLast: boolean }) {
  const items = data.items || [];
  const [spinning, setSpinning] = useState(false);
  const [result, setResult] = useState<string | null>(null);
  const [rotation, setRotation] = useState(0);

  const spin = () => {
    if (spinning || result) return;
    setSpinning(true);
    const idx = Math.floor(Math.random() * items.length);
    const extraRotations = 360 * 5; // 5 full rotations
    const segmentAngle = 360 / items.length;
    const targetAngle = extraRotations + (idx * segmentAngle);
    setRotation(targetAngle);
    
    // Play tick sound periodically while spinning
    let ticks = 0;
    const tickInterval = setInterval(() => {
      ticks++;
      if (ticks > 15) clearInterval(tickInterval);
      playTick();
      vibrate(20);
    }, 200);

    setTimeout(() => { 
      setResult(items[idx]); 
      setSpinning(false); 
      playSuccess();
      vibrate([100, 50, 100]);
    }, 3500);
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', padding: '0 20px' }}>
      <h2 style={{ color: '#fff', fontFamily: 'Caveat, cursive', fontSize: '1.8rem', marginBottom: 15,
        textShadow: '0 0 15px rgba(255,105,180,0.6)' }}>{data.title}</h2>
      {!result ? (
        <>
          <div style={{ position: 'relative', width: 220, height: 220 }}>
            {/* Pointer */}
            <div style={{ position: 'absolute', top: -15, left: '50%', transform: 'translateX(-50%)', fontSize: 28, zIndex: 5 }}>▼</div>
            <motion.div
              animate={{ rotate: rotation }}
              transition={{ duration: 3.5, ease: [0.17, 0.67, 0.12, 0.99] }}
              style={{
                width: 220, height: 220, borderRadius: '50%',
                background: `conic-gradient(${items.map((_, i) => `${i % 2 ? '#ff69b4' : '#ff1493'} ${(i / items.length) * 100}% ${((i + 1) / items.length) * 100}%`).join(', ')})`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                boxShadow: '0 10px 40px rgba(255,20,147,0.4)',
              }}>
              <div style={{ width: 40, height: 40, borderRadius: '50%', background: '#fff', boxShadow: '0 2px 10px rgba(0,0,0,0.2)' }} />
            </motion.div>
          </div>
          <motion.button onClick={spin} disabled={spinning}
            whileTap={{ scale: 0.95 }}
            style={{
              marginTop: 20, padding: '12px 30px', background: spinning ? '#999' : 'linear-gradient(135deg, #ff1493, #ffd700)',
              border: 'none', borderRadius: 30, color: '#fff', fontWeight: 700, fontSize: '1rem',
              cursor: spinning ? 'not-allowed' : 'pointer', letterSpacing: 2, textTransform: 'uppercase',
              boxShadow: '0 5px 20px rgba(255,20,147,0.4)',
            }}>
            {spinning ? 'SPINNING...' : 'SPIN!'}
          </motion.button>
        </>
      ) : (
        <motion.div initial={{ scale: 0.5, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
          style={{ background: 'rgba(255,255,255,0.95)', borderRadius: 16, padding: '30px 25px', maxWidth: 380, boxShadow: '0 20px 60px rgba(0,0,0,0.2)' }}>
          <p style={{ fontSize: '0.85rem', color: '#aaa', textTransform: 'uppercase', letterSpacing: 2 }}>The wheel says...</p>
          <h2 style={{ fontFamily: 'Caveat, cursive', fontSize: '1.8rem', color: '#ff1493', margin: '15px 0' }}>{result}</h2>
          <UnlockButton onUnlock={onNext} isLast={isLast} />
        </motion.div>
      )}
    </motion.div>
  );
}
