import { motion } from 'framer-motion';
import { Heart } from 'lucide-react';
import styles from './Gifts.module.css';

interface LoveLetterProps {
  giftNumber: number;
  onOpen: () => void;
}

export default function LoveLetter({ giftNumber, onOpen }: LoveLetterProps) {
  return (
    <motion.div
      className={styles.giftBoxArea}
      onClick={onOpen}
      initial={{ scale: 0, opacity: 0, rotateY: 90 }}
      animate={{ scale: 1, opacity: 1, rotateY: 0 }}
      exit={{ scale: 0.5, opacity: 0, rotateY: -90 }}
      transition={{ type: "spring", stiffness: 150, damping: 15 }}
    >
      <div className={styles.envelope}>
        <div className={styles.envelopeFlap}></div>
        <div className={styles.envelopeSeal}>
          <Heart size={22} fill="#ff1493" color="#ff1493" />
        </div>
      </div>
      <div className={styles.tapInstruction}>TAP TO READ LETTER {giftNumber}</div>
    </motion.div>
  );
}
