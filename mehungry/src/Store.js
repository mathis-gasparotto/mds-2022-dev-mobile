import * as SecureStore from 'expo-secure-store'

export async function saveStore(key, value) {
  await SecureStore.setItemAsync(key, value)
}

export async function getValueFor(key) {
  return await SecureStore.getItemAsync(key)
}