require('dotenv').config({ silent: true })

const qs = require('qs')
const hasher = require('./hasher')

const privateKey = process.env.PRIVATE_KEY
const publicKey = process.env.PUBLIC_KEY
const params = String(privateKey) + String(publicKey)

const getQueryParams = (timestamp = Date.now()) => ({
    ts: String(timestamp),
    apikey: String(publicKey),
    hash: hasher(String(timestamp) + params)
})

const BASE_URL = `https://gateway.marvel.com`
const _params = qs.stringify(getQueryParams())

module.exports = {
    base: BASE_URL,
    params: _params
}