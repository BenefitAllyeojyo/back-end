import { icons } from '@/Icons';

export default function BigCardBtn({
  title, subtitle, distance, onClick, disabled = false
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      style={{
        display: 'flex',
        width: '344px',
        height: '131px',
        alignItems: 'center',
        borderRadius: '16px',
        background: 'var(--neutral-light-lightest)',
        backdropFilter: 'blur(2px)',
        border: 'none',
        padding: '24px',
        cursor: disabled ? 'default' : 'pointer',
        opacity: disabled ? 0.6 : 1,
        transition: 'transform 0.2s ease, box-shadow 0.2s ease',
        textAlign: 'left'
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
      <div style={{ 
        alignSelf: 'stretch', 
        display: 'flex', 
        flexDirection: 'column', 
        justifyContent: 'center',
        flex: 1
      }}>
        <h3 style={{
          margin: 0,
          alignSelf: 'stretch',
          color: 'var(--neutral-dark-darkest)',
          fontSize: 'var(--font-size-h4)',
          fontStyle: 'normal',
          fontWeight: 'var(--font-weight-heading)',
          lineHeight: 'normal',
          marginBottom: '8px'
        }}>
          {title}
        </h3>
        
        <div style={{
          alignSelf: 'stretch',
          color: 'var(--neutral-dark-light)',
          fontSize: 'var(--font-size-s)',
          fontStyle: 'normal',
          fontWeight: 'var(--font-weight-body)',
          lineHeight: '16px',
          letterSpacing: '0.12px'
        }}>
          <p style={{ margin: 0, marginBottom: '4px' }}>{subtitle}</p>
          <p style={{ margin: 0 }}>{distance}</p>
        </div>
      </div>
      
      <img 
        src={icons.rightArrow} 
        alt="right arrow"
        style={{ 
          flexShrink: 0, 
          marginLeft: '16px',
          width: '12px',
          height: '12px'
        }}
      />
    </button>
  )
}
