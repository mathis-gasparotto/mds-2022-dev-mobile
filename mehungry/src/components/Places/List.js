import { useState } from 'react'
import { Text, View, ScrollView, Button, StyleSheet } from 'react-native'
import { gql, useMutation, useQuery } from '@apollo/client'
import * as SecureStore from 'expo-secure-store'
import { getValueFor } from '../../Store'
import { Form, FormItem } from 'react-native-form-component'


export const GET_PLACES = gql`
  query GetPlaces {
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
`

export const DELETE_PLACE = gql`
  mutation DeletePlace($id: ID!) {
    deletePlace(id: $id) {
      data {
        id
      }
    }
  }
`

export const UPDATE_PLACE = gql`
  mutation UpdatePlace($id: ID!, $input: PlaceInput!) {
    updatePlace(id: $id, data: $input)
  }
`

function EditForm({attributes, id, setPlaceIdToEdit}) {
  const [errorMessage, setErrorMessage] = useState('')
  const [place, setPlace] = useState(attributes)
  const [EditPlace, { data, loading, error }] = useMutation(UPDATE_PLACE, {
    refetchQueries: [
      {query: GET_PLACES},
    ],
  })

  const handleEdit = async () => {
    EditPlace({
      variables: {
        id: id,
        input: {
          title: place.title,
          address: place.address,
          latitude: parseFloat(place.latitude),
          longitude: parseFloat(place.longitude),
          comment: place.comment
        }
      }
    }).then(() => {
      alert('Place edited!')
      setPlaceIdToEdit(null)
    }).catch((err) => {
      setErrorMessage(err.message)
    })
  }

  return (
    <Form 
      onButtonPress={async () => await handleEdit()}
      buttonText={loading ? 'Loading...' : 'Update'}
      style={styles.form}
      buttonStyle={styles.submitButton} 
      >
      <FormItem
        label="Title"
        isRequired
        value={place.title}
        onChangeText={(title) => setPlace({
          ...place,
          title
        })}
        asterik
        textInputStyle={styles.textInput}
        />
      <FormItem
        label="Address"
        isRequired
        value={place.address}
        onChangeText={(address) => setPlace({
          ...place,
          address
        })}
        asterik
        textInputStyle={styles.textInput}
        />
      <FormItem
        label="Latitude"
        isRequired
        value={place.latitude.toString()}
        onChangeText={(latitude) => setPlace({
          ...place,
          latitude: parseFloat(latitude)
        })}
        asterik
        textInputStyle={styles.textInput}
        />
      <FormItem
        label="Longitude"
        isRequired
        value={place.longitude.toString()}
        onChangeText={(longitude) => setPlace({
          ...place,
          longitude: parseFloat(longitude)
        })}
        asterik
        textInputStyle={styles.textInput}
      />
      {errorMessage && <Text>{errorMessage}</Text>}
    </Form>
  )
}

export default function List({stylesProps, navigation, route}) {
  const { loading: placesLoading, error: placesError, data: placesData } = useQuery(GET_PLACES)
  const [placeIdToEdit, setPlaceIdToEdit] = useState(null)
  const [DeletePlace, { loading: deleteLoading, error: deleteError, data: deleteData }] = useMutation(DELETE_PLACE, {
    refetchQueries: [
      {query: GET_PLACES},
    ],
  })
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
          {username && <Text style={styles.welcome}>Welcome back, {username}</Text>}
          {placesLoading && <Text>Loading...</Text>}
          {placesError && <Text>Error: {placesError.message}</Text>}
          {placesData && placesData.places.data.map((place) => (
            <View key={place.id} style={styles.placeContainer}>
              <View style={styles.row}>
                <Text>{place.attributes.title}</Text>
                <View style={styles.btns}>
                  <Button color='blue' title='Edit' onPress={() => setPlaceIdToEdit(place.id)} />
                  <Button color='red' title={deleteLoading ? 'Loading...' : 'Delete'} onPress={() => DeletePlace({
                    variables: {
                      id: place.id
                    }
                  }).then(() => alert('Place successfully deleted!'))} />
                </View>
              </View>
              {placeIdToEdit === place.id && <EditForm attributes={place.attributes} id={place.id} setPlaceIdToEdit={(id) => setPlaceIdToEdit(id)} />}
            </View>
          ))}
          <View style={stylesProps.logoutButton}>
            <Button color='red' title='Logout' onPress={() => disconnect()} />
          </View>
        </View>
      </ScrollView>
    </View>
  )
}

const styles = new StyleSheet.create({
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    marginBottom: 10,
  },
  welcome: {
    marginBottom: 30,
  },
  btns: {
    flexDirection: 'row',
  },
  placeContainer: {
    width: '100%',
  },
  form: {
    width: '80%',
  },
  textInput: {
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    padding: 10
  },
  submitButton: {
    backgroundColor: 'blue',
    padding: 10,
    borderRadius: 5,
    with: '100%'
  },
})