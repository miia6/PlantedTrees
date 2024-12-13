import React, { useState, useEffect } from 'react'
import { Text, TextInput, View, StyleSheet, TouchableOpacity, Alert } from 'react-native'
import { Dropdown } from 'react-native-element-dropdown'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useRouter } from 'expo-router'

export default function AddTree () {
    //const [species, setSpecies] = useState('')
    //const [location, setLocation] = useState('')
    const [chosen, setChosen] = useState('')
    const [options, setOptions] = useState([]) 
    const [numberOfTrees, setNumberOfTrees] = useState(1)

    const router = useRouter()

    const loadData = async () => {
        try {
            const initialOptions = [
                { label: 'Location 2 (90m²), Mango', value: '2', treeType: 'Mango' },
                { label: 'Location 5 (110m²), Moringa', value: '5', treeType: 'Moringa' }
            ] 
            setOptions(initialOptions)

            const storedMarkers = await AsyncStorage.getItem('markers')
            if (storedMarkers) {
                //console.log("STORED " + storedMarkers)
                const markers = JSON.parse(storedMarkers)

                const options = markers.map((marker) => ({
                    label: `Location ${marker.id} (${marker.area}), ${marker.treeType}`, 
                    value: marker.id.toString(),
                    treeType: marker.treeType,
                }))
                setOptions(options)

            }
        } catch (error) {
            console.error('Error loading marker data:', error)
        }
    }

    useEffect(() => {
        loadData()
    }, [])


    const increment = () => {
        setNumberOfTrees(prevState => prevState + 1)
    }

    const decrement = () => {
        if (numberOfTrees > 1) { 
        setNumberOfTrees(prevState => prevState - 1)
        }
    }

    const handleCancel = async () => {
        try {
            setChosen('')
            setNumberOfTrees(1)
            router.push('/')
        } catch (error) {
        console.error('Error clearing data from AsyncStorage:', error)
        }
    }

    const handleAdd = async () => {
        if (!chosen || !numberOfTrees || numberOfTrees <= 0) {
            Alert.alert(
                "Incomplete Details",
                "Please select a location and specie, and enter a valid number of trees.",
                [{ text: "OK" }]
            )
            return
        }
    
        try {
            const storedTrees = await AsyncStorage.getItem('treesByLocation')
            const treesByLocation = storedTrees ? JSON.parse(storedTrees) : {}

            const selectedOption = options.find(option => option.value === chosen);
            const locationId = selectedOption.value;
            const treeType = selectedOption.treeType;
    
            if (!treesByLocation[locationId]) {
                treesByLocation[locationId] = {
                    treeType,
                    numberOfTrees: 0,
                    growth: [], 
                }
            }

            treesByLocation[locationId].numberOfTrees += numberOfTrees
            await AsyncStorage.setItem('treesByLocation', JSON.stringify(treesByLocation))
            //console.log('Data saved:', JSON.stringify(treesByLocation))
    
            Alert.alert(
                "You have successfully added trees!",
                "Do you want to continue reporting?",
                [
                    {
                        text: "OK. Don't continue reporting",
                        onPress: () => {
                            setChosen('')
                            setNumberOfTrees(1)
                            //reloadTrees()
                            router.push('/')
                        },
                        style: 'cancel',
                    },
                    {
                        text: "OK. Continue reporting",
                        onPress: () => {
                            setChosen('')
                            setNumberOfTrees(1)
                            //reloadTrees()
                        },
                    },
                ],
                { cancelable: false }
            )
        } catch (error) {
            console.error('Error saving data to AsyncStorage:', error)
        }
    }
        

    return (
        <View style={styles.container}>
            <View style={styles.centeredContent}>

                <View style={styles.inputContainer}>
                <Text style={styles.subHeader}>Location and specie</Text>
                        <Dropdown
                            style={styles.dropdown}
                            data={options}
                            labelField="label"
                            valueField="value"
                            placeholder="Select a location and specie..."
                            value={chosen}
                            onChange={(item) => setChosen(item.value)}
                            placeholderStyle={styles.placeholderStyle}
                        />

                    <Text style={styles.subHeader}>Amount</Text>
                        <View style={styles.numberContainer}>
                            <TouchableOpacity style={styles.AmountButton} onPress={decrement}>
                                <Text style={styles.AmountButtonText}>-</Text>
                            </TouchableOpacity>

                    
                            <TextInput
                            style={styles.input}
                            value={String(numberOfTrees)}
                            keyboardType="numeric"
                            onChangeText={(text) => {
                                const value = parseInt(text, 10);
                                if (!isNaN(value)) setNumberOfTrees(value)
                            }}
                            />

                            <TouchableOpacity style={[styles.AmountButton, styles.plusButton]} onPress={increment}>
                                <Text style={styles.AmountButtonText}>+</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>  

                <View style={styles.buttonContainer}>
                    <TouchableOpacity style={[styles.button, styles.cancelButton]} onPress={handleCancel}>
                        <Text style={styles.buttonText}>Cancel</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={[styles.button, styles.addButton]} onPress={handleAdd}>
                        <Text style={styles.buttonText}>Add</Text>
                    </TouchableOpacity>
                </View>
                 
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        paddingHorizontal: 20,
    },
    centeredContent: {
        flex: 1, // Allows it to take the available space
        justifyContent: 'center', // Vertically center content
        paddingHorizontal: 10,
    },
    subHeader: {
        fontSize: 20,
        marginBottom: 10,
        marginTop: 5,
        color: 'black',
        fontWeight: '600',
    },

    inputContainer: {
        paddingHorizontal: 10,
        margin: 0, 
      },

    dropdown: {
        height: 50,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 8,
        marginBottom: 20,
        paddingHorizontal: 10,
    },
    placeholderStyle: {
        color: 'grey', 
        fontSize: 15,
    },

    numberContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 30,
    },
    AmountButton: {
        width: 35,
        height: 35,
        backgroundColor: '#ccc',
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal: 10,
        borderRadius: 8,
        shadowColor: '#000', 
        shadowOffset: { width: 0, height: 1.5 }, 
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
    },
    plusButton: {
        backgroundColor: '#8EAA8E', 
    },
    AmountButtonText: {
        fontSize: 20,
        fontWeight: 'bold',
        color: 'white',
    },
    input: {
        width: 50,
        height: 40,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 8,
        textAlign: 'center',
        fontSize: 16,
    },

    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        marginTop: 'auto',
        paddingBottom: 40,
    },
    button: {
        width: 90,
        height: 40,
        backgroundColor: '#ccc',
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal: 10,
        borderRadius: 8,
        shadowColor: '#000', 
        shadowOffset: { width: 0, height: 1.5 }, 
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
    },
    buttonText: {
        fontSize: 20,
        fontWeight: 'bold',
        color: 'white',
    },
    cancelButton: {
        backgroundColor: 'grey', 
    },
    addButton: {
        backgroundColor: '#8EAA8E', 
    },
})
