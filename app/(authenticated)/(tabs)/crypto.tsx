import React from 'react';
import { View, Text, StyleSheet, StatusBar, TouchableOpacity, FlatList, Image, TextInput } from 'react-native';
import { dummyData } from '@/app/api/ticker-demo-data';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Icon from 'react-native-vector-icons/FontAwesome';
import ProfitIndicator from '@/components/ProfitIndicator';
import TopMovers from '@/components/Home/TopMovers';

interface SearchProps {
  navigation: any; // You can refine this type based on your navigation setup
}

interface Coin {
  id: string;
  image: any; // Adjust the type based on the image source type
  currency: string;
  amount: number;
  changes: string;
  type: 'I' | 'D';
}

const Search: React.FC<SearchProps> = () => {
  return (
    <>
    <TopMovers/>
    <View style={{ flex: 2, backgroundColor: '#fff' }}> 
    
      <View style={{ flex: 1, flexDirection: 'column' }}>
    

        {/* search bar */}
        <View style={{ flex: 0.5, justifyContent: 'flex-start', backgroundColor: '#fff', paddingHorizontal: '2%' , marginTop:-40 }}>
          <View style={{ flexDirection: 'row', borderWidth: 1, borderColor: '#999', borderRadius: 5, height: 50, width: '100%', justifyContent: 'flex-start', alignItems: 'center', paddingLeft: 20 }}>
            <Icon name='search' color='#ddd' size={22} />
            <TextInput placeholder='Search' placeholderTextColor="#999" style={{ flex: 1 }} />
          </View>
        </View>

       
        {/* vertical scroll section */}
        <View style={{ flex: 4, backgroundColor: '#fff', paddingHorizontal: '2%' }}>
          <FlatList
            keyExtractor={(item) => item.id}
            data={dummyData?.coins}
            renderItem={({ item }: { item: Coin }) => (
              <View style={{ flexDirection: 'row', height: 100, width: '100%', borderWidth: 1, borderColor: '#ddd', borderRadius: 15, justifyContent: 'space-between', paddingRight: 10, marginBottom: 15 }}>
                {/* Coin image, coin name and symbol */}
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  {/* Coin image */}
                  <Image 
  style={{ height: 40, width: 40, marginLeft:20 }} 
  resizeMode="contain"
  source={{ uri: item.image }} 
/>
                  {/* Coin symbol */}
                  <View style={{ flexDirection: 'column', justifyContent: 'flex-start' }}>
                    <Text style={{ fontFamily: 'Roboto-Medium', color: '#333', fontSize: 20, marginLeft:20 }}>{item.currency}</Text>
                    <Text style={{marginLeft:20 }}>BNB/USDT</Text>
                  </View>
                </View>

                {/* Coin price and indicator */}
                <View style={{ flexDirection: 'column', backgroundColor: '#fff', alignContent: 'center', justifyContent: 'center' }}>
                  {/* price */}
                  <Text style={{ fontFamily: 'Roboto-Medium', fontSize: 24, color: '#333' }}>${item.amount}</Text>

                  {/* indicator */}
                  <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                    <Text style={{ color: item.type === 'I' ? 'green' : 'red', fontFamily: 'Roboto-Bold', fontSize: 18 }}>{item.changes}</Text>
                    <Icon name={item.type === 'I' ? 'chevron-circle-up' : 'chevron-circle-down'} color={item.type === 'I' ? 'green' : 'red'} />
                  </View>
                </View>
              </View>
            )}
          />
        </View>
      </View>
    </View>
    </>
  );
};

export default Search;

const styles = StyleSheet.create({});
