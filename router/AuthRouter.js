import Router from 'express'
import AuthController from '../controller/auth/AuthController.js'

const router = new Router()

router.get('/', AuthController.auth)
router.get('/:name', AuthController.getOneByName)
router.put('/', AuthController.update)

export default router