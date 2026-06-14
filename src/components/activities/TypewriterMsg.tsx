import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import UnlockButton from './UnlockButton';
import { DoorData } from '@/data/doors';

export default function TypewriterMsg({ data, onNext, isLast }: { data: DoorData; onNext: () => void; isLast: boolean }) {
  const [typedText, setTypedText] = useState('');
  const [done, setDone] = useState(false);

  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      setTypedText(data.message.substring(0, index + 1));
      index++;
      if (index === data.message.length) {
        clearInterval(interval);
        setDone(true);
      }
    }, 45);
    return () => clearInterval(interval);
  }, [data.message]);

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', padding: '0 20px' }}>
      <div style={{
        background: 'rgba(255,255,255,0.95)', borderRadius: 16, padding: '30px 25px',
        maxWidth: 400, width: '100%', boxShadow: '0 20px 60px rgba(0,0,0,0.2)', textAlign: 'left',
      }}>
        <h2 style={{ fontFamily: 'Caveat, cursive', fontSize: '1.6rem', color: '#333', marginBottom: 15 }}>{data.title}</h2>
        <p style={{ fontFamily: 'Caveat, cursive', fontSize: '1.3rem', color: '#555', lineHeight: 1.6 }}>
          {typedText}
          {!done && (
            <motion.span animate={{ opacity: [1, 0] }} transition={{ duration: 0.5, repeat: Infinity }}
              style={{ color: '#ff1493' }}>|</motion.span>
          )}
        </p>
      </div>
      {done && <UnlockButton onUnlock={onNext} isLast={isLast} />}
    </motion.div>
  );
}
