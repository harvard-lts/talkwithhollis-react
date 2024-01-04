import React from 'react';
import styles from './Clear.module.scss';

interface ClearProps {
  onClick: () => void;
}

export default function Clear({ onClick }: ClearProps) {
  return (
    <button className={styles.wrapper} onClick={onClick}>
      Clear
    </button>
  );
}
