import React, { useState, useEffect } from 'react'
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Alert, Keyboard, TouchableWithoutFeedback } from 'react-native'
import { Dropdown } from 'react-native-element-dropdown'
import { useLocalSearchParams } from 'expo-router'
import { useRouter } from 'expo-router'
import AsyncStorage from '@react-native-async-storage/async-storage'

export default function AddGrowth() {
    const router = useRouter()
    const { report } = useLocalSearchParams()
    const trees = report ? JSON.parse(report) : {};
    //console.log('TREES ' + trees )

    const [growthAmount, setGrowthAmount] = useState('0.00')
    const [selectedTree, setSelectedTree] = useState(null)

    const treeOptions = trees.treesData.map((tree) => ({
        label: tree.id,
        value: tree.id,
    }))
    //console.log('options ' + JSON.stringify(treeOptions))

    const handleCancel = () => {
        Keyboard.dismiss()
        router.push('/')
    }

    const handleAddGrowth = async () => {
        const growth = parseFloat(growthAmount)

        if (isNaN(growth) || growth < 0) {
            Alert.alert('Please enter a valid growth amount.')
            return
        }

        if (trees.numberOfTrees > 1 && !selectedTree) {
            Alert.alert(
                'Tree Not Selected',
                'Please select a tree from the dropdown to report growth.',
                [{ text: 'OK' }]
            )
            return
        }

        try {

            const storedTrees = await AsyncStorage.getItem('trees')
            const parsedTrees = storedTrees ? JSON.parse(storedTrees) : []
            console.log("PARSED TREES " + JSON.stringify(parsedTrees))
            console.log('REPORT ID ' + trees.reportId)

            const reportIds = parsedTrees.map(r => r.reportId); // Get a list of all reportIds for debugging
            console.log('Available report IDs: ', reportIds);
            const reportIndex = parsedTrees.findIndex((r) => r.reportId === trees.reportId)

            console.log("ÄÄÄÄ " + reportIndex)
            if (reportIndex === -1) {
                Alert.alert('Error', 'Report not found.')
                return
            }

            const report = parsedTrees[reportIndex]
            const treeIndex = report.treesData.findIndex((tree) => tree.id === treeId);

            if (treeIndex === -1) {
                Alert.alert('Error', 'Tree not found.');
                return
            }

            const tree = report.treesData[treeIndex];
            tree.growth.push(parseFloat(growthAmount))
            parsedTrees[reportIndex] = report
            await AsyncStorage.setItem('trees', JSON.stringify(parsedTrees))
      
            Alert.alert(
                'Growth Added', 
                `Growth of ${growthAmount} cm added to ${selectedTree}`,
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
        }
    }

    return (
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <View style={styles.container}>
            <Text style={styles.header}>Report Tree Growth</Text>

            <View style={styles.card}>
                <Text style={styles.cardTitle}>Selected tree report:</Text>
                <Text style={styles.cardText}>Specie: {trees.treesData[0].species || 'Unknown'}</Text>
                <Text style={styles.cardText}>Location: {trees.treesData[0].location || 'Unknown'}</Text>
                <Text style={styles.cardText}>Amount: {trees.treesData[0].numberOfTrees || 1}</Text>
            </View>

            {trees ? (
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
        elevation: 5,
        shadowColor: '#000', 
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
