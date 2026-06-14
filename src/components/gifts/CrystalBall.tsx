import { motion } from 'framer-motion';
import styles from './Gifts.module.css';

interface CrystalBallProps {
  giftNumber: number;
  onOpen: () => void;
}

export default function CrystalBall({ giftNumber, onOpen }: CrystalBallProps) {
  return (
    <motion.div
      className={styles.crystalArea}
      onClick={onOpen}
      initial={{ scale: 0, opacity: 0, rotate: 10 }}
      animate={{ scale: 1, opacity: 1, rotate: 0 }}
      exit={{ scale: 0.3, opacity: 0, rotate: -20 }}
      transition={{ type: "spring", stiffness: 130, damping: 14 }}
    >
      <div className={styles.crystalBall}>
        <div className={styles.crystalGlow}></div>
        <div className={styles.crystalShine}></div>
      </div>
      <div className={styles.crystalBase}></div>
      <div className={styles.tapInstruction}>TAP THE CRYSTAL {giftNumber}</div>
    </motion.div>
  );
}
