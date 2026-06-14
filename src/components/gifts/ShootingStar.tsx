import { motion } from 'framer-motion';
import confetti from 'canvas-confetti';
import styles from './Gifts.module.css';

interface ShootingStarProps {
  giftNumber: number;
  onOpen: () => void;
}

export default function ShootingStar({ giftNumber, onOpen }: ShootingStarProps) {
  const handleCatch = () => {
    confetti({
      particleCount: 70,
      spread: 360,
      origin: { x: 0.5, y: 0.45 },
      colors: ['#ffd700', '#fff', '#ff69b4'],
      startVelocity: 25,
    });
    onOpen();
  };

  return (
    <motion.div
      className={styles.starArea}
      onClick={handleCatch}
      initial={{ x: 300, y: -200, opacity: 0, scale: 0.3 }}
      animate={{ x: 0, y: 0, opacity: 1, scale: 1 }}
      exit={{ scale: 3, opacity: 0 }}
      transition={{ type: "spring", stiffness: 100, damping: 12 }}
    >
      <div style={{ position: 'relative' }}>
        <div className={styles.star}>⭐</div>
        <motion.div
          className={styles.starTrail}
          animate={{ opacity: [0.3, 0.8, 0.3], width: [80, 150, 80] }}
          transition={{ duration: 2, repeat: Infinity }}
        />
      </div>
      <div className={styles.tapInstruction}>TAP TO CATCH STAR {giftNumber}</div>
    </motion.div>
  );
}
