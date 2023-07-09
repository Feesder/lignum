import Router from 'express'
import Controller from '../controller/AppController.js'

const router = new Router()

router.get('/', Controller.main)
router.get('/wiki', Controller.wiki)
router.get('/map', Controller.map)
router.get('/play', Controller.play)

export default router