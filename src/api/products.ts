import type { Product } from '../types'

export type AddProductInBasketDto = Product



export async function getProductsInBasket(): Promise<Product[]> {
  const response = await fetch('/api/basket')

  if (!response.ok) {
    throw new Error(`Не удалось загрузить продукты: ${response.status}`)
  }

  return response.json() as Promise<Product[]>
}

export async function getProductsInStore(): Promise<Product[]> {
  const response = await fetch('/api/store')

  if (!response.ok) {
    throw new Error(`Не удалось загрузить продукты: ${response.status}`)
  }

  return response.json() as Promise<Product[]>
}

export async function addProductsInBasket(payload: AddProductInBasketDto[]): Promise<Product[]> {
  const response = await fetch('/api/basket', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  })

  if (!response.ok) {
    throw new Error(`Не удалось добавить товар в корзину: ${response.status}`)
  }

  return response.json() as Promise<Product[]>;
  
}