import styles from "./Input.module.css";

export default function Input({ value, onChange, onClick }) {
  console.log("Input");
  console.log(value);
  console.log(onChange);
  console.log(onClick);
  return (
    <div className={styles.wrapper}>
      <input
        className={styles.text}
        placeholder="Your prompt here..."
        value={value}
        onChange={onChange}
      />
      <button className={styles.btn} onClick={onClick}>
        Go
      </button>
    </div>
  );
}
