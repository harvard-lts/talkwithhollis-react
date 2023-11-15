import styles from "./Input.module.css";
import send from "../styles/icons/send.png";

export default function Input({ value, onChange, onClick }) {
  return (
    <div className={styles.form_wrapper}>
      <input
        id="message"
        className={styles.form_input}
        placeholder="Type your message here..."
        value={value}
        onChange={onChange}
      />
      <button className={styles.button} onClick={onClick}>
        <img src={send} width="25" height="25" alt="send" />
      </button>
    </div>
  );
}