export default function SquareWhiteBtn({
  label, onClick, disabled = false
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      style={{
        display: 'flex',
        width: '166px',
        padding: '16px',
        flexDirection: 'column',
        alignItems: 'flex-start',
        gap: '8px',
        borderRadius: '16px',
        background: 'var(--neutral-light-lightest)',
        boxShadow: '0 2px 4px 0 rgba(0, 0, 0, 0.10)',
        border: 'none',
        cursor: disabled ? 'default' : 'pointer',
        opacity: disabled ? 0.6 : 1,
        transition: 'transform 0.2s ease, box-shadow 0.2s ease'
      }}
      onMouseDown={(e) => {
        if (!disabled) {
          e.currentTarget.style.transform = 'scale(0.98)'
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
      <span 
        style={{
          alignSelf: 'stretch',
          color: 'var(--neutral-dark-darkest)',
          fontSize: 'var(--font-size-h4)',
          fontStyle: 'normal',
          fontWeight: 'var(--font-weight-heading)',
          lineHeight: 'normal',
          textAlign: 'left'
        }}
      >
        {label}
      </span>
    </button>
  )
}
