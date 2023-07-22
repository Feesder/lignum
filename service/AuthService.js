import config from '../config.json' assert { type: 'json' }
import { request } from 'undici'
import User from '../dto/user.js'
import io from '../index.js'

class AuthService {
    async auth(code) {
        if (code) {
            try {
                const tokenResponseData = await request('https://discord.com/api/oauth2/token', {
                    method: 'POST',
                    body: new URLSearchParams({
                        client_id: config.clientId,
                        client_secret: config.clientSecret,
                        code,
                        grant_type: 'authorization_code',
                        redirect_uri: config.redirect_uri,
                        scope: 'identify'
                    }).toString(),
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded'
                    }
                })
                const oauthData = await tokenResponseData.body.json()

                const data = await request('https://discord.com/api/users/@me', {
                    headers: {
                        authorization: `${oauthData.token_type} ${oauthData.access_token}`
                    }
                })
                const response = await data.body.json()

                const user = await User.find({ discord_id: response.id })
                if (!user[0]) {
                    const user = {
                        discord_id: response.id,
                        username: response.username
                    }
                    return await User.create(user)
                }

                return user[0]
            } catch(e) {
                console.log(e)
            }
        }
    
        return null
    }

    async getOneByName(name) {
        try {
            const response = await request(`https://api.mojang.com/users/profiles/minecraft/${name}`)
            const player =  await response.body.json()
            const user = await User.findOne({ minecraft_id: player.id })
            if (!user) {
                return player
            }
        } catch(e) {
            console.log(e)
            return { message: 'Игрок с таким ником уже зарегистрирован' }
        }

        return player
    }

    async update(user) {
        const newUser = await User.findByIdAndUpdate(user._id, user, { new: true }) 
        io.emit('player', newUser)
        return newUser
    }
}

export default new AuthService()