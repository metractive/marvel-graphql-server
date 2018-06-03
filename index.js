const { GraphQLServer } = require('graphql-yoga')

const port = process.env.PORT || 5000
const conn = require('./services/connection')

const resolvers = {
    Query: {
        description: () => `Marvel's API (Metractive Labs)`,
        allCharacters: (_, { offset }) => conn.fetchApi('/characters', { offset }),
        allComics: (_, { offset }) => conn.fetchApi('/comics', { offset }),
        allCreators: (_, { offset }) => conn.fetchApi('/creators', { offset }),
        allEvents: (_, { offset }) => conn.fetchApi('/events', { offset }),
        allSeries: (_, { offset }) => conn.fetchApi('/series', { offset }),
        allStories: (_, { offset }) => conn.fetchApi('/stories', { offset }),
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