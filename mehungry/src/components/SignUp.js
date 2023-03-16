import { useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Form, FormItem } from 'react-native-form-component'

export default function SignUp({stylesProps}) {
  const [form, setForm] = useState({
    username: '',
    password: ''
  })

  return (
    <View style={stylesProps.container}>
      <Text style={stylesProps.h1}>Sign Up</Text>
      <View style={stylesProps.content}>
        <Form 
          onButtonPress={() => console.warn(form)} 
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
    </View>
  )
}