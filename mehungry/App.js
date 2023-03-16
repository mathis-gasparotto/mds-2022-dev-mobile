import { StyleSheet, Text, View } from 'react-native'
import Login from './src/views/Login'
import Constants from 'expo-constants'
import { ApolloClient, InMemoryCache, ApolloProvider, gql, createHttpLink } from '@apollo/client'
import { setContext } from '@apollo/client/link/context'
import { useState } from 'react'
import * as SecureStore from 'expo-secure-store'

async function save(key, value) {
  await SecureStore.setItemAsync(key, value);
}

save('token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MzgsImlhdCI6MTY3ODk4MjY2MywiZXhwIjoxNjgxNTc0NjYzfQ.bBY10puVe55zXO9Q5xGznO1q-yDBNAtPpuHcC5wDI6E')

async function getValueFor(key) {
  return await SecureStore.getItemAsync(key)
}

const httpLink = createHttpLink({
  uri: 'https://digitalcampus.nerdy-bear.com/graphql',
  credentials: 'include'
})

const authLink = setContext(async (_, { headers }) => {
  const token = await getValueFor('token')
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    }
  }
})

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache()
});

export default function App() {
  const [places, setPlaces] = useState([])

  client
  .query({
    query: gql`{
      places(pagination: {limit: -1}) {
        data {
          id
          attributes {
            title
            address
            latitude
            longitude
            comment
          }
        }
      }
    }
    `,
  })
  .then((result) => setPlaces(result.data.places.data));
  return (
    <View style={styles.container}>
      <Login />
      {places.map((place) => (
        <Text key={place.id}>{place.attributes.title}</Text>
      ))}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeigh,
    height: '100%',
    width: '100%',
  },
})
