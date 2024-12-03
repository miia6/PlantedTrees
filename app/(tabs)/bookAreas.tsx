import { Text, View, StyleSheet } from 'react-native'
import Map from '../components/mapView';

export default function BookAreas() {
  return (
    <View style={styles.container}>
      <Text style={styles.title2}>Choose new area</Text>
      <View style={styles.mapContainer}><Map /></View>
      <Text style={styles.title2}>Current bookings</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  title2: {
    color: 'black',
  },
  mapContainer: {
    width: '90%',
    height: '70%',
  },
})
