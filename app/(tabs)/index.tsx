import React, { useEffect, useState } from 'react'
import { View, StyleSheet, Text, ScrollView } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useRouter } from 'expo-router'

import HomeData from '../components/HomeData'

export default function Index() {
    const router = useRouter()
    const [trees, setTrees] = useState<any[]>([])

    const reloadTrees = async () => {
      try {
          const storedTrees = await AsyncStorage.getItem('treesByLocation')
          if (storedTrees) {
            setTrees(JSON.parse(storedTrees))
            //console.log('RELOADED')
          }
      } catch (error) {
          console.error('Error loading trees from AsyncStorage:', error)
      }
    }
    //console.log("TREES IN INDEX " + JSON.stringify(trees))

    useEffect(() => {
        reloadTrees()
    }, [])

    
    // FOR CLEARING LOCAL STORAGE, USE THIS
    /*useEffect(() => {
        const clearStorage = async () => {
            try {
                await AsyncStorage.clear()
                console.log('Local storage cleared!')
            } catch (error) {
                console.error('Error clearing local storage:', error)
            }
        }

        // Call clearStorage when the component is loaded
        clearStorage()
    }, [])*/


    return (
        <ScrollView style={styles.container}>
            {/*<Text style={styles.h3}>My compensations</Text>
            <View style={styles.longButtonElement}>
                <View style={styles.compensationStats}>
                    <Text style={styles.compensation}>3310 SSP</Text>
                    <Text style={styles.compensationStat}>this month</Text>
                </View>
                <View style={styles.compensationStats}>
                    <Text style={styles.compensation}>560 SSP</Text>
                    <Text style={styles.compensationStat}>balance now</Text>
                </View>    
            </View>  */}
            <HomeData passedTrees={trees} />
        </ScrollView>
    )
  }

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        color: 'black',
    },
    /*h3: {
        color: 'black',
        fontSize: 18,
        fontWeight: 'bold',
        marginHorizontal: 32,
        marginTop: 8,
      },
    longButtonElement: {
        flexDirection: 'row',
        marginHorizontal: 18,
        marginVertical: 8,
        padding: 24,
        alignItems:'center',
        justifyContent: 'center',
        backgroundColor: '#8EAA8E',
        borderRadius: 10,
        height: 'auto',
        shadowColor: '#000', 
        shadowOffset: { width: 0, height: 2 }, 
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
    },
    compensationStats: {
        paddingHorizontal: 22,
        paddingVertical: 8,
        alignItems: 'center',
    },
    compensation: {
        fontSize: 26,
        fontWeight: 700,
        color: 'white',
    },
    compensationStat: {
        fontSize: 16,
        fontWeight: 600,
        color: 'white',
    },*/
})
