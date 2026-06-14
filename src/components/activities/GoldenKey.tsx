import { motion } from 'framer-motion';
import confetti from 'canvas-confetti';
import { Key } from 'lucide-react';
import { DoorData } from '@/data/doors';

export default function GoldenKey({ data, onNext }: { data: DoorData; onNext: () => void; isLast: boolean }) {
  const handleGrab = () => {
    confetti({
      particleCount: 100, spread: 120, origin: { y: 0.5 },
      colors: ['#ffd700', '#fff', '#ff1493', '#ff69b4'],
      startVelocity: 30,
    });
    setTimeout(onNext, 800);
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', padding: '0 20px' }}>
      <h2 style={{ color: '#ffd700', fontFamily: 'Caveat, cursive', fontSize: '2rem', marginBottom: 20,
        textShadow: '0 0 20px rgba(255,215,0,0.6)' }}>{data.title}</h2>
      <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: '1rem', maxWidth: 340, lineHeight: 1.6, marginBottom: 30 }}>{data.message}</p>
      <motion.div onClick={handleGrab} style={{ cursor: 'pointer' }}
        animate={{ y: [0, -15, 0], rotate: [0, 5, -5, 0] }}
        transition={{ duration: 3, repeat: Infinity }}>
        <div style={{
          width: 100, height: 100, borderRadius: '50%',
          background: 'radial-gradient(circle at 30% 30%, rgba(255,255,255,0.3), rgba(255,215,0,0.2))',
          border: '2px solid rgba(255,215,0,0.6)', display: 'flex', alignItems: 'center', justifyContent: 'center',
          boxShadow: '0 0 40px rgba(255,215,0,0.5), 0 0 80px rgba(255,215,0,0.2)',
        }}>
          <Key size={40} color="#ffd700" />
        </div>
      </motion.div>
      <p style={{ color: '#ffd700', marginTop: 20, fontWeight: 700, fontSize: '1.1rem', letterSpacing: 2,
        textShadow: '0 0 10px rgba(255,215,0,0.8)', animation: 'pulseText 2s infinite' }}>
        TAP TO UNLOCK
      </p>
    </motion.div>
  );
}
