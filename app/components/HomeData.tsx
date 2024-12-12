import React, { useEffect, useState } from 'react'
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Dimensions, Button, TouchableWithoutFeedback } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { BarChart } from 'react-native-chart-kit'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { useRouter } from 'expo-router'

const CARD_LIMIT = 3
const SCREEN_WIDTH = Dimensions.get('window').width

const HomeData = ({ passedTrees }) => {

    const groupByLocation = (trees) => {
        const grouped = []

        for (const locationId in trees) {
            const data = trees[locationId]
            console.log("DATA: " + JSON.stringify(data))
            grouped.push({
                locationId,
                treesAmount: data.numberOfTrees,
                treeType: data.treeType,
            })
        }
        return grouped
    }

    const trees = groupByLocation(passedTrees)
    console.log("TREES: " + JSON.stringify(trees))

    const [currentPage, setCurrentPage] = useState(0)
    const [expandedTree, setExpandedTree] = useState(null)

    const router = useRouter()

    const totalPages = trees ? Math.ceil((trees.length + 1) / CARD_LIMIT) : 1
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
        setDim(true)
    }

    const closeExpandedTree = () => {
        setExpandedTree(null)
    }

    const handleAddGrowthPress = (tree) => {
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
                <Text style={styles.cardText}>{item.treeType}</Text>
                <Text style={styles.cardText}>Location: {item.locationId}</Text>
                <Text style={styles.cardText}>Amount: {item.treesAmount}</Text>
   
            </TouchableOpacity>
        )
    }

    // CHART

    const [chartData, setChartData] = useState<any>(null)

    const fetchGrowthData = async () => {
        try {
            const storedTrees = await AsyncStorage.getItem('treesByLocation')
            if (storedTrees) {
                const parsedTrees = JSON.parse(storedTrees)

                const aggregatedGrowth = []
                for (const locationId in parsedTrees) {
                    const data = parsedTrees[locationId]
                    console.log("GROWTH DATA: " + JSON.stringify(data), data.growth)

                    if (data.growth) {
                        aggregatedGrowth.push({
                            treeType: data.treeType,
                            locationId: locationId,
                            totalGrowth: data.growth.reduce((sum, g) => sum + parseFloat(g), 0),
                        })
                    }
                }

                if (aggregatedGrowth.length > 0) {
                    const labels = aggregatedGrowth.map(g => `Loc: ${g.locationId}`)
                    const data = aggregatedGrowth.map(g => g.totalGrowth)
                    setChartData({
                        labels: labels, 
                        datasets: [
                            { 
                                data: data, 
                            },
                        ],
                    })
                    
                } 
            }

        } catch (error) {
            console.error('Error fetching growth data:', error)
        }
    }

    useEffect(() => {
        fetchGrowthData()
    }, [])

    useEffect(() => {
        console.log("Chart Data (Full):", JSON.stringify(chartData, null, 2))
        console.log("Datasets Data:", chartData?.datasets?.[0]?.data)
    }, [chartData])


    return (
        <View style={styles.container}>
            <Text style={styles.header}>Reported Trees</Text>

            <View style={{ opacity: expandedTree ? 0.3 : 1 }}>
                {trees ? (
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
                    <>
                        <View style={styles.noTreesContainer}>
                            <Text style={styles.noTrees}>
                                No reported trees yet.
                            </Text>
                        </View>
                    </>
                    
                )}
            </View>

            {expandedTree && (
                <View style={styles.overlayContainer}>
                    <TouchableWithoutFeedback onPress={closeExpandedTree}>
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

            {trees && chartData && (
                <View style={styles.chartContainer}>
                <Text style={styles.header}>Growth of Trees</Text>
                    <BarChart
                        data={{
                            labels: chartData.labels,
                            datasets: chartData.datasets,
                        }}
                        width={Dimensions.get('window').width * 0.8}
                        height={200}
                        yAxisSuffix=" cm"
                        yAxisInterval={1}
                        chartConfig={{
                            backgroundColor: '#F0F0F0',
                            backgroundGradientFrom: '#D6E8D4',
                            backgroundGradientTo: '#A9BC99',
                            decimalPlaces: 1, 
                            color: (opacity = 1) => `rgba(85, 85, 85, ${opacity})`,
                            labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`, 
                            barPercentage: 0.7, 
                            categoryPercentage: 0.6, 
                            propsForLabels: {
                                fontSize: 10,  
                            },
                        }}
                        style={styles.chart}
                    />
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
    noTreesContainer: {
        padding: 10,
        margin: 10,
    },
    noTrees: {
        fontSize: 15,
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
        backgroundColor: '#8EAA8E',
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
        backgroundColor: '#8EAA8E', 
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
        position: 'absolute',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
        backgroundColor: '#8EAA8E',
        borderRadius: 15,
        width: '70%',
        zIndex: 11, 
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
        borderColor: '#A0A0A0',
        shadowColor: 'grey', // Shadow color
        shadowOffset: {
            width: 0, 
            height: 5,
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


    chartContainer: {
        height: 270,
        margin: 20,
        alignItems: 'center',
        backgroundColor: '#fff', // White background to contrast with chart
        borderRadius: 10,
        padding: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        elevation: 5,
    },
    chart: {
        borderRadius: 5,
        padding: 10,
    },
    header: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 5, 
        color: '#333',
    },

})

export default HomeData
