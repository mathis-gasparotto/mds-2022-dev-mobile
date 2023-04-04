import { useState } from 'react'
import { Text, View, ScrollView, Button, StyleSheet } from 'react-native'
import { gql, useQuery } from '@apollo/client'
import * as SecureStore from 'expo-secure-store'
import { getValueFor } from '../Store'
import { auth } from '../Middleware'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import List from '../components/Places/List'
import Add from '../components/Places/Add'
import Icon from '@expo/vector-icons/SimpleLineIcons'
import Item from '../components/Places/Item'
import { createNativeStackNavigator } from '@react-navigation/native-stack'


const Tab = createBottomTabNavigator()

const Stack = createNativeStackNavigator()

function ListScreen({navigation, route}) {
  return <List stylesProps={styles} navigation={navigation} route={route} />
}

function ItemScreen({navigation, route}) {
  return <Item stylesProps={styles} navigation={navigation} route={route} />
}

function ViewScreen({navigation, route}) {
  return (
    <Stack.Navigator screenOptions={({ route }) => ({headerShown: false})} initialRouteName='List'>
      <Stack.Screen name="ListPlaces" component={ListScreen} />
      <Stack.Screen name="ItemPlace" component={ItemScreen} />
    </Stack.Navigator>
  )
}

function AddScreen({navigation, route}) {
  return <Add stylesProps={styles} navigation={navigation} route={route} />
}

export default function Places({navigation, route}) {
  const [username, setUsername] = useState('')

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarIcon: ({ focused, color, size }) => {
          let iconName

          switch(route.name) {
            case 'List':
              iconName = 'list'
              break
            case 'Add':
              iconName = 'plus'
              break
          }

          return <Icon name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#fbb03b',
        tabBarInactiveTintColor: '#ededed',
        tabBarStyle: {
          backgroundColor: '#14171c',
          height: 60,
          paddingBottom: 10,
          paddingTop: 10,
        }
      })}
    >
      <Tab.Screen 
        name="List" 
        component={ViewScreen} 
        options={{ 
          tabBarLabel: 'List',
          title: 'List'
        }} 
        />
      <Tab.Screen 
        name="Add" 
        component={AddScreen}
        options={{
          tabBarLabel: 'Add',
          title: 'Add'

        }} />
    </Tab.Navigator>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  h1: {
    fontSize: 40,
    fontWeight: 500,
    paddingVertical: 20,
    backgroundColor: '#14171c',
    width: '100%',
    textAlign: 'center',
    color: 'white'
  },
  h2: {
    fontSize: 30,
    fontWeight: 500,
    paddingVertical: 20,
    width: '100%',
    textAlign: 'center',
    color: 'black'
  },
  content: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    width: '80%',
    paddingVertical: 50,
  },
  wrapper: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    width: '80%',
    paddingVertical: 50,
  },
  error: {
    color: 'red',
    fontSize: 20,
    fontWeight: 500,
    paddingVertical: 20,
  },
  logoutButton: {
    marginTop: 50,
    width: '90%',
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
  }
})