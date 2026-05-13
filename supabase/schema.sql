-- ================================
-- 고구마마켓 데이터베이스 스키마
-- ================================

-- 기존 테이블/타입 초기화
drop trigger if exists on_auth_user_created on auth.users;
drop trigger if exists products_updated_at on public.products;
drop function if exists public.handle_new_user();
drop function if exists update_updated_at();
drop table if exists public.orders cascade;
drop table if exists public.likes cascade;
drop table if exists public.products cascade;
drop table if exists public.profiles cascade;
drop type if exists order_status;
drop type if exists product_status;

-- 1. profiles (회원 프로필 — auth.users 확장)
create table public.profiles (
  id          uuid primary key references auth.users(id) on delete cascade,
  nickname    text not null,
  avatar_url  text,
  phone       text,
  created_at  timestamptz default now() not null
);

-- 2. products (상품)
create type product_status as enum ('available', 'reserved', 'sold');

create table public.products (
  id          uuid primary key default gen_random_uuid(),
  user_id     uuid not null references public.profiles(id) on delete cascade,
  title       text not null,
  description text not null,
  price       integer not null check (price >= 0),
  category    text not null,
  status      product_status default 'available' not null,
  image_url   text,
  location    text,
  view_count  integer default 0 not null,
  created_at  timestamptz default now() not null,
  updated_at  timestamptz default now() not null
);

-- 3. likes (찜하기)
create table public.likes (
  id          uuid primary key default gen_random_uuid(),
  user_id     uuid not null references public.profiles(id) on delete cascade,
  product_id  uuid not null references public.products(id) on delete cascade,
  created_at  timestamptz default now() not null,
  unique (user_id, product_id)
);

-- 4. orders (주문/결제 — 토스페이먼츠)
create type order_status as enum ('pending', 'paid', 'cancelled', 'refunded');

create table public.orders (
  id               uuid primary key default gen_random_uuid(),
  product_id       uuid not null references public.products(id),
  buyer_id         uuid not null references public.profiles(id),
  seller_id        uuid not null references public.profiles(id),
  amount           integer not null check (amount >= 0),
  status           order_status default 'pending' not null,
  toss_order_id    text unique,
  toss_payment_key text,
  created_at       timestamptz default now() not null
);

-- ================================
-- updated_at 자동 갱신 트리거
-- ================================
create or replace function update_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

create trigger products_updated_at
  before update on public.products
  for each row execute function update_updated_at();

-- ================================
-- RLS 활성화
-- ================================
alter table public.profiles enable row level security;
alter table public.products enable row level security;
alter table public.likes    enable row level security;
alter table public.orders   enable row level security;

-- profiles 정책
create policy "누구나 프로필 조회 가능" on public.profiles
  for select using (true);

create policy "본인만 프로필 수정 가능" on public.profiles
  for update using (auth.uid() = id);

-- products 정책
create policy "누구나 상품 조회 가능" on public.products
  for select using (true);

create policy "로그인 사용자만 상품 등록 가능" on public.products
  for insert with check (auth.uid() = user_id);

create policy "본인만 상품 수정 가능" on public.products
  for update using (auth.uid() = user_id);

create policy "본인만 상품 삭제 가능" on public.products
  for delete using (auth.uid() = user_id);

-- likes 정책
create policy "누구나 찜 목록 조회 가능" on public.likes
  for select using (true);

create policy "본인만 찜 추가 가능" on public.likes
  for insert with check (auth.uid() = user_id);

create policy "본인만 찜 삭제 가능" on public.likes
  for delete using (auth.uid() = user_id);

-- orders 정책
create policy "구매자/판매자만 주문 조회 가능" on public.orders
  for select using (auth.uid() = buyer_id or auth.uid() = seller_id);

create policy "로그인 사용자만 주문 생성 가능" on public.orders
  for insert with check (auth.uid() = buyer_id);

-- ================================
-- 신규 회원가입 시 profiles 자동 생성
-- ================================
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, nickname, avatar_url)
  values (
    new.id,
    coalesce(new.raw_user_meta_data->>'full_name', '고구마유저'),
    new.raw_user_meta_data->>'avatar_url'
  );
  return new;
end;
$$ language plpgsql security definer;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();
