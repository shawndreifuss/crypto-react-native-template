import React, { useCallback, useState } from 'react';
import {
StyleSheet,
View,
Dimensions,
ActivityIndicator,
ScrollView,
Animated,
} from 'react-native';
import { Image, Text, Card } from '@rneui/base';
import Carousel from 'react-native-reanimated-carousel';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { ScalingDot } from 'react-native-animated-pagination-dots';
import { useAssets } from 'expo-asset';
import Colors from '@/constants/Colors';

const crypto1 = require('@/assets/images/crypto-article-1.jpeg');
const crypto2 = require('@/assets/images/crypto-article-2.jpeg');
const crypto3 = require('@/assets/images/crypto-article-3.jpeg');
const crypto4 = require('@/assets/images/crypto-article-4.jpeg');
const crypto5 = require('@/assets/images/crypto-article-5.jpeg');
const crypto6 = require('@/assets/images/crypto-article-6.jpeg');

const DashboardLatest = () => {
const width = Dimensions.get('window').width;
const [scrollX] = useState(new Animated.Value(0));
const [searchValue, setSearchValue] = useState('');

// Importing assets
const carouselImage = require('@/assets/images/banner.jpg');

const crypto = [
  {
    name: 'BTC',
    title: 'Bitcoin Hits New Highs',
    description: 'Bitcoin reaches a new all-time high.',
    currentPrice: '$39,500',
    previousPrice: '$38,200',
    avatar: crypto1,
  },
  {
    name: 'ETH',
    title: 'Ethereum 2.0 Launched',
    description: 'The long-awaited Ethereum 2.0 upgrade is now live.',
    currentPrice: '$2,600',
    previousPrice: '$2,450',
    avatar: crypto2,
  },
  {
    name: 'XRP',
    title: 'Ripple Partners with Major Bank',
    description: 'Ripple has announced a new partnership.',
    currentPrice: '$1.20',
    previousPrice: '$1.15',
    avatar: crypto3,
  },
  {
    name: 'LTC',
    title: 'Litecoin Gains Popularity',
    description: 'Litecoin is gaining traction as a preferred cryptocurrency for small transactions.',
    currentPrice: '$180',
    previousPrice: '$170',
    avatar: crypto4,
  },
  {
    name: 'ADA',
    title: 'Cardano Smart Contracts',
    description: 'Cardano successfully implements smart contracts, opening up new possibilities for developers.',
    currentPrice: '$1.40',
    previousPrice: '$1.30',
    avatar: crypto5,
  },
  {
    name: 'DOT',
    title: 'Polkadot Expands Network',
    description: 'Polkadot expands its network with new parachain auctions, increasing its ecosystem’s capabilities.',
    currentPrice: '$30',
    previousPrice: '$28',
    avatar: crypto6,
  },
];
  const keyExtractor = useCallback((item, index) => index.toString(), []);

  

  return (
    <ScrollView>
      <View style={styles.content}>
        <GestureHandlerRootView>
          <Carousel
            keyExtractor={keyExtractor}
            showsHorizontalScrollIndicator={false}
            onScroll={Animated.event(
              [{ nativeEvent: { contentOffset: { x: scrollX } } }],
              { useNativeDriver: true }
            )}
            loop
            width={width}
            height={300}
            style={{ marginTop: 20, marginRight: 5 }}
            autoPlay={false}
            data={[...new Array(3).keys()]}
            scrollAnimationDuration={1000}
            onSnapToItem={(index) => console.log('current index:', index)}
            pagingEnabled={true}
            renderItem={({ index }) => (
              <View style={styles.mainContent}>
                <Image
                  source={carouselImage}
                  containerStyle={styles.itemImage}
                  style={{ width: '100%', height: 250 }}
                  PlaceholderContent={<ActivityIndicator />}
                />
                <View style={styles.searchItem}></View>
                <View style={styles.bannerContent}>
                  <Text style={styles.recommendationText}>Download for Free</Text>
                  <Text style={styles.brandText}>Crypto Trader AI</Text>
                </View>
              </View>
            )}
          />
        </GestureHandlerRootView>
        <View style={styles.paginationDots}>
          <ScalingDot
            data={[...new Array(3).keys()]}
            scrollX={scrollX}
            useNativeDriver={true}
            inActiveDotOpacity={0.5}
            dotStyle={styles.dotStyle}
            containerStyle={styles.dotsContentStyles}
            activeDotScale={1.5}
          />
        </View>
        <View style={styles.userContent}>
          <View style={styles.userText}>
            <Text style={styles.trending}> Trending</Text>
            <Text style={styles.showAll}> Show All</Text>
          </View>
          <ScrollView horizontal disableIntervalMomentum={true}>
            <View style={styles.cardStyles}>
              {crypto.map((c, i) => (
                <Card
                  key={i.toString()}
                  marginHorizontal={7}
                  wrapperStyle={styles.cardWrapperStyle}
                  cardContainerStyle={styles.cardContainerStyle}
                >
                  <View style={styles.cardImageStyles}>
                    <Image
                      style={styles.image}
                      resizeMode="cover"
                      source={c.avatar}
                    />
                  </View> 
                  <View style={styles.description} >
<Text>{u.description}</Text>
                  </View>
                  <View style={styles.userAmount}>
                  <Text style={styles.name}>{c.name}</Text>
                    <Text style={styles.amount}> {c.currentPrice}</Text>
                    
                  </View>
                 
                </Card>
              ))}
            </View>
          </ScrollView>
        </View>
      </View>
    </ScrollView>
  );
};


