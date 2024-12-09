import React, { useEffect, useState } from 'react'
import { View, StyleSheet, Text } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useRouter } from 'expo-router'

import TreeCards from '../components/TreeCards'
import GrowthData from '../components/GrowthData'

export default function Index() {
    const router = useRouter()

    const [trees, setTrees] = useState<any[]>([])

    const reloadTrees = async () => {
      try {
          const storedTrees = await AsyncStorage.getItem('treesByLocation')
          if (storedTrees) {
            setTrees(JSON.parse(storedTrees))
            console.log('RELOADED ')
            //console.log('RELOADED: ' + storedTrees)
          }
      } catch (error) {
          console.error('Error loading trees from AsyncStorage:', error)
      }
    }
    //console.log("TREES " + JSON.stringify(trees))

    useEffect(() => {
        reloadTrees()
    }, [])

    return (
        <View style={styles.container}>
            <TreeCards passedTrees={trees} />
            <GrowthData />
        </View>
    )

  }

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center',
        color: 'black',
    },
})
