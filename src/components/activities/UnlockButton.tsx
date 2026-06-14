import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Heart } from 'lucide-react';

interface UnlockButtonProps {
  onUnlock: () => void;
  isLast: boolean;
}

export default function UnlockButton({ onUnlock, isLast }: UnlockButtonProps) {
  const [progress, setProgress] = useState(0);
  const [isHolding, setIsHolding] = useState(false);
  const animationRef = useRef<number>(0);

  useEffect(() => {
    let lastTime = performance.now();
    const update = (now: number) => {
      const dt = now - lastTime;
      lastTime = now;
      if (isHolding) {
        setProgress(p => {
          const next = p + (dt / 1500) * 100;
          if (next >= 100) { setIsHolding(false); setTimeout(onUnlock, 120); return 100; }
          return next;
        });
        animationRef.current = requestAnimationFrame(update);
      } else {
        setProgress(p => {
          if (p <= 0) return 0;
          const next = p - (dt / 400) * 100;
          if (next > 0) animationRef.current = requestAnimationFrame(update);
          return Math.max(next, 0);
        });
      }
    };
    animationRef.current = requestAnimationFrame(update);
    return () => cancelAnimationFrame(animationRef.current);
  }, [isHolding, onUnlock]);

  const r = 35, c = 2 * Math.PI * r;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5 }}
      style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '25px', position: 'relative' }}
    >
      <div style={{ position: 'relative', width: 70, height: 70 }}>
        <button
          onMouseDown={() => setIsHolding(true)}
          onMouseUp={() => setIsHolding(false)}
          onMouseLeave={() => setIsHolding(false)}
          onTouchStart={() => setIsHolding(true)}
          onTouchEnd={() => setIsHolding(false)}
          style={{
            width: 60, height: 60, borderRadius: '50%',
            background: 'linear-gradient(135deg, #ff1493, #ff69b4)',
            border: 'none', color: '#fff', display: 'flex', justifyContent: 'center', alignItems: 'center',
            boxShadow: '0 5px 20px rgba(255,20,147,0.5)',
            cursor: 'pointer', outline: 'none', WebkitTapHighlightColor: 'transparent', userSelect: 'none',
            position: 'absolute', top: 5, left: 5, zIndex: 2,
            transform: isHolding ? 'scale(0.88)' : 'scale(1)', transition: 'transform 0.1s',
          }}
        >
          <Heart size={22} fill="white" />
        </button>
        <svg viewBox="0 0 70 70" style={{ position: 'absolute', top: 0, left: 0, width: 70, height: 70, transform: 'rotate(-90deg)', pointerEvents: 'none' }}>
          <circle cx="35" cy="35" r={r} fill="transparent" stroke="white" strokeWidth="3"
            strokeLinecap="round" strokeDasharray={c} strokeDashoffset={c - (progress / 100) * c}
            style={{ filter: 'drop-shadow(0 0 5px white)', transition: 'stroke-dashoffset 0.1s linear' }}
          />
        </svg>
      </div>
      <div style={{
        marginTop: 8, fontSize: '0.75rem', color: 'rgba(255,255,255,0.85)',
        fontWeight: 600, letterSpacing: 1, textShadow: '0 0 8px rgba(0,0,0,0.4)',
      }}>
        {isLast ? "HOLD FOR FINAL SURPRISE" : "HOLD TO UNLOCK NEXT"}
      </div>
    </motion.div>
  );
}
