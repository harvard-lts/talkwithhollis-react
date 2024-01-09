import React from 'react';
import { useEffect, useRef } from 'react';
import Message from './../Message/Message';
import styles from './Messages.module.scss';
import loadingIcon from '../../styles/icons/icons8-loading.gif';
import { MessageType } from '../../types/Message';

export interface MessagesProps { 
  messages: MessageType[];
  loading: boolean;
  serverError: boolean;
}

export default function Messages ({ messages, loading, serverError }: MessagesProps) {

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages]);

  return (
    <div className={styles.messages_wrapper}>
      {messages.map((el, i) => {
        return <Message key={i} role={el.role} content={el.content} />;
      })}
      {loading && 
        <div className={styles.loading_wrapper}>
          <img
          src={loadingIcon}
          className={styles.loading_icon}
          alt='loading spinner'
          />
          Generating AI response...
        </div>
      }
      {serverError && <div className={styles.error_wrapper}>A server error has occurred. Please refresh the browser and try again.</div>}
      <div ref={messagesEndRef} />
    </div>
  )
}
