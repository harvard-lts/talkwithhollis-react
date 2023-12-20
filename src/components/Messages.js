import { useEffect, useRef } from 'react';
import Message from "./Message";
import styles from "./Messages.module.css";
import loadingIcon from "../styles/icons/icons8-loading.gif";

export default function Messages ({ messages, loading, serverError }) {

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
      {loading && 
        <div className={styles.loading_wrapper}>
          <img
          src={loadingIcon}
          className={styles.loading_icon}
          alt="loading spinner"
          />
          Generating AI response...
        </div>
      }
      {serverError && <div className={styles.error_wrapper}>A server error has occurred. Please refresh the browser and try again.</div>}
      <div ref={messagesEndRef} />
    </div>
  )
}
