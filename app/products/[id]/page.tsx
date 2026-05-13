import { createClient } from '@/lib/supabase/server'
import { notFound } from 'next/navigation'
import Link from 'next/link'


type Product = {
  id: string
  title: string
  description: string | null
  price: number
  image_url: string | null
  seller_name: string
  status: '판매중' | '예약중' | '판매완료'
  created_at: string
}

const statusStyle: Record<Product['status'], string> = {
  '판매중': 'bg-orange-100 text-orange-600',
  '예약중': 'bg-yellow-100 text-yellow-600',
  '판매완료': 'bg-gray-100 text-gray-400',
}

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const supabase = await createClient()

  const { data: product } = await supabase
    .from('products')
    .select('*')
    .eq('id', id)
    .single()

  if (!product) notFound()

  const p = product as Product

  return (
    <div className="min-h-screen bg-gray-50">
      {/* 헤더 */}
      <header className="bg-white border-b border-gray-100 sticky top-0 z-10">
        <div className="max-w-2xl mx-auto px-4 h-14 flex items-center gap-3">
          <Link href="/" className="text-gray-500 hover:text-gray-700 transition-colors">
            ← 뒤로
          </Link>
          <h1 className="text-base font-semibold text-gray-800 truncate flex-1">{p.title}</h1>
          <Link href={`/products/${p.id}/edit`} className="text-sm text-gray-400 hover:text-orange-500 transition-colors">
            수정
          </Link>
        </div>
      </header>

      <main className="max-w-2xl mx-auto">
        {/* 이미지 */}
        <div className="aspect-square bg-gray-100 w-full overflow-hidden">
          {p.image_url ? (
            <img
              src={p.image_url}
              alt={p.title}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-gray-300 text-6xl">
              📦
            </div>
          )}
        </div>

        {/* 상품 정보 */}
        <div className="bg-white px-4 py-5 border-b border-gray-100">
          <div className="flex items-start justify-between gap-3">
            <div className="flex-1">
              <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${statusStyle[p.status]}`}>
                {p.status}
              </span>
              <h2 className="text-xl font-bold text-gray-900 mt-2">{p.title}</h2>
              <p className="text-2xl font-bold text-gray-900 mt-1">
                ₩{p.price.toLocaleString('ko-KR')}
              </p>
            </div>
          </div>
          <p className="text-xs text-gray-400 mt-3">
            {new Date(p.created_at).toLocaleDateString('ko-KR', {
              year: 'numeric', month: 'long', day: 'numeric',
            })} 등록
          </p>
        </div>

        {/* 판매자 정보 */}
        <div className="bg-white px-4 py-4 border-b border-gray-100 flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center text-orange-500 font-bold text-sm">
            {p.seller_name[0]}
          </div>
          <div>
            <p className="text-sm font-medium text-gray-800">{p.seller_name}</p>
            <p className="text-xs text-gray-400">판매자</p>
          </div>
        </div>

        {/* 상품 설명 */}
        <div className="bg-white px-4 py-5">
          <h3 className="text-sm font-semibold text-gray-700 mb-2">상품 설명</h3>
          <p className="text-sm text-gray-600 leading-relaxed whitespace-pre-wrap">
            {p.description ?? '상품 설명이 없습니다.'}
          </p>
        </div>

        {/* 하단 구매 버튼 */}
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 px-4 py-3">
          <div className="max-w-2xl mx-auto">
            {p.status === '판매완료' ? (
              <button disabled className="w-full py-3 bg-gray-200 text-gray-400 rounded-xl font-semibold text-sm">
                판매완료된 상품입니다
              </button>
            ) : (
              <button className="w-full py-3 bg-orange-500 hover:bg-orange-600 text-white rounded-xl font-semibold text-sm transition-colors">
                {p.status === '예약중' ? '예약 중인 상품' : '구매하기'}
              </button>
            )}
          </div>
        </div>

        {/* 하단 버튼 높이만큼 여백 */}
        <div className="h-20" />
      </main>
    </div>
  )
}
