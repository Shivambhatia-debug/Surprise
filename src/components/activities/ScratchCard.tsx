import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import UnlockButton from './UnlockButton';
import { DoorData } from '@/data/doors';

export default function ScratchCard({ data, onNext, isLast }: { data: DoorData; onNext: () => void; isLast: boolean }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [revealed, setRevealed] = useState(false);
  const [scratching, setScratching] = useState(false);
  const scratchedRef = useRef(0);

  const scratch = (e: React.MouseEvent | React.TouchEvent) => {
    const canvas = canvasRef.current;
    if (!canvas || revealed) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    const rect = canvas.getBoundingClientRect();
    let x, y;
    if ('touches' in e) {
      x = e.touches[0].clientX - rect.left;
      y = e.touches[0].clientY - rect.top;
    } else {
      x = e.clientX - rect.left;
      y = e.clientY - rect.top;
    }
    ctx.globalCompositeOperation = 'destination-out';
    ctx.beginPath();
    ctx.arc(x, y, 25, 0, Math.PI * 2);
    ctx.fill();
    scratchedRef.current += 1;
    if (scratchedRef.current > 40) setRevealed(true);
  };

  const initCanvas = (canvas: HTMLCanvasElement | null) => {
    if (!canvas) return;
    canvasRef.current = canvas;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
    gradient.addColorStop(0, '#ff69b4');
    gradient.addColorStop(1, '#ff1493');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = '#fff';
    ctx.font = 'bold 18px Outfit';
    ctx.textAlign = 'center';
    ctx.fillText('✨ Scratch Me! ✨', canvas.width / 2, canvas.height / 2 + 6);
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', padding: '0 20px' }}>
      <h2 style={{ color: '#fff', fontFamily: 'Caveat, cursive', fontSize: '1.8rem', marginBottom: 20,
        textShadow: '0 0 15px rgba(255,105,180,0.6)' }}>{data.title}</h2>
      <div style={{ position: 'relative', width: 300, height: 200, borderRadius: 16, overflow: 'hidden',
        boxShadow: '0 15px 40px rgba(0,0,0,0.2)' }}>
        {/* Message underneath */}
        <div style={{
          position: 'absolute', top: 0, left: 0, width: '100%', height: '100%',
          background: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 20,
        }}>
          <p style={{ fontFamily: 'Caveat, cursive', fontSize: '1.3rem', color: '#ff1493', lineHeight: 1.4 }}>{data.message}</p>
        </div>
        {/* Scratch overlay */}
        {!revealed && (
          <canvas ref={initCanvas} width={300} height={200}
            style={{ position: 'absolute', top: 0, left: 0, cursor: 'grab', touchAction: 'none' }}
            onMouseDown={() => setScratching(true)}
            onMouseUp={() => setScratching(false)}
            onMouseMove={e => scratching && scratch(e)}
            onTouchMove={scratch}
          />
        )}
      </div>
      {revealed && (
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
          <UnlockButton onUnlock={onNext} isLast={isLast} />
        </motion.div>
      )}
    </motion.div>
  );
}
