import {gql} from '@apollo/client';

export const LOGIN_USER= gql `
mutation Login($email: String!, $password: String!) {
  login(email: $email, password: $password) {
    token
  }
}
`; 
export const ADD_USER=gql`
mutation AddUser($input: UserInput!) {
  addUser(input: $input) {
    token
  }
}
`;

export const SAVE_BOOK=gql `
mutation SaveBook($input: SaveBookInput!) {
  saveBook(input: $input) {
    _id
    username
    email
    savedBooks {
      bookId
      title
      authors
      description
      image
      link
    }
    bookCount
  }
}
`; 

export const REMOVE_BOOK=gql`
mutation RemoveBook($bookId: ID!) {
  removeBook(bookId: $bookId) {
    _id
    username
    email
    savedBooks {
      bookId
      title
      authors
      description
      image
      link
    }
    bookCount
  }
}
`;
