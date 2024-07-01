import React from 'react';
import {
  StyleSheet,
  SafeAreaView,
  View,
  ScrollView,
  TouchableOpacity,
  Text,
  Image,
  FlatList,
} from 'react-native';
import { useQuery } from '@tanstack/react-query';
import { Currency } from '@/interfaces/crypto';
import { Coin } from '@/types/types';
import Icon from 'react-native-vector-icons/FontAwesome';
import { dummyData } from '@/app/api/ticker-demo-data';
import { stats } from '@/dummydata/data';

const shawn = require('@/assets/images/Shawn-Dreifuss.jpeg');
const Balance = require('@/assets/images/Balance.png');

export default function MyWallet() {
  const { data: currencies } = useQuery({
    queryKey: ['listings'],
    queryFn: () => fetch('/api/listings').then((res) => res.json()),
  });

  const ids = currencies?.data?.map((currency: Currency) => currency.id).join(',');

  const { data } = useQuery({
    queryKey: ['info', ids],
    queryFn: () => fetch(`/api/info?ids=${ids}`).then((res) => res.json()),
    enabled: !!ids,
  });

  return (
    <SafeAreaView style={{ flex: 1, paddingTop: 20 }}>
      <View style={[styles.listHeader, { marginTop: 20 }]}>
        <Text style={[styles.listTitle, { fontSize: 32 }]}>My Wallet</Text>
      </View>
      <View style={styles.container}>
        <ScrollView>
          <View style={styles.content}>
            <View style={styles.profile}>
              <View style={styles.profileTop}>
                <View style={styles.avatar}>
                  <Image alt="" source={shawn} style={styles.avatarImg} />
                  <View style={styles.avatarNotification} />
                </View>
                <View style={[styles.balanceView, { marginTop: -10 }]}>
                  <View
                    style={{
                      top: -20,
                      marginLeft: 20,
                      marginTop: 10,
                    }}
                  >
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
                    <Text style={styles.balanceText}>Current Balance</Text>
                    <Text style={styles.balanceValue}>$2,380</Text>
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
                    ]}
                  >
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
                style={{ flex: 1, paddingHorizontal: 6 }}
              >
                <View style={styles.btn}>
                  <Text style={styles.btnText}>Buy & Sell</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  // handle onPress
                }}
                style={{ flex: 1, paddingHorizontal: 6 }}
              >
                <View style={styles.btnPrimary}>
                  <Text style={styles.btnPrimaryText}>Transfer</Text>
                </View>
              </TouchableOpacity>
            </View>

            <View style={styles.list}>
              <View style={[styles.listHeader, { marginBottom: 10 }]}>
                <Text style={styles.listTitle}>My Assets</Text>
                <TouchableOpacity
                  onPress={() => {
                    // handle onPress
                  }}
                >
                  <Text style={styles.listAction}>View All</Text>
                </TouchableOpacity>
              </View>
              <FlatList
                keyExtractor={(item) => item.id.toString()}
                data={dummyData.coins as Coin[]} 
                renderItem={({ item }: { item: Coin }) => (
                  <View
                    style={{
                      flexDirection: 'row',
                      height: 100,
                      width: '100%',
                      borderWidth: 1,
                      borderColor: '#ddd',
                      borderRadius: 15,
                      justifyContent: 'space-between',
                      paddingRight: 10,
                      marginBottom: 15,
                    }}
                  >
                    {/* Coin image, coin name and symbol */}
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                      {/* Coin image */}
                      <Image
                        style={{ height: 40, width: 40, marginLeft: 20 }}
                        resizeMode="contain"
                        source={{ uri: item.image }}
                      />
                      {/* Coin symbol */}
                      <View style={{ flexDirection: 'column', justifyContent: 'flex-start' }}>
                        <Text style={{ fontFamily: 'Roboto-Medium', color: '#333', fontSize: 20, marginLeft: 20 }}>{item.currency}</Text>
                        <Text style={{ marginLeft: 20 }}>BNB/USDT</Text>
                      </View>
                    </View>
                    {/* Coin price and indicator */}
                    <View style={{ flexDirection: 'column', alignContent: 'center', justifyContent: 'center' }}>
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
        </ScrollView>
      </View>
    </SafeAreaView>

  );
                  };

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
    marginBottom: 0,
  },
  /** Profile */
  profile: {
    paddingTop: 4,
    paddingBottom: 16,
  },
  profileTop: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  profileBody: {
    flexGrow: 1,
    width: '100%',
    display: 'flex',
    textAlign: 'center',
  },
  profileTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    lineHeight: 32,
    color: '#121a26',
    marginLeft: 10,
  },
  profileSubtitle: {
    fontSize: 15,
    fontWeight: '600',
    color: '#778599',
  },
  profileDescription: {
    fontSize: 14,
    fontWeight: '500',
    lineHeight: 18,
    color: '#778599',
  },
  profileTags: {
    marginTop: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  profileTagsItem: {
    fontSize: 14,
    fontWeight: '600',
    lineHeight: 18,
    color: '#266ef1',
    marginRight: 4,
  },
  /** Avatar */
  avatar: {
    position: 'relative',
  },
  avatarImg: {
    width: 80,
    height: 80,
    borderRadius: 9999,
  },
  avatarNotification: {
    position: 'absolute',
    borderRadius: 9999,
    borderWidth: 2,
    borderColor: '#fff',
    bottom: 0,
    right: -2,
    width: 21,
    height: 21,
    backgroundColor: '#22C55E',
  },
  /** Stats */
  stats: {
    backgroundColor: '#fff',
    flexDirection: 'row',
    padding: 20,
    borderRadius: 12,
    shadowColor: '#90a0ca',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.2,
    shadowRadius: 20,
    elevation: 1,
  },
  statsItem: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 0,
    borderLeftWidth: 1,
    borderColor: 'rgba(189, 189, 189, 0.32)',
  },
  statsItemText: {
    fontSize: 14,
    fontWeight: '400',
    lineHeight: 18,
    color: '#778599',
    marginBottom: 5,
  },
  statsItemValue: {
    fontSize: 16,
    fontWeight: '600',
    lineHeight: 20,
    color: '#121a26',
  },
  /** Button */
  btn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderWidth: 2,
    backgroundColor: 'transparent',
    borderColor: '#266EF1',
  },
  btnText: {
    fontSize: 14,
    lineHeight: 20,
    fontWeight: '700',
    color: '#266EF1',
  },
  btnPrimary: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderWidth: 2,
    backgroundColor: '#266EF1',
    borderColor: '#266EF1',
  },
  btnPrimaryText: {
    fontSize: 14,
    lineHeight: 20,
    fontWeight: '700',
    color: '#fff',
  },
  /** List */
  list: {
    marginTop: 16,
  },
  listHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 24,
  },
  listTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#121a26',
  },
  listAction: {
    fontSize: 14,
    fontWeight: '500',
    lineHeight: 20,
    color: '#778599',
  },
  listContent: {
    paddingVertical: 12,
    paddingHorizontal: 18,
  },
  /** Card */
  card: {
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderRadius: 12,
    backgroundColor: '#fff',
    marginHorizontal: 6,
    shadowColor: '#90a0ca',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 1,
  },
  cardTop: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  cardIcon: {
    width: 44,
    height: 44,
    borderRadius: 9999,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#eff1f5',
  },
  cardBody: {
    paddingLeft: 12,
  },
  cardTitle: {
    fontSize: 15,
    fontWeight: '600',
    lineHeight: 18,
    color: '#121a26',
    marginBottom: 4,
  },
  cardSubtitle: {
    fontSize: 14,
    fontWeight: '500',
    lineHeight: 18,
    color: '#778599',
  },
  cardFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 18,
  },
  cardFooterText: {
    fontSize: 13,
    fontWeight: '500',
    lineHeight: 18,
    color: '#778599',
  },
  balanceSection: {
    paddingHorizontal: 20,
  },
  balanceView: {
    marginTop: 20,
    backgroundColor: '#fff',
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderRadius: 20,
    alignItems: 'center',
  },
  balanceText: {
    color: '#778599',
  },
  balanceValue: {
    fontSize: 30,
    letterSpacing: 2,
    fontWeight: 'bold',
  },
});