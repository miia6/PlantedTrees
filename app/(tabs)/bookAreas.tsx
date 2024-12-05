import { useState } from 'react'
import { Text, View, StyleSheet, TouchableOpacity, ScrollView } from 'react-native'
import Map from '../components/mapView'
import { markers } from '../data/markerData'



export default function BookAreas() {
  const [localMarkers, setLocalMarkers] = useState(markers)
  const currentBookings = localMarkers.filter((marker) => marker.state === 'reserved_by_me')

  const handleButtonPress = (id: number) => {
    setLocalMarkers((prevMarkers) => 
      prevMarkers.map((marker) =>
        marker.id === id ? { ...marker, state: 'available' } : marker
      )
    )
  }

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      <Text style={styles.title2}>Choose new area</Text>
      <View style={styles.mapContainer}><Map markers={localMarkers} setMarkers={setLocalMarkers}/></View>
      <Text style={styles.title2}>Current bookings</Text>
      
      {currentBookings.map(marker => (
        <View key={marker.id} style={styles.currentBooking}>
          <Text style={styles.detailsHeader}>Location {marker.id}</Text>
          <Text style={styles.detailsText}>Compensation: {marker.compensation}</Text>
          <Text style={styles.detailsText}>Time left: {marker.id} days</Text>
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.button} onPress={() => handleButtonPress(marker.id)}>
              <Text style={styles.buttonText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      ))}
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 6,
    flex: 1,
  },
  contentContainer: {
    paddingHorizontal: 6,
    paddingBottom: 20,
  },
  title2: {
    fontSize: 20,
    marginBottom: 2,
    marginTop: 9,
    marginLeft: 13,
    color: '#333',
    fontWeight: '600',
  },
  mapContainer: {
    alignSelf: 'center',
    width: '95%',
    height: 450,
  },
  currentBooking: {
    position: 'relative',
    alignSelf: 'center',
    width: '90%',
    height: 115,
    padding: 3,
    margin: 3,
    backgroundColor: '#ccc',
  },
  detailsHeader: {
    fontWeight: 'bold',
    marginVertical: 1.5,
    fontSize: 17,
  },
  detailsText: {
    fontSize: 16,
    marginVertical: 1.5,
    paddingLeft: 5,
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 8,
    right: 10,
  },  
  button: {
    width: 130,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
    backgroundColor: '#468364',
    },
  buttonText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  },
})
