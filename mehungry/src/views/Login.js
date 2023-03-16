import { StatusBar } from 'expo-status-bar'
import { useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Form, FormItem } from 'react-native-form-component'

export default function Login() {
  const [form, setForm] = useState({
    username: '',
    password: ''
  })

  return (
    <View>
      <Form onButtonPress={() => console.warn(form)} buttonStyle={styles.submitButton}>
        <FormItem
          label="username"
          isRequired
          value={form.username}
          onChangeText={(username) => setForm({
            ...form,
            username
          })}
          asterik
          textInputStyle={styles.textInput}
          />
        <FormItem
          label="password"
          isRequired
          value={form.password}
          onChangeText={(password) => setForm({
            ...form,
            password
          })}
          asterik
          textInputStyle={styles.textInput}
        />
      </Form>      
    </View>
  );
}

const styles = StyleSheet.create({
  textInput: {
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    padding: 10
  },
  submitButton: {
    backgroundColor: 'blue',
    padding: 10,
    width: 150,
    borderRadius: 5
  },
});
