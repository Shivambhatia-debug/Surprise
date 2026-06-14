import { useState } from 'react';
import { motion } from 'framer-motion';
import UnlockButton from './UnlockButton';
import { DoorData } from '@/data/doors';

export default function AffirmationSwipe({ data, onNext, isLast }: { data: DoorData; onNext: () => void; isLast: boolean }) {
  const cards = data.items || [];
  const [current, setCurrent] = useState(0);
  const done = current >= cards.length;

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', padding: '0 20px' }}>
      <h2 style={{ color: '#fff', fontFamily: 'Caveat, cursive', fontSize: '1.8rem', marginBottom: 20,
        textShadow: '0 0 15px rgba(255,105,180,0.6)' }}>{data.title}</h2>
      {!done ? (
        <>
          <motion.div key={current}
            initial={{ opacity: 0, x: 80, rotate: 5 }} animate={{ opacity: 1, x: 0, rotate: 0 }}
            exit={{ opacity: 0, x: -80 }} transition={{ duration: 0.5 }}
            style={{
              background: 'rgba(255,255,255,0.95)', borderRadius: 20, padding: '40px 30px',
              maxWidth: 340, width: '100%', boxShadow: '0 20px 50px rgba(0,0,0,0.2)',
              minHeight: 150, display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
            <p style={{ fontFamily: 'Caveat, cursive', fontSize: '1.6rem', color: '#ff1493', lineHeight: 1.4 }}>
              {cards[current]}
            </p>
          </motion.div>
          <p style={{ color: 'rgba(255,255,255,0.6)', marginTop: 12, fontSize: '0.8rem' }}>
            {current + 1} / {cards.length}
          </p>
          <motion.button onClick={() => setCurrent(current + 1)} whileTap={{ scale: 0.95 }}
            style={{
              marginTop: 15, padding: '12px 30px', background: 'linear-gradient(135deg, #ff1493, #ff69b4)',
              border: 'none', borderRadius: 30, color: '#fff', fontWeight: 700, fontSize: '1rem',
              cursor: 'pointer', letterSpacing: 1, boxShadow: '0 5px 20px rgba(255,20,147,0.4)',
            }}>
            {current < cards.length - 1 ? 'NEXT →' : 'DONE ✓'}
          </motion.button>
        </>
      ) : (
        <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }}
          style={{ marginTop: 10 }}>
          <p style={{ color: '#fff', fontSize: '1.1rem', marginBottom: 10, textShadow: '0 0 10px rgba(255,105,180,0.5)' }}>
            Remember all of these, Chululu. They are all true. 💖
          </p>
          <UnlockButton onUnlock={onNext} isLast={isLast} />
        </motion.div>
      )}
    </motion.div>
  );
}
