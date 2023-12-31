import { ProductController } from './controllers/product.controller.js'
import { Router } from './routes/router.js'

const router = new Router()
const productController = new ProductController()

const PORT = process.env.PORT || 3000

router.get('/api/products', (request, response) => {
  productController.getProducts(request, response)
})

// router.post('/api/products', (request, response) => {
//   const productController = new ProductController(request, response)
//   productController.createProduct()
// })

router.listen(PORT, () => console.log(`Server running on port ${PORT}`))

// const server = createServer((request, response) => {
//   const productController = new ProductController(request, response)

//   if (request.url === '/api/products' && request.method === 'GET') {
//     return productController.getProducts()
//   } else if (
//     request.url.match(/\/api\/products\/([0-9]+)/) &&
//     request.method === 'GET'
//   ) {
//     return productController.getProduct()
//   } else if (request.url === '/api/products' && request.method === 'POST') {
//     return productController.createProduct()
//   } else if (
//     request.url.match(/\/api\/products\/([0-9]+)/) &&
//     request.method === 'PUT'
//   ) {
//     return productController.updateProduct()
//   } else if (
//     request.url.match(/\/api\/products\/([0-9]+)/) &&
//     request.method === 'DELETE'
//   ) {
//     return productController.deleteProduct()
//   }

//   response.writeHead(404, { 'Content-Type': 'application/json' })
//   response.end(JSON.stringify({ message: 'Route not found' }))
// })

// server.listen(PORT, () => console.log(`Server running on port ${PORT}`))
