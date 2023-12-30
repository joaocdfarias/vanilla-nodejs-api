import { createServer } from 'http'
import { ProductController } from './controllers/product.controller.js'

const PORT = process.env.PORT || 3000

const server = createServer((request, response) => {
  const productController = new ProductController(request, response)

  if (request.url === '/api/products' && request.method === 'GET') {
    return productController.getProducts()
  } else if (
    request.url.match(/\/api\/products\/([0-9]+)/) &&
    request.method === 'GET'
  ) {
    return productController.getProduct()
  } else if (request.url === '/api/products' && request.method === 'POST') {
    return productController.createProduct()
  } else if (
    request.url.match(/\/api\/products\/([0-9]+)/) &&
    request.method === 'PUT'
  ) {
    return productController.updateProduct()
  } else if (
    request.url.match(/\/api\/products\/([0-9]+)/) &&
    request.method === 'DELETE'
  ) {
    return productController.deleteProduct()
  }

  response.writeHead(404, { 'Content-Type': 'application/json' })
  response.end(JSON.stringify({ message: 'Route not found' }))
})

server.listen(PORT, () => console.log(`Server running on port ${PORT}`))
