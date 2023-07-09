import mongoose from 'mongoose'

const User = new mongoose.Schema({
    discord_id: {type: String, required: true, unique: true},
    minecraft_id: {type: String, required: false,  unique: true},
    username: {type: String, required: true},
    registered: {type: Date, default: Date.now(), required: true}
})

export default mongoose.model('User', User)