import React from 'react';
import {
  StyleSheet,
  Dimensions,
  SafeAreaView,
  View,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Text,
  Image,
  Button,
} from 'react-native';
import { useQuery } from '@tanstack/react-query';
import { Currency } from '@/interfaces/crypto';
import { Link } from 'expo-router';
import Colors from '@/constants/Colors';
import { defaultStyles } from '@/constants/Styles';
import { Ionicons } from '@expo/vector-icons';

import FeatherIcon from '@expo/vector-icons/Feather';


const shawn = require('@/assets/images/Shawn-Dreifuss.jpeg');
const Balance = require('@/assets/images/Balance.png');

const stats = [
  { label: 'Location', value: 'USA' },
  { label: 'Total Earnings', value: '+ $325' },
  { label: 'Experience', value: '6 years' },
];
const items = [
  {
    image: 'https://s2.coinmarketcap.com/static/img/coins/64x64/1.png',
    label: 'Bitcoin',
    symbol: 'BTC',
    marketCap: '$1,075,746,093,753',
    price: '$56,742.02',
    change: '+2.34%'
  },
  {
    image: 'https://cryptologos.cc/logos/ethereum-eth-logo.png?v=014',
    label: 'Ethereum',
    symbol: 'ETH',
    marketCap: '$457,047,986,768',
    price: '$3,862.92',
    change: '+1.47%'
  },
  {
    image: 'https://cryptologos.cc/logos/binance-coin-bnb-logo.png?v=014',
    label: 'Binance Coin',
    symbol: 'BNB',
    marketCap: '$85,253,786,742',
    price: '$527.44',
    change: '+3.12%'
  },
  {
    image: 'https://cryptologos.cc/logos/cardano-ada-logo.png?v=014',
    label: 'Cardano',
    symbol: 'ADA',
    marketCap: '$55,639,836,590',
    price: '$1.74',
    change: '-0.45%'
  },
  {
    image: 'https://cryptologos.cc/logos/solana-sol-logo.png?v=014',
    label: 'Solana',
    symbol: 'SOL',
    marketCap: '$48,548,974,643',
    price: '$185.64',
    change: '+4.78%'
  },
  {
    image: 'https://cryptologos.cc/logos/ripple-xrp-logo.png?v=014',
    label: 'Ripple',
    symbol: 'XRP',
    marketCap: '$40,158,695,248',
    price: '$0.89',
    change: '-1.23%'
  }
];


