import { Text, View, StyleSheet } from 'react-native'

export default function UserProfile() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>User profile screen</Text>
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
