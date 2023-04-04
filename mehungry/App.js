import { StyleSheet, View } from 'react-native'
import Login from './src/views/Login'
import Constants from 'expo-constants'
import { ApolloClient, InMemoryCache, ApolloProvider, createHttpLink } from '@apollo/client'
import { setContext } from '@apollo/client/link/context'
import { getValueFor } from './src/Store'
import Home from './src/views/Home'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { NavigationContainer } from '@react-navigation/native'
import { useState } from 'react'

const httpLink = createHttpLink({
  uri: 'https://digitalcampus.nerdy-bear.com/graphql',
  credentials: 'include'
})

const authLink = setContext(async (_, { headers }) => {
  const token = await getValueFor('token')
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    }
  }
})

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache()
})

const Stack = createNativeStackNavigator()

export default function App() {
      
  return (
    <ApolloProvider client={client}>
      <View style={styles.container}>
        <NavigationContainer>
          <Stack.Navigator screenOptions={({ route }) => ({headerShown: false})} initialRouteName='Login'>
            <Stack.Screen name="Home" component={Home} />
            <Stack.Screen name="Login" component={Login} />
          </Stack.Navigator>
        </NavigationContainer>
      </View>
    </ApolloProvider>
  )
}

const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeigh,
    height: '100%',
    width: '100%',
  },
})
