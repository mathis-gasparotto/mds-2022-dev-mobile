import { useState } from 'react'
import { ScrollView } from 'react-native'
import { Text, View } from 'react-native'
import { Form, FormItem } from 'react-native-form-component'
import { gql, useMutation } from '@apollo/client'
import { saveStore } from '../../Store'

const REGISTER_USER = gql`
  mutation UserRegister($input: UsersPermissionsRegisterInput!) {
    register(input: $input) {
      jwt
      user {
        username,
        email
      }
    }
  }
`

export default function SignUp({navigation, route, stylesProps}) {
  const [registerUser, { data, loading, error }] = useMutation(REGISTER_USER)
  const [errorMessage, setErrorMessage] = useState('')

  const [form, setForm] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  })

  const handleRegister = async () => {
    if(form.username === '' || form.email === '' || form.password === '' || form.confirmPassword === '') return alert('Please fill in all fields')
    if(form.password !== form.confirmPassword) return alert('Please confirm your password')
    registerUser({
      variables: {
        input: {
          username: form.username,
          email: form.email,
          password: form.password
        }
      }
    }).then(async (res) => {
      setForm({
        username: '',
        email: '',
        password: '',
        confirmPassword: ''
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
      <Text style={stylesProps.h1}>Sign Up</Text>
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
            onButtonPress={async () => await handleRegister()}
            buttonStyle={stylesProps.submitButton} 
            style={stylesProps.form}
            buttonText={loading ? 'Loading...' : 'Sign Up'}
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
              label="Email"
              isRequired
              value={form.email}
              onChangeText={(email) => setForm({
                ...form,
                email
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
            <FormItem
              label="Confirm password"
              isRequired
              value={form.confirmPassword}
              onChangeText={(confirmPassword) => setForm({
                ...form,
                confirmPassword
              })}
              asterik
              textInputStyle={stylesProps.textInput}
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