import { Tabs } from 'expo-router'
import AntDesign from '@expo/vector-icons/AntDesign'
import Feather from '@expo/vector-icons/Feather'
import SimpleLineIcons from '@expo/vector-icons/SimpleLineIcons';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons'


export default function TabLayout() {
  return (
    <Tabs
        screenOptions={{
            tabBarActiveTintColor: '#468364',
            tabBarShowLabel: false,
            headerTitleStyle: {
              fontSize: 13,
              fontWeight: 'bold', 
              color: 'black',
          },
            headerStyle: {
              backgroundColor: '#fff',
            },
            headerShadowVisible: false,
            headerTintColor: 'black',
            tabBarStyle: {
                backgroundColor: '#fff',
                borderTopWidth: 1,        
                borderTopColor: '#D3D3D3', 
                height: 90,
            },
      }}
    >

      <Tabs.Screen
        name="index"
        options={{
          title: 'HOME',
          tabBarIcon: ({ color, focused }) => (
            <AntDesign name='home' color={focused ? '#468364' : 'black'} size={24} />
          ),
        }}
      />

      <Tabs.Screen
        name="bookAreas"
        options={{
          title: 'MY AREAS',
          tabBarIcon: ({ color, focused }) => (
            <SimpleLineIcons name="location-pin" color={focused ? '#468364' : 'black'} size={24} />
          ),
        }}
      />

      <Tabs.Screen
        name="addTree"
        options={{
          title: 'ADD TREES',
          tabBarIcon: ({ color, focused }) => (
            <AntDesign name={focused ? 'pluscircleo' : 'pluscircleo'} color={focused ? '#468364' : 'black'} size={24} />
          ),
        }}
      />

      <Tabs.Screen
        name="seedingCollection"
        options={{
          title: 'COLLECTION POINTS',
          tabBarIcon: ({ color, focused }) => (
            <MaterialCommunityIcons name="seed-outline" color={focused ? '#468364' : 'black'} size={24} />
          ),
        }}
      />

      <Tabs.Screen
        name="userProfile"
        options={{
          title: 'PROFILE',
          tabBarIcon: ({ color, focused }) => (
            <Feather name="user" color={focused ? '#468364' : 'black'} size={24}/>
          ),
        }}
      />

    </Tabs>
  )
}
