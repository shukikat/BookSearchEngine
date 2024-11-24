const typeDefs=`
type Book {
bookId: ID
title: string; 
authors: string[]
description: string
image: string
link: string 


}

type Auth {
token: ID!
user: User 

}

type User{
id: string
username: string
email: string
password: String
savedBooks: BookDocument[]; 
bookCount: number
}

input UserInput {
username: String!
email: String!
password: String!
}

input saveBookInput {
authors: String[]!
description: String!
title: String!
bookId: ID!
image: String!
link: String!


}

type Query {
books: [Book]!
book(bookId: ID!): Book
me: User

}

Type Mutation {
addUser: (input: UserInput!): Auth
login:(email: String!, password: String!): Auth
saveBook: (input: saveBookInput!): User
removeBook: (bookId: ID): User



}



`

