import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Heart } from 'lucide-react';
import styles from './MemoryCard.module.css';
import { DoorData } from '@/data/doors';

interface MemoryCardProps {
  data: DoorData;
  onNext: () => void;
  isLast: boolean;
}

export default function MemoryCard({ data, onNext, isLast }: MemoryCardProps) {
  const [progress, setProgress] = useState(0);
  const [isHolding, setIsHolding] = useState(false);
  const [randomTilt] = useState(() => (Math.random() - 0.5) * 6);
  const animationRef = useRef<number>(0);

  useEffect(() => {
    let lastTime = performance.now();
    const updateProgress = (currentTime: number) => {
      const deltaTime = currentTime - lastTime;
      lastTime = currentTime;
      if (isHolding) {
        setProgress(p => {
          const next = p + (deltaTime / 1500) * 100;
          if (next >= 100) {
            setIsHolding(false);
            setTimeout(() => onNext(), 150);
            return 100;
          }
          return next;
        });
        animationRef.current = requestAnimationFrame(updateProgress);
      } else {
        setProgress(p => {
          if (p <= 0) return 0;
          const next = p - (deltaTime / 400) * 100;
          if (next > 0) animationRef.current = requestAnimationFrame(updateProgress);
          return next > 0 ? next : 0;
        });
      }
    };
    animationRef.current = requestAnimationFrame(updateProgress);
    return () => cancelAnimationFrame(animationRef.current);
  }, [isHolding, onNext]);

  const radius = 37;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  return (
    <motion.div
      className={styles.memoryCard}
      initial={{ scale: 0.3, opacity: 0, y: 120, rotateZ: 0 }}
      animate={{ scale: 1, opacity: 1, y: 0, rotateZ: randomTilt }}
      exit={{ scale: 0.5, opacity: 0, y: -150 }}
      transition={{ duration: 0.7, ease: [0.25, 0.1, 0.25, 1] }}
    >
      <div className={styles.doorNumber}>{data.id} / 22</div>
      <div className={styles.imageContainer}>
        <img src={data.image} alt={data.title} className={styles.image} />
      </div>
      <div className={styles.textContainer}>
        <h2 className={styles.title}>{data.title}</h2>
        <p className={styles.message}>{data.message}</p>
      </div>
      <div className={styles.unlockContainer}>
        <button
          className={styles.unlockButton}
          onMouseDown={() => setIsHolding(true)}
          onMouseUp={() => setIsHolding(false)}
          onMouseLeave={() => setIsHolding(false)}
          onTouchStart={() => setIsHolding(true)}
          onTouchEnd={() => setIsHolding(false)}
          style={{ transform: isHolding ? 'scale(0.88)' : 'scale(1)' }}
        >
          <Heart size={24} fill="white" />
        </button>
        <svg className={styles.progressRing} viewBox="0 0 81 81">
          <circle
            className={styles.progressCircle}
            cx="40.5" cy="40.5" r={radius}
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
          />
        </svg>
        <div className={styles.instruction}>
          {isLast ? "HOLD FOR FINAL SURPRISE" : "HOLD TO UNLOCK NEXT"}
        </div>
      </div>
    </motion.div>
  );
}
