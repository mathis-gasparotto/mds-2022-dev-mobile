import { StyleSheet, Text, View } from 'react-native'

export function TodoItem({item}) {
  return (
    <View style={styles.item}>
      <Text style={styles.title}>{item.title}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  item: {
    backgroundColor: '#f9c2ff',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 20,
  }
})
