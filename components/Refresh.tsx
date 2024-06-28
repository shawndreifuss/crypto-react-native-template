import { View, Text } from 'react-native'
import React, { useState } from 'react'

const Refresh = () => {

    const [ refreshing, setRefreshing ] = useState(false)
  return (
    <View>
      <Text>Refresh</Text>
    </View>
  )
}

export default Refresh