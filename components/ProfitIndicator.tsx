import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { dummyData } from '@/app/api/ticker-demo-data';
import Icon from 'react-native-vector-icons/FontAwesome';

interface ProfitIndicatorProps {
  percentage_change: string | number;
  type: 'I' | 'D'; // Assuming 'I' for increase and 'D' for decrease
}

const ProfitIndicator: React.FC<ProfitIndicatorProps> = ({ percentage_change, type }) => {
  return (
    <View
      style={[
        styles.container,
        { backgroundColor: type === 'I' ? '#13D131' : 'red' }
      ]}
    >
      <Text style={styles.text}>{percentage_change}</Text>
      <Icon name="chevron-circle-up" size={15} color="#fff" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    height: 30,
    width: 80,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center'
  },
  text: {
    fontFamily: 'Roboto-Bold',
    color: '#fff',
    marginRight: 5
  }
});

export default ProfitIndicator;
