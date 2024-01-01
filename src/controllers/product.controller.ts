import { getRequestBody } from '../helpers/get-request-body'
import { Product } from '../models/product.model'
import { Request, Response } from '../types/index'

export class ProductController {
  productModel = new Product()

  constructor() {}

  async getProducts(request: Request, response: Response) {
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

  async getProduct(request: Request, response: Response) {
    try {
      const id = request.url?.split('/api/products/')[1]
      const product = await this.productModel.findById(id as string)

      if (!product) {
        response.writeHead(404, { 'Content-Type': 'application/json' })
        response.end(
          JSON.stringify({ message: `Product with id ${id} not found` })
        )
        return
      }

      response.writeHead(200, { 'Content-Type': 'application/json' })
      response.end(JSON.stringify(product))
    } catch (error) {
      console.log(error)
    }
  }

  async createProduct(request: Request, response: Response) {
    try {
      const body = await getRequestBody(request)
      const { name, description, price } = JSON.parse(body as string)

      const product = {
        name,
        description,
        price,
      }

      const newProduct = await this.productModel.create(product)
      response.writeHead(201, { 'Content-Type': 'application/json' })
      response.end(JSON.stringify(newProduct))
    } catch (error) {
      console.log(error)
    }
  }

  async updateProduct(request: Request, response: Response) {
    try {
      const id = request.url?.split('/api/products/')[1]
      const product = await this.productModel.findById(id as string)

      if (!product) {
        response.writeHead(404, { 'Content-Type': 'application/json' })
        response.end(
          JSON.stringify({ message: `Product with id ${id} not found` })
        )
        return
      }

      const body = await getRequestBody(request)
      const { name, description, price } = JSON.parse(body as string)

      const editedProduct = {
        name: name || product.name,
        description: description || product.description,
        price: price || product.price,
      }

      const updatedProduct = await this.productModel.update(
        id as string,
        editedProduct
      )
      response.writeHead(201, { 'Content-Type': 'application/json' })
      response.end(JSON.stringify(updatedProduct))
    } catch (error) {
      console.log(error)
    }
  }

  async deleteProduct(request: Request, response: Response) {
    try {
      const id = request.url?.split('/api/products/')[1]
      const product = await this.productModel.findById(id as string)

      if (!product) {
        response.writeHead(404, { 'Content-Type': 'application/json' })
        response.end(
          JSON.stringify({ message: `Product with id ${id} not found` })
        )
        return
      }

      const deletedProduct = await this.productModel.delete(id as string)
      response.writeHead(201, { 'Content-Type': 'application/json' })
      response.end(JSON.stringify(deletedProduct))
    } catch (error) {
      console.log(error)
    }
  }
}
