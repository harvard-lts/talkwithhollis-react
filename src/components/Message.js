import bot from "../styles/icons/bot.png";
import user from "../styles/icons/user.png";

import styles from "./Message.module.css";

export default function Message({ role, content }) {
  return (
    <div className={`${styles.message} ${styles[role]}`}>
      <div>
        <img
          src={role === "assistant" ? bot : user}
          className={styles.avatar}
          alt="profile avatar"
        />
      </div>
      <div>
        <p>{content}</p>
      </div>
    </div>
  );
}
