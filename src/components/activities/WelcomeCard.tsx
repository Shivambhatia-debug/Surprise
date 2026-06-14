import { useState } from 'react';
import { motion } from 'framer-motion';
import confetti from 'canvas-confetti';
import { Gift } from 'lucide-react';
import UnlockButton from './UnlockButton';
import { DoorData } from '@/data/doors';

export default function WelcomeCard({ data, onNext, isLast }: { data: DoorData; onNext: () => void; isLast: boolean }) {
  const [opened, setOpened] = useState(false);

  const handleOpen = () => {
    confetti({ particleCount: 60, spread: 80, origin: { y: 0.5 }, colors: ['#ff1493', '#ff69b4', '#ffd700', '#fff'] });
    setOpened(true);
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', padding: '0 20px' }}>
      {!opened ? (
        <motion.div onClick={handleOpen} style={{ cursor: 'pointer', display: 'flex', flexDirection: 'column', alignItems: 'center' }}
          animate={{ y: [0, -12, 0] }} transition={{ duration: 3, repeat: Infinity }}>
          <div style={{ width: 120, height: 120, background: 'linear-gradient(135deg, #ff1493, #ff69b4)', borderRadius: 16,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            boxShadow: '0 15px 40px rgba(255,20,147,0.4)' }}>
            <Gift size={50} color="#fff" />
          </div>
          <p style={{ color: '#fff', marginTop: 20, fontWeight: 700, fontSize: '1.1rem', letterSpacing: 2, textTransform: 'uppercase',
            textShadow: '0 0 10px rgba(255,105,180,0.8)', animation: 'pulseText 2s infinite' }}>TAP TO OPEN</p>
        </motion.div>
      ) : (
        <motion.div initial={{ scale: 0.3, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ type: 'spring', stiffness: 150 }}
          style={{ background: 'rgba(255,255,255,0.95)', borderRadius: 16, padding: '30px 25px', maxWidth: 380, boxShadow: '0 20px 60px rgba(0,0,0,0.2)' }}>
          <h2 style={{ fontFamily: 'Caveat, cursive', fontSize: '2rem', color: '#333', marginBottom: 15 }}>{data.title}</h2>
          <p style={{ fontSize: '1rem', color: '#555', lineHeight: 1.6 }}>{data.message}</p>
          <UnlockButton onUnlock={onNext} isLast={isLast} />
        </motion.div>
      )}
    </motion.div>
  );
}
