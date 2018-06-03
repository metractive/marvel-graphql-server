require('dotenv').config({ silent: true })

const qs = require('qs')
const hasher = require('../helpers/hasher')
const axios = require ('axios')

// Create axios http instance
const http = axios.create({
    baseURL: `https://gateway.marvel.com/v1/public`
})

const privateKey = process.env.PRIVATE_KEY
const publicKey = process.env.PUBLIC_KEY
const baseParams = String(privateKey) + String(publicKey)

const getParams = (timestamp = Date.now()) => ({
    ts: String(timestamp),
    apikey: String(publicKey),
    hash: hasher(String(timestamp) + baseParams)
})

const fetchApi = (endpoint, parameters) => {
    let params = getParams()

    if (parameters.offset)
        params.offset = parameters.offset

    // Call HTTP request
    return http.get(endpoint, { params })
        .then(res => (res.data.status == 'Ok') ? res.data.data : { results: [] })
        .then(data => data.results)
        .catch(err => console.error(err))
}

module.exports = { fetchApi }