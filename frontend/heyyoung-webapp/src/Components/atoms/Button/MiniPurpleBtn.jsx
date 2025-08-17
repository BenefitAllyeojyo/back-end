export default function MiniPurpleBtn({
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
        height: '35px',
        padding: '11px 5px',
        justifyContent: 'center',
        alignItems: 'center',
        gap: '10px',
        borderRadius: '5px',
        background: 'var(--button-violet)',
        border: 'none',
        color: 'var(--support-success-dark)',
        textAlign: 'center',
        fontSize: 'var(--font-size-s)',
        fontStyle: 'normal',
        fontWeight: 'var(--font-weight-body)',
        lineHeight: '16px',
        letterSpacing: '0.12px',
        cursor: disabled ? 'default' : 'pointer',
        opacity: disabled ? 0.6 : 1,
        flexShrink: 0,
        flex: 'none'
      }}
    >
      <span className="truncate">{label}</span>
    </button>
  )
}
