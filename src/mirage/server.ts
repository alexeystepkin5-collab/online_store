import { createServer, Model } from 'miragejs'
import type { Product } from '../types'

type ProductInBasketPayload = Product

//let nextProductInBasketId = 11

export function makeServer() {
  return createServer({
    models: {
      productinbasket: Model,
      productinstore: Model,
    },

    seeds(server: any) {
      const seedProductsInBasket: Product[] = []
      seedProductsInBasket.forEach((product) => server.create('productinbasket', product))
      
      const seedProductsInStore: Product[] = [
      {
        id: 1,
        title: "перловка",
        description: "отборная ячменная крупа",
        price: 25,
        quantity: 150
      },
      {
        id: 2,
        title: "морковь",
        description: "отличная морковь свежий урожай",
        price: 50,
        quantity: 300
      },
      {
        id: 3,
        title: "лук",
        description: "лук репчатый отличного качества",
        price: 35,
        quantity: 600
      },
      {
        id: 4,
        title: "свёкла",
        description: "превосходная красня свекла",
        price: 70,
        quantity: 400
      },
      {
        id: 5,
        title: "горошек",
        description: "отличный сладкий зеленый горошек",
        price: 100,
        quantity: 1400
      },
      {
        id: 6,
        title: "капуста",
        description: "превосходная хрустящая капуста",
        price: 50,
        quantity: 140
      },
      {
        id: 7,
        title: "огурцы",
        description: "свежий урожай Хомутоские",
        price: 200,
        quantity: 400
      },
      {
        id: 8,
        title: "помидоры",
        description: "спелые тепличные",
        price: 150,
        quantity: 500
      },
      {
        id: 9,
        title: "чеснок",
        description: "жгучий ядреный",
        price: 30,
        quantity: 150
      },
      {
        id: 10,
        title: "говядина",
        description: "свежая мраморная",
        price: 600,
        quantity: 140
      },
      {
        id: 11,
        title: "хлеб",
        description: "пшеничный хлеб высшего сорта",
        price: 60,
        quantity: 300
      }

      ]
      seedProductsInStore.forEach((product) => server.create('productinstore', product))
    },

    routes() {
      this.namespace = 'api'
      this.timing = 500

      // GET /api/basket -> отдаёт корзину с продуктами
      this.get('/basket', (schema: any) => {
        const records = schema.all('productinbasket').models
        return records.map((record: any) => record.attrs as Product)
      })

      // GET /api/store -> отдаёт список товаров в магазине
      this.get('/store', (schema: any) => {
        const records = schema.all('productinstore').models
        return records.map((record: any) => record.attrs as Product)
      })

      // POST /api/basket {данные нового товара в корзине} -> создаёт задачу и отдаёт её с новым id
      this.post('/basket', (schema: any, request: any) => {
        const payload = JSON.parse(request.requestBody) as ProductInBasketPayload[]

        const record = schema.create('productinbasket', payload)
        return record.attrs as Product[]
      })
    },
  })
}