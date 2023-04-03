import { useState } from 'react'
import { Text, View, ScrollView, Button, StyleSheet } from 'react-native'
import { gql, useQuery } from '@apollo/client'
import * as SecureStore from 'expo-secure-store'
import { getValueFor } from '../Store'
import { auth } from '../Middleware'

const GET_PLACES = gql`
  query GetPlaces {
    places(pagination:{limit: -1}) {
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
`

export default function Home({navigation, route}) {
  const { loading: placesLoading, error: placesError, data: placesData } = useQuery(GET_PLACES)
  const [username, setUsername] = useState('')

  auth({navigation, route})

  getValueFor('user').then((user) => {
    setUsername(JSON.parse(user)?.username)
  })

  const disconnect = async () => {
    await SecureStore.deleteItemAsync('token', { requireAuthentication: true })
    await SecureStore.deleteItemAsync('user', { requireAuthentication: true })
    navigation.navigate('Login')
  }

  return (
    <View style={styles.container}>
      <Text style={styles.h1}>Home page</Text>
      <ScrollView 
        contentContainerStyle={{
          alignItems: 'center',
          justifyContent: 'center'
        }} 
        centerContent={true} 
        style={{
          width: '100%'
        }}
      >
        <View style={styles.content}>
          <Text style={styles.h2}>Places</Text>
          {username && <Text>Welcome back, {username}</Text>}
          {placesLoading && <Text>Loading...</Text>}
          {placesError && <Text>Error: {placesError.message}</Text>}
          {placesData && placesData.places.data.map((place) => <Text key={place.id}>{place.attributes.title}</Text>)}
          <View style={styles.logoutButton}>
            <Button color='red' title='Logout' onPress={() => disconnect()} />
          </View>
        </View>
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  h1: {
    fontSize: 40,
    fontWeight: 500,
    paddingVertical: 20,
    backgroundColor: '#14171c',
    width: '100%',
    textAlign: 'center',
    color: 'white'
  },
  h2: {
    fontSize: 30,
    fontWeight: 500,
    paddingVertical: 20,
    width: '100%',
    textAlign: 'center',
    color: 'black'
  },
  content: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    width: '80%',
    paddingVertical: 50,
  },
  error: {
    color: 'red',
    fontSize: 20,
    fontWeight: 500,
    paddingVertical: 20,
  },
  logoutButton: {
    marginTop: 50,
    width: '90%',
  }
})