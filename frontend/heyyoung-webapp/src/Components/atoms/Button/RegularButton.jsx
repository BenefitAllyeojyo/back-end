export default function RegularButton({
  label, onClick, disabled = false
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      style={{
        display: 'flex',
        height: '40px',
        padding: '12px 16px',
        justifyContent: 'center',
        alignItems: 'center',
        gap: '8px',
        borderRadius: '12px',
        border: '1.5px solid var(--color-highlight)',
        background: 'transparent',
        color: 'var(--color-highlight)',
        fontSize: '12px',
        fontStyle: 'normal',
        fontWeight: 'var(--font-weight-action)',
        lineHeight: 'normal',
        cursor: disabled ? 'default' : 'pointer',
        opacity: disabled ? 0.6 : 1
      }}
    >
      <span className="truncate">{label}</span>
    </button>
  )
}
