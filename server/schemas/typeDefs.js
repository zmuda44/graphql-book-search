const typeDefs = `
  # Define which fields are accessible from the Class model
  type User {
    _id: ID
    username: String
    email: String
    savedBooks: [Book]
  }

  type Book {
    authors: [String]
    description: String
    bookId: String
    image: String
    title: String
    }

  # Define which queries the front end is allowed to make and what data is returned
  type Query {
    users: [User]
    books: [Book]
  }
`;

module.exports = typeDefs;





//chat gpt
// const { gql } = require('apollo-server-express');

// const typeDefs = gql`
//   type Book {
//     authors: [String]
//     description: String
//     bookId: String
//     image: String
//     link: String
//     title: String
//   }

//   type User {
//     _id: ID
//     username: String
//     email: String
//     password: String
//     savedBooks: [Book]
//   }

//   type Query {
//     users: [User]
//     books: [Book]
//     user(username: String!): User
//     book(bookId: String!): Book
//   }

//   type Mutation {
//     addUser(username: String!, email: String!, password: String!): User
//     addBook(userId: ID!, book: BookInput!): User
//     removeBook(userId: ID!, bookId: String!): User
//   }

//   input BookInput {
//     authors: [String]
//     description: String
//     bookId: String
//     image: String
//     link: String
//     title: String
//   }
// `;

// module.exports = typeDefs;
