import { useState } from 'react'
import { Text, View, ScrollView, Button, StyleSheet } from 'react-native'
import { gql, useMutation, useQuery } from '@apollo/client'
import { Form, FormItem } from 'react-native-form-component'
import { GET_PLACES } from './List'


export const GET_PLACE = gql`
  query GetPlace($id: ID) {
    place(id: $id) {
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

const DELETE_PLACE = gql`
  mutation DeletePlace($id: ID!) {
    deletePlace(id: $id) {
      data {
        id
      }
    }
  }
`

const UPDATE_PLACE = gql`
  mutation UpdatePlace($id: ID!, $input: PlaceInput!) {
    updatePlace(id: $id, data: $input) {
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

function EditForm({attributes, setShowEditForm, id}) {
  const [place, setPlace] = useState(attributes)
  const [EditPlace, { data, loading, error }] = useMutation(UPDATE_PLACE, {
    refetchQueries: [
      {query: GET_PLACES},
      {query: GET_PLACE},
    ],
  })

  const handleEdit = async () => {
    EditPlace({
      variables: {
        id,
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
      setShowEditForm(false)
    }).catch((err) => {
      alert(err.message)
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
        value={place.latitude ? place.latitude.toString() : ''}
        onChangeText={(latitude) => setPlace({
          ...place,
          latitude: latitude
        })}
        asterik
        textInputStyle={styles.textInput}
        keyboardType='phone-pad'
        />
      <FormItem
        label="Longitude"
        isRequired
        value={place.longitude ? place.longitude.toString() : ''}
        onChangeText={(longitude) => setPlace({
          ...place,
          longitude: longitude
        })}
        asterik
        textInputStyle={styles.textInput}
        keyboardType='phone-pad'
      />
    </Form>
  )
}

export default function Item({stylesProps, navigation, route}) {
  const { loading: placeLoading, error: placeError, data: placeData } = useQuery(GET_PLACE, {
    variables: { id: route.params?.id },
  })
  const [DeletePlace, { loading: deleteLoading, error: deleteError, data: deleteData }] = useMutation(DELETE_PLACE, {
    refetchQueries: [
      {query: GET_PLACES}
    ],
  })
  const [showEditForm, setShowEditForm] = useState(false)

  return (
    <View style={stylesProps.container}>
      <Text style={stylesProps.h1}>Single Place</Text>
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
        <View style={stylesProps.wrapper}>
          {placeLoading && <Text>Loading...</Text>}
          {placeError && <Text>Error: {placeError.message}</Text>}
          {placeData && 
            <View style={stylesProps.content}>
              <Text>Title: {placeData.place.data.attributes.title}</Text>
              <Text>Address: {placeData.place.data.attributes.address}</Text>
              <Text>Latitude: {placeData.place.data.attributes.latitude}</Text>
              <Text>Longitude: {placeData.place.data.attributes.longitude}</Text>
              <View style={styles.btns}>
                <Button color='blue' title='Edit' onPress={() => setShowEditForm(true)} />
                <Button color='red' title={deleteLoading ? 'Loading...' : 'Delete'} onPress={() => DeletePlace({
                    variables: {
                      id: placeData.place.data.id
                    }
                  }).then(() => {
                    alert('Place successfully deleted!')
                    navigation.navigate('ListPlaces')
                  }).catch((err) => {
                    alert(err.message)
                  })
                  } 
                />
              </View>
              {showEditForm && <EditForm attributes={placeData.place.data.attributes} id={placeData.place.data.id} setShowEditForm={(data) => setShowEditForm(data)} />}
            </View>
          }
        </View>
      </ScrollView>
    </View>
  )
}

const styles = new StyleSheet.create({
  btns: {
    flexDirection: 'row',
    gap: 10,
    marginVertical: 20
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