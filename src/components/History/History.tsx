import React from 'react';
import styles from './History.module.scss';

interface HistoryProps {
  onClick: () => void;
  content: string;
}

export default function History({ content, onClick }: HistoryProps) {
  return (
    <div className={styles.wrapper} onClick={onClick}>
      <div className={styles.message_content}>{content.substring(0, 15)}...</div>
    </div>
  );
}
