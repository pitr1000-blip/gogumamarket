'use server'

import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'

export async function createProduct(formData: FormData) {
  const supabase = await createClient()

  const title = formData.get('title') as string
  const description = formData.get('description') as string
  const price = Number(formData.get('price'))
  const image_url = formData.get('image_url') as string
  const seller_name = formData.get('seller_name') as string

  if (!title || !price || !seller_name) return

  const { data, error } = await supabase
    .from('products')
    .insert({ title, description, price, image_url: image_url || null, seller_name })
    .select('id')
    .single()

  if (error || !data) return

  redirect(`/products/${data.id}`)
}
