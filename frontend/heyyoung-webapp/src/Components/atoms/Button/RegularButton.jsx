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
        width: 'fit-content',
        height: '40px',
        padding: '12px 16px',
        justifyContent: 'center',
        alignItems: 'center',
        gap: '8px',
        borderRadius: 'var(--radius-md)',
        border: '2px solid var(--Highlight-BackGround)',
        background: 'transparent',
        color: 'var(--Highlight-BackGround)',
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
