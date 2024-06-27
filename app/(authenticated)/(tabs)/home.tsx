import { View, Text, ScrollView, StyleSheet, Button } from "react-native";
import React from "react";
import Colors from "@/constants/Colors";
import RoundButton from "@/components/RoundButton";
import Dropdown from "@/components/Dropdown";

const Home = () => {
  const balance = 777.77;

  const onAddMoney = () => {}
  return (
    <ScrollView style={{ backgroundColor: Colors.background}}>
      <View style={styles.account}>
      <View style={styles.row}> 
      <Text style={styles.balance}>$ {balance} </Text>
      </View>
      </View>

      {/*  TODO: Create overall chart of all accounts */}


      {/* ==================== */}



      <View style={styles.actionRow}>
        <RoundButton icon={'add'} text={'Deposit'} onPress={onAddMoney}  />
        <RoundButton icon={'refresh'} text={'Exchange'} onPress={onAddMoney}  />
        <RoundButton icon={'list'} text={'Details'} onPress={onAddMoney}  />
        <Dropdown />
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
});
export default Home;
