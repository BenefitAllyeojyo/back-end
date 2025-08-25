export default function AppShell({ children }) {
  return (
    <div style={{ minHeight:'100dvh', background:'var(--color-bg)' }}>
      <div
        id="app"
        style={{
          width:'min(100vw,420px)', minWidth:320, margin:'0 auto',
          paddingInline:16, paddingBottom:'calc(16px + env(safe-area-inset-bottom))'
        }}
      >
        {children}
      </div>
    </div>
  )
}
