import { Router } from 'express'

import UserController from './app/controllers/UserController'
import SessionController from './app/controllers/SessionController'
import ProductController from './app/controllers/ProductController'

const router = new Router()

router.post('/users', UserController.store)
router.post('/sessions', SessionController.store)
router.post('/products', ProductController.store)

export default router
