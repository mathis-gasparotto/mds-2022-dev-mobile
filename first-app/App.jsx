import * as React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { Home } from './src/views/Home'
import { Todos } from './src/views/Todos'
import { StyleSheet } from 'react-native'
import Constants from 'expo-constants'
import { BottomTabBarHeightContext, createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import Ionicons from 'react-native-vector-icons/Ionicons'

const Tab = createBottomTabNavigator()

function App() {
  return (
    <NavigationContainer styles={styles.container}>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName

            switch(route.name) {
              case 'Home':
                iconName = focused ? 'ios-information-circle' : 'ios-information-circle-outline'
                break
              case 'Todos':
                iconName = focused ? 'ios-list' : 'ios-list-outline'
                break
            }

            return <Ionicons name={iconName} size={size} color={color} />;
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
        <Tab.Screen name="Home" component={Home} />
        <Tab.Screen name="Todos" component={Todos} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

export default App;


const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight
  },
})
