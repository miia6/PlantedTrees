import React, { useState  } from 'react'
import { Text, TextInput, View, StyleSheet, TouchableOpacity, Alert } from 'react-native'
import { Dropdown } from 'react-native-element-dropdown'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useRouter } from 'expo-router'

export default function AddTree({ reloadTrees }) {
    const [species, setSpecies] = useState('')
    const [location, setLocation] = useState('')
    const [numberOfTrees, setNumberOfTrees] = useState(1)

    const router = useRouter()

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
            setSpecies('')
            setLocation('')
            setNumberOfTrees(1)
            console.log('Data cleared')
            router.push('/')
        } catch (error) {
        console.error('Error clearing data from AsyncStorage:', error)
        }
    }

    const handleAdd = async () => {
        try {
            const newTree = { species, location, numberOfTrees }
            const storedTrees = await AsyncStorage.getItem('trees')
            const trees = storedTrees ? JSON.parse(storedTrees) : []
            trees.push(newTree)

            await AsyncStorage.setItem('trees', JSON.stringify(trees))
            console.log('Data saved:', trees)

            Alert.alert(
                "You have successfully added a new report!",
                "Do you want to continue reporting?",
                [
                    {
                        text: "OK. Don't continue reporting",
                        onPress: () => {
                            console.log('User chose not to continue reporting')
                            setSpecies('')
                            setLocation('')
                            setNumberOfTrees(1)
                            router.push('/')
                        },
                        style: 'cancel',
                    },
                    {
                        text: "OK. Continue reporting",
                        onPress: () => {
                            console.log('User chose to continue reporting')
                            setSpecies('')
                            setLocation('')
                            setNumberOfTrees(1)
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
            <Text style={styles.header}>Report new trees</Text>

                <View style={styles.inputContainer}>
                    <Text style={styles.subHeader}>Specie</Text>
                        <Dropdown
                            style={styles.dropdown}
                            data={speciesOptions}
                            labelField="label"
                            valueField="value"
                            placeholder="Search and select a specie..."
                            value={species}
                            onChange={(item) => setSpecies(item.value)}
                            placeholderStyle={styles.placeholderStyle}
                        />

                    <Text style={styles.subHeader}>Location</Text>
                        <Dropdown
                            style={styles.dropdown}
                            data={locationOptions}
                            labelField="label"
                            valueField="value"
                            placeholder="Search and select a location..."
                            value={location}
                            onChange={(item) => setLocation(item.value)}
                            placeholderStyle={styles.placeholderStyle}
                        />

                    <Text style={styles.subHeader}>Amount</Text>
                        <View style={styles.numberContainer}>
                            <TouchableOpacity style={styles.button} onPress={decrement}>
                                <Text style={styles.buttonText}>-</Text>
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

                            <TouchableOpacity style={[styles.button, styles.plusButton]} onPress={increment}>
                                <Text style={styles.buttonText}>+</Text>
                            </TouchableOpacity>
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
        paddingTop: 30,
        justifyContent: 'flex-start',
    },
    header: {
        fontSize: 30,
        fontWeight: 'bold',
        color: '#333',
        textAlign: 'center',
        marginBottom: 20,
    },
    subHeader: {
        fontSize: 20,
        marginBottom: 10,
        marginTop: 5,
        color: '#333',
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
    },

    numberContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 30,
    },
    button: {
        width: 40,
        height: 40,
        backgroundColor: '#ccc',
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal: 10,
        borderRadius: 8,
    },
    plusButton: {
        backgroundColor: '#99BC85', 
    },
    buttonText: {
        fontSize: 24,
        fontWeight: 'bold',
        color: 'white',
    },
    input: {
        width: 60,
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
        paddingBottom: 30,
    },
    cancelButton: {
        width: 100,
        height: 45,
        backgroundColor: 'grey', 
    },
    addButton: {
        width: 100,
        height: 45,
        backgroundColor: '#468364', 
    },
})
