import { gql } from '@apollo/client';

// export const ADD_USER = () => console.log("add user")

export const ADD_USER = gql`
mutation addUser($username: String!, $email: String!, $password: String!) {
  addUser(username: $username, email: $email, password: $password) {
    token
    user {
      _id
      username
    }
  }
}
`;

export const LOGIN_USER = gql`
  mutation loginUser($email: String!, $password: String!) {
    loginUser(email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const SAVE_BOOK = gql`
mutation SaveBook($userId: ID!, $bookId: String!, $authors: String, $title: String, $description: String, $image: String) {
  saveBook(userId: $userId, bookId: $bookId, authors: $authors, title: $title, description: $description, image: $image) {
    token
    user {
      _id
      savedBooks {
        authors
        bookId
        description
        image
        title
      }
    }
  }
}`
;


//   mutation saveBook($bookId: String!, $authors: String!, title: String!,$description: String!, image: String!) {
//     saveBook(bookId: $bookId, authors: $authors, title: $title, description: $description, image: $image) {
//       token
//       user {
//         _id
//         username
//         savedBooks {
//           bookId
//           authors
//           title
//           description
//           image
//         }
//       }
//     }
//   }
// `;