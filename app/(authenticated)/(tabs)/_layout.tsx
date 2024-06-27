import { View, Text } from 'react-native'
import React from 'react'
import { Tabs } from 'expo-router'
import { FontAwesome } from '@expo/vector-icons'
import Colors from '@/constants/Colors'

const Layout = () => {
  return (
    <Tabs screenOptions={{
      tabBarActiveTintColor: Colors.primary,
    }}>
      {/*  Home Tab */}
      <Tabs.Screen name='home' options={{
        title: 'Home',
        tabBarIcon: ({size,color}) => (
          <FontAwesome name='home' size={size} color={color} />
        )
      }} />
      {/* Invest Tab */}
       <Tabs.Screen name='invest' options={{
        title: 'Invest',
        tabBarIcon: ({size,color}) => (
          <FontAwesome name='line-chart' size={size} color={color} />
        )
      }} />
      {/* Transfers Tab */}
      <Tabs.Screen name='transfer' options={{
        title: 'Transfer',
        tabBarIcon: ({size,color}) => (
          <FontAwesome name='exchange' size={size} color={color} />
        )
      }} />
      {/*  Crypto Tab */}
      <Tabs.Screen name='crypto' options={{
        title: 'Crypto',
        tabBarIcon: ({size,color}) => (
          <FontAwesome name='bitcoin' size={size} color={color} />
        )
      }} />
      {/* Lifestyle Tab */}
      <Tabs.Screen name='lifestyle' options={{
        title: 'Lifestyle',
        tabBarIcon: ({size,color}) => (
          <FontAwesome name='th' size={size} color={color} />
        )
      }} />
    </Tabs>
  )
}

export default Layout