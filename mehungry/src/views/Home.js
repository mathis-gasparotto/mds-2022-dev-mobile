import { auth } from '../Middleware'
import Places from './Places'

export default function Home({navigation, route}) {

  auth({navigation, route})

  return <Places navigation={navigation} route={route} />
}