import React, { useState } from 'react';
import MapView, { Marker } from 'react-native-maps';
import { Platform, StyleSheet, View, Text, Button, TouchableOpacity } from 'react-native';

type MarkerState = 'reserved' | 'reserved_by_me' | 'available';
type TreeType = 'Eucalyptus' | 'Mango' | 'Acacia' | 'Teak' | 'Moringa' | 'Cashew' | 'Grevillea'

type MarkerType = {
  id: number;
  coordinate: { latitude: number; longitude: number };
  state: MarkerState;
  area: string;
  treeType: TreeType;
  treeAmount: number;
  compensation: string;
};

export default function Map() {
  const [markers, setMarkers] = useState<MarkerType[]>([
    { id: 1, coordinate: { latitude: 9.004631, longitude: 38.022385 }, state: 'available', area: '40m²', treeType: 'Eucalyptus', treeAmount: 9, compensation: '180 SSP' },
    { id: 2, coordinate: { latitude: 9.504631, longitude: 38.122385 }, state: 'reserved_by_me', area: '90m²', treeType: 'Mango', treeAmount: 14, compensation: '220 SSP' },
    { id: 3, coordinate: { latitude: 9.204631, longitude: 37.522385 }, state: 'available', area: '100m²', treeType: 'Acacia', treeAmount: 20, compensation: '290 SSP' },
    { id: 4, coordinate: { latitude: 8.804631, longitude: 38.522385 }, state: 'reserved', area: '230m²', treeType: 'Teak', treeAmount: 32, compensation: '420 SSP' },
    { id: 5, coordinate: { latitude: 8.604631, longitude: 38.522385 }, state: 'reserved_by_me', area: '110m²', treeType: 'Moringa', treeAmount: 18, compensation: '300 SSP' },
    { id: 6, coordinate: { latitude: 8.604631, longitude: 38.122385 }, state: 'available', area: '200m²', treeType: 'Cashew', treeAmount: 23, compensation: '320 SSP' },
    { id: 7, coordinate: { latitude: 8.694631, longitude: 38.022385 }, state: 'available', area: '140m²', treeType: 'Eucalyptus', treeAmount: 19, compensation: '260 SSP' },
    { id: 8, coordinate: { latitude: 8.404631, longitude: 37.322385 }, state: 'reserved', area: '140m²', treeType: 'Grevillea', treeAmount: 11, compensation: '240 SSP' },
    { id: 9, coordinate: { latitude: 8.204631, longitude: 37.522385 }, state: 'available', area: '190m²', treeType: 'Eucalyptus', treeAmount: 16, compensation: '220 SSP' },
    { id: 10, coordinate: { latitude: 8.104631, longitude: 38.222385 }, state: 'reserved', area: '150m²', treeType: 'Mango', treeAmount: 14, compensation: '290 SSP' },
    { id: 11, coordinate: { latitude: 9.704631, longitude: 38.722385 }, state: 'available', area: '200m²', treeType: 'Acacia', treeAmount: 19, compensation: '290 SSP' },
    { id: 12, coordinate: { latitude: 9.704631, longitude: 38.022385 }, state: 'available', area: '110m²', treeType: 'Teak', treeAmount: 13, compensation: '230 SSP' },
    { id: 13, coordinate: { latitude: 9.804631, longitude: 37.522385 }, state: 'reserved', area: '270m²', treeType: 'Moringa', treeAmount: 27, compensation: '410 SSP' },
    { id: 14, coordinate: { latitude: 9.704631, longitude: 37.502385 }, state: 'available', area: '200m²', treeType: 'Cashew', treeAmount: 23, compensation: '310 SSP' },
    { id: 15, coordinate: { latitude: 9.014631, longitude: 37.422385 }, state: 'available', area: '170m²', treeType: 'Grevillea', treeAmount: 25, compensation: '330 SSP' },
    { id: 16, coordinate: { latitude: 8.604631, longitude: 37.722385 }, state: 'available', area: '90m²', treeType: 'Teak', treeAmount: 16, compensation: '220 SSP' },
  ]);

  const [selectedMarker, setSelectedMarker] = useState<MarkerType | null>(null);

  const toggleSelectedMarker = (marker: MarkerType) => {
    setSelectedMarker((prev) => (prev?.id === marker.id ? null : marker));
  };

  const getMarkerStyle = (state: MarkerState, isSelected: Boolean ) => {
    const baseStyle = isSelected ? styles.largePoint : styles.point;
    let stateStyle;
    switch (state) {
      case 'reserved':
        stateStyle = styles.redPoint;
        break;
      case 'reserved_by_me':
        stateStyle = styles.yellowPoint;
        break;
      case 'available':
      default:
        stateStyle = styles.greenPoint;
        break;
    }
    return [baseStyle, stateStyle];
  };

  const handleButtonPress = () => {
    if (!selectedMarker) return;

    setMarkers((prevMarkers) =>
      prevMarkers.map((marker) =>
        marker.id === selectedMarker.id
          ? {
              ...marker,
              state: marker.state === 'available' ? 'reserved_by_me' : 'available',
            }
          : marker
      )
    );

    setSelectedMarker((prev) =>
      prev
        ? {
            ...prev,
            state: prev.state === 'available' ? 'reserved_by_me' : 'available',
          }
        : null
    );
  };

  const getButtonProps = () => {
    if (!selectedMarker) return null;

    switch (selectedMarker.state) {
      case 'available':
        return { title: 'Reserve', onPress: handleButtonPress };
      case 'reserved_by_me':
        return { title: 'Cancel', onPress: handleButtonPress };
      case 'reserved':
      default:
        return null; 
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
    <View style={styles.container}>
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
          <Marker
            key={marker.id}
            coordinate={marker.coordinate}
            onPress={() => toggleSelectedMarker(marker)}
          >
            <View style={getMarkerStyle(marker.state, selectedMarker?.id === marker.id)} />
          </Marker>
        ))}
      </MapView>

      {selectedMarker && (
        <View style={styles.detailsContainer}>
          <Text style={[styles.detailsText, styles.detailsHeader]}>Location {selectedMarker.id}</Text>
          <Text style={styles.detailsText}>Area: {selectedMarker.area}</Text>
          <Text style={styles.detailsText}>Tree type: {selectedMarker.treeType}</Text>
          <Text style={styles.detailsText}>Tree amount: {selectedMarker.treeAmount}</Text>
          <Text style={styles.detailsText}>Compensation: {selectedMarker.compensation}</Text>
          {getButtonProps() && (
            <View style={styles.buttonContainer}>
              <TouchableOpacity style={styles.button} onPress={getButtonProps()!.onPress}>
                <Text style={styles.buttonText}>{getButtonProps()!.title}</Text>
              </TouchableOpacity>
            </View>  
          )}
        </View>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    zIndex: 1,
  },
  map: {
    height: '88%',
    width: '100%',
  },
  point: {
    width: 20,
    height: 20,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: 'black',
  },
  redPoint: {
    backgroundColor: 'red',
  },
  yellowPoint: {
    backgroundColor: 'yellow',
  },
  greenPoint: {
    backgroundColor: 'green',
  },
  largePoint: {
    width: 30, 
    height: 30,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'black',
  },
  detailsContainer: {
    height: '40%',
    backgroundColor: '#ccc',
    padding: 20,
    marginTop: 10,
  },
  detailsText: {
    fontSize: 16,
    marginVertical: 2,
  },
  detailsHeader: {
    fontWeight: 'bold',
    fontSize: 17,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginBottom: 30,
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
});
