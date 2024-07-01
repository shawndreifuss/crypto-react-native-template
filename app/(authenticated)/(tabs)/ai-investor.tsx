import React from 'react';
import { View, Text, Image, ScrollView, StyleSheet, TouchableOpacity, TextInput } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';
import { articles } from '@/dummydata/data';


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
