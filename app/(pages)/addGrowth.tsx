import React, { useState, useEffect } from 'react'
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Alert, Keyboard, TouchableWithoutFeedback } from 'react-native'
import { Dropdown } from 'react-native-element-dropdown'
import { useLocalSearchParams } from 'expo-router'
import { useRouter } from 'expo-router'
import AsyncStorage from '@react-native-async-storage/async-storage'

export default function AddGrowth() {
    const router = useRouter()
    const { report } = useLocalSearchParams()
    const trees = report ? JSON.parse(report) : {}
    //console.log('TREES TO ADD GROWTH ' + report)

    const [growthAmount, setGrowthAmount] = useState('0.00')

    const handleCancel = () => {
        Keyboard.dismiss()
        setGrowthAmount(0.00)
        router.push('/')
    }

    const handleAddGrowth = async () => {
        const growth = parseFloat(growthAmount)
        if (isNaN(growth) || growth <= 0) {
            Alert.alert('Please enter a valid growth amount.')
            return
        }

        try {

            const storedTrees = await AsyncStorage.getItem('treesByLocation')
            const parsedTrees = storedTrees ? JSON.parse(storedTrees) : []
            console.log("STORED  " + JSON.stringify(parsedTrees))
            //console.log("SELECTED " + selectedTree)

            let treeFound = false
            for (const locationId in parsedTrees) {
                const data = parsedTrees[locationId]
                if (locationId === trees.locationId) {
                    //console.log("FOUNDED: " + JSON.stringify(data))
                    data.growth.push(growthAmount)
                    treeFound = true
                    break
                }
            }

            if (!treeFound) {
                console.log(`Tree not found`)
                Alert.alert('Error', 'Failed to update growth data.')
                setGrowthAmount(0.00)
                return
            }

            const updatedData = JSON.stringify(parsedTrees)
            await AsyncStorage.setItem('treesByLocation', updatedData)
            console.log("UPDATED: " + updatedData)
            setGrowthAmount(0.00)

            Alert.alert(
                'Growth Added', 
                `Growth of ${growthAmount} cm added to ${trees.treeType}`,
                [
                    {
                        text: 'OK',
                        onPress: () => {
                            Keyboard.dismiss()
                            router.push('/')
                        },
                    },
                ],
                {cancelable: false}
            )

        } catch (error) {
            console.error('Error updating growth data:', error)
            Alert.alert('Error', 'Failed to update growth data.')
            setGrowthAmount(0.00)
        }
    }

    return (
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <View style={styles.container}>

            <View style={styles.card}>
                <Text style={styles.cardText}>Tree: {trees.treeType}</Text>
                <Text style={styles.cardText}>Location: {trees.locationId}</Text>
                <Text style={styles.cardText}>Amount of trees: {trees.treesAmount}</Text>
            </View>

            <Text style={styles.subHeader}>Growth (in cm):</Text>
            <View style={styles.inputContainer}>
                <TextInput
                    style={styles.input}
                    value={growthAmount}
                    keyboardType="numeric"
                    placeholder="cm"
                    onChangeText={(text) => {
                        const formattedText = text.replace(',', '.').replace(/[^0-9.]/g, '')
                        const decimalParts = formattedText.split('.')

                        if (decimalParts.length <= 2) {
                            setGrowthAmount(formattedText)
                        }
                    }}
                />
            </View>

            <View style={styles.buttonContainer}>
                <TouchableOpacity style={[styles.button, styles.cancelButton]} onPress={handleCancel}>
                    <Text style={styles.buttonText}>Cancel</Text>
                </TouchableOpacity>

                <TouchableOpacity style={[styles.button, styles.addButton]} onPress={handleAddGrowth}>
                    <Text style={styles.buttonText}>Update</Text>
                </TouchableOpacity>
            </View>
        </View>
        </TouchableWithoutFeedback>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        paddingHorizontal: 25,
        paddingTop: 30,
    },
    subHeader: {
        fontSize: 20,
        marginTop: 20,
        left: 10,
        color: 'black',
        fontWeight: '600',
    },

    card: {
        flexDirection: 'column',
        alignItems:'center',
        justifyContent: 'center',
        backgroundColor: '#8EAA8E',
        borderRadius: 10,
        padding: 10,
        marginBottom: 20,
        elevation: 5,
        shadowColor: '#000', 
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
    },
    cardText: {
        color: 'white',
        margin: 5,
        fontSize: 18,
        fontWeight: 'semibold',
    },

    inputContainer: {
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 10, 
        borderRadius: 8, 
    },
    button: {
        width: 'auto',
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
        backgroundColor: '#8EAA8E',
    },
})
