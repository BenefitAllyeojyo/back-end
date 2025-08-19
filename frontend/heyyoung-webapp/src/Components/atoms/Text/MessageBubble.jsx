import './MessageBubble.css'

export default function MessageBubble({
    text,
    type = 'user'
  }) {

                
    return (
      <div className={`message-bubble ${type}`}>
            {text}
      </div>
    )
  }
  