import { useState } from 'react'
import { ScrollView } from 'react-native'
import { StyleSheet, Text, View } from 'react-native'
import { Form, FormItem } from 'react-native-form-component'
import { ApolloProvider, gql, useMutation, useQuery } from '@apollo/client'
import * as SecureStore from 'expo-secure-store'
import { saveStore, getValueFor } from '../Store'

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

export default function SignUp({stylesProps}) {
  const [registerUser, { data, loading, error }] = useMutation(REGISTER_USER)

  const [form, setForm] = useState({
    username: '',
    email: '',
    password: ''
  })

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
            onButtonPress={() => {
              if(form.username === '' || form.email === '' || form.password === '') return alert('Please fill in all fields')
              registerUser({
                variables: {
                  input: {
                    username: form.username,
                    email: form.email,
                    password: form.password
                  }
                }
              })
              if (!error && !loading) {
                setForm({
                  username: '',
                  email: '',
                  password: ''
                })
                if (data) {
                  saveStore('token', data.login.jwt)
                  // saveStore('user', JSON.stringify(data.login.user))
                  saveStore('username', data.login.user.username)
                  // saveStore('email', data.login.user.email)
                  alert('Logged in!')
                }
              }
            }}
            buttonStyle={stylesProps.submitButton} 
            style={stylesProps.form}
            buttonText="Sign Up"
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
          </Form>
        </View>    
      </ScrollView>
    </View>
  )
}