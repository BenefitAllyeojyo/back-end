export default function CharacterBtn({
  imageUrl, onClick, disabled = false, alt = "캐릭터"
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      style={{
        width: '80px',
        height: '80px',
        flexShrink: 0,
        borderRadius: '50%',
        background: imageUrl 
          ? `url(${imageUrl}) lightgray 50% / cover no-repeat`
          : 'var(--color-highlight)',
        border: 'none',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        cursor: disabled ? 'default' : 'pointer',
        opacity: disabled ? 0.6 : 1,
        transition: 'transform 0.2s ease, box-shadow 0.2s ease',
        fontSize: '32px',
        color: 'white'
      }}
      onMouseDown={(e) => {
        if (!disabled) {
          e.currentTarget.style.transform = 'scale(0.95)'
        }
      }}
      onMouseUp={(e) => {
        if (!disabled) {
          e.currentTarget.style.transform = 'scale(1)'
        }
      }}
      onMouseLeave={(e) => {
        if (!disabled) {
          e.currentTarget.style.transform = 'scale(1)'
        }
      }}
    >
      {!imageUrl && '🐱'}
    </button>
  )
}