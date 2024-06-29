import { View, Text } from 'react-native'
import React from 'react'
import { Tabs } from 'expo-router'
import { FontAwesome } from '@expo/vector-icons'
import Colors from '@/constants/Colors'
import { BlurView } from 'expo-blur'
import CustomHeader from '@/components/CustomHeader'
import Header from '@/components/Header'

const Layout = () => {
  return (
    <Tabs screenOptions={{
      tabBarActiveTintColor: Colors.primary,
      tabBarBackground: () => <BlurView 
      intensity={100}
      style={{
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.1',
      }}
        />,
      tabBarStyle: {
        backgroundColor: 'transparent',
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        elevation: 0,
        borderTopWidth: 0,
      }
  }}>
      {/*  Home Tab */}
      <Tabs.Screen name='home' options={{
        title: 'Home',
        tabBarIcon: ({size,color}) => (
          <FontAwesome name='home' size={size} color={color} />
        ),
        header: () => <Header />
      }} />
      {/* Invest Tab */}
       <Tabs.Screen name='invest' options={{
        title: 'Invest',
        tabBarIcon: ({size,color}) => (
          <FontAwesome name='line-chart' size={size} color={color} />
        ),
        header: () => <CustomHeader />
      }} />
      {/* Transfers Tab */}
      <Tabs.Screen name='transfer' options={{
        title: 'Transfer',
        tabBarIcon: ({size,color}) => (
          <FontAwesome name='exchange' size={size} color={color} />
        ),
        header: () => <CustomHeader />
      }} />
      {/*  Crypto Tab */}
      <Tabs.Screen name='crypto' options={{
        title: 'Crypto',
        tabBarIcon: ({size,color}) => (
          <FontAwesome name='bitcoin' size={size} color={color} />
        ),
        header: () => <CustomHeader />
      }} />
      {/* Lifestyle Tab */}
      <Tabs.Screen name='lifestyle' options={{
        title: 'Lifestyle',
        tabBarIcon: ({size,color}) => (
          <FontAwesome name='th' size={size} color={color} />
        ),
        header: () => <CustomHeader />
      }} />
    </Tabs>
  )
}

export default Layout