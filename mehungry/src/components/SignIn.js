import { useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Form, FormItem } from 'react-native-form-component'
import Ionicons from 'react-native-vector-icons/Ionicons'

export default function SignIn({stylesProps}) {
  const [form, setForm] = useState({
    username: '',
    password: ''
  })

  return (
    <View style={stylesProps.container}>
      <Text style={stylesProps.h1}>Sign In</Text>
      <View style={stylesProps.content}>
        <Form 
          onButtonPress={() => console.warn(form)} 
          buttonStyle={stylesProps.submitButton} 
          style={stylesProps.form}
          buttonText="Sign In"
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
      </View>
    </View>
  )
}
