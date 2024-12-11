import React, { useEffect, useState } from 'react'
import { View, Text, StyleSheet, Dimensions, ScrollView } from 'react-native'
import { BarChart } from 'react-native-chart-kit'
import AsyncStorage from '@react-native-async-storage/async-storage'

const GrowthData = () => {
    const [chartData, setChartData] = useState<any>(null)

    const fetchGrowthData = async () => {
        try {
            const storedTrees = await AsyncStorage.getItem('treesByLocation')
            if (storedTrees) {
                const parsedTrees = JSON.parse(storedTrees)
                console.log("TREES IN GROWTH " + JSON.stringify(parsedTrees))

                const aggregatedGrowth = []
                for (const location of Object.values(parsedTrees)) {
                for (const tree of location.trees) {
                    if (tree.growth.length > 0) {
                        console.log("GROWTH, LOCATION, TREE: " + tree.growth, location.locationId, tree.id)
                    aggregatedGrowth.push({
                        treeId: tree.id, 
                        locationId: location.locationId,
                        totalGrowth: tree.growth.reduce((sum, g) => sum + parseFloat(g), 0),
                    })
                    }
                }
            }

                setChartData({
                    labels: aggregatedGrowth.map(g => g.treeId),
                    datasets: [
                        {
                        data: aggregatedGrowth.map(g => g.totalGrowth), 
                        },
                    ],
                })
            }

        } catch (error) {
            console.error('Error fetching growth data:', error)
        }
  }

    useEffect(() => {
        fetchGrowthData()
    }, [])

    if (!chartData) {
        return null
    }

    return (
        <View style={styles.chartContainer}>
            <Text style={styles.header}>Growth of Trees</Text>
            <ScrollView 
                horizontal={true} 
                showsHorizontalScrollIndicator={false}
                >
                <BarChart
                    data={{
                        labels: chartData.labels,
                        datasets: chartData.datasets,
                    }}
                    width={Dimensions.get('window').width * 0.8}
                    height={200}
                    yAxisSuffix=" cm"
                    yAxisInterval={0.5}
                    chartConfig={{
                        backgroundColor: '#F0F0F0',
                        backgroundGradientFrom: '#D6E8D4',
                        backgroundGradientTo: '#A9BC99',
                        decimalPlaces: 1, 
                        color: (opacity = 1) => `rgba(85, 85, 85, ${opacity})`,
                        labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`, 
                        barPercentage: 0.6, 
                        categoryPercentage: 0.7, 
                        propsForLabels: {
                            fontSize: 10,  // Smaller label font size
                        },

                    }}
                    style={styles.chart}
                />
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
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
        borderRadius: 10,
        padding: 10,
    },
    header: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 5, 
        color: '#333',
    },
})

export default GrowthData
