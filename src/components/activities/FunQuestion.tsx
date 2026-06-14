import { useState } from 'react';
import { motion } from 'framer-motion';
import UnlockButton from './UnlockButton';
import { DoorData } from '@/data/doors';

export default function FunQuestion({ data, onNext, isLast }: { data: DoorData; onNext: () => void; isLast: boolean }) {
  const [answered, setAnswered] = useState(false);
  const question = data.items?.[0] || "What makes you happiest?";
  const options = data.options || [];

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', padding: '0 20px' }}>
      {!answered ? (
        <>
          <h2 style={{ color: '#fff', fontFamily: 'Caveat, cursive', fontSize: '2rem', marginBottom: 25,
            textShadow: '0 0 15px rgba(255,105,180,0.6)' }}>{question}</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12, width: '100%', maxWidth: 320 }}>
            {options.map((opt, i) => (
              <motion.button key={i} onClick={() => setAnswered(true)}
                initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.15 }}
                whileTap={{ scale: 0.95 }}
                style={{
                  padding: '14px 20px', background: 'rgba(255,255,255,0.15)', backdropFilter: 'blur(10px)',
                  border: '1px solid rgba(255,255,255,0.3)', borderRadius: 12, color: '#fff',
                  fontSize: '1rem', cursor: 'pointer', textAlign: 'left', fontWeight: 500,
                  transition: 'all 0.2s',
                }}
                onMouseEnter={e => { (e.target as HTMLElement).style.background = 'rgba(255,20,147,0.3)'; }}
                onMouseLeave={e => { (e.target as HTMLElement).style.background = 'rgba(255,255,255,0.15)'; }}>
                {opt}
              </motion.button>
            ))}
          </div>
        </>
      ) : (
        <motion.div initial={{ scale: 0.5, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
          style={{ background: 'rgba(255,255,255,0.95)', borderRadius: 16, padding: '30px 25px', maxWidth: 380, boxShadow: '0 20px 60px rgba(0,0,0,0.2)' }}>
          <h2 style={{ fontFamily: 'Caveat, cursive', fontSize: '1.8rem', color: '#ff1493', marginBottom: 15 }}>Great Choice! 💕</h2>
          <p style={{ fontSize: '1rem', color: '#555', lineHeight: 1.6 }}>{data.message}</p>
          <UnlockButton onUnlock={onNext} isLast={isLast} />
        </motion.div>
      )}
    </motion.div>
  );
}
