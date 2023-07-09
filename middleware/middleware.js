import colors from 'colors'

export function requestTime(req, res, next) {
    let now = new Date()
    req.requestTime = now.toLocaleString('en-US')
    next()
}

export function logger(req, res, next) {
    console.log(`${colors.bgGreen.black(` Time: ${req.requestTime} `)}  ${colors.bgYellow.white(` URL: ${req.url} `)} ${colors.bgBlack.white(` Method: ${req.method} `)}`)
    next()
}   