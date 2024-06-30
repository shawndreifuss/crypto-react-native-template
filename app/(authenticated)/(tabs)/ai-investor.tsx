import React from 'react';
import { View, Text, Image, ScrollView, StyleSheet, TouchableOpacity, TextInput } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';

const articles = [
  {
    id: 1,
    image: 'https://www.betterinvesting.org/getmedia/696619f2-1843-4b28-973f-39d6f70dbf8e/how-to-start-a-stock-investment-club-online-1280x720.jpg?width=1280&height=720&ext=.jpg',
    title: 'Unique activities with local experts.',
    link: 'Learning to Invest',
  },
  {
    id: 2,
    image: 'https://www.investopedia.com/thmb/6PhOzANk5XqxQK4jE59MPMsywUg=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/investing.asp-final-9cbfccbd50344a828ddf1882a2fdc07c.png',
    title: 'The highest status people.',
    link: 'Beginners guid to investing',
  },
  {
    id: 3,
    image: 'https://www.betterinvesting.org/getmedia/003bddb5-372a-4623-98d5-40b45d0f696b/investing_101_naic.jpg?width=1281&height=721&ext=.jpg',
    title: 'Experiences and things to do wherever you are.',
    link: 'I learned how to invest',
  },
  {
    id: 4,
    image: 'https://media.licdn.com/dms/image/C4D12AQEIV0ahMpFh0w/article-cover_image-shrink_720_1280/0/1602665322513?e=2147483647&v=beta&t=QBhfh15aF93KATm7RlhERTNq6CO51xB7B7xtuS9r2aA',
    title: 'Get more followers and grow.',
    link: 'Read Article',
  },
  {
    id: 5,
    image: 'https://bsmedia.business-standard.com/_media/bs/img/article/2024-01/12/full/1705081565-4085.jpg?im=FeatureCrop,size=(826,465)',
    title: 'New ways to meet your business goals.',
    link: 'Read Article',
  },
  {
    id: 6,
    image: 'https://www.betterinvesting.org/getmedia/1de5347b-27b9-40a2-abd8-8dcc173091b5/10-tips.jpg?width=960&height=540&ext=.jpg',
    title: 'Adventures - Multi day trips with meals and stays.',
    link: 'Read Article',
  },
];

const FollowingScreen = () => {

  return (
    <>
     <View >
            <View style={styles.listHeader}>
              <Text style={styles.listTitle}>Learn to invest</Text>

              <TouchableOpacity onPress={() => {}}>
                <Text style={styles.listAction}>AI found Investments</Text>
              </TouchableOpacity>
            </View>
          </View>
    <ScrollView style={styles.container}>
      {articles.map((article) => (
        <View key={article.id} style={styles.card}>
          <Image source={{ uri: article.image }} style={styles.image} />
          <Text style={styles.title}>{article.title}</Text>
          <TouchableOpacity>
            <Text style={styles.link}>{article.link} <Ionicons name="chevron-forward" size={16} /></Text>
          </TouchableOpacity>
        </View>
      ))}
    </ScrollView>
    </>
  );
};

const TrendingScreen = () => {
  const [form, setForm] = useState({
    amount: '',
    question: '',
  });
  return (
    <View style={styles.container}>
      <View >
        <Text style={{fontSize:24, textAlign:'center', backgroundColor:'#fff',padding:20, paddingBottom:0, color:'gray'}}>Let us find your perfect Investment.</Text>
      </View>
      <View style={styles.container}>
        
        <View style={[styles.form, {padding:30, backgroundColor:'#fff'}]}>
          <View style={styles.input}>
            <Text style={styles.inputLabel}>Amount you want to invest</Text>
            
            <TextInput
              autoCapitalize="none"
              autoCorrect={false}
              clearButtonMode="while-editing"
              keyboardType="numeric"
              onChangeText={amount => setForm({ ...form, amount })}
              placeholder="$100"
              placeholderTextColor="#6b7280"
              style={styles.inputControl}
              value={form.amount} />
          </View>
         
          <View style={styles.formAction}>
            <TouchableOpacity
              onPress={() => {
                // handle onPress
              }}>
              <View style={styles.btn}>
                <Text style={styles.btnText}>Find Investments</Text>
              </View>
            </TouchableOpacity>
          </View>
         
        </View>
      </View>
    </View>
  );
};

export default function App() {
  return (
    <View style={[styles.container]}>
  <FollowingScreen />
  <TrendingScreen />
</View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    borderTopColor: '#f1f5f9',
  },
  listHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 24,
    marginTop: 20,
    paddingBottom: 20,
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
  card: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 10,
    marginVertical: 8,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
  },
  image: {
    width: '100%',
    height: 150,
    borderRadius: 8,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    marginVertical: 8,
  },
  link: {
    color: 'purple',
    fontSize: 14,
    fontWeight: 'bold',
  },
  /** Form */
  form: {
    marginBottom: 24,
  },
  formAction: {
    marginVertical: 24,
  },
  formFooter: {
    fontSize: 15,
    fontWeight: '500',
    color: '#222',
    textAlign: 'center',
  },
  /** Input */
  input: {
    marginBottom: 16,
  },
  inputLabel: {
    fontSize: 17,
    fontWeight: '600',
    color: '#222',
    marginBottom: 8,
  },
  inputControl: {
    height: 44,
    backgroundColor: '#f1f5f9',
    paddingHorizontal: 16,
    borderRadius: 12,
    fontSize: 15,
    fontWeight: '500',
    color: '#222',
  },
  /** Button */
  btn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderWidth: 1,
    backgroundColor: 'purple',
    borderColor: '#007aff',
  },
  btnText: {
    fontSize: 17,
    lineHeight: 24,
    fontWeight: '600',
    color: '#fff',
  },
});
