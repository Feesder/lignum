import UserService from '../../service/UserService.js'

class UserController {
    async create(req, res) {
        try {
            res.json(UserService.create(req.body))
        } catch(e) {
            res.status(500).json(e)
        }
    }

    async getAll(req, res) {
        try {
            res.json(await UserService.getAll())
        } catch(e) {
            res.status(500).json(e)
        }
    }

    async getOne(req, res) {
        try {
            const param = req.params
            if (!param.id) {
                res.status(400).json({ message: 'Id не указан' })
            } 
            res.json(await UserService.getOne(param.id))
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
            const updatedUser = await UserService.update(user)
            res.json(updatedUser)
        } catch(e) {
            res.status(500)
            console.log(e)
        }
    }

    async delete(req, res) {
        try {

        } catch(e) {
            res.status(500).json(e)
        }
    }
}

export default new UserController()