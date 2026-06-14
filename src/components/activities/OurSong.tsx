import { useState } from 'react';
import { motion } from 'framer-motion';
import { Music } from 'lucide-react';
import UnlockButton from './UnlockButton';
import { DoorData } from '@/data/doors';

export default function OurSong({ data, onNext, isLast }: { data: DoorData; onNext: () => void; isLast: boolean }) {
  const [opened, setOpened] = useState(false);

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', padding: '0 20px' }}>
      {!opened ? (
        <motion.div onClick={() => setOpened(true)} style={{ cursor: 'pointer', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <motion.div animate={{ y: [0, -15, 0], rotate: [0, 10, -10, 0] }} transition={{ duration: 2.5, repeat: Infinity }}>
            <div style={{
              width: 100, height: 100, borderRadius: '50%',
              background: 'linear-gradient(135deg, #ff69b4, #ffd700)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              boxShadow: '0 10px 30px rgba(255,20,147,0.4)',
            }}>
              <Music size={45} color="#fff" />
            </div>
          </motion.div>
          {/* Floating music notes */}
          {['♪', '♫', '♩'].map((note, i) => (
            <motion.span key={i} style={{ position: 'absolute', fontSize: 24, color: 'rgba(255,255,255,0.6)' }}
              animate={{ y: [-20 - i * 30, -80 - i * 30], x: [10 + i * 20, -10 + i * 25], opacity: [0.8, 0] }}
              transition={{ duration: 2.5, delay: i * 0.5, repeat: Infinity }}>
              {note}
            </motion.span>
          ))}
          <p style={{ color: '#fff', marginTop: 25, fontWeight: 700, fontSize: '1.1rem', letterSpacing: 2, textTransform: 'uppercase',
            textShadow: '0 0 10px rgba(255,215,0,0.8)', animation: 'pulseText 2s infinite' }}>TAP THE MELODY</p>
        </motion.div>
      ) : (
        <motion.div initial={{ scale: 0.5, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ type: 'spring' }}
          style={{ background: 'rgba(255,255,255,0.95)', borderRadius: 16, padding: '30px 25px', maxWidth: 380, boxShadow: '0 20px 60px rgba(0,0,0,0.2)' }}>
          <p style={{ fontSize: '2rem', marginBottom: 10 }}>🎵</p>
          <h2 style={{ fontFamily: 'Caveat, cursive', fontSize: '1.8rem', color: '#333', marginBottom: 12 }}>{data.title}</h2>
          <p style={{ fontSize: '1rem', color: '#555', lineHeight: 1.6, marginBottom: 20 }}>{data.message}</p>
          
          <div style={{ marginBottom: 20 }}>
            <iframe 
              style={{ borderRadius: '12px' }} 
              src="https://open.spotify.com/embed/track/2GzjIHQ87BF2zgbmmthZzO?utm_source=generator&theme=0" 
              width="100%" 
              height="152" 
              frameBorder="0" 
              allowFullScreen={false} 
              allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" 
              loading="lazy"
            ></iframe>
          </div>

          <UnlockButton onUnlock={onNext} isLast={isLast} />
        </motion.div>
      )}
    </motion.div>
  );
}
