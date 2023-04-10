import React from 'react'
import { ColorSchemeName } from 'react-native'
import { NavigationContainer } from '@react-navigation/native'
import { FontAwesome } from '@expo/vector-icons'
import { CardStyleInterpolators, createStackNavigator } from '@react-navigation/stack'
import { RootStackParamList, RootTabParamList } from '../types'

import LinkingConfiguration from './LinkingConfiguration'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'

// Screens
import NewList from '../screens/TopTabs/NewList'
import MyTasks from '../screens/TopTabs/MyTasks'
import Favourites from '../screens/TopTabs/Favourites'
import Home from '../screens/Home'

export default function Main({ colorScheme }: { colorScheme: ColorSchemeName }) {
  return (
    <NavigationContainer linking={LinkingConfiguration}>
      <RootNavigator />
    </NavigationContainer>
  )
}

const Stack = createStackNavigator<RootStackParamList>()
function RootNavigator() {
  return (
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen
        name="Home"
        component={Home}
        options={{
          headerShown: false,
          cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS
        }}
      />
      {/* <Stack.Screen
        name=""
        component={}
        options={{
          headerShown: false,
          cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS
        }}
      /> */}
    </Stack.Navigator>
  )
}

const Tab = createMaterialTopTabNavigator<RootTabParamList>()
export const TopNavigator = () => {
  return (
    <Tab.Navigator
      initialRouteName={'MyTasks'}
      screenOptions={{
        tabBarIndicatorStyle: { backgroundColor: '#2F80ED', width: 50, marginLeft: 30 },
        tabBarLabelStyle: {
          fontSize: 18,
          fontWeight: '500',
          textTransform: 'none',
          fontFamily: 'DarkerGrotesque_700Bold'
        },
        tabBarActiveTintColor: '#2F80ED',
        tabBarInactiveTintColor: '#E0E0E0'
      }}
    >
      <Tab.Screen
        component={Favourites}
        name="Favourites"
        options={({ route }) => ({
          tabBarIcon: ({ focused, color }) => {
            return <FontAwesome name="star" size={focused ? 24 : 20} color={color} />
          },
          tabBarShowLabel: false
        })}
      />
      <Tab.Screen
        component={MyTasks}
        name="MyTasks"
        options={{
          tabBarLabel: 'My Tasks'
        }}
      />
      <Tab.Screen
        component={NewList}
        name="NewList"
        options={{
          tabBarLabel: `+ New list`
        }}
      />
    </Tab.Navigator>
  )
}
