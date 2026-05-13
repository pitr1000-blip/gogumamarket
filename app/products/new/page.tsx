import Link from 'next/link'
import { createProduct } from './actions'
import SubmitButton from './submit-button'

export default function NewProductPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* 헤더 */}
      <header className="bg-white border-b border-gray-100 sticky top-0 z-10">
        <div className="max-w-2xl mx-auto px-4 h-14 flex items-center gap-3">
          <Link href="/" className="text-gray-500 hover:text-gray-700 transition-colors">
            ← 취소
          </Link>
          <h1 className="text-base font-semibold text-gray-800">상품 등록</h1>
        </div>
      </header>

      <main className="max-w-2xl mx-auto px-4 py-6">
        <form action={createProduct} className="flex flex-col gap-5">

          {/* 이미지 URL */}
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium text-gray-700">이미지 URL</label>
            <input
              type="url"
              name="image_url"
              placeholder="https://example.com/image.jpg"
              className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400 bg-white"
            />
            <p className="text-xs text-gray-400">이미지 URL을 입력하면 썸네일이 표시됩니다 (선택)</p>
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
              placeholder="상품명을 입력하세요"
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
                placeholder="0"
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
              placeholder="닉네임을 입력하세요"
              className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400 bg-white"
            />
          </div>

          {/* 상품 설명 */}
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium text-gray-700">상품 설명</label>
            <textarea
              name="description"
              rows={5}
              placeholder="상품 상태, 구매 시기, 사용감 등을 자세히 적어주세요"
              className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400 bg-white resize-none"
            />
          </div>

          <SubmitButton />
        </form>
      </main>
    </div>
  )
}
