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
      <Text style={styles.title3}>Current bookings</Text>
      
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
    backgroundColor: 'white',
  },
  contentContainer: {
    paddingHorizontal: 4,
    paddingBottom: 20,
  },
  title2: {
    fontSize: 20,
    marginBottom: 6,
    marginTop: 4,
    marginLeft: 13,
    color: '#333',
    fontWeight: '700',
  },
  title3: {
    fontSize: 20,
    marginBottom: 6,
    marginTop: 16,
    marginLeft: 13,
    color: '#333',
    fontWeight: '700',
  },
  mapContainer: {
    alignSelf: 'center',
    width: '95%',
    height: 430,
  },
  currentBooking: {
    position: 'relative',
    alignSelf: 'center',
    width: '95%',
    height: 'auto',
    padding: 10,
    marginBottom: 14,
    backgroundColor: '#8EAA8E',
    borderRadius: 8,
    shadowColor: '#000', 
    shadowOffset: { width: 0, height: 2 }, 
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  detailsHeader: {
    fontWeight: 800,
    color: "white",
    marginBottom: 2,
    marginLeft: 8,
    fontSize: 17,
  },
  detailsText: {
    fontSize: 16,
    fontWeight: 500,
    marginVertical: 1.5,
    paddingLeft: 14,
    color: "white",
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 10,
    right: 12,
  },  
  button: {
    width: 112,
    height: 32,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
    backgroundColor: '#CDF2CD',
    shadowColor: '#000', 
    shadowOffset: { width: 0, height: 1.5 }, 
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    },
  buttonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#232F30',
  },
})
