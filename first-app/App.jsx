import * as React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { Home } from './src/views/Home'
import { Todos } from './src/views/Todos'
import { StyleSheet } from 'react-native'
import Constants from 'expo-constants'

const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer styles={styles.container}>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Todos" component={Todos} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;


const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight
  },
})
