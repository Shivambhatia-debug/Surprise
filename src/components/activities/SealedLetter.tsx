import { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail } from 'lucide-react';
import UnlockButton from './UnlockButton';
import { DoorData } from '@/data/doors';

export default function SealedLetter({ data, onNext, isLast }: { data: DoorData; onNext: () => void; isLast: boolean }) {
  const [opened, setOpened] = useState(false);

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', padding: '0 20px' }}>
      {!opened ? (
        <motion.div onClick={() => setOpened(true)} style={{ cursor: 'pointer', display: 'flex', flexDirection: 'column', alignItems: 'center' }}
          animate={{ y: [0, -10, 0] }} transition={{ duration: 3, repeat: Infinity }}>
          <div style={{
            width: 180, height: 130, background: 'linear-gradient(135deg, #f5e6d3, #e8d5bc)',
            borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative',
            boxShadow: '0 10px 30px rgba(0,0,0,0.2)',
          }}>
            <div style={{ position: 'absolute', top: 0, left: 0, width: 0, height: 0,
              borderLeft: '90px solid transparent', borderRight: '90px solid transparent',
              borderTop: '65px solid rgba(139,90,43,0.15)' }} />
            <div style={{ width: 45, height: 45, borderRadius: '50%', background: '#c0392b',
              display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 2,
              boxShadow: '0 3px 10px rgba(192,57,43,0.5)' }}>
              <Mail size={20} color="#fff" />
            </div>
          </div>
          <p style={{ color: '#fff', marginTop: 20, fontWeight: 700, fontSize: '1.1rem', letterSpacing: 2, textTransform: 'uppercase',
            textShadow: '0 0 10px rgba(255,105,180,0.8)', animation: 'pulseText 2s infinite' }}>TAP TO BREAK THE SEAL</p>
        </motion.div>
      ) : (
        <motion.div initial={{ rotateX: 90, opacity: 0 }} animate={{ rotateX: 0, opacity: 1 }} transition={{ duration: 0.8 }}
          style={{ background: 'rgba(255,255,255,0.95)', borderRadius: 16, padding: '30px 25px', maxWidth: 380, boxShadow: '0 20px 60px rgba(0,0,0,0.2)' }}>
          <h2 style={{ fontFamily: 'Caveat, cursive', fontSize: '1.8rem', color: '#333', marginBottom: 15 }}>{data.title}</h2>
          <p style={{ fontFamily: 'Caveat, cursive', fontSize: '1.2rem', color: '#555', lineHeight: 1.6 }}>{data.message}</p>
          <UnlockButton onUnlock={onNext} isLast={isLast} />
        </motion.div>
      )}
    </motion.div>
  );
}
