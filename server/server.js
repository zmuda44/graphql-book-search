const express = require('express');
const path = require('path');
const { ApolloServer } = require('@apollo/server');
const { expressMiddleware } = require('@apollo/server/express4');
const { authMiddleware } = require('./utils/auth');


const { typeDefs, resolvers } = require('./schemas');
const db = require('./config/connection');

const app = express();
const PORT = process.env.PORT || 3001;
const server = new ApolloServer({
  typeDefs,
  resolvers
  // cors: {
  //   origin: 'http://localhost:3000',
  //   credentials: true,
  // },
});

const startApolloServer = async () => {
  await server.start();
  
  app.use(express.urlencoded({ extended: true }));
  app.use(express.json());

 const myApp = app.use('/graphql', expressMiddleware(server, {
    context: authMiddleware
  }));

//   console.log(myApp)


  // app.use('/graphql', (req, res) => {
  //   console.log(req.body.query)});
  //   mutation addUser($username: String!, $email: String!, $password: String!) {
  //     [0]   addUser(username: $username, email: $email, password: $password) {
  //     [0]     token
  //     [0]     user {
  //     [0]       _id
  //     [0]       username
  //     [0]       __typename
  //     [0]     }
  //     [0]     __typename
  //     [0]   }
  //     [0] }
  //     [0] undefined

  if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '../client/build')));

    app.get('*', (req, res) => {
      res.sendFile(path.join(__dirname, '../client/dist/index.html'));
    });
  }
  db.once('open', () => {
    app.listen(PORT, () => {
      console.log(`API server running on port ${PORT}!`);
      console.log(`Use GraphQL at http://localhost:${PORT}/graphql`);
    });
  });
};

startApolloServer();




// i think the only thing i took out was routes
// taken out from original odm code you were given
// db.once('open', () => {
//   app.listen(PORT, () => console.log(`🌍 Now listening on localhost:${PORT}`));
// });




