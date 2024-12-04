import React, { useEffect, useState } from 'react'
import { View, StyleSheet } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'

import TreeCards from '../components/TreeCards'

export default function Index() {
    const [trees, setTrees] = useState<any[]>([])

    const reloadTrees = async () => {
      try {
          const storedTrees = await AsyncStorage.getItem('trees')
          if (storedTrees) {
            setTrees(JSON.parse(storedTrees))
          }
      } catch (error) {
          console.error('Error loading trees from AsyncStorage:', error)
      }
    }

    useEffect(() => {
        reloadTrees()
    }, [])

    return (
        <View style={styles.container}>
            <TreeCards passedTrees={trees} />
        </View>
      )
  }

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center',
    },
})
