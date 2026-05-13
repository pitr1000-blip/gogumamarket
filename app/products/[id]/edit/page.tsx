import { createClient } from '@/lib/supabase/server'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { updateProduct, deleteProduct } from './actions'
import SubmitButton from './submit-button'

type Product = {
  id: string
  title: string
  description: string | null
  price: number
  image_url: string | null
  seller_name: string
  status: '판매중' | '예약중' | '판매완료'
}

export default async function EditProductPage({
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
  const updateWithId = updateProduct.bind(null, p.id)
  const deleteWithId = deleteProduct.bind(null, p.id)

  return (
    <div className="min-h-screen bg-gray-50">
      {/* 헤더 */}
      <header className="bg-white border-b border-gray-100 sticky top-0 z-10">
        <div className="max-w-2xl mx-auto px-4 h-14 flex items-center gap-3">
          <Link href={`/products/${p.id}`} className="text-gray-500 hover:text-gray-700 transition-colors">
            ← 취소
          </Link>
          <h1 className="text-base font-semibold text-gray-800">상품 수정</h1>
        </div>
      </header>

      <main className="max-w-2xl mx-auto px-4 py-6">
        <form action={updateWithId} className="flex flex-col gap-5">

          {/* 이미지 URL */}
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium text-gray-700">이미지 URL</label>
            <input
              type="url"
              name="image_url"
              defaultValue={p.image_url ?? ''}
              placeholder="https://example.com/image.jpg"
              className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400 bg-white"
            />
          </div>

          {/* 상품명 */}
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium text-gray-700">
              상품명 <span className="text-orange-500">*</span>
            </label>
            <input
              type="text"
              name="title"
              required
              defaultValue={p.title}
              className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400 bg-white"
            />
          </div>

          {/* 가격 */}
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium text-gray-700">
              가격 <span className="text-orange-500">*</span>
            </label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-sm text-gray-400">₩</span>
              <input
                type="number"
                name="price"
                required
                min="0"
                defaultValue={p.price}
                className="w-full border border-gray-200 rounded-xl pl-8 pr-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400 bg-white"
              />
            </div>
          </div>

          {/* 판매자 이름 */}
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium text-gray-700">
              판매자 이름 <span className="text-orange-500">*</span>
            </label>
            <input
              type="text"
              name="seller_name"
              required
              defaultValue={p.seller_name}
              className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400 bg-white"
            />
          </div>

          {/* 판매 상태 */}
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium text-gray-700">판매 상태</label>
            <select
              name="status"
              defaultValue={p.status}
              className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400 bg-white"
            >
              <option value="판매중">판매중</option>
              <option value="예약중">예약중</option>
              <option value="판매완료">판매완료</option>
            </select>
          </div>

          {/* 상품 설명 */}
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium text-gray-700">상품 설명</label>
            <textarea
              name="description"
              rows={5}
              defaultValue={p.description ?? ''}
              className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400 bg-white resize-none"
            />
          </div>

          <SubmitButton />
        </form>

        {/* 삭제 버튼 */}
        <form action={deleteWithId} className="mt-4">
          <button
            type="submit"
            className="w-full py-3 border border-red-200 text-red-500 hover:bg-red-50 rounded-xl text-sm font-medium transition-colors"
            onClick={(e) => {
              if (!confirm('정말 삭제하시겠습니까?')) e.preventDefault()
            }}
          >
            상품 삭제
          </button>
        </form>
      </main>
    </div>
  )
}
