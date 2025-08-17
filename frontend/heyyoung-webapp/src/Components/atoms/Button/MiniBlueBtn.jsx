export default function MiniBlueBtn({
  label, onClick, disabled = false
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      style={{
        display: 'inline-flex',
        width: 'fit-content',
        minWidth: '65px',
        padding: '11px 5px',
        justifyContent: 'center',
        alignItems: 'center',
        gap: '10px',
        borderRadius: '10px',
        background: 'var(--support-success-light)',
        border: 'none',
        color: 'var(--support-success-dark)',
        textAlign: 'center',
        fontSize: 'var(--font-size-s)',
        fontStyle: 'normal',
        fontWeight: 'var(--font-weight-body)',
        lineHeight: '16px',
        letterSpacing: '0.12px',
        cursor: disabled ? 'default' : 'pointer',
        opacity: disabled ? 0.6 : 1
      }}
    >
      <span className="truncate">{label}</span>
    </button>
  )
}
