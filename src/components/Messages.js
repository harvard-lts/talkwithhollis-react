import { useEffect, useRef } from 'react';
import Message from "./Message";
import styles from "./Messages.module.css";

export default function Messages ({ messages }) {

  const messagesEndRef = useRef(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages]);

  return (
    <div className={styles.messages_wrapper}>
      {messages.map((el, i) => {
        return <Message key={i} role={el.role} content={el.content} />;
      })}
      <div ref={messagesEndRef} />
    </div>
  )
}
