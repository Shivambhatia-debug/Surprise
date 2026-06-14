import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { doorsData } from '@/data/doors';
import Door from './Door';
import Finale from './Finale';
import ProgressBar from './ProgressBar';
import styles from './DoorJourney.module.css';

interface DoorJourneyProps {
  onComplete?: () => void;
}

import { useEffect, useRef } from 'react';

const DreamyBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = window.innerWidth;
    let height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;

    const particles: { x: number, y: number, r: number, dx: number, dy: number, baseX: number, baseY: number }[] = [];
    const numParticles = Math.floor((width * height) / 15000); // Responsive amount of particles

    for (let i = 0; i < numParticles; i++) {
      const x = Math.random() * width;
      const y = Math.random() * height;
      particles.push({
        x, y,
        baseX: x, baseY: y,
        r: Math.random() * 2 + 1,
        dx: (Math.random() - 0.5) * 0.5,
        dy: (Math.random() - 0.5) * 0.5
      });
    }

    let mouse = { x: -1000, y: -1000 };

    const handleMouseMove = (e: MouseEvent | TouchEvent) => {
      if (e instanceof MouseEvent) {
        mouse.x = e.clientX;
        mouse.y = e.clientY;
      } else if (e.touches.length > 0) {
        mouse.x = e.touches[0].clientX;
        mouse.y = e.touches[0].clientY;
      }
    };

    const handleMouseOut = () => {
      mouse.x = -1000;
      mouse.y = -1000;
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('touchmove', handleMouseMove);
    window.addEventListener('mouseout', handleMouseOut);
    window.addEventListener('touchend', handleMouseOut);

    const handleResize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
    };
    window.addEventListener('resize', handleResize);

    let animationFrameId: number;

    const animate = () => {
      ctx.clearRect(0, 0, width, height);
      ctx.fillStyle = 'rgba(255, 105, 180, 0.6)'; // Pinkish glow
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.15)';

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        
        // Move
        p.x += p.dx;
        p.y += p.dy;

        // Bounce off edges softly
        if (p.x < 0 || p.x > width) p.dx *= -1;
        if (p.y < 0 || p.y > height) p.dy *= -1;

        // Mouse Interaction
        const dx = mouse.x - p.x;
        const dy = mouse.y - p.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        
        if (dist < 120) {
          // Repel
          const angle = Math.atan2(dy, dx);
          p.x -= Math.cos(angle) * 2;
          p.y -= Math.sin(angle) * 2;
        } else {
          // Slowly return to base path
          p.x += (p.baseX - p.x) * 0.001;
          p.y += (p.baseY - p.y) * 0.001;
        }

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fill();

        // Connect nearby particles to mouse
        if (dist < 150) {
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(mouse.x, mouse.y);
          ctx.stroke();
        }
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('touchmove', handleMouseMove);
      window.removeEventListener('mouseout', handleMouseOut);
      window.removeEventListener('touchend', handleMouseOut);
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: 0
      }}
    />
  );
};

export default function DoorJourney({ onComplete }: DoorJourneyProps) {
  const [currentStep, setCurrentStep] = useState(0);

  const handleNext = () => {
    if (currentStep < doorsData.length) {
      setCurrentStep(currentStep + 1);
    }
  };

  const showFinale = currentStep >= doorsData.length;

  return (
    <div className={styles.journeyContainer}>
      <DreamyBackground />

      {!showFinale && (
        <ProgressBar
          current={currentStep + 1}
          total={doorsData.length}
          chapter={doorsData[currentStep].chapter}
        />
      )}

      <AnimatePresence mode="wait">
        {!showFinale ? (
          <Door
            key={currentStep}
            data={doorsData[currentStep]}
            onClick={handleNext}
            isLast={currentStep === doorsData.length - 1}
          />
        ) : (
          <Finale key="finale" />
        )}
      </AnimatePresence>
    </div>
  );
}
