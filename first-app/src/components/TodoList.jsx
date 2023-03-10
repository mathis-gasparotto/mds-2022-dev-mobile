import {
  SafeAreaView,
  View,
  FlatList,
  StyleSheet,
  Text,
  StatusBar,
} from 'react-native'
import { TodoItem } from './TodoItem';

const DATA = [
  {
    id: '1',
    title: 'First Item',
    state: 'todo'
  },
  {
    id: '2',
    title: 'Second Item',
    state: 'todo'
  },
  {
    id: '3',
    title: 'Third Item',
    state: 'done'
  },
]

export function TodoList() {
  return (
    <SafeAreaView style={styles.container}>
    <FlatList
      data={DATA}
      renderItem={({item}) => <TodoItem item={item} />}
      keyExtractor={item => item.id}
    />
  </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
  },
  item: {
    backgroundColor: '#f9c2ff',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 32,
  },
})