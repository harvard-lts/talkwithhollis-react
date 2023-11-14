import styles from "./Input.module.css";
import send from "../styles/icons/send.png";

export default function Input({ value, onChange, onClick }) {
  return (
    <div className={styles.wrapper}>
      <input
        id="message"
        className={styles.form__input}
        placeholder="Type your message here..."
        value={value}
        onChange={onChange}
      />
      <label htmlFor="message" className={styles.form__label}></label>
      <button className={styles.button} onClick={onClick}>
        <img src={send} width="25" height="25" alt="send" />
      </button>
    </div>
  );
}