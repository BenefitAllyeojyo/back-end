import { ButtonBase } from './ButtonBase';
import { icons } from '@/Icons';

export default function LongWhiteBtn({
  label, onClick, disabled = false
}) {
  return (
    <ButtonBase
      variant="default"
      size="medium"
      onClick={onClick}
      disabled={disabled}
      style={{
        width: 'var(--button-long-width)',
        flexDirection: 'row'
      }}
    >
      <span 
        style={{
          alignSelf: 'stretch',
          flex: 1,
          textAlign: 'left'
        }}
      >
        {label}
      </span>
      <img 
        src={icons.rightArrow} 
        alt="right arrow"
        style={{
          width: '12px',
          height: '12px',
          flexShrink: 0
        }}
      />
    </ButtonBase>
  )
}
