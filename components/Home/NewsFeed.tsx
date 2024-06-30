import React from 'react';
import { View, Text, FlatList, Image, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const articles = [
  {
    id: '1',
    category: 'Cryptocurrency',
    title: 'Bitcoin Surges to New All-Time High',
    author: 'Alice Johnson',
    date: 'Jun 28, 2024',
    image: 'data:image/jpeg;base64,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',
  },
  {
    id: '2',
    category: 'Cryptocurrency',
    title: 'Ethereum 2.0: What You Need to Know',
    author: 'Bob Smith',
    date: 'Jun 27, 2024',
    image: 'https://www.cybavo.com/img/cms/eth2.jpg',
  },
  {
    id: '3',
    category: 'Cryptocurrency',
    title: 'Dogecoin Gains Popularity Among Retail Investors',
    author: 'Catherine Lee',
    date: 'Jun 26, 2024',
    image: 'https://www.securities.io/wp-content/uploads/2024/02/DALL%C2%B7E-2024-02-20-13.44.50-A-digital-illustration-that-combines-elements-of-cryptocurrency-community-and-innovation-for-a-cover-image-of-an-article-about-Dogecoin.-The-scene-f.webp',
  },
  {
    id: '4',
    category: 'Cryptocurrency',
    title: 'Ripple Labs Faces New Legal Challenges',
    author: 'David Kim',
    date: 'Jun 25, 2024',
    image: 'https://bitcoinworld.co.in/wp-content/uploads/2021/02/Ripple-Labs-registers-its-business-in-Wyoming.jpg',
  },
  {
    id: '5',
    category: 'Cryptocurrency',
    title: 'Litecoin: The Silver to Bitcoin’s Gold',
    author: 'Eva Green',
    date: 'Jun 24, 2024',
    image: 'https://www.investopedia.com/thmb/sFHIoT5OqLJAwZNsoiTPnxR6XD0=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/shutterstock_709036540-5bfc32f246e0fb00514633ea.jpg',
  },
  {
    id: '6',
    category: 'Cryptocurrency',
    title: 'Cardano: A Rising Star in the Crypto Space',
    author: 'Frank White',
    date: 'Jun 23, 2024',
    image: 'https://upload.wikimedia.org/wikipedia/commons/c/c0/Cardano_Logo.jpg',
  },
  {
    id: '7',
    category: 'Cryptocurrency',
    title: 'Polkadot: Interoperability and Beyond',
    author: 'Grace Black',
    date: 'Jun 22, 2024',
    image: 'https://images.pexels.com/photos/8441242/pexels-photo-8441242.jpeg',
  },
  {
    id: '8',
    category: 'Cryptocurrency',
    title: 'Chainlink: Bridging the Gap Between Smart Contracts and Real World Data',
    author: 'Henry Young',
    date: 'Jun 21, 2024',
    image: 'https://cryptopotato.com/wp-content/uploads/2020/01/bitcoin_news-min.jpg',
  },
  {
    id: '9',
    category: 'Cryptocurrency',
    title: 'Stellar Lumens: Making Money More Fluid',
    author: 'Isabel Clark',
    date: 'Jun 20, 2024',
    image: 'https://smartasset.com/wp-content/uploads/sites/2/2021/03/chainlink_1.png',
  },
  {
    id: '10',
    category: 'Cryptocurrency',
    title: 'Tether: The Stablecoin Controversy',
    author: 'Jack Walker',
    date: 'Jun 19, 2024',
    image: 'https://cryptoticker.io/en/wp-content/uploads/sites/2/2018/12/crypto.jpg',
  },
  {
    id: '11',
    category: 'Cryptocurrency',
    title: 'Solana: High-Speed Blockchain Solutions',
    author: 'Karen Mitchell',
    date: 'Jun 18, 2024',
    image: 'https://www.forexcrunch.com/wp-content/uploads/2020/12/Crypto-currencies.jpg',
  },
  {
    id: '12',
    category: 'Cryptocurrency',
    title: 'Monero: Privacy-Focused Cryptocurrency',
    author: 'Liam Scott',
    date: 'Jun 17, 2024',
    image: 'https://cryptotrends.tech/wp-content/uploads/2020/04/cryptocurrency.jpg',
  },
];

interface Article {
  id: string;
  category: string;
  title: string;
  author: string;
  date: string;
  image: string;
}

const NewsFeed = () => {
  const renderItem = ({ item }: { item: Article }) => (
    <View style={styles.articleContainer}>
      <Image source={{ uri: item.image }} style={styles.image} />
      <View style={styles.textContainer}>
        <Text style={styles.category}>{item.category}</Text>
        <Text style={styles.title}>{item.title}</Text>
        <View style={styles.authorContainer}>
          <Icon name="person" size={16} color="#888" />
          <Text style={styles.author}>{item.author}</Text>
          <Text style={styles.date}>• {item.date}</Text>
        </View>
      </View>
    </View>
  );

  return (
    <FlatList
      data={articles}
      renderItem={renderItem}
      keyExtractor={(item) => item.id}
      contentContainerStyle={styles.container}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  articleContainer: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 8,
  },
  textContainer: {
    flex: 1,
    marginLeft: 16,
  },
  category: {
    fontSize: 12,
    color: '#888',
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 4,
    marginBottom: 8,
  },
  authorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  author: {
    marginLeft: 4,
    fontSize: 14,
    color: '#555',
  },
  date: {
    marginLeft: 8,
    fontSize: 12,
    color: '#888',
  },
});

export default NewsFeed;
