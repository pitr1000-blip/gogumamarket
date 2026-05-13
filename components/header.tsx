import { createClient } from '@/lib/supabase/server'
import Link from 'next/link'

export default async function Header() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  return (
    <header className="bg-white border-b border-gray-100 sticky top-0 z-10">
      <div className="max-w-5xl mx-auto px-4 h-14 flex items-center justify-between">
        <Link href="/" className="text-xl font-bold text-orange-500">🍠 고구마마켓</Link>
        <div className="flex items-center gap-3">
          <Link href="/products/new" className="text-sm text-gray-500 hover:text-orange-500 transition-colors">
            상품 등록
          </Link>
          {user ? (
            <form action="/auth/signout" method="POST">
              <button type="submit" className="text-sm text-gray-400 hover:text-gray-600 transition-colors">
                로그아웃
              </button>
            </form>
          ) : (
            <Link href="/login" className="text-sm bg-orange-500 hover:bg-orange-600 text-white px-3 py-1.5 rounded-lg transition-colors">
              로그인
            </Link>
          )}
        </div>
      </div>
    </header>
  )
}