export default DashboardLatest;

const styles = StyleSheet.create({
  content: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    display: 'flex',
  },
  itemImage: {
    width: '95%',
    height: 200,
    marginHorizontal: 10,
    marginTop: 10,
    flex: 1,
    borderRadius: 10,
    opacity: 0.9,
  },
  mainContent: {
    flex: 1,
    justifyContent: 'center',
  },
  bannerContent: {
    paddingLeft: 20,
    position: 'relative',
    top: -90,
  },
  amountContent: {
    flexDirection: 'row',
  },
  recommendationText: {
    fontSize: 16,
    color: '#999999',
    fontWeight: 'bold',
    marginTop: 10,
  },
  brandText: {
    fontSize: 30,
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  amountText: {
    fontSize: 20,
    color: '#3498db',
    paddingRight: 30,
    fontWeight: 'bold',
    marginTop:5,
  },
  discountAmount: {
    fontSize: 18,
    color: '#999999',
    textDecorationLine: 'line-through',
    fontWeight: 'bold',
  },
  searchItem: {
    position: 'relative',
    top: -350,
    paddingHorizontal: 10,
  },
  userText: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    marginTop: 50,
  },
  contentStyles: {
    paddingHorizontal: 0,
    paddingVertical: 0,
  },
  user: {
    width: 120,
    paddingLeft: 0,
  },
  image: {
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
    width: '100%',
    height: 100,
  },
  userContent: {
    top: -100,
  },
  cardWrapperStyle: {
    width: 150,
    height: 150,
  },
  cardContainerStyle: {
    // width: 20,
    // backgroundColor: 'red',
    // paddingLeft: 0,
    // paddingLeft: 15,
    // marginRight: 5,
    // marginTop: 10,
    // borderRadius: 10, // adds the rounded corners
    // backgroundColor: '#fff',
  },
  cardStyles: {
    flexDirection: 'row',
    marginHorizontal: 8,
  },
  userAmount: {
    flexDirection: 'row',
    marginLeft: 6,
  },
  amount: {
    fontSize: 14,
    fontWeight: 'bold',
    paddingRight: 10,
  },
  amountWas: {
    fontSize: 10,
    textDecorationLine: 'line-through',
    paddingTop: 3,
    color: '#999999',
  },
  cardImageStyles: {
    
    // position: 'relative',
    // top: -15,
    // left: -15,
    // paddingLeft: 10,
  },
  userName: {
    paddingLeft: 10,
    paddingTop: 3,
  },
  name: {
    fontSize: 13,
    fontWeight: 'bold',
    color: '#999999',
  },
  trending: {
    color: '#333333',
    fontWeight: 'bold',
  },
  showAll: {
    color: '#3498db',
    fontWeight: 'bold',
    fontSize: 11,
  },
  categoryContent: {
    top: -80,
  },
  categoryCardStyles: {
    flexDirection: 'column',
  },
  cardCategoryWrapperStyle: {
    width: 360,
    height: 50,
  },
  categoryItemGroup: {
    position: 'absolute',
    flexDirection: 'row',
    paddingTop: 15,
    paddingLeft: 55,
  },
  rightIconStyles: {
    paddingLeft: 330,
    paddingTop: 11,
    position: 'absolute',
  },
  categoryAvatarIcon: {
    paddingTop: 10,
    paddingLeft: 23,
  },
  categoryName: {
    paddingRight: 8,
    fontWeight: 'bold',
    color: '#666666',
  },
  categoryItems: {
    color: '#999999',
  },
  searchInputContentStyle: {
    height: 40,
  },
  paginationDots: {
    position: 'relative',
    top: -90,
  },
  dotStyle: {
    width: 6,
    height: 6,
    backgroundColor: '#ff0000',
    borderRadius: 5,
    marginHorizontal: 5,
  },
  dotsContentStyles: {
    top: -30,
    color: '#ff0000',
  },
  description: {
  width: '110%',
  fontSize: 16,
    color: '#999999',
    fontWeight: 'bold',
  
  },
});


