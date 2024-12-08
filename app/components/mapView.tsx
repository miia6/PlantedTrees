import React, { useState } from 'react'
import MapView, { Marker } from 'react-native-maps'
import { Platform, StyleSheet, View, Text, TouchableOpacity } from 'react-native'
import { MarkerType, MarkerState } from '../data/markerData'
import AntDesign from '@expo/vector-icons/AntDesign'

interface MapProps {
  markers: MarkerType[]
  setMarkers: React.Dispatch<React.SetStateAction<MarkerType[]>>
}

export default function Map({ markers, setMarkers }: MapProps) {
  const [selectedMarker, setSelectedMarker] = useState<MarkerType | null>(null)

  const toggleSelectedMarker = (marker: MarkerType) => {
    setSelectedMarker((prev) => (prev?.id === marker.id ? null : marker))
  }

  const getMarkerStyle = (state: MarkerState, isSelected: Boolean ) => {
    const baseStyle = isSelected ? styles.largePoint : styles.point
    let stateStyle
    switch (state) {
      case 'reserved':
        stateStyle = styles.redPoint
        break
      case 'reserved_by_me':
        stateStyle = styles.yellowPoint
        break
      case 'available':
      default:
        stateStyle = styles.greenPoint
        break
    }
    return [baseStyle, stateStyle]
  }

  const handleButtonPress = () => {
    if (!selectedMarker) return

    setMarkers((prevMarkers) =>
      prevMarkers.map((marker) =>
        marker.id === selectedMarker.id
          ? {
              ...marker,
              state: marker.state === 'available' ? 'reserved_by_me' : 'available',
            }
          : marker
      )
    )

    setSelectedMarker((prev) =>
      prev
        ? {
            ...prev,
            state: prev.state === 'available' ? 'reserved_by_me' : 'available',
          }
        : null
    )
  }

  const getButtonProps = () => {
    if (!selectedMarker) return null

    switch (selectedMarker.state) {
      case 'available':
        return { title: 'Reserve', onPress: handleButtonPress }
      case 'reserved_by_me':
        return { title: 'Cancel', onPress: handleButtonPress }
      case 'reserved':
      default:
        return null
    }
  }

  if (Platform.OS === 'web') {
    return (
      <View style={styles.map}>
        <Text>Maps are not supported on the web yet. Please use a mobile device to view the map.</Text>
      </View>
    )
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
          <TouchableOpacity 
            style={styles.closeButton}
            onPress={() => setSelectedMarker(null)}
          >
            <AntDesign name="closecircleo" size={28} color="black" />
          </TouchableOpacity>
          <Text style={[styles.detailsHeader]}>Location {selectedMarker.id}</Text>
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
    height: '100%',
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
    height: '41%',
    backgroundColor: '#ccc',
    padding: 20,
    marginTop: 10,
    position: 'relative',
  },
  detailsText: {
    fontSize: 16,
    marginVertical: 1.5,
    paddingLeft: 5,
  },
  detailsHeader: {
    fontWeight: 'bold',
    marginVertical: 1.5,
    fontSize: 17,
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 10,
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
  closeButton: {
    position: 'absolute',
    top: 10,
    right: 10,
  },
})
