import { Text, View, StyleSheet, Image, ScrollView } from 'react-native'
import Feather from '@expo/vector-icons/Feather'
import Ionicons from '@expo/vector-icons/Ionicons'


export default function UserProfile() {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.firstContainer}>
        <View style={styles.detailContainer}>
          <Text style={styles.text}>Hi Saron!</Text>
        </View>
        <View style={styles.buttonElement}>
          <Feather name="settings" color="white" size={45} />
        </View>
      </View>
      <View style={styles.firstContainer}>
        <View style={styles.buttonElement}>
          <Feather name="phone" color="white" size={45} />
        </View>
        <View style={styles.buttonElement}>
          <Feather name="mail" color="white" size={45} />
        </View>
        <View style={styles.buttonElement}>
          <Feather name="help-circle" color="white" size={45} />
        </View>
      </View>
      <View style={styles.longButtonElement}>
        <Ionicons name="leaf-outline" color="white" size={45}></Ionicons>
        <Text style={styles.buttonText}>Mission statement</Text>
      </View>
      <Text style={styles.h3}>Recent News</Text>
      <View style={styles.imageContainer}>
        <Image 
          source={{uri: 'https://img.freepik.com/free-photo/herd-elephants-grass-covered-field-jungle-tsavo-west-taita-hills-kenya_181624-7414.jpg?t=st=1733924779~exp=1733928379~hmac=c1293343be6c6bdd9108926e90515060d5470ff96f154aad4c83a391330c05ff&w=1800'}}
          style={styles.image}
        />
      </View>
      
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
    backgroundColor: 'white',
  },
  firstContainer: {
    justifyContent:'flex-start',
    flexDirection: 'row',
  },
  detailContainer: {
    alignItems:'flex-start',
    justifyContent: 'center',
    flex: 1,
    margin: 40,
  },
  buttonElement: {
    margin: 10,
    alignItems:'center',
    justifyContent: 'center',
    backgroundColor: '#8EAA8E',
    borderRadius: 20,
    width: 102,
    height: 102,
  },
  longButtonElement: {
    flexDirection: 'row',
    margin: 10,
    alignItems:'center',
    justifyContent: 'center',
    backgroundColor: '#8EAA8E',
    borderRadius: 20,
    height: 102,
  },
  text: {
    color: 'black',
    fontSize: 20,
  },
  h3: {
    color: 'black',
    fontSize: 20,
    fontWeight: 'bold',
    margin: 10,
  },
  buttonText: {
    padding: 16,
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  imageContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    alignItems:'center',
    justifyContent: 'center',
    width: 350, 
    height: 300,
    resizeMode: 'cover',
    borderRadius: 8,
  },
})
