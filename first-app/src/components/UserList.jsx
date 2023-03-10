import { StyleSheet, Text, View } from 'react-native'

export function UserList() {
  return (
    <View style={styles.container}>
      <Text style={styles.h1}>Todo List</Text>
      <View style={styles.content}>
        <Text>Users</Text>
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
