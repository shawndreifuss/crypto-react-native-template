import { View, Text, ScrollView, StyleSheet, Button } from "react-native";
import React from "react";
import Colors from "@/constants/Colors";
import RoundButton from "@/components/RoundButton";
import Dropdown from "@/components/Dropdown";
import { useBalanceStore } from "@/store/balanceStore";
import { defaultStyles } from "@/constants/Styles";
import { Ionicons } from "@expo/vector-icons";
import WidgetList from "@/components/SortableList/WidgetList";

const Home = () => {
  const  { balance, runTransaction, transactions, clearTransactions } = useBalanceStore();

  const onAddMoney = () => {
    runTransaction({
      id: Math.random().toString(),
      title: 'Added Money',
      amount: Math.floor(Math.random() * 1000) * (Math.random() > 0.5 ? 1 : -1),
      date: new Date(),
  });
  }
  return (
    <ScrollView style={{ backgroundColor: Colors.background}}>
      <View style={styles.account}>
      <View style={styles.row}> 
      <Text style={styles.balance}>${balance()} </Text>
      </View>
      </View>
      {/*  TODO: Create overall chart of all accounts */}


      {/* ==================== */}
      <View style={styles.actionRow}>
        <RoundButton icon={'add'} text={'Deposit'} onPress={onAddMoney}  />
        <RoundButton icon={'refresh'} text={'Exchange'} onPress={clearTransactions}  />
        <RoundButton icon={'list'} text={'Details'} onPress={onAddMoney}  />
        <Dropdown />
      </View>

      <Text style={defaultStyles.sectionHeader}>Widgets</Text>
       <WidgetList />
      <Text style={defaultStyles.sectionHeader}>Transactions</Text>
      <View style={styles.transactions}>
       {transactions.reverse().length === 0 && <Text style={{padding: 14, color: Colors.gray}} > No Transactions yet</Text>}
       {transactions.map((transaction) => (
         <View key={transaction.id} style={{flexDirection: 'row', alignItems:'center', gap:16}}>
          <View style={styles.circle}>
            <Ionicons name={transaction.amount > 0 ? 'add' : 'remove'} size={24} color={transaction.amount > 0 ? '#056517' : '#bf1029'} />
            
      </View>
      <View style={{flex: 1}}>
              <Text style={{ fontWeight: '500'}}>{transaction.title}</Text>
              <Text style={{ color: Colors.gray, fontSize: 12}}>{transaction.date.toLocaleDateString()}</Text>
          </View>
          <Text>${transaction.amount}</Text>
      </View>

        ))}
           
      
        </View>
        
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  account: {
    margin:30,
    alignItems: 'flex-start',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
  },
  balance: {
    fontSize: 45,
    fontWeight: 'bold',
  },
  actionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    margin: 25,
  },
  transactions: {
    marginHorizontal: 20,
    padding: 14,
    backgroundColor: '#fff', 
    borderRadius: 16,
    gap:20,
  },
  circle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Colors.lightGray,
    alignItems: 'center',
    justifyContent: 'center',
  }
});
export default Home;
