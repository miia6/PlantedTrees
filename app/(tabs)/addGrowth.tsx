import React, { useState } from 'react'
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Alert, Keyboard, TouchableWithoutFeedback } from 'react-native'
import { Dropdown } from 'react-native-element-dropdown'
import { useLocalSearchParams } from 'expo-router'
import { useRouter } from 'expo-router'

export default function AddGrowth() {
    const router = useRouter()
    const { tree } = useLocalSearchParams()
    const parsedTree = tree ? JSON.parse(tree) : {}

    const [selectedTree, setSelectedTree] = useState(null)
    const [growthAmount, setGrowthAmount] = useState('0.00')

    const treeOptions = Array.from(
        { length: parsedTree.numberOfTrees || 1 },
        (_, index) => ({
            value: index + 1,
            label: `${parsedTree.species}.${index + 1}`,
        })
    )

    const handleCancel = () => {
        Keyboard.dismiss()
        router.push('/')
    }

    const handleAddGrowth = () => {
        const growth = parseFloat(growthAmount)
        if (isNaN(growth) || growth < 0) {
            Alert.alert('Please enter a valid growth amount.')
            return
        }

        const selectedTreeLabel = selectedTree
            ? treeOptions.find((tree) => tree.value === selectedTree)?.label
            : treeOptions[0]?.label

        Alert.alert(
            'Growth Report Added',
            `Growth added for ${selectedTreeLabel}`,
            [
                {
                    text: 'OK',
                    onPress: () => { 
                        Keyboard.dismiss()
                        router.push('/') 
                    },
                },
            ],
            { cancelable: false }
        )
    }

    return (
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <View style={styles.container}>
            <Text style={styles.header}>Report Tree Growth</Text>

            <View style={styles.card}>
                <Text style={styles.cardTitle}>You have selected the following report:</Text>
                <Text style={styles.cardText}>Specie: {parsedTree.species || 'Unknown'}</Text>
                <Text style={styles.cardText}>Location: {parsedTree.location || 'Unknown'}</Text>
                <Text style={styles.cardText}>Amount of reported trees: {parsedTree.numberOfTrees || 1}</Text>
            </View>

            {parsedTree.numberOfTrees > 1 ? (
                <View style={styles.inputContainer}>
                    <Text style={styles.subHeader}>Select the tree you want to report growth:</Text>
                    <Dropdown
                        style={styles.dropdown}
                        data={treeOptions}
                        labelField="label"
                        valueField="value"
                        placeholder="Select a tree..."
                        value={selectedTree}
                        onChange={(item) => setSelectedTree(item.value)}
                        placeholderStyle={styles.placeholderStyle}
                    />
                </View>
            ) : (
                <Text>  </Text>
            )}

            <View style={styles.inputContainer}>
                <Text style={styles.subHeader}>Growth (in cm):</Text>
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

    card: {
        backgroundColor: '#f8f8f8',
        borderRadius: 10,
        padding: 20,
        marginBottom: 20,
        elevation: 5, // for shadow on Android
        shadowColor: '#000', // for shadow on iOS
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
    },
    cardTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 10,
    },
    cardText: {
        fontSize: 16,
        color: '#333',
        marginBottom: 5,
    },

    inputContainer: {
        paddingHorizontal: 10,
        marginBottom: 20,
    },
    dropdown: {
        height: 50,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 8,
        marginBottom: 10,
        paddingHorizontal: 10,
    },
    placeholderStyle: {
        color: 'grey',
    },

    numberContainer: {
        flexDirection: 'row',
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
        backgroundColor: '#468364',
    },
})
