import React, { useEffect, useState, useMemo } from 'react'
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Dimensions, Button, TouchableWithoutFeedback } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { useRouter } from 'expo-router'

const CARD_LIMIT = 3
const SCREEN_WIDTH = Dimensions.get('window').width

const TreeCards = ({ passedTrees }) => {
    //console.log("PASSED " + JSON.stringify(passedTrees))

    const groupByLocation = (trees) => {
        const grouped = []

        for (const locationId in trees) {
            const locationData = trees[locationId]
            //console.log("DATA: " + JSON.stringify(locationData.trees.length))
            grouped.push({
                locationId,
                treesAmount: locationData.trees.length,
                treesData: locationData.trees,
            })
        }
        return grouped
    }

    const trees = groupByLocation(passedTrees)
    //console.log("TREES: " + JSON.stringify(trees))

    const [currentPage, setCurrentPage] = useState(0)
    const [expandedTree, setExpandedTree] = useState(null)

    const router = useRouter()

    const totalPages = Math.ceil((trees.length + 1) / CARD_LIMIT)
    const currentTrees = trees.slice(
        currentPage * CARD_LIMIT,
        currentPage * CARD_LIMIT + CARD_LIMIT
    )
    const isLastPage = (currentPage + 1) === totalPages
    const data = isLastPage ? [...currentTrees, { id: 'addMoreCard', isAddCard: true }] : currentTrees

    const handleNext = () => {
        if (currentPage < totalPages - 1) {
            setCurrentPage(currentPage + 1)
        }
    }

    const handlePrev = () => {
        if (currentPage > 0) {
            setCurrentPage(currentPage - 1)
        }
    }

    const handleCardPress = async (tree) => {
        setExpandedTree(tree)
        console.log(tree)
    }

    const handleAddGrowthPress = (tree) => {
        console.log("EXPANDED: " + JSON.stringify(tree))
        router.push({
            pathname: '/addGrowth',
            params: { report: JSON.stringify(tree) },
        })
    }
  
  
    const renderTreeCard = ({ item }) => {
        //console.log("ITEM " + JSON.stringify(item, null, 2))
        if (item.isAddCard) {
            return (
                <TouchableOpacity
                    style={styles.addCard}
                    onPress={() => router.push('/addTree')}
                >
                    <MaterialCommunityIcons name="plus" size={50} color="#fff" />
                    <Text style={styles.addCardText}>Report new trees</Text>
                </TouchableOpacity>
            )
        }
        return (
            <TouchableOpacity style={styles.card} onPress={() => handleCardPress(item)}>

                <MaterialCommunityIcons name="tree" size={50} color="#fff" />
                {/*<Text style={styles.cardText}>{item.treesData[0].species}</Text>*/}
                <Text style={styles.cardText}>Location: {item.locationId}</Text>
                <Text style={styles.cardText}>Trees: {item.treesAmount}</Text>
   
            </TouchableOpacity>
        )
    }

    return (
        <View style={styles.container}>
            <Text style={styles.header}>Reported Trees</Text>
            <View style={{ opacity: expandedTree ? 0.3 : 1 }}>
                {trees.length > 0 ? (
                    <>
                        <View style={styles.cardContainer}>
                            <FlatList
                                data={data}
                                renderItem={renderTreeCard}
                                keyExtractor={(item, index) => item.id || index.toString()}
                                horizontal
                                showsHorizontalScrollIndicator={false}
                                style={styles.flatList}
                            />
                        </View> 
    
                        <View style={styles.navigation}>
                            <TouchableOpacity onPress={handlePrev} disabled={currentPage === 0}>
                                <MaterialCommunityIcons
                                    name="chevron-left"
                                    size={30}
                                    color={currentPage === 0 ? '#ccc' : 'grey'}
                                />
                            </TouchableOpacity>
    
                            <Text style={styles.pageIndicator}>
                                {currentPage + 1}/{totalPages}
                            </Text>
    
                            <TouchableOpacity
                                onPress={handleNext}
                                disabled={currentPage >= totalPages - 1}
                            >
                                <MaterialCommunityIcons
                                    name="chevron-right"
                                    size={30}
                                    color={currentPage >= totalPages - 1 ? '#ccc' : 'grey'}
                                />
                            </TouchableOpacity>
                        </View>
                    </>
                ) : (
                    <Text>No trees reported yet.</Text>
                )}
            </View>

            {expandedTree && (
                <View style={styles.overlayContainer}>
                    <TouchableWithoutFeedback onPress={() => setExpandedTree(null)}>
                        <View style={styles.overlay} />
                    </TouchableWithoutFeedback>
                            <View style={styles.expandedCard}>
                            
                                <MaterialCommunityIcons name="tree" size={80} color="#fff" />
                                <Text style={styles.expandedCardText}>Location: {expandedTree.locationId}</Text>
                                <Text style={styles.expandedCardText}>Trees: {expandedTree.treesAmount}</Text>

                                <View style={styles.buttonContainer}>
                                    <TouchableOpacity
                                        style={[styles.actionButton, styles.addGrowthButton]}
                                        onPress={() => handleAddGrowthPress(expandedTree)}
                                    >
                                        <Text style={styles.buttonText}>Add Growth</Text>
                                    </TouchableOpacity>

                                    <TouchableOpacity
                                        style={[styles.actionButton, styles.addPicButton]}
                                        onPress={() => console.log("functionality not implemented")}
                                    >
                                        <Text style={styles.buttonText}>Add picture</Text>
                                    </TouchableOpacity>

                                    <TouchableOpacity
                                        style={[styles.actionButton, styles.deleteButton]}
                                        onPress={() => setExpandedTree(null)}
                                    >
                                        <Text style={styles.buttonText}>Delete trees</Text>
                                    </TouchableOpacity>

                                </View>
                        </View>
                </View>
            )}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        alignItems: 'center',
    },
    header: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
        color: '#333',
    },
    cardContainer: {
        width: SCREEN_WIDTH,           
        flexDirection: 'row', 
        alignItems: 'center', 
    },
    flatList: {
        width: 'auto',
        paddingHorizontal: 15,
    },
    card: {
        width: 100,
        padding: 10,
        height: 120,
        backgroundColor: '#468364',
        borderRadius: 10,
        marginHorizontal: 10,
        alignItems: 'center',
        justifyContent: 'center',
    },
    cardText: {
        color: '#fff',
        fontSize: 12,
        fontWeight: 'bold',
        marginTop: 5
    },
    addCard: {
        width: 100,
        padding: 15,
        height: 120,
        backgroundColor: '#468364', 
        opacity: 0.5, 
        borderRadius: 10,
        marginHorizontal: 10,
        alignItems: 'center',
        justifyContent: 'center',
    },
    addCardText: {
        color: '#fff',
        fontSize: 12,
        fontWeight: 'bold',
        marginTop: 5,
    },

     navigation: {
        flexDirection: 'row',
        justifyContent: 'center',  
        alignItems: 'center',
        marginTop: 10,
    },
    pageIndicator: {
        fontSize: 13,
        fontWeight: 'bold',
        color: 'grey',
        marginHorizontal: 10, 
    },

    overlayContainer: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      justifyContent: 'center',
      alignItems: 'center',
      zIndex: 10, // Ensures this container is above everything else
    },
    overlay: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.4)', 
        zIndex: 1, 
    },

    expandedCard: {
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
        backgroundColor: '#468364',
        borderRadius: 15,
        width: '70%',
        zIndex: 2, 
    },
    expandedCardText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
        marginVertical: 5,
    },

    buttonContainer: {
        flexDirection: 'column',
        justifyContent: 'center',
        margin: 0,
        marginTop: 10,
        width: '100%',
    },
    actionButton: {
        padding: 10,
        margin: 10,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1,
        borderColor: '#2a6044',
        shadowColor: '#lightgrey', // Shadow color
        shadowOffset: {
        width: 0, // Horizontal shadow offset
        height: 2, // Vertical shadow offset
        },
        shadowOpacity: 0.25,
    },
    addGrowthButton: {
        backgroundColor: '#A0A0A0', // Green
    },
    addPicButton: {
        backgroundColor: '#A0A0A0', // Green
    },
    deleteButton: {
        marginTop: 20,
        backgroundColor: '#FF5252', // Grey
    },
    buttonText: {
        color: 'white',
        fontSize: 15,
        fontWeight: 'bold',
    },

})

export default TreeCards
