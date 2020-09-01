const express = require("express");
const {graphqlHTTP} = require("express-graphql");
const schema = require('./schema');
const resolvers = require('./resolvers');
const expressPlayground =
    require('graphql-playground-middleware-express').default;

const startDatabase = require('./database');

// Create a context for holding contextual data
const context = async () => {
    const db = await startDatabase();
    return {db};
};

const app = express();
app.use(
    "/graphql",
    graphqlHTTP({
        schema,
        rootValue: resolvers,
        context,
    })
);

// Enable the graphiql interface
app.get('/playground', expressPlayground({ endpoint: '/graphql' }));

app.listen(4000);
console.log(`🚀 Server ready at http://localhost:4000/graphql`);
