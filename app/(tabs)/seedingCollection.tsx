import { Text, View, StyleSheet } from 'react-native'

export default function SeedingCollection() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Seeding collection screen</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: 'black',
  },
})
