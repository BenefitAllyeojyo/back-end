import { useState } from 'react'

export default function MiniSelectBtn({
  label, onClick, disabled = false
}) {
  const [isSelected, setIsSelected] = useState(false)

  const handleClick = () => {
    if (!disabled) {
      setIsSelected(!isSelected)
      if (onClick) onClick()
    }
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      disabled={disabled}
      style={{
        display: 'inline-flex',
        width: 'fit-content',
        padding: '6px 8px',
        justifyContent: 'center',
        alignItems: 'center',
        gap: '4px',
        borderRadius: 'var(--radius-md)',
        background: isSelected && !disabled 
          ? 'var(--color-highlight)' 
          : 'var(--color-highlight-weak)',
        border: 'none',
        color: isSelected && !disabled 
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
