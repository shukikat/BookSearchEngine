import {gql} from '@apollo/client';

export const LOGIN_USER= gql `
mutation login($email: String!, $password:String!){
login(email: $email, password: $password){
token
user {
_id
email
}
}

}
`; 
export const ADD_USER=gql`
mutation addUser($input: UserInput!){
addUser(input:$input){
token
user{
_id
email
}
}


}

`;

export const SAVE_BOOK=gql `
mutation saveBook($input: SaveBookInput!){
saveBook(input: $input){

_id
username
email
savedBooks { // not sure these are the fields I want returned
bookId
title
authors
description
image
link

}


}

}`; 

export const REMOVE_BOOK=gql`
mutation removeBook($bookId: ID!){
removeBook(bookId: $bookId) {

   _id
    username
    email
    savedBooks { // not sure these are the fields I want returned
      bookId
      title
      authors
      description
      image
      link
    }
  }


}



`;
