import { motion } from 'framer-motion';
import confetti from 'canvas-confetti';
import styles from './Gifts.module.css';

interface BalloonPopProps {
  giftNumber: number;
  onOpen: () => void;
}

export default function BalloonPop({ giftNumber, onOpen }: BalloonPopProps) {
  const handlePop = () => {
    // Pop confetti in pink shards
    confetti({
      particleCount: 40,
      spread: 100,
      origin: { y: 0.4 },
      colors: ['#ff1493', '#ff69b4', '#ffd700', '#fff'],
      shapes: ['circle'],
      gravity: 1.5,
    });
    onOpen();
  };

  return (
    <motion.div
      className={styles.balloonArea}
      onClick={handlePop}
      initial={{ scale: 0, opacity: 0, y: 200 }}
      animate={{ scale: 1, opacity: 1, y: 0 }}
      exit={{ scale: 2, opacity: 0 }}
      transition={{ type: "spring", stiffness: 120, damping: 12, duration: 0.8 }}
    >
      <div className={styles.balloon}>
        <div className={styles.balloonShine}></div>
      </div>
      <div className={styles.tapInstruction} style={{ marginTop: '80px' }}>
        TAP TO POP BALLOON {giftNumber}
      </div>
    </motion.div>
  );
}
