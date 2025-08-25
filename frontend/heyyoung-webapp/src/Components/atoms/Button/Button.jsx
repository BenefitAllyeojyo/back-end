export default function Button({
  label, tone='primary', size='md', state='default',
  leadingIcon, trailingIcon, onClick
}) {
  const toneStyle = {
    primary:{ background:'var(--color-brand-500)', color:'#fff' },
    neutral:{ background:'#E5E7EB', color:'var(--color-text)' },
    danger: { background:'#E11D48', color:'#fff' }
  }[tone]
  const sizeStyle = {
    sm:{ height:36, padding:'0 12px', fontSize:14 },
    md:{ height:44, padding:'0 16px', fontSize:16 },
    lg:{ height:52, padding:'0 20px', fontSize:16 }
  }[size]
  const disabled = state==='disabled' || state==='loading'
  return (
    <button
      type="button" onClick={onClick} disabled={disabled} aria-busy={state==='loading'}
      style={{
        ...toneStyle, ...sizeStyle,
        display:'inline-flex', alignItems:'center', justifyContent:'center',
        gap:8, border:'none', borderRadius:'var(--radius-lg)', boxShadow:'var(--shadow-1)',
        cursor: disabled ? 'default' : 'pointer'
      }}
    >
      {leadingIcon ? <span aria-hidden>{leadingIcon}</span> : null}
      <span className="truncate">{state==='loading' ? '처리 중…' : label}</span>
      {trailingIcon ? <span aria-hidden>{trailingIcon}</span> : null}
    </button>
  )
}
