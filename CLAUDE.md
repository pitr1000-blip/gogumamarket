# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

# 고구마마켓

중고 물품을 사고팔 수 있는 웹 서비스.

## 기술 스택

- Next.js (App Router)
- Supabase (데이터베이스, 인증)
- Tailwind CSS (스타일링)
- TypeScript

## MCP

Supabase MCP 연결됨 — DB 조작 시 MCP를 통해 직접 수행

## 규칙

- 한국어 UI
- 가격은 원화(₩) — "₩10,000" 형태로 표시
- 모바일 반응형 필수
- 디자인은 깔끔하고 모던한 스타일
- 색상 테마: 주황색 계열 (고구마 컨셉)
- 이미지는 URL 방식으로 처리 (파일 업로드 없음)

## 주요 기능

- 상품 목록 (메인 페이지)
- 상품 등록/상세/수정/삭제
- 소셜 로그인 (카카오/구글)
- 결제 (토스페이먼츠)

## 데이터베이스

(기능 추가 시 업데이트)

## 개발 명령어

```bash
npm run dev      # 개발 서버 실행
npm run build    # 프로덕션 빌드
npm run lint     # ESLint 실행
```

## 아키텍처

### 디렉토리 구조

```
app/
  layout.tsx          # 루트 레이아웃
  page.tsx            # 홈(메인) 페이지 — 상품 목록
  (auth)/             # 로그인/회원가입 라우트 그룹
  products/
    [id]/             # 상품 상세
    [id]/edit/        # 상품 수정
    new/              # 상품 등록
  my/                 # 마이페이지
components/           # 재사용 UI 컴포넌트
lib/
  supabase.ts         # Supabase 클라이언트 초기화
```

### Next.js 버전 주의

현재 설치된 버전의 API와 관례가 훈련 데이터와 다를 수 있음 — `node_modules/next/dist/docs/` 가이드 참고 (AGENTS.md).
