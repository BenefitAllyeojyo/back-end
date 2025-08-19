export default function MiniTagBtn({
  label, onClick, disabled = false
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      style={{
        display: 'flex',
        height: '20px',
        padding: '6px 8px',
        justifyContent: 'center',
        alignItems: 'center',
        gap: '4px',
        borderRadius: '12px',
        background: 'var(--color-highlight)',
        border: 'none',
        color: 'var(--neutral-light-lightest)',
        textAlign: 'center',
        fontSize: '8px',
        fontStyle: 'normal',
        fontWeight: 'var(--font-weight-body)',
        lineHeight: 'normal',
        letterSpacing: '0.4px',
        textTransform: 'uppercase',
        cursor: disabled ? 'default' : 'pointer',
        opacity: disabled ? 0.6 : 1
      }}
    >
      <span className="truncate">{label}</span>
    </button>
  )
}
