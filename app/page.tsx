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
  '예약중': 'bg-yellow-100 text-yellow-600',
  '판매완료': 'bg-gray-100 text-gray-400',
}

export default async function HomePage() {
  const supabase = await createClient()
  const { data: products } = await supabase
    .from('products')
    .select('*')
    .order('created_at', { ascending: false })

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      {/* 상품 목록 */}
      <main className="max-w-5xl mx-auto px-4 py-6">
        <p className="text-sm text-gray-400 mb-4">
          상품 {products?.length ?? 0}개
        </p>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {products?.map((product: Product) => (
            <Link
              key={product.id}
              href={`/products/${product.id}`}
              className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow cursor-pointer block"
            >
              {/* 이미지 */}
              <div className="aspect-square bg-gray-100 relative overflow-hidden">
                {product.image_url ? (
                  <img
                    src={product.image_url}
                    alt={product.title}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-gray-300 text-4xl">
                    📦
                  </div>
                )}
                {/* 상태 뱃지 */}
                {product.status !== '판매중' && (
                  <span className={`absolute top-2 left-2 text-xs font-medium px-2 py-0.5 rounded-full ${statusStyle[product.status]}`}>
                    {product.status}
                  </span>
                )}
              </div>

              {/* 정보 */}
              <div className="p-3">
                <p className={`text-sm font-medium line-clamp-2 mb-1 ${product.status === '판매완료' ? 'text-gray-400' : 'text-gray-800'}`}>
                  {product.title}
                </p>
                <p className="text-base font-bold text-gray-900">
                  {product.status === '판매완료'
                    ? <span className="text-gray-400">판매완료</span>
                    : `₩${product.price.toLocaleString('ko-KR')}`
                  }
                </p>
                <p className="text-xs text-gray-400 mt-1">{product.seller_name}</p>
              </div>
            </Link>
          ))}
        </div>
      </main>
    </div>
  )
}
