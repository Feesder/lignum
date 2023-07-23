import config from '../config.json' assert { type: 'json' }
import { request } from 'undici'
import User from '../dto/user.js'
import { io, rcon } from '../index.js'

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

                const user = await User.findOne({ discord_id: response.id })
                if (!user) {
                    const user = {
                        discord_id: response.id,
                        username: response.username
                    }
                    return await User.create(user)
                }

                return user
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
            if (!player.id) {
                return player
            }
            const user = await User.findOne({ minecraft_id: player.id })
            console.log(player)
            console.log(user)
            if (user) {
                return { message: 'Игрок с таким ником уже зарегистрирован' }
            }
            return player
        } catch(e) {
            console.log(e)
            return { message: 'Игрок с таким ником уже зарегистрирован' }
        }
    }

    async update(user) {
        await rcon.connect()
        const newUser = await User.findByIdAndUpdate(user._id, user, { new: true }) 
        io.emit('player', newUser)
        await rcon.send(`whitelist add ${newUser.username}`)
        rcon.disconnect()
        return newUser
    }
}

export default new AuthService()