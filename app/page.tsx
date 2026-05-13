import { createClient } from '@/lib/supabase/server'
import Link from 'next/link'
import Header from '@/components/header'

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
  '예약중': 'bg-yellow-100 text-yellow-700',
  '판매완료': 'bg-gray-100 text-gray-400',
}

export default async function HomePage() {
  const supabase = await createClient()
  const { data: products } = await supabase
    .from('products')
    .select('*')
    .order('created_at', { ascending: false })

  const available = products?.filter(p => p.status === '판매중').length ?? 0

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      {/* 히어로 배너 */}
      <section className="bg-gradient-to-br from-orange-400 to-orange-600 text-white">
        <div className="max-w-5xl mx-auto px-4 py-12 flex flex-col items-center text-center gap-4">
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight">
            따뜻한 중고거래, 고구마마켓 🍠
          </h1>
          <p className="text-orange-100 text-sm sm:text-base max-w-md">
            믿을 수 있는 이웃과 함께하는 중고 직거래 플랫폼
          </p>
          <div className="flex gap-3 mt-2">
            <Link
              href="/products/new"
              className="bg-white text-orange-500 font-semibold text-sm px-5 py-2.5 rounded-full hover:bg-orange-50 transition-colors"
            >
              상품 등록하기
            </Link>
            <a
              href="#products"
              className="border border-white/50 text-white font-semibold text-sm px-5 py-2.5 rounded-full hover:bg-white/10 transition-colors"
            >
              구경하기
            </a>
          </div>
          <div className="flex items-center gap-2 mt-4 bg-white/15 px-4 py-2 rounded-full">
            <div className="w-6 h-6 rounded-full bg-white/30 flex items-center justify-center text-xs font-bold">J</div>
            <span className="text-white/90 text-xs">운영자 <span className="font-semibold">JW. Kim</span></span>
          </div>
        </div>
      </section>

      {/* 상품 목록 */}
      <main id="products" className="max-w-5xl mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-5">
          <div>
            <h2 className="text-lg font-bold text-gray-800">전체 상품</h2>
            <p className="text-xs text-gray-400 mt-0.5">판매중 {available}개 · 전체 {products?.length ?? 0}개</p>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {products?.map((product: Product) => (
            <Link
              key={product.id}
              href={`/products/${product.id}`}
              className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-200"
            >
              {/* 이미지 */}
              <div className="aspect-square bg-gray-100 relative overflow-hidden">
                {product.image_url ? (
                  <img
                    src={product.image_url}
                    alt={product.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-gray-300 text-4xl">
                    📦
                  </div>
                )}
                {product.status !== '판매중' && (
                  <span className={`absolute top-2 left-2 text-xs font-semibold px-2 py-0.5 rounded-full ${statusStyle[product.status]}`}>
                    {product.status}
                  </span>
                )}
                {product.status === '판매완료' && (
                  <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                    <span className="text-white font-bold text-sm">판매완료</span>
                  </div>
                )}
              </div>

              {/* 정보 */}
              <div className="p-3">
                <p className={`text-sm font-medium line-clamp-2 mb-1.5 leading-snug ${product.status === '판매완료' ? 'text-gray-400' : 'text-gray-800'}`}>
                  {product.title}
                </p>
                {product.status === '판매완료' ? (
                  <p className="text-sm font-bold text-gray-300">판매완료</p>
                ) : (
                  <p className="text-base font-bold text-gray-900">
                    ₩{product.price.toLocaleString('ko-KR')}
                  </p>
                )}
                <div className="flex items-center gap-1 mt-1.5">
                  <div className="w-4 h-4 rounded-full bg-orange-100 flex items-center justify-center text-[10px]">
                    👤
                  </div>
                  <p className="text-xs text-gray-400">{product.seller_name}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {products?.length === 0 && (
          <div className="text-center py-20 text-gray-400">
            <p className="text-4xl mb-3">🍠</p>
            <p className="text-sm">아직 등록된 상품이 없어요</p>
          </div>
        )}
      </main>
    </div>
  )
}
