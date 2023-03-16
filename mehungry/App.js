import { StatusBar } from 'expo-status-bar'
import { StyleSheet, View } from 'react-native'
import Login from './src/views/Login'
import Constants from 'expo-constants'

export default function App() {
  return (
    <View style={styles.container}>
      <Login />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeigh,
    height: '100%',
    width: '100%',
  },
})
