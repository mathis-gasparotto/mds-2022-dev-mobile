import { StyleSheet, Text, View } from 'react-native'
import Login from './src/views/Login'
import Constants from 'expo-constants'
import { ApolloClient, InMemoryCache, ApolloProvider, gql, createHttpLink, useMutation, useQuery } from '@apollo/client'
import { setContext } from '@apollo/client/link/context'
import { useState } from 'react'
import * as SecureStore from 'expo-secure-store'
import { getValueFor } from './src/Store'

const httpLink = createHttpLink({
  uri: 'https://digitalcampus.nerdy-bear.com/graphql',
  credentials: 'include'
})

const authLink = setContext(async (_, { headers }) => {
  const token = await getValueFor('token')
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    }
  }
})

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache()
})

export default function App() {
  const [places, setPlaces] = useState([])
  
  return (
    <ApolloProvider client={client}>
      <View style={styles.container}>
        <Login />
      </View>
    </ApolloProvider>
  )
}

const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeigh,
    height: '100%',
    width: '100%',
  },
})
