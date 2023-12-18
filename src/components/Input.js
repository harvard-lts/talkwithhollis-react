import styles from "./Input.module.css";
import send from "../styles/icons/send.png";

export default function Input({ value, onChange, onClick, disabled }) {
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