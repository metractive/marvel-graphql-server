const { GraphQLServer } = require('graphql-yoga')

const conn = require('./connection')
const axios = require('axios')

const fetchCharacters = () => {
    return axios.get(`${conn.base}/v1/public/characters?${conn.params}`)
        .then(res => (res.data.status == 'Ok') ? res.data.data : { results: [] })
        .then(data => data.results)
        .catch(e => console.log(e.response))
}

const typeDefs = `
type Query {
    info: String!
    characters: [Characters!]!
}

type Characters {
    id: Int!
    name: String!
    description: String!
    thumbnail: String!
    urls: [Urls!]!
    comics: Comics!
    modified: String!
}

type Comics {
    available: Int!
    items: [ComicSummary!]!
}

type ComicSummary {
    resourceURI: String!
    name: String!
}

type Urls {
    type: String!
    url: String!
}
`

const resolvers = {
    Query: {
        info: () => `Marvel's API`,
        characters: () => fetchCharacters()
    },

    Characters: {
        id: (root) => root.id,
        name: (root) => root.name,
        description: (root) => root.description,
        thumbnail: (root) => `${root.thumbnail.path}.${root.thumbnail.extension}`,
        urls: (root) => root.urls,
        comics: (root) => root.comics,
        modified: (root) => root.modified
    },

    Comics: {
        available: (root) => root.available,
        items: (root) => root.items
    },

    ComicSummary: {
        name: (root) => root.name,
        resourceURI: (root) => root.resourceURI
    },

    Urls: {
        type: (root) => root.type,
        url: (root) => root.url
    }
}

const server = new GraphQLServer({
    typeDefs,
    resolvers
})

server.start(() => console.log(`Server is running on http://localhost:4000`))