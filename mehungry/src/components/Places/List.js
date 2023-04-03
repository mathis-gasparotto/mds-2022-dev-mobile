import { useState } from 'react'
import { Text, View, ScrollView, Button } from 'react-native'
import { gql, useQuery } from '@apollo/client'
import * as SecureStore from 'expo-secure-store'
import { getValueFor } from '../../Store'


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

export default function List({stylesProps, navigation, route}) {
  const { loading: placesLoading, error: placesError, data: placesData } = useQuery(GET_PLACES)
  const [username, setUsername] = useState('')

  getValueFor('user').then((user) => {
    setUsername(JSON.parse(user)?.username)
  })

  const disconnect = async () => {
    await SecureStore.deleteItemAsync('token', { requireAuthentication: true })
    await SecureStore.deleteItemAsync('user', { requireAuthentication: true })
    navigation.navigate('Login')
  }

  return (
    <View style={stylesProps.container}>
      <Text style={stylesProps.h1}>Places list</Text>
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
        <View style={stylesProps.content}>
          <Text style={stylesProps.h2}>Places</Text>
          {username && <Text>Welcome back, {username}</Text>}
          {placesLoading && <Text>Loading...</Text>}
          {placesError && <Text>Error: {placesError.message}</Text>}
          {placesData && placesData.places.data.map((place) => <Text key={place.id}>{place.attributes.title}</Text>)}
          <View style={stylesProps.logoutButton}>
            <Button color='red' title='Logout' onPress={() => disconnect()} />
          </View>
        </View>
      </ScrollView>
    </View>
  )
}