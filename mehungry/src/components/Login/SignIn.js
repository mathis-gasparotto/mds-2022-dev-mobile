import { useState } from 'react'
import { Text, View, ScrollView } from 'react-native'
import { Form, FormItem } from 'react-native-form-component'
import { gql, useMutation } from '@apollo/client'
import { saveStore, getValueFor } from '../../Store'
import { GET_PLACES } from '../Places/List'

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

export default function SignIn({navigation, route, stylesProps}) {
  const [loginUser, { data, loading, error }] = useMutation(LOGIN_USER)
  const [username, setUsername] = useState('')
  const [errorMessage, setErrorMessage] = useState('')

  getValueFor('user').then((user) => {
    setUsername(JSON.parse(user)?.username)
  })

  const [form, setForm] = useState({
    username: '',
    password: ''
  })

  const handleLogin = async () => {
    if(form.identifier === '' || form.password === '') return alert('Please fill in all fields')
    loginUser({
      variables: {
        input: {
          identifier: form.username,
          password: form.password,
          provider: 'local'
        }
      }
    }).then(async (res) => {
      setForm({
        username: '',
        password: ''
      })
      if (res.data) {
        await saveStore('token', res.data.login.jwt)
        await saveStore('user', JSON.stringify(res.data.login.user))
        alert('Logged in!')
        navigation.navigate('Home')
      }
    }).catch((error) => {
      setErrorMessage(error.message)
    })
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
          <Form 
            onButtonPress={async () => await handleLogin()}
            buttonStyle={stylesProps.submitButton} 
            style={stylesProps.form}
            buttonText={loading ? 'Loading...' : 'Sign In'}
            >
            <FormItem
              label="Username/email"
              isRequired
              value={form.username}
              onChangeText={(username) => setForm({
                ...form,
                username
              })}
              asterik
              textInputStyle={stylesProps.textInput}
              autoComplete='username'
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
              autoComplete='password'
              secureTextEntry
            />
          </Form>
          {errorMessage && 
            <Text style={stylesProps.error}>{errorMessage}</Text>
          }
        </View>
      </ScrollView>
    </View>
  )
}
