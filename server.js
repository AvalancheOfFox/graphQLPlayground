import express from "express";
import {graphqlHTTP} from 'express-graphql'
import {     
    GraphQLSchema,
    GraphQLObjectType,
    GraphQLString
} from "graphql"


const schema = new GraphQLSchema({
    query: new GraphQLObjectType({
        name: "HelloWorld",
        fields: () => ({
            message: { 
                type: GraphQLString,
                resolve: () => `Hello World`
            }
        })
    })
})

const app = express()
app.use("/graphQL", graphqlHTTP({
    graphiql: true,
    schema: schema
}) )
const PORT = 6969;

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`))