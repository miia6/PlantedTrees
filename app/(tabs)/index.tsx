import React, { useEffect, useState } from 'react'
import { View, StyleSheet, Text, ScrollView } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import HomeData from '../components/HomeData'

export default function Index() {
    
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
            <HomeData key={Date.now()} />
        </ScrollView>
    )
  }

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        color: 'black',
    },
})
