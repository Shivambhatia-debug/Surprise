import { motion } from 'framer-motion';
import confetti from 'canvas-confetti';
import styles from './Gifts.module.css';

interface GiftBoxProps {
  giftNumber: number;
  onOpen: () => void;
}

export default function GiftBox({ giftNumber, onOpen }: GiftBoxProps) {
  const handleTap = () => {
    confetti({
      particleCount: 60,
      spread: 80,
      origin: { y: 0.55 },
      colors: ['#ff1493', '#ff69b4', '#ffd700', '#fff'],
    });
    onOpen();
  };

  return (
    <motion.div
      className={styles.giftBoxArea}
      onClick={handleTap}
      initial={{ scale: 0, opacity: 0, rotate: -15 }}
      animate={{ scale: 1, opacity: 1, rotate: 0 }}
      exit={{ scale: 0.5, opacity: 0, y: 80 }}
      transition={{ type: "spring", stiffness: 180, damping: 14 }}
    >
      <div className={styles.giftBox}>
        <div className={styles.boxBody}>
          <div className={styles.ribbonV}></div>
          <div className={styles.ribbonH}></div>
        </div>
        <motion.div
          className={styles.boxLid}
          animate={{ y: [0, -6, 0], rotateZ: [0, 2, -2, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          <div className={styles.lidRibbon}></div>
        </motion.div>
      </div>
      <div className={styles.tapInstruction}>TAP TO OPEN GIFT {giftNumber}</div>
    </motion.div>
  );
}
