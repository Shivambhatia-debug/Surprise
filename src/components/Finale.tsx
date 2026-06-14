import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import { Heart, Gift, Download } from 'lucide-react';
import { playTick, playPop, playShimmer, vibrate } from '@/utils/interactions';
import styles from './Finale.module.css';

export default function Finale() {
  const [step, setStep] = useState<'gift' | 'darkRoom' | 'cake' | 'scooty'>('gift');
  const [typedText, setTypedText] = useState('');
  const [stars, setStars] = useState<{ id: number, x: number, y: number, size: number, delay: number }[]>([]);
  const textContainerRef = useRef<HTMLDivElement>(null);

  const loveLetterText = `Dear Chululu,

If you made it this far, that means you just unwrapped 22 pieces of my heart.

I know how much your mind races sometimes. I know how hard you try, how much you care, and how deeply you feel everything. And I know that sometimes, it all gets too heavy.

But right now, in this moment, I want you to drop all that weight. You don't have to figure anything out. You don't have to be perfect. You just have to be you.

22 years ago, the universe created someone so incredibly special. Someone who brings warmth to every room she walks into, even on the days she feels cold herself.

Please remember to be gentle with yourself. Your health, your peace of mind, and your happiness are the most important things in the world to me.

Here's to 22, and to taking life one beautiful, calm breath at a time.

Happy Birthday, Chululu. You mean more to me than words on any screen could ever say. ✨

Forever yours.`;

  useEffect(() => {
    // Generate stars for the night sky
    const generatedStars = Array.from({ length: 50 }).map((_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 60, // Top 60% of screen
      size: Math.random() * 3 + 1,
      delay: Math.random() * 2
    }));
    setStars(generatedStars);
  }, []);

  const downloadKeepsake = () => {
    const canvas = document.createElement('canvas');
    canvas.width = 1080;
    canvas.height = 1920;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const gradient = ctx.createLinearGradient(0, 0, 0, 1920);
    gradient.addColorStop(0, '#ff9a9e');
    gradient.addColorStop(1, '#fecfef');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, 1080, 1920);

    ctx.strokeStyle = 'rgba(255, 255, 255, 0.4)';
    ctx.lineWidth = 15;
    ctx.strokeRect(50, 50, 980, 1820);
    ctx.lineWidth = 4;
    ctx.strokeRect(70, 70, 940, 1780);

    ctx.fillStyle = '#ffffff';
    ctx.textAlign = 'center';
    
    ctx.font = 'bold 90px "Outfit", sans-serif';
    ctx.fillText('My Promises To You', 540, 400);
    
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
    vibrate(40);
    playPop();
    setStep('darkRoom');
  };

  const handleLightSwitch = () => {
    vibrate(100);
    playTick();
    setStep('cake');
  };

  const handleBlowCandle = () => {
    vibrate([50, 50, 100]);
    playShimmer();
    confetti({
      particleCount: 150,
      spread: 120,
      origin: { y: 0.6 },
      colors: ['#ffd700', '#ff1493', '#ff69b4', '#fff'],
    });
    setTimeout(() => {
      setStep('scooty');
    }, 2500);
  };

  useEffect(() => {
    if (step === 'scooty') {
      let index = 0;
      const interval = setInterval(() => {
        setTypedText(loveLetterText.substring(0, index + 1));
        index++;
        if (index === loveLetterText.length) {
          clearInterval(interval);
        }
      }, 50); // Slightly slower for the romantic ride
      return () => clearInterval(interval);
    }
  }, [step, loveLetterText]);

  useEffect(() => {
    if (textContainerRef.current) {
      textContainerRef.current.scrollTop = textContainerRef.current.scrollHeight;
    }
  }, [typedText]);

  return (
    <div className={styles.finaleContainer}>
      <AnimatePresence mode="wait">
        
        {/* PHASE 1: THE GIFT */}
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

        {/* PHASE 2: DARK ROOM */}
        {step === 'darkRoom' && (
          <motion.div
            key="darkRoom"
            className={styles.darkRoom}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
          >
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '30px' }}>
              <p style={{ color: '#fff', fontSize: '1.5rem', fontFamily: 'Caveat', letterSpacing: '2px' }}>
                It's a little dark in here...
              </p>
              <motion.div 
                className={styles.lightSwitch} 
                onClick={handleLightSwitch}
                whileTap={{ scale: 0.9 }}
              />
              <p style={{ color: '#888', fontSize: '1rem', marginTop: '10px' }}>Tap to turn on the lights</p>
            </div>
          </motion.div>
        )}

        {/* PHASE 3: THE VIRTUAL CAKE */}
        {step === 'cake' && (
          <motion.div
            key="cake"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.2 }}
            transition={{ duration: 0.8 }}
            className={styles.cakeContainer}
          >
            <h1 className={styles.title} style={{ marginBottom: '60px' }}>Happy 22nd!</h1>
            <div className={styles.cake}>
              <div className={styles.candle}>
                <div className={styles.flame} onClick={handleBlowCandle} />
              </div>
            </div>
            <motion.p 
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 2, repeat: Infinity }}
              style={{ color: '#fff', marginTop: '40px', fontSize: '1.2rem', fontWeight: 600 }}
            >
              Make a wish and tap the flame to blow it... 💨
            </motion.p>
          </motion.div>
        )}

        {/* PHASE 4: THE DREAM RIDE */}
        {step === 'scooty' && (
          <motion.div
            key="scooty"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 2 }}
            style={{ width: '100%', height: '100%' }}
          >
            {/* Night Sky Background */}
            <div className={styles.starryNight}>
              <div className={styles.starsContainer}>
                {stars.map(star => (
                  <div 
                    key={star.id} 
                    className={styles.star} 
                    style={{ 
                      left: `${star.x}%`, 
                      top: `${star.y}%`, 
                      width: star.size, 
                      height: star.size,
                      animationDelay: `${star.delay}s`
                    }} 
                  />
                ))}
              </div>
              <div className={styles.moon} />
              
              {/* Shooting Star */}
              <div className={styles.shootingStar} style={{ top: '30%', animationDelay: '2s' }} />
              <div className={styles.shootingStar} style={{ top: '10%', animationDelay: '5s' }} />
              
              {/* Cityscape Parallax */}
              <div className={styles.cityscape} />
              
              <div className={styles.road} />
              
              {/* Passing Streetlights */}
              <div className={styles.streetlight} style={{ animationDelay: '0s' }} />
              <div className={styles.streetlight} style={{ animationDelay: '1.5s' }} />
            </div>

            {/* Scooty Animation */}
            <div className={styles.scootyContainer}>
              <svg width="220" height="150" viewBox="0 0 140 80">
                {/* Wheels */}
                <circle cx="30" cy="65" r="14" fill="#111" />
                <circle cx="30" cy="65" r="8" fill="#555" />
                <circle cx="30" cy="65" r="4" fill="#ccc" />
                
                <circle cx="110" cy="65" r="14" fill="#111" />
                <circle cx="110" cy="65" r="8" fill="#555" />
                <circle cx="110" cy="65" r="4" fill="#ccc" />
                
                {/* Motorcycle Frame & Body */}
                {/* Exhaust */}
                <path d="M 30 65 L 70 65 L 75 60 L 40 60 Z" fill="#666" />
                {/* Engine Area */}
                <rect x="60" y="45" width="25" height="15" rx="3" fill="#333" />
                <rect x="62" y="47" width="21" height="11" rx="2" fill="#222" />
                {/* Chassis/Body */}
                <path d="M 30 50 C 45 40, 60 35, 80 35 C 95 35, 105 45, 110 65 L 105 55 C 95 40, 80 40, 60 45 L 30 50 Z" fill="#111" />
                {/* Fuel Tank (Cool dark blue/black) */}
                <path d="M 60 35 C 70 25, 90 25, 95 35 C 95 40, 80 45, 60 45 Z" fill="#1a365d" />
                {/* Front Fork */}
                <line x1="110" y1="65" x2="95" y2="20" stroke="#888" strokeWidth="4" strokeLinecap="round" />
                {/* Seat */}
                <path d="M 35 35 L 65 35 L 65 30 L 35 30 Z" fill="#222" />

                {/* Handlebar */}
                <line x1="95" y1="20" x2="85" y2="10" stroke="#111" strokeWidth="4" strokeLinecap="round" />

                {/* Headlight */}
                <circle cx="102" cy="25" r="5" fill="#ffd700" />
                <polygon points="107,25 125,15 125,35 107,25" fill="rgba(255,215,0,0.4)" />

                {/* Rider (Boy) */}
                <circle cx="65" cy="10" r="6" fill="#111" />
                <path d="M 65 16 C 70 25, 75 30, 65 35" fill="none" stroke="#111" strokeWidth="6" strokeLinecap="round" />
                {/* Arm reaching for handle */}
                <line x1="68" y1="20" x2="85" y2="10" stroke="#111" strokeWidth="5" strokeLinecap="round" />
                {/* Leg */}
                <line x1="65" y1="35" x2="68" y2="50" stroke="#111" strokeWidth="6" strokeLinecap="round" />
                <line x1="68" y1="50" x2="80" y2="50" stroke="#111" strokeWidth="5" strokeLinecap="round" />

                {/* Pillion (Chululu) */}
                <circle cx="45" cy="12" r="5.5" fill="#fff" />
                <line x1="45" y1="18" x2="45" y2="35" stroke="#ffb6c1" strokeWidth="5" strokeLinecap="round" />
                {/* Arm holding rider */}
                <line x1="45" y1="22" x2="65" y2="22" stroke="#ffb6c1" strokeWidth="4" strokeLinecap="round" />
                {/* Leg */}
                <line x1="45" y1="35" x2="50" y2="50" stroke="#ffb6c1" strokeWidth="5" strokeLinecap="round" />

                {/* Floating hearts behind */}
                <text x="15" y="25" fontSize="12" fill="#ff1493">♥</text>
                <text x="5" y="15" fontSize="8" fill="#ff69b4">♥</text>
              </svg>
            </div>

            {/* Floating Letter */}
            <div className={styles.floatingLetterContainer} ref={textContainerRef}>
              <div className={styles.floatingText}>
                {typedText.split('\n').map((line, i) => (
                  <span key={i}>
                    {line}
                    <br />
                  </span>
                ))}
                {typedText.length < loveLetterText.length && (
                  <motion.span
                    animate={{ opacity: [1, 0] }}
                    transition={{ duration: 0.5, repeat: Infinity }}
                    style={{ color: 'var(--pink-glow)' }}
                  >
                    |
                  </motion.span>
                )}
              </div>

              {typedText.length === loveLetterText.length && (
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1, duration: 1 }}
                  style={{ display: 'flex', justifyContent: 'center' }}
                >
                  <motion.button
                    onClick={downloadKeepsake}
                    whileTap={{ scale: 0.95 }}
                    style={{
                      marginTop: 40,
                      padding: '15px 40px',
                      background: 'rgba(255, 255, 255, 0.15)',
                      border: '2px solid rgba(255, 255, 255, 0.5)',
                      borderRadius: 40,
                      color: '#fff',
                      fontSize: '1.2rem',
                      fontWeight: 600,
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '10px',
                      backdropFilter: 'blur(5px)',
                      boxShadow: '0 10px 30px rgba(0, 0, 0, 0.3)'
                    }}
                  >
                    <Download size={24} />
                    Keep This Forever 📥
                  </motion.button>
                </motion.div>
              )}
            </div>
            
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
