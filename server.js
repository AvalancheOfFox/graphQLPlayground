import express from "express";
import {graphqlHTTP} from 'express-graphql'
import {     
    GraphQLSchema,
    GraphQLObjectType,
    GraphQLString,
    GraphQLList
} from "graphql"

import { AUTHORS } from "./mockData/mockData.js";

const BookType = new GraphQLObjectType({
    name: "Book",
    description: "This represents a generic book written by an author.",
    fields: () => ({
        title: {type: GraphQLNonNull(GraphQLString)}, 
        author: {type: GraphQLNonNull(GraphQLString)},
        id: {type: GraphQLNonNull(GraphQLInt)},
        publisher: {type: GraphQLNonNull(GraphQLString)}
    })
})

const RootQueryType = new GraphQLObjectType({
    name: 'RootQuery',
    description: "Root Query",
    fields: () => ({
        books: {
            type: new GraphQLList(BookType),
            description: "List of all books",
            resolve: () => {
             books
            }
        }
    })

})



const app = express()
app.use("/graphQL", graphqlHTTP({
    graphiql: true,
    // schema: schema
}) )
const PORT = 6969;

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`))