export default function LongVioletBtn({
  label, onClick, disabled = false
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      style={{
        display: 'flex',
        width: '327px',
        height: '48px',
        padding: '12px 16px',
        justifyContent: 'center',
        alignItems: 'center',
        gap: '8px',
        borderRadius: '12px',
        background: 'var(--color-highlight)',
        border: 'none',
        color: 'var(--neutral-light-lightest)',
        fontSize: '12px',
        fontStyle: 'normal',
        fontWeight: 'var(--font-weight-action)',
        lineHeight: 'normal',
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
      <span className="truncate">{label}</span>
    </button>
  )
}
