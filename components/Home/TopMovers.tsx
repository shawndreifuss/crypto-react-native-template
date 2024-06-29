import React from 'react';
import {
  StyleSheet,
  Dimensions,
  SafeAreaView,
  View,
  ScrollView,
  TouchableOpacity,
  Text,
  Image,
} from 'react-native';
import { useQuery } from '@tanstack/react-query';
import { Ionicons } from '@expo/vector-icons';
import { Link } from 'expo-router';
import { Currency } from './types';

const CARD_WIDTH = Math.min(Dimensions.get('screen').width * 0.75, 150);

// Utility function to format price with commas
function formatPriceWithCommas(price: number): string {
  return price.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

export default function TopMovers() {
  const { data: currencies } = useQuery({
    queryKey: ['listings'],
    queryFn: () => fetch('/api/listings').then((res) => res.json()),
  });

  const ids = currencies?.map((currency: Currency) => currency.id).join(',');

  const { data: currencyInfo } = useQuery({
    queryKey: ['info', ids],
    queryFn: () => fetch(`/api/info?ids=${ids}`).then((res) => res.json()),
    enabled: !!ids,
  });

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
        <ScrollView>
          <View style={styles.list}>
            <View style={styles.listHeader}>
              <Text style={styles.listTitle}>Top Movers </Text>

              <TouchableOpacity onPress={() => {}}>
                <Text style={styles.listAction}>View All</Text>
              </TouchableOpacity>
            </View>

            <ScrollView
              contentContainerStyle={styles.listContent}
              horizontal={true}
              showsHorizontalScrollIndicator={false}
            >
              {currencies?.map((currency: Currency) => (
                 <Link href={`/crypto/${currency.id}`} key={currency.id} asChild>
                <TouchableOpacity  onPress={() => {}}>
                  <View style={styles.card}>
                    <View style={styles.cardTop}>
                      <View style={styles.cardIcon}>
                        <Image
                          source={{ uri: currencyInfo?.[currency.id]?.logo }}
                          style={{ width: 40, height: 40 }}
                        />
                      </View>

                      <View style={styles.cardBody}>
                        <Text style={styles.cardTitle}>{currency.symbol}</Text>
                      </View>
                    </View>

                    <View style={styles.cardFooter}>
                      <Text style={styles.cardTitle}>{currency.name}</Text>
                      <Text style={styles.cardPrice}>
                        ${formatPriceWithCommas(currency.quote.EUR.price)}
                      </Text>
                      <View style={{ flexDirection: 'row', gap: 4, marginLeft:-6, paddingTop: 6 }}>
                        <Ionicons
                          name={
                            currency.quote.EUR.percent_change_1h > 0
                              ? 'caret-up'
                              : 'caret-down'
                          }
                          size={16}
                          color={
                            currency.quote.EUR.percent_change_1h > 0
                              ? 'green'
                              : 'red'
                          }
                        />
                        <Text
                          style={{
                            color:
                              currency.quote.EUR.percent_change_1h > 0
                                ? 'green'
                                : 'red',
                          }}
                        >
                          {currency.quote.EUR.percent_change_1h.toFixed(2)} %
                        </Text>
                      </View>
                    </View>
                  </View>
                </TouchableOpacity>
                </Link>
              ))}
            </ScrollView>
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
    paddingBottom: 40,
  },
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
    lineHeight: 22,
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
  card: {
    width: CARD_WIDTH,
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
  cardPrice: {
    fontSize: 14,
    fontWeight: '500',
    color: '#121a26',
    marginTop: 4,
  },
  cardFooter: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    marginTop: 12,
  },
});
