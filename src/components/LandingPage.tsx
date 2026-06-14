import { useState, useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { Sparkles } from 'lucide-react';
import styles from './LandingPage.module.css';

interface LandingPageProps {
  onStart: () => void;
}

export default function LandingPage({ onStart }: LandingPageProps) {
  const [isZooming, setIsZooming] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [particles, setParticles] = useState<{ id: number; startX: number; startY: number; rotation: number; size: number; duration: number; delay: number }[]>([]);

  useEffect(() => {
    // Generate wind streaks being sucked *into* the center portal
    const newParticles = Array.from({ length: 120 }).map((_, i) => {
      const angle = Math.random() * Math.PI * 2;
      const distance = Math.random() * 80 + 50; // Starts 50vw to 130vw away
      const startX = Math.cos(angle) * distance;
      const startY = Math.sin(angle) * distance;
      const rotation = angle * (180 / Math.PI); // Aligns streak with the radius
      
      return {
        id: i,
        startX,
        startY,
        rotation,
        size: Math.random() * 40 + 20, // length of the streak
        duration: Math.random() * 1.2 + 0.5, // fast suction: 0.5 to 1.7 seconds
        delay: Math.random() * 2,
      };
    });
    setParticles(newParticles);
  }, []);

  const handleMouseMove = (e: React.MouseEvent) => {
    // Calculate normalized mouse position from center (-1 to 1)
    const x = (e.clientX / window.innerWidth) * 2 - 1;
    const y = (e.clientY / window.innerHeight) * 2 - 1;
    setMousePosition({ x, y });
  };

  const handleStart = () => {
    if (isZooming) return;
    setIsZooming(true);
    setTimeout(() => {
      onStart();
    }, 1000);
  };

  // Title words for sequential animation
  const titleWords = "Chululu, A Special Journey Awaits...".split(" ");

  return (
    <motion.div 
      className={styles.landingContainer}
      onMouseMove={handleMouseMove}
      animate={{ opacity: isZooming ? 0 : 1 }}
      transition={{ duration: 0.8, delay: 0.2 }}
    >
      {/* The wind container was moved inside portalWrapper */}

      <motion.div 
        className={styles.titleContainer}
        animate={{ opacity: isZooming ? 0 : 1, y: isZooming ? -50 : 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className={styles.title}>
          {titleWords.map((word, i) => (
            <motion.span
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 + i * 0.2, duration: 0.8 }}
              style={{ display: "inline-block", marginRight: "10px" }}
            >
              {word}
            </motion.span>
          ))}
        </h1>
        <motion.p 
          className={styles.subtitle}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2, duration: 1 }}
        >
          Tap the portal to unwrap 22 surprises just for you 💖
        </motion.p>
      </motion.div>

      <motion.div 
        className={styles.portalWrapper}
        onClick={handleStart}
        animate={isZooming ? { scale: 30, opacity: 0 } : { 
          scale: 1, 
          opacity: 1,
          x: mousePosition.x * 20, // Parallax effect
          y: mousePosition.y * 20, // Parallax effect
          rotateX: mousePosition.y * -10,
          rotateY: mousePosition.x * 10
        }}
        transition={isZooming ? { duration: 1.2, ease: "easeInOut" } : { type: "spring", stiffness: 50, damping: 20 }}
        style={{ perspective: 1000 }}
      >
        {/* Wind Sucked Into Portal */}
        <div className={styles.windContainer}>
          {particles.map((p) => (
            <motion.div
              key={p.id}
              className={styles.windStreak}
              style={{
                width: p.size,
                rotate: p.rotation,
              }}
              initial={{ x: `${p.startX}vw`, y: `${p.startY}vw`, opacity: 0, scale: 1 }}
              animate={{ 
                x: 0, 
                y: 0, 
                opacity: [0, 1, 0],
                scale: [1, 1, 0] // Shrinks into nothing as it enters the portal
              }}
              transition={{
                duration: p.duration,
                delay: p.delay,
                repeat: Infinity,
                ease: "easeIn" // Accelerates as it gets sucked in
              }}
            />
          ))}
        </div>

        <div className={`${styles.portalRing} ${styles.ring1}`}></div>
        <div className={`${styles.portalRing} ${styles.ring2}`}></div>
        <div className={`${styles.portalRing} ${styles.ring3}`}></div>
        
        <div className={styles.portalCenter}>
          <div className={styles.beginText}>
            <Sparkles size={24} color="var(--pink-glow)" />
            Enter
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
