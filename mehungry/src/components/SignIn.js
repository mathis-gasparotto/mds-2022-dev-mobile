import { useState } from 'react'
import { Text, View, ScrollView, Button } from 'react-native'
import { Form, FormItem } from 'react-native-form-component'
import { ApolloProvider, gql, useMutation, useQuery } from '@apollo/client'
import * as SecureStore from 'expo-secure-store'
import { saveStore, getValueFor } from '../Store'

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

async function disconnect () {
  await SecureStore.deleteItemAsync('token', { requireAuthentication: true })
  // await SecureStore.deleteItemAsync('username', { requireAuthentication: true })
  await SecureStore.deleteItemAsync('user', { requireAuthentication: true })
}

export default function SignIn({stylesProps}) {
  const [loginUser, { data, loading, error }] = useMutation(LOGIN_USER)
  const { loading: placesLoading, error: placesError, data: placesData } = useQuery(GET_PLACES)
  const [username, setUsername] = useState('')

  getValueFor('user').then((user) => {
    setUsername(JSON.parse(user)?.username)
  })

  const [form, setForm] = useState({
    username: '',
    password: ''
  })

  const handleLogin = async () => {
    if(form.identifier === '' || form.password === '') return alert('Please fill in all fields')
    const res = await loginUser({
      variables: {
        input: {
          identifier: form.username,
          password: form.password,
          provider: 'local'
        }
      }
    })
    setForm({
      username: '',
      password: ''
    })
    if (res.data) {
      await saveStore('token', res.data.login.jwt)
      await saveStore('user', JSON.stringify(res.data.login.user))
      alert('Logged in!')
    }
  }

  return (
    <View style={stylesProps.container}>
      <Text style={stylesProps.h1}>Sign In</Text>
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
          {username && <Text>Welcome back, {username}</Text>}
          <Form 
            onButtonPress={async () => await handleLogin()}
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
          <Button color='red' title='Logout' onPress={() => disconnect()} />
        </View>
      </ScrollView>
    </View>
  )
}
