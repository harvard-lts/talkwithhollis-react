import React from 'react';
import bot from '../../styles/icons/bot.png';
import user from '../../styles/icons/user.png';
import styles from '../Message/Message.module.scss';
import parse from 'html-react-parser';
import { MessageType } from '../../types/Message';

export default function Message({ role, content }: MessageType) {
  return (
    <div className={`${styles.message} ${styles[role]}`}>
      <div>
        <img
          src={role === 'assistant' ? bot : user}
          className={styles.avatar}
          alt='profile avatar'
        />
      </div>
      <div>
        <div className="message_content">{parse(content)}</div>
      </div>
    </div>
  );
}
