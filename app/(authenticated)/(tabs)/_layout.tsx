import React from 'react'
import { Tabs } from 'expo-router'
import { FontAwesome } from '@expo/vector-icons'
import Colors from '@/constants/Colors'
import { BlurView } from 'expo-blur'
import Header from '@/components/Header'
import { Image } from 'react-native'
import { Entypo } from '@expo/vector-icons';
import CustomHeader from '@/components/CustomHeader'

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
      {/*  Crypto Tab */}
      <Tabs.Screen name='crypto' options={{
        title: 'Crypto',
        tabBarIcon: ({size,color}) => (
          <FontAwesome name='bitcoin' size={size} color={color} />
        ),
        header: () => <CustomHeader />
      }} />
       {/* Invest Tab */}
       <Tabs.Screen name='ai-investor' options={{
        title: '',
        tabBarIcon: () => (
          <Image source={require('@/assets/images/ai-logo.jpeg')} style={{width:70, height:70, borderRadius:5}} />
        ),
        header: () => <Header />
      }} />
      {/* Transfers Tab */}
      <Tabs.Screen name='transfer' options={{
        title: 'Transfer',
        tabBarIcon: ({size,color}) => (
          <FontAwesome name='exchange' size={size} color={color} />
        ),
        header: () => <Header />
      }} />
      {/* my wallet Tab */}
      <Tabs.Screen name='my-wallet' options={{
        title: 'My Wallet',
        tabBarIcon: ({size,color}) => (
          <Entypo name='wallet' size={size} color={color} />
        ),
        header: () => <Header />
      }} />
    </Tabs>
  )
}

export default Layout