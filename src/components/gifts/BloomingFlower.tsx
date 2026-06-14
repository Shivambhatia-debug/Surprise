import { motion } from 'framer-motion';
import styles from './Gifts.module.css';

interface BloomingFlowerProps {
  giftNumber: number;
  onOpen: () => void;
}

export default function BloomingFlower({ giftNumber, onOpen }: BloomingFlowerProps) {
  const petals = Array.from({ length: 8 });

  return (
    <motion.div
      className={styles.flowerArea}
      onClick={onOpen}
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      exit={{ scale: 0.5, opacity: 0, y: -100 }}
      transition={{ type: "spring", stiffness: 120, damping: 12 }}
    >
      <div className={styles.flowerBud}>
        <div className={styles.petalGroup}>
          {petals.map((_, i) => (
            <motion.div
              key={i}
              className={styles.petal}
              style={{
                transform: `translate(-50%, -100%) rotate(${i * 45}deg)`,
              }}
              animate={{
                scale: [0.6, 1, 0.6],
              }}
              transition={{
                duration: 3,
                delay: i * 0.15,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          ))}
          <div className={styles.flowerCenter}></div>
        </div>
      </div>
      <div className={styles.flowerStem}></div>
      <div className={styles.tapInstruction}>TAP THE FLOWER {giftNumber}</div>
    </motion.div>
  );
}
