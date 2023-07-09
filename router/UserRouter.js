import Router from 'express'
import UserController from '../controller/api/UserController.js'

const router = new Router()

router.post('/user', UserController.create)
router.get('/user', UserController.getAll)
router.get('/user/:id', UserController.getOne)
router.put('/user', UserController.update)
router.delete('/user', UserController.delete)

export default router