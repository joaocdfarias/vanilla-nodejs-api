import { ProductController } from './controllers/product.controller.js'
import { Router } from './routes/router.js'

const router = new Router()
const productController = new ProductController()

const PORT = process.env.PORT || 3000

router.get('/api/products', (request, response) => {
  productController.getProducts(request, response)
})
router.get('/api/products/:id', (request, response) => {
  productController.getProduct(request, response)
})
router.post('/api/products', (request, response) => {
  productController.createProduct(request, response)
})
router.put('/api/products/:id', (request, response) => {
  productController.updateProduct(request, response)
})
router.delete('/api/products/:id', (request, response) => {
  productController.deleteProduct(request, response)
})

router.listen(PORT, () => console.log(`Server running on port ${PORT}`))
