import React, { useEffect, useState } from 'react'
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Dimensions } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { useRouter } from 'expo-router'

const CARD_LIMIT = 3
const SCREEN_WIDTH = Dimensions.get('window').width

const TreeCards = ({ passedTrees }) => {
    const trees = passedTrees 
    //console.log(trees)
    const [currentPage, setCurrentPage] = useState(0)
    const router = useRouter()

    const totalPages = Math.ceil(trees.length / CARD_LIMIT)
    const currentTrees = trees.slice(
        currentPage * CARD_LIMIT,
        currentPage * CARD_LIMIT + CARD_LIMIT
    )

    const handleNext = () => {
        if ((currentPage + 1) * CARD_LIMIT < trees.length) {
            setCurrentPage(currentPage + 1)
        }
    }

    const handlePrev = () => {
        if (currentPage > 0) {
            setCurrentPage(currentPage - 1)
        }
    }
  
    const renderTreeCard = ({ item }) => {
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
          <View style={styles.card}>
              <MaterialCommunityIcons name="tree" size={50} color="#fff" />
              <Text style={styles.cardText}>{item.species}</Text>
              <Text style={styles.cardText}>{item.location}</Text>
              <Text style={styles.cardText}>Amount: {item.numberOfTrees}</Text>
          </View>
      )
    }

    return (
        <View style={styles.container}>
            <Text style={styles.header}>Reported Trees</Text>
            {trees.length > 0 ? (
                <>
                    <View style={styles.cardContainer}>
                        <FlatList
                            data={[...currentTrees, { id: 'addMoreCard', isAddCard: true }]}
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
                            disabled={(currentPage + 1) * CARD_LIMIT >= trees.length}
                        >
                            <MaterialCommunityIcons
                                name="chevron-right"
                                size={30}
                                color={(currentPage + 1) * CARD_LIMIT >= trees.length ? '#ccc' : 'grey'}
                            />
                        </TouchableOpacity>

                    </View>
                  </>
            ) : (
                <Text>No trees reported yet.</Text>
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
        padding: 15,
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
})

export default TreeCards
