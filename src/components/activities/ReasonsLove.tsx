import { useState } from 'react';
import { motion } from 'framer-motion';
import { Heart } from 'lucide-react';
import UnlockButton from './UnlockButton';
import { DoorData } from '@/data/doors';

export default function ReasonsLove({ data, onNext, isLast }: { data: DoorData; onNext: () => void; isLast: boolean }) {
  const reasons = data.items || [];
  const [revealed, setRevealed] = useState(0);

  const handleTap = () => {
    if (revealed < reasons.length) setRevealed(revealed + 1);
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', padding: '0 20px' }}>
      <h2 style={{ color: '#fff', fontFamily: 'Caveat, cursive', fontSize: '1.8rem', marginBottom: 20,
        textShadow: '0 0 15px rgba(255,105,180,0.6)' }}>{data.title}</h2>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10, minHeight: 200, alignItems: 'center', width: '100%', maxWidth: 340 }}>
        {reasons.slice(0, revealed).map((reason, i) => (
          <motion.div key={i} initial={{ opacity: 0, x: -20, scale: 0.8 }} animate={{ opacity: 1, x: 0, scale: 1 }}
            transition={{ duration: 0.5 }}
            style={{
              background: 'rgba(255,255,255,0.9)', borderRadius: 12, padding: '10px 20px',
              boxShadow: '0 4px 15px rgba(0,0,0,0.1)', width: '100%',
            }}>
            <p style={{ fontFamily: 'Caveat, cursive', fontSize: '1.3rem', color: '#ff1493' }}>{reason}</p>
          </motion.div>
        ))}
      </div>
      {revealed < reasons.length ? (
        <motion.div onClick={handleTap} style={{ cursor: 'pointer', marginTop: 20 }}
          animate={{ scale: [1, 1.15, 1] }} transition={{ duration: 1.5, repeat: Infinity }}>
          <Heart size={50} color="#ff1493" fill="#ff1493" />
          <p style={{ color: '#fff', fontSize: '0.85rem', marginTop: 8, fontWeight: 600, letterSpacing: 1 }}>
            TAP THE HEART ({revealed}/{reasons.length})
          </p>
        </motion.div>
      ) : (
        <UnlockButton onUnlock={onNext} isLast={isLast} />
      )}
    </motion.div>
  );
}
