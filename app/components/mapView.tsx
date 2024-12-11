import React, { useState, useEffect } from 'react'
import MapView, { Marker } from 'react-native-maps'
import { Platform, StyleSheet, View, Text, TouchableOpacity } from 'react-native'
import { MarkerType, MarkerState } from '../data/markerData'
import AntDesign from '@expo/vector-icons/AntDesign'
import Ionicons from '@expo/vector-icons/Ionicons'

import AsyncStorage from '@react-native-async-storage/async-storage' //MIIA'S ADDITION

interface MapProps {
  markers: MarkerType[]
  setMarkers: React.Dispatch<React.SetStateAction<MarkerType[]>>
}

export default function Map({ markers, setMarkers }: MapProps) {
  const [selectedMarker, setSelectedMarker] = useState<MarkerType | null>(null)

  // MIIA'S ADDITION: Load markers from AsyncStorage
  const loadMarkers = async () => {
      try {
          const storedMarkers = await AsyncStorage.getItem('markers')
          if (storedMarkers) {
            const reservedMarkers: MarkerType[] = JSON.parse(storedMarkers)
      
            const updatedMarkers = markers.map((marker) => {
              const reservedMarker = reservedMarkers.find((m) => m.id === marker.id)
              return reservedMarker ? reservedMarker : marker
            })
      
            setMarkers(updatedMarkers)
        }
      } catch (error) {
          console.error('Error loading markers:', error)
      }
  }

  // MIIA'S ADDITION: Save markers to AsyncStorage
  const saveMarkers = async (updatedMarkers: MarkerType[]) => {
      try {
          const reservedMarkers = updatedMarkers.filter(
            (marker) => marker.state === 'reserved' || marker.state === 'reserved_by_me'
          )
          await AsyncStorage.setItem('markers', JSON.stringify(reservedMarkers))
      } catch (error) {
          console.error('Error saving markers:', error)
      }
  }

  // MIIA'S ADDITION
  useEffect(() => {
    loadMarkers()
  }, [])

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

    setMarkers((prevMarkers) => {
      const updatedMarkers: MarkerType[] = prevMarkers.map((marker) =>
        marker.id === selectedMarker.id
          ? {
              ...marker,
              state: marker.state === 'available' ? 'reserved_by_me' : 'available',
            }
          : marker
      )

      saveMarkers(updatedMarkers)
      return updatedMarkers
    })

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
            <Ionicons name="close" size={28} color="white"/>
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
    borderRadius: 12,
  },
  point: {
    width: 20,
    height: 20,
    borderRadius: 15,
    borderWidth: 0,
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
    width: 28, 
    height: 28,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'white',
  },
  detailsContainer: {
    height: '41%',
    backgroundColor: '#749A9F',
    padding: 20,
    marginTop: 12,
    position: 'relative',
    borderRadius: 12,
    shadowColor: '#000', 
    shadowOffset: { width: 2, height: 9 }, 
    shadowOpacity: 0.3,
    shadowRadius: 3.84,
  },
  detailsText: {
    fontSize: 16,
    fontWeight: 500,
    marginVertical: 1.5,
    paddingLeft: 5,
    color: "white",
  },
  detailsHeader: {
    fontWeight: 800,
    fontSize: 17,
    color: "white",
    marginBottom: 8,
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 14,
    right: 12,
  },  
  button: {
    width: 116,
    height: 34,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
    backgroundColor: '#CDF2CD',
    shadowColor: '#000', 
    shadowOffset: { width: 0, height: 2 }, 
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    },
  buttonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#232F30',
  },
  closeButton: {
    position: 'absolute',
    top: 12,
    right: 16,
  },
})
