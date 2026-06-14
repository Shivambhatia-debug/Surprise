import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import UnlockButton from './UnlockButton';
import { DoorData } from '@/data/doors';

export default function BreatheWithMe({ data, onNext, isLast }: { data: DoorData; onNext: () => void; isLast: boolean }) {
  const [breathCount, setBreathCount] = useState(0);
  const [phase, setPhase] = useState<'in' | 'out'>('in');
  const [done, setDone] = useState(false);
  const totalBreaths = 3;

  useEffect(() => {
    if (done) return;
    const cycle = () => {
      setPhase('in');
      setTimeout(() => {
        setPhase('out');
        setTimeout(() => {
          setBreathCount(prev => {
            if (prev + 1 >= totalBreaths) { setDone(true); return prev + 1; }
            return prev + 1;
          });
        }, 4000);
      }, 4000);
    };
    const timeout = setTimeout(cycle, 500);
    return () => clearTimeout(timeout);
  }, [breathCount, done]);

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', padding: '0 20px' }}>
      {!done ? (
        <>
          <h2 style={{ color: '#fff', fontFamily: 'Caveat, cursive', fontSize: '1.8rem', marginBottom: 10,
            textShadow: '0 0 15px rgba(255,105,180,0.6)' }}>Breathe With Me, Chululu</h2>
          <p style={{ color: 'rgba(255,255,255,0.7)', marginBottom: 25, fontSize: '0.9rem' }}>
            Breath {Math.min(breathCount + 1, totalBreaths)} of {totalBreaths}
          </p>
          <motion.div
            animate={{ scale: phase === 'in' ? 1.6 : 1, opacity: phase === 'in' ? 1 : 0.6 }}
            transition={{ duration: 4, ease: 'easeInOut' }}
            style={{
              width: 140, height: 140, borderRadius: '50%',
              background: 'radial-gradient(circle, rgba(255,105,180,0.6), rgba(255,20,147,0.2))',
              border: '2px solid rgba(255,255,255,0.3)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              boxShadow: '0 0 40px rgba(255,105,180,0.4)',
            }}>
            <span style={{ color: '#fff', fontSize: '1.2rem', fontWeight: 600 }}>
              {phase === 'in' ? 'Breathe In...' : 'Breathe Out...'}
            </span>
          </motion.div>
        </>
      ) : (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
          style={{ background: 'rgba(255,255,255,0.95)', borderRadius: 16, padding: '30px 25px', maxWidth: 380, boxShadow: '0 20px 60px rgba(0,0,0,0.2)' }}>
          <h2 style={{ fontFamily: 'Caveat, cursive', fontSize: '1.8rem', color: '#333', marginBottom: 15 }}>Feel Better? 🤍</h2>
          <p style={{ fontSize: '1rem', color: '#555', lineHeight: 1.6 }}>{data.message}</p>
          <UnlockButton onUnlock={onNext} isLast={isLast} />
        </motion.div>
      )}
    </motion.div>
  );
}
