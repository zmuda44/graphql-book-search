import './App.css';
import { Outlet } from 'react-router-dom';
import { ApolloClient, ApolloProvider, InMemoryCache, createHttpLink } from '@apollo/client';

import Navbar from './components/Navbar';

// const httpLink = new createHttpLink({
//   uri: '/graphql',
//   cache: new InMemoryCache(),
// });

const client = new ApolloClient({
  uri: 'http://localhost:3001/graphql',
  cache: new InMemoryCache(),
});

function App() {
  return (
    <>
    <ApolloProvider client={client}>
      <Navbar />
      <Outlet />
    </ApolloProvider>
    </>
  );
}

export default App;
