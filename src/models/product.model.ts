import products from '../../data/products.json'
import { writeDataToFile } from '../helpers/write-data-to-file'

interface IProduct {
  id: string
  name: string
  description: string
  price: number
}

interface IProductDTO extends Omit<IProduct, 'id'> {}

export class Product {
  async findAll(): Promise<IProduct[]> {
    return new Promise((resolve, reject) => {
      resolve(products)
    })
  }

  async findById(id: string): Promise<IProduct | undefined> {
    return new Promise((resolve, reject) => {
      resolve(
        products.find((product) => {
          return product.id === id
        })
      )
    })
  }

  async create(product: IProductDTO): Promise<IProduct> {
    return new Promise((resolve, reject) => {
      let largestId = 0

      if (products.length > 0) {
        largestId = Math.max(...products.map((p) => Number(p.id)))
      }

      const newProduct = { id: String(largestId + 1), ...product }
      products.push(newProduct)
      writeDataToFile('./data/products.json', products)
      resolve(newProduct)
    })
  }

  async update(id: string, product: IProductDTO): Promise<IProduct> {
    return new Promise((resolve, reject) => {
      const index = products.findIndex((p) => p.id === id)
      products[index] = { id, ...product }
      writeDataToFile('./data/products.json', products)
      resolve(products[index])
    })
  }

  async delete(id: string): Promise<IProduct[]> {
    let mutableProducts = { ...products }

    return new Promise((resolve, reject) => {
      mutableProducts = products.filter((product) => product.id !== id)
      writeDataToFile('./data/products.json', mutableProducts)
      resolve(mutableProducts)
    })
  }
}
