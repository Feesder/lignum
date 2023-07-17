import UserService from "../service/UserService.js"
import config from '../config.json' assert { type: 'json' }

class AppController {
    async main(req, res) {
        try {
            const userId = req.cookies.userId
            const user = await UserService.getOne(userId) || ''
            res.render('index', {active: 'main', user})
        } catch(e) {
            res.status(500)
            console.log(e)
        }
    }

    async wiki(req, res) {
        try {
            const userId = req.cookies.userId
            const user = await UserService.getOne(userId) || ''
            res.render('wiki', {active: 'wiki', user})
        } catch(e) {
            res.status(500)
            console.log(e)
        }
    }

    async map(req, res) {
        try {
            const userId = req.cookies.userId
            const user = await UserService.getOne(userId) || ''
            res.render('map', {active: 'map', user})
        } catch(e) {
            res.status(500)
            console.log(e)
        }
    }

    async play(req, res) {
        try {
            const userId = req.cookies.userId

            if (!userId) {
                res.redirect(config.generate_url)
                return
            }

            const user = await UserService.getOne(userId) || ''

            if (user.minecraft_id) {
                res.redirect('/')
                return
            }

            res.render('play', {active: null, user})
        } catch(e) {
            res.status(500)
            console.log(e)
        }
    }
}

export default new AppController()