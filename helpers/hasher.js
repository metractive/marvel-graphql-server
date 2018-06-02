const crypto = require('crypto')

const generateHash = value => {
    if (!value)
        throw Error(`Necessary to send the parameter`)

    return crypto.createHash('md5').update(String(value)).digest('hex')
}

module.exports = generateHash

