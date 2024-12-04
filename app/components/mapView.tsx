import React from 'react';
import MapView, { Marker }from 'react-native-maps';
import { Platform, StyleSheet, View } from 'react-native';

type MarkerState = 'reserved' | 'reserved_by_me' | 'available';

export default function Map() {

  const markers = [
    { id: 1, coordinate: { latitude: 9.004631, longitude: 38.022385 }, state: 'available' },
    { id: 2, coordinate: { latitude: 9.504631, longitude: 38.122385 }, state: 'reserved_by_me' },
    { id: 3, coordinate: { latitude: 9.204631, longitude: 37.522385 }, state: 'available' },
    { id: 4, coordinate: { latitude: 8.804631, longitude: 38.522385 }, state: 'reserved' },
    { id: 5, coordinate: { latitude: 8.604631, longitude: 38.522385 }, state: 'reserved_by_me' },
    { id: 6, coordinate: { latitude: 8.604631, longitude: 38.122385 }, state: 'available' },
    { id: 7, coordinate: { latitude: 8.694631, longitude: 38.022385 }, state: 'available' },
    { id: 8, coordinate: { latitude: 8.404631, longitude: 37.322385 }, state: 'reserved' },
    { id: 9, coordinate: { latitude: 8.204631, longitude: 37.522385 }, state: 'available' },
    { id: 10, coordinate: { latitude: 8.104631, longitude: 38.222385 }, state: 'reserved' },
    { id: 11, coordinate: { latitude: 9.704631, longitude: 38.722385 }, state: 'available' },
    { id: 12, coordinate: { latitude: 9.704631, longitude: 38.022385 }, state: 'available' },
    { id: 13, coordinate: { latitude: 9.804631, longitude: 37.522385 }, state: 'reserved' },
    { id: 14, coordinate: { latitude: 9.704631, longitude: 37.502385 }, state: 'available' },
    { id: 13, coordinate: { latitude: 9.014631, longitude: 37.422385 }, state: 'available' },
    { id: 13, coordinate: { latitude: 8.604631, longitude: 37.722385 }, state: 'available' },
  ];

  const getMarkerStyle = (state: MarkerState) => {
    switch (state) {
      case 'reserved':
        return styles.redCircle;
      case 'reserved_by_me':
        return styles.yellowCircle;
      case 'available':
        return styles.greenCircle;
      default:
        return styles.greenCircle;
    }
  };

  if (Platform.OS === 'web') {
    return (
      <View style={styles.map}>
        <Text>Maps are not supported on the web yet. Please use a mobile device to view the map.</Text>
      </View>
    );
  }

  return (
    <MapView
      style={styles.map}
      initialRegion={{
        latitude: 9.004631,
        longitude: 38.022385,
        latitudeDelta: 1.5,
        longitudeDelta: 1.5,
      }}
    >
      {markers.map((marker) => (
        <Marker key={marker.id} coordinate={marker.coordinate}>
          <View style={getMarkerStyle(marker.state)} />
        </Marker>
      ))}
    </MapView>
  );
}

const styles = StyleSheet.create({
  map: {
    flex: 1, // Fullscreen coverage
    width: '100%',
    height: '100%',
  },
  redCircle: {
    width: 20,
    height: 20,
    backgroundColor: 'red',
    borderRadius: 10, // Makes it a circle
    borderWidth: 2,
    borderColor: 'white', // Optional: add a border for better visibility
  },
  yellowCircle: {
    width: 20,
    height: 20,
    backgroundColor: 'yellow',
    borderRadius: 10,
    borderWidth: 2,
    borderColor: 'white',
  },
  greenCircle: {
    width: 20,
    height: 20,
    backgroundColor: 'green',
    borderRadius: 10,
    borderWidth: 2,
    borderColor: 'white',
  },
});
