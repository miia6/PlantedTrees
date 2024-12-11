import { Text, View, StyleSheet, ScrollView } from 'react-native'
import Ionicons from '@expo/vector-icons/Ionicons'
import MapView, { Marker } from 'react-native-maps'


export default function SeedingCollection() {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.longButtonElement}>
        <Ionicons name="home-outline" color="white" size={45}></Ionicons>
        <Text style={styles.buttonText}>
          Your current location is Asgori Village, Kebele 12.
          You have 3 collection points within 7 km.
        </Text>
      </View>

      <View style={styles.h3Container}>
        <Text style={styles.h3}>Collection point</Text>
        <Text style={styles.h3}>Next collection</Text>
      </View>

      <View style={styles.collectionPointElement}>
        <View style={styles.address}>
          <Ionicons name="location-outline" color="white" size={26}></Ionicons>
          <Text style={styles.text}>Wanza Market{"\n"}
          Distance: 2 km</Text>
        </View>
        <Text style={[styles.nextCollection, styles.text]}>Today: 1-4 pm</Text>
      </View>
      <View style={styles.collectionPointElement}>
        <View style={styles.address}>
          <Ionicons name="location-outline" color="white" size={26}></Ionicons>
          <Text style={styles.text}>Main Road Seed Depot{"\n"}
          Distance: 4 km</Text>
        </View>
        <Text style={[styles.nextCollection, styles.text]}>Today: 2-4 pm</Text>
      </View>
      <View style={styles.collectionPointElement}>
        <View style={styles.address}>
          <Ionicons name="location-outline" color="white" size={26}></Ionicons>
          <Text style={styles.text}>St. Mary Church{"\n"}
          Distance: 7 km</Text>
        </View>
        <Text style={[styles.nextCollection, styles.text]}>Tomorrow: 8-11 am</Text>
      </View>

      <View style={styles.ellipsis}><Ionicons name="ellipsis-horizontal" color="black" size={30}></Ionicons></View>
      
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: 9.004631,
          longitude: 38.012385,
          latitudeDelta: 0.5,
          longitudeDelta: 0.5,
        }}
      >
        <Marker coordinate={{ latitude: 8.965031, longitude: 38.022385 }}></Marker>
        <Marker coordinate={{ latitude: 9.06031, longitude: 38.0900 }}></Marker>
        <Marker coordinate={{ latitude: 9.034631, longitude: 37.8722385 }}></Marker>
        <Marker coordinate={{ latitude: 9.000031, longitude: 37.91 }}><View style={styles.currentLocation}/></Marker>
      </MapView>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    padding: 15,
  },
  longButtonElement: {
    flexDirection: 'row',
    margin: 5,
    padding: 20,
    alignItems:'center',
    justifyContent: 'center',
    backgroundColor: '#8EAA8E',
    borderRadius: 16,
    height: 'auto',
  },
  collectionPointElement: {
    flexDirection: 'row',
    margin: 5,
    paddingVertical: 15,
    alignItems:'flex-start',
    justifyContent: 'center',
    backgroundColor: '#8EAA8E',
    borderRadius: 16,
    height: 'auto',
  },
  buttonText: {
    padding: 16,
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  h3Container: {
    flexDirection: 'row',
    alignItems:'center',
    justifyContent: 'center',
    marginTop: 10,
    marginBottom: 3,
  },
  h3: {
    color: 'black',
    fontSize: 18,
    fontWeight: 'bold',
    marginHorizontal: 32,
    marginTop: 8,
  },
  address: {
    flexDirection: 'row',
    flex: 3,
    paddingHorizontal: 10,
  },
  nextCollection: {
    flex: 2,
  },
  text: {
    color: 'white',
    paddingHorizontal: 5,
    fontSize: 15,
  },
  ellipsis: {
    alignItems:'center',
    justifyContent: 'center',
  },
  map: {
    alignItems:'center',
    justifyContent: 'center',
    height: 400,
    width: '100%',
    borderRadius: 8,
    marginBottom: 30
  },
  currentLocation: {
    width: 22,
    height: 22,
    borderRadius: 30,
    borderWidth: 3,
    borderColor: 'white',
    backgroundColor: '#007AFF',
  },
})
