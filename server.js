import express from "express";
import {graphqlHTTP} from 'express-graphql'
import {     
    GraphQLSchema,
    GraphQLObjectType,
    GraphQLString,
    GraphQLList,
    GraphQLNonNull,
    GraphQLInt
} from "graphql"

const books =  [
    { id: "1", title: "The Book of Mandalore",  genreId: "1", publisherId: 1, authorId: 1 },
    { id: "2", title: "The Art of War",   genreId: "2", publisherId: 2, authorId: 2 },
    { id: "3", title: "The New World Order",  genreId: "3" , publisherId: 3, authorId: 3},
    { id: "4", title: "My Life in Hollywood",  genreId: "4", publisherId: 4 , authorId: 4},
  ];
  const publishers = [
    { id: 1, name: "Simon & Shuster" , genres: ["Fiction", "Memoir"]},
    { id: 2, name: "Penguin" , genres: ["Fiction", "NonFiction", "Romance"]},
    { id: 3, name: "Scholastic", genres: ["Fiction", "SciFi", "Fantasy"] },
    { id: 4, name: "GenericPublisher2", genres: ["Fiction", "Textbooks", "YA"] },
  ];
  const genres = [
    { id: "1", name: "SciFi" },
    { id: "2", name: "Philosophy" },
    { id: "3", name: "Political Theory" },
    { id: "4", name: "Memoir" },
  ];

  const authors = [
    {id: 1, name: "Boba Fett"},
    {id: 2, name: "Sun Tzu"},
    {id: 3, name: "Henry Kissinger"},
    {id: 4, name: "Greta Garbo"}
  ]

const PublisherType = new GraphQLObjectType({
      name: "Publisher",
      description: "Represents a generic publisher",
      fields: () => ({
          name: {type: GraphQLNonNull(GraphQLString)},
          id: {type: GraphQLNonNull(GraphQLInt)},
          genres: {type: GraphQLString}
      })
  })

const AuthorType = new GraphQLObjectType({
    name: "Author",
    description: "Represents an author of a book",
    fields: () => ({
        name: {type: GraphQLNonNull(GraphQLString)},
        id: {type: GraphQLNonNull(GraphQLInt)},

    })
})
const BookType = new GraphQLObjectType({
    name: "Book",
    description: "This represents a generic book written by an author.",
    fields: () => ({
        title: {type: GraphQLNonNull(GraphQLString)}, 
        authorId: {type: GraphQLNonNull(GraphQLString)},
        id: {type: GraphQLNonNull(GraphQLInt)},
        author: {
            type: AuthorType,
            resolve: (book) => {
                return authors.find(author => author.id === book.authorId)
            }
        },
        publisher: {
            type: PublisherType,
            resolve: (book) => {
                return publishers.find(publisher => publisher.id === book.publisherId)
            }
        },
    })
})

const RootQueryType = new GraphQLObjectType({
    name: 'RootQuery',
    description: "Root Query",
    fields: () => ({
        books: {
            type: new GraphQLList(BookType),
            description: "List of all books",
            resolve: () =>  books
        },
        authors: {
            type: new GraphQLList(AuthorType),
            description: "List of all Authors and relevant info",
            resolve: () => authors
        },
        publishers: {
            type: new GraphQLList(PublisherType),
            description: "List of all publishers",
            resolve: () => publishers
        }
    })
})

const schema = new GraphQLSchema({
    query: RootQueryType
})



const app = express()
app.use("/graphQL", graphqlHTTP({
    graphiql: true,
    schema: schema
}) )


const PORT = 6969;

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`))