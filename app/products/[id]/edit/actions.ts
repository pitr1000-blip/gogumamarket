'use server'

import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'

export async function updateProduct(id: string, formData: FormData) {
  const supabase = await createClient()

  const title = formData.get('title') as string
  const description = formData.get('description') as string
  const price = Number(formData.get('price'))
  const image_url = formData.get('image_url') as string
  const seller_name = formData.get('seller_name') as string
  const status = formData.get('status') as string

  await supabase
    .from('products')
    .update({ title, description, price, image_url: image_url || null, seller_name, status })
    .eq('id', id)

  redirect(`/products/${id}`)
}

export async function deleteProduct(id: string) {
  const supabase = await createClient()
  await supabase.from('products').delete().eq('id', id)
  redirect('/')
}
