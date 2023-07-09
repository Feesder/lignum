import AuthService from "../../service/AuthService.js"

class AuthController {
    async auth(req, res) {
        const code = req.query.code
        const user = await AuthService.auth(code)
        res.cookie('userId', user.id, {
            maxAge: 1000 * 3600 * 24 * 15 
        })
        res.redirect('/play')
    }

    async getOneByName(req, res) {
        try {
            const param = req.params
            if (!param.name) {
                res.status(400).json({ message: 'Name не указан' })
            } 
            res.json(await AuthService.getOneByName(param.name))
        } catch(e) {
            res.status(500).json(e)
        }
    }

    async update(req, res) {
        try {
            const user = req.body
            if (!user._id) {
                res.status(400).json({ message: 'Id не указан' })
            }
            const updatedUser = await AuthService.update(user)
            res.json(updatedUser)
        } catch(e) {
            res.status(500)
            console.log(e)
        }
    }
}

export default new AuthController()