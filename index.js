const { GraphQLServer } = require('graphql-yoga')

const port = process.env.port || 3000
const conn = require('./services/connection')

const resolvers = {
    Query: {
        description: () => `Marvel's API (Metractive Labs)`,
        allCharacters: () => conn.fetchApi('/characters'),
        allComics: () => conn.fetchApi('/comics'),
        allCreators: () => conn.fetchApi('/creators'),
        allEvents: () => conn.fetchApi('/events'),
        allSeries: () => conn.fetchApi('/series'),
        allStories: () => conn.fetchApi('/stories'),
        getCharacter: (_, { id }) => conn.fetchApi(`/characters/${id}`)
            .then(character => (character) ? character[0] : {})
    },

    Characters: {
        thumbnail: (root) => `${root.thumbnail.path}.${root.thumbnail.extension}`
    },

    Events: {
        thumbnail: (root) => `${root.thumbnail.path}.${root.thumbnail.extension}`
    },

    Comics: {
        description: root => (!root.description) ? '' : root.description
    },

    Series: {
        thumbnail: (root) => `${root.thumbnail.path}.${root.thumbnail.extension}`
    },

    Stories: {
        thumbnail: (root) => `${root.thumbnail.path}.${root.thumbnail.extension}`
    }
}

const server = new GraphQLServer({
    typeDefs: './src/schema.graphql',
    resolvers
})

server.start({ port }, () => console.log(`Server start on port ${port}`))