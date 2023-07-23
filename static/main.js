const specialCharacters = /[!@#$%^&*()+\-=\[\]{};':"\\|,.<>\/?]+/

function getCookie(name) {
    const cookies = document.cookie.split('; ')

    for (i = 0; i < cookies.length; i++) {
        const cookie = cookies[0].split('=')
        const cookieName = cookie[0]
        const cookieValue = cookie[1]

        if(cookieName == name) {
            return cookieValue
        }
    }

    return null
}

const App = {
    data() {
        return {
            socket: null,
            nickname: '',
            error: 0,
            auth: false
        }
    },
    methods: {
        async onSubmit() {
            const player = await fetch(`/auth/${this.nickname}`, {
                method: 'GET'
            }).then(response => {
                return response.json()
            })

            console.log(player)
            if (player.errorMessage) {
                this.error = 3
                return
            }

            if (player.message) {
                this.error = 4
                return
            }

            console.log(player)

            const response = await fetch('/auth', {
                method: 'PUT',
                body: new URLSearchParams({
                    _id: getCookie('userId'),
                    username: player.name,
                    minecraft_id: player.id
                }),
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            })


            if (response.ok) {
                this.auth = true
                setTimeout(() => {
                    window.location.href = '/'
                }, 1500)
            } else {
                this.error = 5
            }
        },
        transition() {
            window.location.href = "/"
        }
    },
    watch: {
        nickname(value) {
            if ((value.length < 3 || value.length > 16) && value.length != 0) {
                this.error = 1
                return
            }

            if (specialCharacters.test(value)) {
                this.error = 2
                return
            }

            this.error = 0
        }
    }
}

Vue.createApp(App).mount('.play')