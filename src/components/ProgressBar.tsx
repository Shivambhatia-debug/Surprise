import styles from './ProgressBar.module.css';

interface ProgressBarProps {
  current: number;
  total: number;
  chapter: string;
}

export default function ProgressBar({ current, total, chapter }: ProgressBarProps) {
  const pct = (current / total) * 100;

  return (
    <div className={styles.progressContainer}>
      <div className={styles.progressLabel}>
        {chapter} — Gift {current} of {total}
      </div>
      <div className={styles.progressTrack}>
        <div className={styles.progressFill} style={{ width: `${pct}%` }} />
      </div>
    </div>
  );
}