export default function MyWallet() {

  const currencies = useQuery({
    queryKey: ['listings'],
    queryFn: () => fetch('/api/listings').then((res) => res.json()),
  });

  const ids = currencies.data?.map((currency: Currency) => currency.id).join(',');

  const { data } = useQuery({
    queryKey: ['info', ids],
    queryFn: () => fetch(`/api/info?ids=${ids}`).then((res) => res.json()),
    enabled: !!ids,
  });


  return (
    <SafeAreaView style={{ flex: 1, paddingTop:20, }}>
      <View style={[styles.listHeader, {marginTop:20}]}>
              <Text style={[styles.listTitle, {fontSize:32}]}>My Wallet</Text>

            </View>
      <View style={styles.container}>
        <ScrollView>
        <View style={styles.content}>
            <View style={styles.profile}>
              <View style={styles.profileTop}>
                <View style={styles.avatar}>
                  <Image
                    alt=""
                    source={shawn}
                    style={styles.avatarImg} />
                  <View style={styles.avatarNotification} />
                </View>
                <View style={[styles.balanceView, {marginTop:-10}]}>
            <View style={{top: -20, marginLeft: 20, marginTop: 10}}>
              <Image
                source={Balance}
                style={{
                  width: 90,
                  height: 90,
                }}
                resizeMode="contain"
              />
            </View>
            <View style={styles.balanceSection}>
              <Text  style={styles.balanceText}>
                Current Balance
              </Text>
              <Text style={styles.balanceValue}>
                $2,380
              </Text>
            </View>
          </View>
              </View>
              <View style={styles.stats}>
              {stats.map(({ label, value }, index) => (
                <View
                  key={index}
                  style={[
                    styles.statsItem,
                    index === 0 && { borderLeftWidth: 0 },
                  ]}>
                  <Text style={styles.statsItemText}>{label}</Text>
                  <Text style={styles.statsItemValue}>{value}</Text>
                </View>
              ))}
            </View>
</View>
          
          <View style={styles.contentActions}>
              <TouchableOpacity
                onPress={() => {
                  // handle onPress
                }}
                style={{ flex: 1, paddingHorizontal: 6 }}>
                <View style={styles.btn}>
                  <Text style={styles.btnText}>Buy & Sell</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  // handle onPress
                }}
                style={{ flex: 1, paddingHorizontal: 6 }}>
                <View style={styles.btnPrimary}>
                  <Text style={styles.btnPrimaryText}>Transfer</Text>
                </View>
              </TouchableOpacity>
            </View>
        

          <View style={styles.list}>
            <View style={styles.listHeader}>
              <Text style={styles.listTitle}>My Experience</Text>
              <TouchableOpacity
                onPress={() => {
                  // handle onPress
                }}>
                <Text style={styles.listAction}>View All</Text>
              </TouchableOpacity>
            </View>
            <ScrollView
              contentContainerStyle={styles.listContent}
              horizontal={true}
              showsHorizontalScrollIndicator={false}>
              {items.map(({ image, label, symbol, marketCap, price, change }, index) => (
                <TouchableOpacity
                  key={index}
                  onPress={() => {
                    // handle onPress
                  }}>
                  <View style={styles.card}>
                    <View style={styles.cardTop}>
                      <View style={styles.cardIcon}>
                        <Image
                          source={{ uri: image }}
                          style={{ width: 44, height: 44, borderRadius: 22 }}
                        />
                      </View>
                      <View style={styles.cardBody}>
                        <Text style={styles.cardTitle}>{label}</Text>
                        <Text style={styles.cardSubtitle}>{symbol}</Text>
                      </View>
                    </View>
                    <View style={styles.cardFooter}>
                      <Text style={styles.cardFooterText}>Market Cap: {marketCap}</Text>
                      <Text style={styles.cardFooterText}>Price: {price}</Text>
                      <Text style={styles.cardFooterText}>Change: {change}</Text>
                    </View>
                  </View>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
          
          
      <View>
       
       
        
      </View>
      </View>
        </ScrollView>
        
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 0,
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 0,
  },
  line: {
    height: 1,
    backgroundColor: '#e3e3e3',
  },
  /** Header */
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderBottomWidth: 1,
    borderColor: '#e3e3e3',
  },
  headerAction: {
    width: 40,
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  /** Search */
  search: {
    position: 'relative',
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 0,
    backgroundColor: '#F0F0F0',
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  searchIcon: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    width: 34,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 2,
  },
  searchControl: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    paddingLeft: 34,
    width: '100%',
    fontSize: 16,
    fontWeight: '500',
  },
  /** Content */
  content: {
    paddingTop: 12,
    paddingHorizontal: 24,
  },
  contentActions: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginHorizontal: -6,
  },
  /** Profile */
  profile: {
    paddingTop: 12,
  },
  profileTop: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  avatar: {
    position: 'relative',
    width: 74,
    height: 74,
    borderRadius: 74,
    backgroundColor: '#DFDFDF',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  avatarImg: {
    width: 74,
    height: 74,
    borderRadius: 74,
  },
  avatarNotification: {
    position: 'absolute',
    right: -4,
    top: -4,
    width: 14,
    height: 14,
    borderRadius: 14,
    backgroundColor: '#2ecc71',
    borderWidth: 2,
    borderColor: '#ffffff',
  },
  name: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333333',
  },
  balanceView: {
    flex: 1,
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
  balanceSection: {
    justifyContent: 'center',
    alignItems: 'flex-end',
    flex: 1,
    paddingRight: 20,
    marginTop: -40,
  },
  balanceText: {
    fontSize: 20,
    fontWeight: '500',
    color: '#666666',
  },
  balanceValue: {
    fontSize: 28,
    fontWeight: '600',
    color: Colors.light.primary,
  },
  /** Stats */
  stats: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: -6,
    marginTop: 18,
  },
  statsItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    borderLeftWidth: 1,
    borderLeftColor: '#DFDFDF',
  },
  statsItemText: {
    fontSize: 14,
    fontWeight: '400',
    color: '#666666',
    marginBottom: 6,
  },
  statsItemValue: {
    fontSize: 18,
    fontWeight: '500',
    color: '#333333',
  },
  /** Btn */
  btn: {
    backgroundColor: '#F0F0F0',
    paddingVertical: 8,
    borderRadius: 6,
    alignItems: 'center',
    justifyContent: 'center',
  },
  btnText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#666666',
  },
  btnPrimary: {
    backgroundColor: Colors.light.primary,
    paddingVertical: 8,
    borderRadius: 6,
    alignItems: 'center',
    justifyContent: 'center',
  },
  btnPrimaryText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#ffffff',
  },
  /** List */
  list: {
    paddingTop: 24,
  },
  listHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  listTitle: {
    fontSize: 24,
    fontWeight: '500',
    color: '#333333',
  },
  listAction: {
    fontSize: 14,
    fontWeight: '500',
    color: Colors.light.primary,
  },
  listContent: {
    paddingVertical: 12,
    marginHorizontal: -6,
  },
  /** Card */
  card: {
    backgroundColor: '#ffffff',
    paddingVertical: 18,
    paddingHorizontal: 24,
    borderRadius: 12,
    marginHorizontal: 6,
    shadowColor: '#000000',
    shadowOpacity: 0.1,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowRadius: 12,
    elevation: 2,
    width: 240,
  },
  cardTop: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 18,
  },
  cardIcon: {
    width: 44,
    height: 44,
    borderRadius: 44,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F0F0F0',
    marginRight: 12,
  },
  cardBody: {
    flex: 1,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '500',
    color: '#333333',
    marginBottom: 4,
  },
  cardSubtitle: {
    fontSize: 14,
    fontWeight: '400',
    color: '#666666',
  },
  cardFooter: {
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#F0F0F0',
  },
  cardFooterText: {
    fontSize: 14,
    fontWeight: '400',
    color: '#666666',
    marginBottom: 4,
  },
});
