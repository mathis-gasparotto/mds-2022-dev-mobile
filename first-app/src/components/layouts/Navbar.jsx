import * as React from 'react'
import { Button, StyleSheet, View } from 'react-native'


export function Navbar({ navigation }) {
  return (
    <View style={styles.container}>
      <Button
        title="Home"
        onPress={() => navigation.navigate('Home')}
      />
      <Button
        title="Todos"
        onPress={() => navigation.navigate('Todos')}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 0,
    flexDirection: 'row',
    alignItems: 'center',
  },
})
