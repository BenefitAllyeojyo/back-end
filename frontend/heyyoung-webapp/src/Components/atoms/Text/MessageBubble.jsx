import styles from './MessageBubble.module.css'

export default function MessageBubble({
    text,
  }) {

                
    return (
      <div className={`${styles.messageBubble}`}>
            {text}
      </div>
    )
  }
  