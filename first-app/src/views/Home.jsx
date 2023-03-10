import { StyleSheet, Text, View } from 'react-native'
import { Navbar } from '../components/layouts/Navbar'

export function Home({navigation}) {
  return (
    <View style={styles.container}>
      <Navbar navigation={navigation}/>
      <Text style={styles.h1}>Home</Text>
      <View style={styles.content}>
        <Text>Coucou</Text>
      </View>
    </View>
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
  content: {
    flex: 0
  }
})
