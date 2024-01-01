import { ProductController } from './controllers/product.controller'
import { Router } from './routes/router'
import { Request, Response } from './types/index'

const router = new Router()
const productController = new ProductController()

const PORT = process.env.PORT || 3000

router.get('/api/products', (request: Request, response: Response) => {
  productController.getProducts(request, response)
})
router.get('/api/products/:id', (request: Request, response: Response) => {
  productController.getProduct(request, response)
})
router.post('/api/products', (request: Request, response: Response) => {
  productController.createProduct(request, response)
})
router.put('/api/products/:id', (request: Request, response: Response) => {
  productController.updateProduct(request, response)
})
router.delete('/api/products/:id', (request: Request, response: Response) => {
  productController.deleteProduct(request, response)
})

router.listen(PORT, () => console.log(`Server running on port ${PORT}`))
