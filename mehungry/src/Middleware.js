import { getValueFor } from "./Store"

export function auth({navigation, route}) {
  getValueFor('token').then((token) => {
    if(!token) {
      navigation.navigate('Login')
    }
  })
}

export function guest({navigation, route}) {
  getValueFor('token').then((token) => {
    if(token) {
      navigation.navigate('Home')
    }
  })
}