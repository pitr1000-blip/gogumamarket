'use client'

import { createClient } from '@/lib/supabase/client'
import Link from 'next/link'

export const dynamic = 'force-dynamic'

export default function LoginPage() {
  const supabase = createClient()

  const signInWithKakao = async () => {
    await supabase.auth.signInWithOAuth({
      provider: 'kakao',
      options: { redirectTo: `${window.location.origin}/auth/callback` },
    })
  }

  const signInWithGoogle = async () => {
    await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: { redirectTo: `${window.location.origin}/auth/callback` },
    })
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* 헤더 */}
      <header className="bg-white border-b border-gray-100">
        <div className="max-w-2xl mx-auto px-4 h-14 flex items-center gap-3">
          <Link href="/" className="text-gray-500 hover:text-gray-700 transition-colors">
            ← 뒤로
          </Link>
        </div>
      </header>

      {/* 로그인 폼 */}
      <main className="flex-1 flex items-center justify-center px-4">
        <div className="w-full max-w-sm">
          {/* 로고 */}
          <div className="text-center mb-10">
            <h1 className="text-3xl font-bold text-orange-500 mb-2">🍠 고구마마켓</h1>
            <p className="text-sm text-gray-400">따뜻한 중고거래</p>
          </div>

          <div className="flex flex-col gap-3">
            {/* 카카오 로그인 */}
            <button
              onClick={signInWithKakao}
              className="w-full flex items-center justify-center gap-3 py-3.5 bg-[#FEE500] hover:bg-[#F0D900] text-[#191919] rounded-xl font-semibold text-sm transition-colors"
            >
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                <path fillRule="evenodd" clipRule="evenodd" d="M9 0.5C4.306 0.5 0.5 3.476 0.5 7.148c0 2.332 1.537 4.381 3.862 5.567L3.33 16.21c-.048.193.144.348.314.24L8.01 13.55c.327.03.66.046 1 .046 4.694 0 8.5-2.976 8.5-6.648C17.5 3.476 13.694.5 9 .5z" fill="#191919"/>
              </svg>
              카카오로 로그인
            </button>

            {/* 구글 로그인 */}
            <button
              onClick={signInWithGoogle}
              className="w-full flex items-center justify-center gap-3 py-3.5 bg-white hover:bg-gray-50 text-gray-700 rounded-xl font-semibold text-sm border border-gray-200 transition-colors"
            >
              <svg width="18" height="18" viewBox="0 0 18 18">
                <path d="M17.64 9.2c0-.637-.057-1.251-.164-1.84H9v3.481h4.844c-.209 1.125-.843 2.078-1.796 2.717v2.258h2.908c1.702-1.567 2.684-3.875 2.684-6.615z" fill="#4285F4"/>
                <path d="M9 18c2.43 0 4.467-.806 5.956-2.184l-2.908-2.258c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332C2.438 15.983 5.482 18 9 18z" fill="#34A853"/>
                <path d="M3.964 10.707c-.18-.54-.282-1.117-.282-1.707s.102-1.167.282-1.707V4.961H.957C.347 6.175 0 7.55 0 9s.348 2.825.957 4.039l3.007-2.332z" fill="#FBBC05"/>
                <path d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0 5.482 0 2.438 2.017.957 4.961L3.964 6.293C4.672 4.166 6.656 3.58 9 3.58z" fill="#EA4335"/>
              </svg>
              구글로 로그인
            </button>
          </div>
        </div>
      </main>
    </div>
  )
}
