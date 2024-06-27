import { View, Text } from 'react-native'
import React from 'react'
import { useLocalSearchParams } from 'expo-router'

const Phone = () => {
    const {phone, signin } = useLocalSearchParams<{ phone:string, signin: string }>()
  return (
    <View>
      <Text>Phone</Text>
    </View>
  )
}

export default Phone