import { useEffect, useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchBenefits } from '@/Redux/slices/benefitsSlice'
import BenefitCard from '@/Components/molecules/CardGrp/BenefitCard'

export default function BenefitsHome(){
  const dispatch = useDispatch()
  const { items, loading, error, page } = useSelector(s => s.benefits)

  useEffect(() => {
    if (items.length === 0) dispatch(fetchBenefits(1))
  }, [dispatch, items.length])

  const loadMore = useCallback(() => {
    if (!loading) dispatch(fetchBenefits(page + 1))
  }, [dispatch, loading, page])

  return (
    <main style={{ padding:'16px 0', display:'flex', flexDirection:'column', gap:12 }}>
      <h1 style={{ margin:0, fontSize:20, fontWeight:700 }}>혜택줍줍</h1>

      {error && (
        <div style={{ padding:12, borderRadius:12, background:'#FEE2E2' }}>
          네트워크 오류 <button onClick={()=>dispatch(fetchBenefits(page))}>다시 시도</button>
        </div>
      )}

      {!items.length && loading && (
        <>
          {[...Array(3)].map((_,i)=>(
            <div key={i} style={{ height:80, borderRadius:12, background:'#E5E7EB', animation:'pulse 1.2s infinite' }}/>
          ))}
        </>
      )}

      {items.map(it=>(
        <BenefitCard key={it.id}
          title={it.title} discountText={it.discount} distanceText={it.distance}
          tags={it.tags} thumbnail={it.thumbnail} />
      ))}

      {/* 너무 단순하지만 데모용 "더 보기" */}
      <button onClick={loadMore} style={{ height:40, borderRadius:12, border:'1px solid #E5E7EB', background:'#fff' }}>
        더 보기
      </button>
    </main>
  )
}
