import { getRequestBody } from '../helpers/get-request-body.js'
import { Product } from '../models/product.model.js'

export class ProductController {
  productModel = new Product()

  constructor() {}

  async getProducts(request, response) {
    try {
      const products = await this.productModel.findAll()

      if (!products) {
        response.writeHead(404, { 'Content-Type': 'application/json' })
        response.end(JSON.stringify({ message: 'Not found any product' }))
        return
      }

      response.writeHead(200, { 'Content-Type': 'application/json' })
      response.end(JSON.stringify(products))
    } catch (error) {
      console.log(error)
    }
  }

  async getProduct() {
    try {
      const id = this.request.url.split('/api/products/')[1]
      const product = await this.productModel.findById(id)

      if (!product) {
        this.response.writeHead(404, { 'Content-Type': 'application/json' })
        this.response.end(
          JSON.stringify({ message: `Product with id ${id} not found` })
        )
        return
      }

      this.response.writeHead(200, { 'Content-Type': 'application/json' })
      this.response.end(JSON.stringify(product))
    } catch (error) {
      console.log(error)
    }
  }

  async createProduct() {
    try {
      const body = await getRequestBody(this.request)
      const { name, description, price } = JSON.parse(body)

      const product = {
        name,
        description,
        price,
      }

      const newProduct = await this.productModel.create(product)
      this.response.writeHead(201, { 'Content-Type': 'application/json' })
      this.response.end(JSON.stringify(newProduct))
    } catch (error) {
      console.log(error)
    }
  }

  async updateProduct() {
    try {
      const id = this.request.url.split('/api/products/')[1]
      const product = await this.productModel.findById(id)

      if (!product) {
        this.response.writeHead(404, { 'Content-Type': 'application/json' })
        this.response.end(
          JSON.stringify({ message: `Product with id ${id} not found` })
        )
        return
      }

      const body = await getRequestBody(this.request)
      const { name, description, price } = JSON.parse(body)

      const editedProduct = {
        name: name || product.name,
        description: description || product.description,
        price: price || product.price,
      }

      const updatedProduct = await this.productModel.update(id, editedProduct)
      this.response.writeHead(201, { 'Content-Type': 'application/json' })
      this.response.end(JSON.stringify(updatedProduct))
    } catch (error) {
      console.log(error)
    }
  }

  async deleteProduct() {
    try {
      const id = this.request.url.split('/api/products/')[1]
      const product = await this.productModel.findById(id)

      if (!product) {
        this.response.writeHead(404, { 'Content-Type': 'application/json' })
        this.response.end(
          JSON.stringify({ message: `Product with id ${id} not found` })
        )
        return
      }

      const deletedProduct = await this.productModel.delete(id)
      this.response.writeHead(201, { 'Content-Type': 'application/json' })
      this.response.end(JSON.stringify(deletedProduct))
    } catch (error) {
      console.log(error)
    }
  }
}
