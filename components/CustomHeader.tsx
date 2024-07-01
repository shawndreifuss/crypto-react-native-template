import React from 'react';
import Colors from '@/constants/Colors';
import { Ionicons } from '@expo/vector-icons';
import { View, Text, StyleSheet } from 'react-native';
import { TextInput, TouchableOpacity } from 'react-native-gesture-handler';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { BlurView } from 'expo-blur';
import { Link } from 'expo-router';
import { Fontisto } from '@expo/vector-icons';

const CustomHeader = () => {
  const { top } = useSafeAreaInsets();




  return (
    <BlurView intensity={80} tint={'extraLight'} style={{ paddingTop: top }}>
      <View
        style={[
          styles.container,
          {
            height: 60,
            gap: 10,
            paddingHorizontal: 20,
            backgroundColor: 'transparent',
          },
        ]}>
        <Link href={'/(authenticated)/(modals)/account'} asChild>
          <TouchableOpacity
            style={{
              width: 60,
              height: 60,
              borderRadius: 20,
              justifyContent: 'center',
              alignItems: 'center',
              marginLeft:-5,
            }}>
            <Fontisto name="nav-icon-grid" size={26} color="black" />
          </TouchableOpacity>
        </Link>
        <View style={styles.searchSection}>
        <Text style={{fontSize: 32, color: Colors.gray}}>Live Market</Text>
         </View>
        <View style={styles.circle}>
          <Ionicons name={'card'} size={20} color={Colors.dark} />
        </View>
        <View style={styles.circle}>
          <Ionicons name={'settings'} size={20} color={Colors.dark} />
        </View>
      </View>
    </BlurView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  btn: {
    padding: 10,
    backgroundColor: Colors.gray,
  },
  searchSection: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 30,
  },
  searchIcon: {
    padding: 10,
  },
  input: {
    flex: 1,
    paddingTop: 10,
    paddingRight: 10,
    paddingBottom: 10,
    paddingLeft: 0,
    backgroundColor: Colors.lightGray,
    color: Colors.dark,
    borderRadius: 30,
  },
  circle: {
    width: 40,
    height: 40,
    borderRadius: 30,
    backgroundColor: Colors.lightGray,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
export default CustomHeader;
