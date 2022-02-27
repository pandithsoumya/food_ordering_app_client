import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom'
import { ApolloProvider, ApolloClient, createHttpLink, InMemoryCache } from '@apollo/client'
import App from './App';
import { setContext } from '@apollo/client/link/context'

const httpLink = new createHttpLink({
  uri : 'http://localhost:4200/graphql' ,
  credentials: "same-origin"
})

const authLink = setContext(({_,headers}) => {
  /**
   * Fetch the JWT token stored in the localstorage
   */
  const token = window.localStorage.getItem('token')

  /**
   * Add the token from the local storage to each GraphQL request
   * The token will be added under authorization property
   * Every request to the server will carry the token if stored in the local storage
   */
  return {
    headers: {
      ...headers,
      authorization:  token ? `${token}` : "",
    }
  }
})

/*Initialize the Apollo Client */

const apolloClient = new ApolloClient({
  link: authLink.concat(httpLink),
  cache : new InMemoryCache(),
  
})

const routerBasename = process.env.NODE_ENV === 'production' ? "/orderyourfood" : "/"

ReactDOM.render(
  <React.StrictMode>
      <ApolloProvider client={apolloClient}> 
     <BrowserRouter basename={routerBasename}>
  <App />
    </BrowserRouter>
     </ApolloProvider> 
  </React.StrictMode>
 ,
  document.getElementById('root')
);


