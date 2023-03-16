import { useState } from 'react'
import { Text, View } from 'react-native'
import { Form, FormItem } from 'react-native-form-component'
import { ApolloProvider, gql, useMutation, useQuery } from '@apollo/client'
import * as SecureStore from 'expo-secure-store'
import { saveStore } from '../Store'

const LOGIN_USER = gql`
  mutation UserLogin($input: UsersPermissionsLoginInput!) {
    login(input: $input) {
      jwt
      user {
        username
        email
      }
    }
  }
`

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

export default function SignIn({stylesProps}) {
  const [loginUser, { data, loading, error }] = useMutation(LOGIN_USER)
  const { loading: placesLoading, error: placesError, data: placesData } = useQuery(GET_PLACES)

  const [form, setForm] = useState({
    username: '',
    password: ''
  })

  return (
    <View style={stylesProps.container}>
      <Text style={stylesProps.h1}>Sign In</Text>
      <View style={stylesProps.content}>
        <Form 
          onButtonPress={() => {
            if(form.identifier === '' || form.password === '') return alert('Please fill in all fields')
            loginUser({
              variables: {
                input: {
                  identifier: form.username,
                  password: form.password
                }
              }
            })
            if (!error && !loading) {
              setForm({
                username: '',
                password: ''
              })
              if (data) {
                saveStore('token', data.login.jwt)
                saveStore('username', data.login.user.username)
                saveStore('email', data.login.user.email)
                alert('Logged in!')
              }
            }
          }}
          buttonStyle={stylesProps.submitButton} 
          style={stylesProps.form}
          buttonText={loading ? 'Loading...' : 'Sign In'}
          >
          <FormItem
            label="Username"
            isRequired
            value={form.username}
            onChangeText={(username) => setForm({
              ...form,
              username
            })}
            asterik
            textInputStyle={stylesProps.textInput}
            />
          <FormItem
            label="Password"
            isRequired
            value={form.password}
            onChangeText={(password) => setForm({
              ...form,
              password
            })}
            asterik
            textInputStyle={stylesProps.textInput}
          />
        </Form>
        {error && 
          <Text style={stylesProps.error}>{error.message}</Text>
        }
        
        {placesLoading && <Text>Loading...</Text>}
        {placesError && <Text>Error: {placesError.message}</Text>}
        {placesData && placesData.places.data.map((place) => <Text key={place.id}>{place.attributes.title}</Text>)}
      </View>
    </View>
  )
}
