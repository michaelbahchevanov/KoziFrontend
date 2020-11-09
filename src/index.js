import React from 'react';
import ReactDOM from 'react-dom';
import { App } from './components';

import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";

const client = new ApolloClient({
    uri: "http://localhost:4000/graphql/",
    cache: new InMemoryCache()
  });

const root = document.getElementById('root');

ReactDOM.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  </React.StrictMode>,
  root
);
