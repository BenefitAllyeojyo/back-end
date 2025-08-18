export default function BackgroundImage({ 
  src, 
  alt = "배경 이미지", 
  children,
  overlayOpacity = 0 
}) {
  return (
    <div 
      style={{
        position: 'relative',
        width: '375px',
        height: '812px',
        margin: '0 auto',
        overflow: 'hidden'
      }}
    >
      {/* 배경 이미지 */}
      <img 
        src={src}
        alt={alt}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          objectFit: 'contain',
          objectPosition: 'center',
          zIndex: -1
        }}
      />
      
      {/* 오버레이 (필요시) */}
      {overlayOpacity > 0 && (
        <div 
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundColor: `rgba(0, 0, 0, ${overlayOpacity})`,
            zIndex: 0
          }}
        />
      )}
      
      {/* 컨텐츠 */}
      <div 
        style={{
          position: 'relative',
          zIndex: 1,
          width: '100%',
          height: '100%'
        }}
      >
        {children}
      </div>
    </div>
  )
}
