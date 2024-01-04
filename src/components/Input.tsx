import React from 'react';
import styles from './Input.module.scss';
import send from '../styles/icons/send.png';

interface InputProps {
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onClick?: () => void;
  disabled?: boolean;
}

export default function Input({ value, onChange, onClick, disabled }: InputProps) {
  return (
    <div className={styles.form_wrapper}>
      <input
        className={styles.form_input}
        placeholder="Type your message here..."
        value={value}
        onChange={onChange}
        aria-label="Type your message here"
        onKeyDown={e => {
          if(e.key === 'Enter' && onClick) {
            onClick();
          }
        }}
        disabled={disabled}
      />
      <button className={styles.button} onClick={onClick} aria-label="Send message" disabled={disabled}>
        <img src={send} width="25" height="25" alt="send" />
      </button>
    </div>
  );
}
