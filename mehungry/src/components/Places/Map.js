import { useQuery } from '@apollo/client'
import { Text, View, ScrollView, StyleSheet } from 'react-native'
import MapView, { Callout, Marker } from 'react-native-maps'
import { GET_PLACES } from './List'


export default function Map({stylesProps, navigation, route}) {
  const { loading: placesLoading, error: placesError, data: placesData } = useQuery(GET_PLACES)

  return (
    <View style={stylesProps.container}>
      <Text style={stylesProps.h1}>Map</Text>
      <ScrollView 
        contentContainerStyle={{
          alignItems: 'center',
          justifyContent: 'center',
          flex: 1
        }} 
        centerContent={true} 
        style={{
          width: '100%'
        }}
      >
        {placesLoading && <Text>Loading...</Text>}
        {placesData && <MapView style={styles.map}>
          {placesData.places.data.map((place) => (
            place.attributes.latitude >= -85 &&
            place.attributes.latitude <= 85 &&
            place.attributes.longitude >= -180 &&
            place.attributes.longitude <= 180
            ) &&
              <Marker
                key={place.id}
                coordinate={{
                  latitude: place.attributes.latitude,
                  longitude: place.attributes.longitude,
                }}
                title={place.attributes.title}
                description={place.attributes.address}
              >
                <Callout onPress={() => navigation.navigate('ItemPlace', { id: place.id })}>
                  <View style={stylesProps.calloatContainer}>
                    <Text style={stylesProps.calloatTitle}>{place.attributes.title}</Text>
                    <Text style={stylesProps.calloatAddress}>{place.attributes.address}</Text>
                  </View>
                </Callout>
              </Marker>
          )}
        </MapView>}
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  map: {
    width: '100%',
    height: '100%',
  }
})
