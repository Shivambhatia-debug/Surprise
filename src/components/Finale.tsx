import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import { Heart, Gift, Download } from 'lucide-react';
import styles from './Finale.module.css';

export default function Finale() {
  const [step, setStep] = useState<'gift' | 'letter' | 'finale'>('gift');
  const [typedText, setTypedText] = useState('');

  const loveLetterText = `Dear Chululu,

If you made it this far, that means you just unwrapped 22 pieces of my heart.

I know how much your mind races sometimes. I know how hard you try, how much you care, and how deeply you feel everything. And I know that sometimes, it all gets too heavy.

But right now, in this moment, I want you to drop all that weight. You don't have to figure anything out. You don't have to be perfect. You just have to be you.

22 years ago, the universe created someone so incredibly special. Someone who brings warmth to every room she walks into, even on the days she feels cold herself.

Please remember to be gentle with yourself. Your health, your peace of mind, and your happiness are the most important things in the world to me.

Here's to 22, and to taking life one beautiful, calm breath at a time.

Happy Birthday, Chululu. You mean more to me than words on any screen could ever say. ✨

Forever yours.`;

  const downloadKeepsake = () => {
    const canvas = document.createElement('canvas');
    canvas.width = 1080;
    canvas.height = 1920;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Background gradient
    const gradient = ctx.createLinearGradient(0, 0, 0, 1920);
    gradient.addColorStop(0, '#ff9a9e');
    gradient.addColorStop(1, '#fecfef');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, 1080, 1920);

    // Decorative Border
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.4)';
    ctx.lineWidth = 15;
    ctx.strokeRect(50, 50, 980, 1820);
    ctx.lineWidth = 4;
    ctx.strokeRect(70, 70, 940, 1780);

    ctx.fillStyle = '#ffffff';
    ctx.textAlign = 'center';
    
    // Title
    ctx.font = 'bold 90px "Outfit", sans-serif';
    ctx.fillText('My Promises To You', 540, 400);
    
    // Subtitle
    ctx.font = 'italic 70px "Caveat", cursive';
    ctx.fillStyle = '#ff1493';
    ctx.fillText('Chululu, my safe space ✨', 540, 500);

    ctx.fillStyle = '#ffffff';
    const promises = [
      "I promise to be your calm",
      "when your mind is too loud.",
      "",
      "I promise to hold your hand",
      "when you're overwhelmed.",
      "",
      "I promise to always remind you",
      "to breathe and let go.",
      "",
      "You are safe. You are cherished.",
      "You are enough."
    ];

    ctx.font = '50px "Outfit", sans-serif';
    promises.forEach((p, i) => {
      ctx.fillText(p, 540, 750 + i * 70);
    });

    ctx.font = 'bold 60px "Outfit", sans-serif';
    ctx.fillText('Happy 22nd Birthday ❤️', 540, 1650);

    const link = document.createElement('a');
    link.download = 'For_Chululu_Forever.png';
    link.href = canvas.toDataURL('image/png');
    link.click();
  };

  const handleOpenGift = () => {
    confetti({
      particleCount: 100,
      spread: 100,
      origin: { y: 0.5 },
      colors: ['#ffd700', '#ff1493', '#ff69b4', '#fff'],
    });
    setStep('letter');
  };

  useEffect(() => {
    if (step === 'letter') {
      let index = 0;
      const interval = setInterval(() => {
        setTypedText(loveLetterText.substring(0, index + 1));
        index++;
        if (index === loveLetterText.length) {
          clearInterval(interval);
          setTimeout(() => setStep('finale'), 5000);
        }
      }, 40);
      return () => clearInterval(interval);
    }
  }, [step, loveLetterText]);

  useEffect(() => {
    if (step === 'finale') {
      const duration = 20 * 1000;
      const animationEnd = Date.now() + duration;
      const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 100 };

      function randomInRange(min: number, max: number) {
        return Math.random() * (max - min) + min;
      }

      const interval = setInterval(function () {
        const timeLeft = animationEnd - Date.now();
        if (timeLeft <= 0) return clearInterval(interval);

        const particleCount = 50 * (timeLeft / duration);
        confetti({
          ...defaults,
          particleCount,
          colors: ['#ff1493', '#ff69b4', '#ffd700', '#fff'],
          origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
        });
        confetti({
          ...defaults,
          particleCount,
          colors: ['#ff1493', '#ff69b4', '#ffd700', '#fff'],
          origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
        });
      }, 250);

      return () => clearInterval(interval);
    }
  }, [step]);

  return (
    <div className={styles.finaleContainer}>
      <AnimatePresence mode="wait">
        {step === 'gift' && (
          <motion.div
            key="gift"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 2, rotate: 20 }}
            transition={{ duration: 0.8 }}
            style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', cursor: 'pointer' }}
            onClick={handleOpenGift}
          >
            <motion.div
              className={styles.goldenGift}
              animate={{ y: [0, -12, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            >
              <Gift size={60} color="#ffd700" strokeWidth={1.5} />
            </motion.div>
            <div className={styles.envelopeInstruction}>The Final Gift, Chululu...</div>
          </motion.div>
        )}

        {step === 'letter' && (
          <motion.div
            key="letter"
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 1 }}
            className={styles.letterContainer}
          >
            <div className={styles.letterText}>
              {typedText.split('\n').map((line, i) => (
                <span key={i}>
                  {line}
                  <br />
                </span>
              ))}
              <motion.span
                animate={{ opacity: [1, 0] }}
                transition={{ duration: 0.5, repeat: Infinity }}
                style={{ color: 'var(--pink-glow)' }}
              >
                |
              </motion.span>
            </div>
          </motion.div>
        )}

        {step === 'finale' && (
          <motion.div
            key="finale"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 2, ease: "easeOut" }}
            style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '20px' }}
          >
            <h1 className={styles.title}>Happy 22nd Birthday</h1>
            <motion.div
              className={styles.nameTitle}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1, duration: 1.5 }}
            >
              Chululu! 💖
            </motion.div>
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <Heart size={60} color="#ff1493" fill="#ff1493" />
            </motion.div>
            
            <motion.button
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 3, duration: 1 }}
              onClick={downloadKeepsake}
              whileTap={{ scale: 0.95 }}
              style={{
                marginTop: 40,
                padding: '15px 40px',
                background: 'rgba(255, 255, 255, 0.25)',
                border: '2px solid rgba(255, 255, 255, 0.5)',
                borderRadius: 40,
                color: '#fff',
                fontSize: '1.2rem',
                fontWeight: 600,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                backdropFilter: 'blur(10px)',
                boxShadow: '0 10px 30px rgba(255, 105, 180, 0.3)'
              }}
            >
              <Download size={24} />
              Keep This Forever 📥
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
