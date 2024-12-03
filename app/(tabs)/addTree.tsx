import { Text, View, StyleSheet } from 'react-native'

export default function AddTree() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Add tree screen</Text>
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
