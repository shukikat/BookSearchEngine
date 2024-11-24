const typeDefs=`
type Book {
bookId: ID!
title: String! 
authors: [String!]!
description: String!
image: String
link: String


}

type Auth {
token: ID!
user: User 

}

type User{
_id: string
username: String!
email: String!
savedBooks: [Book!]!
bookCount: Int!
}

input UserInput {
username: String!
email: String!
password: String!
}

input SaveBookInput {
authors: [String!]
description: String!
title: String!
bookId: ID!
image: String!
link: String!


}

type Query {
me: User
user(username: String!): User

}

Type Mutation {
addUser: (input: UserInput!): Auth
login:(email: String!, password: String!): Auth
saveBook: (input: SaveBookInput!): User
removeBook: (bookId: ID!): User



}

export default typeDefs; 



`

