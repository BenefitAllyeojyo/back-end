import Button from '@/Components/atoms/Button/Button'
import CharacterBtn from '@/Components/atoms/Button/CharacterBtn'
import LongVioletBtn from '@/Components/atoms/Button/LongVioletBtn'
import BigCardBtn from '@/Components/atoms/Button/BigCardBtn'
import LongPurpleBtn from '@/Components/atoms/Button/LongPurpleBtn'
import LongWhiteBtn from '@/Components/atoms/Button/LongWhiteBtn'
import MiniBlueBtn from '@/Components/atoms/Button/MiniBlueBtn'
import MiniPurpleBtn from '@/Components/atoms/Button/MiniPurpleBtn'
import MiniSelectBtn from '@/Components/atoms/Button/MiniSelectBtn'
import MiniTagBtn from '@/Components/atoms/Button/MiniTagBtn'
import RegularButton from '@/Components/atoms/Button/RegularButton'
import SearchBtn from '@/Components/atoms/Button/SearchBtn'
import SquareWhiteBtn from '@/Components/atoms/Button/SquareWhiteBtn'
import { Carousel } from '@/Components/molecules/Carousel'

export default function ButtonExamplePage() {
  const handleClick = (buttonName) => {
    console.log(`${buttonName} 클릭됨!`)
  }

  // 카루셀 테스트용 데이터
  const carouselSlides = [
    {
      image: '/src/assets/images/carousel/carousel1.png',
    },
    {
      image: '/src/assets/images/carousel/carousel2.png',
    },
    {
      image: '/src/assets/images/carousel/carousel3.png',
    }
  ]

  return (
    <div style={{ 
      padding: '20px', 
      maxWidth: '800px', 
      margin: '0 auto',
      background: 'var(--neutral-light-lightest)',
      minHeight: '100vh',
      overflowY: 'auto'  // 세로 스크롤 추가
    }}>
      <h1 style={{ 
        color: 'var(--neutral-dark-darkest)', 
        marginBottom: '30px',
        textAlign: 'center'
      }}>
        버튼 컴포넌트 예제
      </h1>

      {/* Carousel Component */}
      <section style={{ marginBottom: '40px' }}>
        <h2 style={{ color: 'var(--neutral-dark-darkest)', marginBottom: '20px' }}>
          카루셀 컴포넌트 (Carousel)
        </h2>
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <Carousel slides={carouselSlides} />
        </div>
      </section>

      {/* Basic Button */}
      <section style={{ marginBottom: '40px' }}>
        <h2 style={{ color: 'var(--neutral-dark-darkest)', marginBottom: '20px' }}>
          기본 버튼 (Button)
        </h2>
        <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', alignItems: 'center' }}>
          <Button 
            label="Primary Small" 
            tone="primary" 
            size="sm" 
            onClick={() => handleClick('Primary Small')} 
          />
          <Button 
            label="Primary Medium" 
            tone="primary" 
            size="md" 
            onClick={() => handleClick('Primary Medium')} 
          />
          <Button 
            label="Primary Large" 
            tone="primary" 
            size="lg" 
            onClick={() => handleClick('Primary Large')} 
          />
          <Button 
            label="Neutral" 
            tone="neutral" 
            onClick={() => handleClick('Neutral')} 
          />
          <Button 
            label="Danger" 
            tone="danger" 
            onClick={() => handleClick('Danger')} 
          />
          <Button 
            label="Loading..." 
            state="loading" 
            onClick={() => handleClick('Loading')} 
          />
          <Button 
            label="Disabled" 
            state="disabled" 
            onClick={() => handleClick('Disabled')} 
          />
        </div>
      </section>

      {/* Character Button */}
      <section style={{ marginBottom: '40px' }}>
        <h2 style={{ color: 'var(--neutral-dark-darkest)', marginBottom: '20px' }}>
          캐릭터 버튼 (CharacterBtn)
        </h2>
        <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', alignItems: 'center' }}>
          <CharacterBtn 
            onClick={() => handleClick('Character Default')} 
          />
          <CharacterBtn 
            imageUrl="/src/assets/images/character/PLI_Face.png"
            onClick={() => handleClick('Character With Image')} 
          />
          <CharacterBtn 
            disabled 
            onClick={() => handleClick('Character Disabled')} 
          />
        </div>
      </section>

      {/* Long Buttons */}
      <section style={{ marginBottom: '40px' }}>
        <h2 style={{ color: 'var(--neutral-dark-darkest)', marginBottom: '20px' }}>
          긴 버튼들 (Long Buttons)
        </h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', alignItems: 'center' }}>
          <LongVioletBtn 
            label="Long Violet Button" 
            onClick={() => handleClick('Long Violet')} 
          />
          <LongPurpleBtn 
            label="Long Purple Button" 
            onClick={() => handleClick('Long Purple')} 
          />
          <LongWhiteBtn 
            label="Long White Button" 
            onClick={() => handleClick('Long White')} 
          />
        </div>
      </section>

      {/* Big Card Button */}
      <section style={{ marginBottom: '40px' }}>
        <h2 style={{ color: 'var(--neutral-dark-darkest)', marginBottom: '20px' }}>
          카드 버튼 (BigCardBtn)
        </h2>
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <BigCardBtn 
            title="카드 버튼 제목"
            subtitle="이것은 카드 버튼의 부제목입니다"
            distance="500m"
            onClick={() => handleClick('Big Card')} 
          />
        </div>
      </section>

      {/* Mini Buttons */}
      <section style={{ marginBottom: '40px' }}>
        <h2 style={{ color: 'var(--neutral-dark-darkest)', marginBottom: '20px' }}>
          미니 버튼들 (Mini Buttons)
        </h2>
        <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', alignItems: 'center' }}>
          <MiniBlueBtn 
            label="Mini Blue" 
            onClick={() => handleClick('Mini Blue')} 
          />
          <MiniPurpleBtn 
            label="Mini Purple" 
            onClick={() => handleClick('Mini Purple')} 
          />
          <MiniSelectBtn 
            label="Mini Select" 
            onClick={() => handleClick('Mini Select')} 
          />
          <MiniTagBtn 
            label="TAG" 
            onClick={() => handleClick('Mini Tag')} 
          />
        </div>
      </section>

      {/* Other Buttons */}
      <section style={{ marginBottom: '40px' }}>
        <h2 style={{ color: 'var(--neutral-dark-darkest)', marginBottom: '20px' }}>
          기타 버튼들 (Other Buttons)
        </h2>
        <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', alignItems: 'center' }}>
          <RegularButton 
            label="Regular Button" 
            onClick={() => handleClick('Regular')} 
          />
          <SearchBtn 
            onClick={() => handleClick('Search')} 
          />
        </div>
      </section>

      {/* Square White Button */}
      <section style={{ marginBottom: '40px' }}>
        <h2 style={{ color: 'var(--neutral-dark-darkest)', marginBottom: '20px' }}>
          사각 화이트 버튼 (SquareWhiteBtn)
        </h2>
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <SquareWhiteBtn 
            label="Square White Button" 
            onClick={() => handleClick('Square White')} 
          />
        </div>
      </section>

      {/* Disabled Examples */}
      <section style={{ marginBottom: '40px' }}>
        <h2 style={{ color: 'var(--neutral-dark-darkest)', marginBottom: '20px' }}>
          비활성화된 버튼들 (Disabled)
        </h2>
        <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', alignItems: 'center' }}>
          <LongVioletBtn 
            label="Disabled Violet" 
            disabled 
            onClick={() => handleClick('Disabled Violet')} 
          />
          <MiniBlueBtn 
            label="Disabled Mini" 
            disabled 
            onClick={() => handleClick('Disabled Mini')} 
          />
          <RegularButton 
            label="Disabled Regular" 
            disabled 
            onClick={() => handleClick('Disabled Regular')} 
          />
        </div>
      </section>

      <div style={{ 
        marginTop: '40px', 
        padding: '20px', 
        background: 'var(--neutral-light-light)', 
        borderRadius: '12px',
        textAlign: 'center'
      }}>
        <p style={{ color: 'var(--neutral-dark-light)', margin: 0 }}>
          💡 개발자 도구 콘솔을 열어 버튼 클릭 이벤트를 확인하세요!
        </p>
      </div>
    </div>
  )
}