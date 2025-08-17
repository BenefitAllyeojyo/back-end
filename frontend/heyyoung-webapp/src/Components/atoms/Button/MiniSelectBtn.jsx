import { useState } from 'react'

export default function MiniSelectBtn({
  label, onClick, disabled = false
}) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        display: 'flex',
        padding: '6px 8px',
        justifyContent: 'center',
        alignItems: 'center',
        gap: '4px',
        borderRadius: '12px',
        background: isHovered && !disabled 
          ? 'var(--color-highlight)' 
          : 'var(--color-highlight-weak)',
        border: 'none',
        color: isHovered && !disabled 
          ? 'var(--neutral-light-lightest)' 
          : 'var(--color-highlight)',
        textAlign: 'center',
        fontSize: '10px',
        fontStyle: 'normal',
        fontWeight: 'var(--font-weight-action)',
        lineHeight: 'normal',
        letterSpacing: '0.5px',
        textTransform: 'uppercase',
        cursor: disabled ? 'default' : 'pointer',
        opacity: disabled ? 0.6 : 1,
        transition: 'all 0.2s ease'
      }}
    >
      <span className="truncate">{label}</span>
    </button>
  )
}
