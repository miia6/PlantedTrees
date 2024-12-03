import React, { useState } from 'react'
import { Text, View, StyleSheet, TextInput, Platform } from 'react-native'
import RNPickerSelect from 'react-native-picker-select'

export default function AddTree() {
  const [species, setSpecies] = useState('')
  const [location, setLocation] = useState('')

  // Options for dropdown menus
  const speciesOptions = [
    { label: 'Tree 1', value: 'Tree1' },
    { label: 'Tree 2', value: 'Tree2' },
    { label: 'Tree 3', value: 'Tree3' },
    { label: 'Tree 4', value: 'Tree4' },
    { label: 'Tree 5', value: 'Tree5' },
    { label: 'Tree 6', value: 'Tree6' },
  ]

  const locationOptions = [
    { label: 'Location 1', value: 'Location1' },
    { label: 'Location 2', value: 'Location2' },
    { label: 'Location 3', value: 'Location3' },
    { label: 'Location 4', value: 'Location4' },
    { label: 'Location 5', value: 'Location5' },
    { label: 'Location 6', value: 'Location6' },
  ]

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Report new trees</Text>

      <Text style={styles.subHeader}>Specie</Text>
      <RNPickerSelect
        placeholder={{ label: 'Search and select a specie...', value: null }}
        items={speciesOptions}
        onValueChange={(value) => {
            console.log('Selected species:', value)
            setSpecies(value)

        }}
        value={species}
        style={pickerSelectStyles}
      />

      <Text style={styles.subHeader}>Location</Text>
      <RNPickerSelect
        placeholder={{ label: 'Search and select a location...', value: null }}
        items={locationOptions}
        onValueChange={(value) => setLocation(value)}
        value={location}
        style={pickerSelectStyles}
      />
    </View>
  )
}

// StyleSheet
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    padding: 20,
    justifyContent: 'center',
  },
  header: {
    fontSize: 30,
    fontWeight: 'bold',
    margin: 20,
    color: '#333',
    textAlign: 'center',
  },
  subHeader: {
    fontSize: 20,
    marginBottom: 10,
    color: '#333',
    fontWeight: '600',
  },
})

// Styles for the picker dropdown (react-native-picker-select)
const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    fontSize: 16,
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    color: 'black',
    paddingRight: 30, // to make space for the dropdown icon
    marginBottom: 20,
  },
  inputAndroid: {
    fontSize: 16,
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    color: 'black',
    paddingRight: 30, // to make space for the dropdown icon
    marginBottom: 20,
  },
})
