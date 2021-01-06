import React from 'react'
import ReactDOM from 'react-dom'
import { App } from './components'
import { BrowserRouter } from 'react-router-dom'

import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client'

const client = new ApolloClient({
  uri: process.env.REACT_APP_API_URL || 'http://localhost:4000/graphql/',
  cache: new InMemoryCache(),
})

const root = document.getElementById('root')

ReactDOM.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <BrowserRouter basename='/kozi-frontend'>
        <App />
      </BrowserRouter>
    </ApolloProvider>
  </React.StrictMode>,
  root
)
