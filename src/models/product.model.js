import products from '../../data/products.json' assert { type: 'json' }
import { writeDataToFile } from '../helpers/write-data-to-file.js'

export class Product {
  async findAll() {
    return new Promise((resolve, reject) => {
      resolve(products)
    })
  }

  async findById(id) {
    return new Promise((resolve, reject) => {
      resolve(
        products.find((product) => {
          return product.id === id
        })
      )
    })
  }

  async create(product) {
    return new Promise((resolve, reject) => {
      let largestId = 0

      if (products.length > 0) {
        largestId = Math.max(...products.map((p) => p.id))
      }

      const newProduct = { id: String(largestId + 1), ...product }
      products.push(newProduct)
      writeDataToFile('./data/products.json', products)
      resolve(newProduct)
    })
  }

  async update(id, product) {
    return new Promise((resolve, reject) => {
      const index = products.findIndex((p) => p.id === id)
      products[index] = { id, ...product }
      writeDataToFile('./data/products.json', products)
      resolve(products[index])
    })
  }

  async delete(id) {
    let mutableProducts = { ...products }

    return new Promise((resolve, reject) => {
      mutableProducts = products.filter((product) => product.id !== id)
      writeDataToFile('./data/products.json', mutableProducts)
      resolve(mutableProducts)
    })
  }
}
