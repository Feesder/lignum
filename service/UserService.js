import User from '../dto/user.js'

class UserService {
    async create(user) {
        return await User.create(user)
    }

    async getAll() {
        return await User.find()
    }

    async getOne(id) {
        return await User.findById(id)
    }

    async update(user) {
        return await User.findByIdAndUpdate(user._id, user, { new: true })
    }
}

export default new UserService()