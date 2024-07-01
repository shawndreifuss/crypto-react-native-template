import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TextInput,
  SafeAreaView,
  TouchableWithoutFeedback,
  TouchableOpacity,
} from "react-native";
import React from "react";
import Colors from "@/constants/Colors";
import { AntDesign } from "@expo/vector-icons";
import { CartesianChart, Line, useChartPressState } from "victory-native";
import { Circle, useFont } from "@shopify/react-native-skia";
import { useState } from "react";
import { format } from "date-fns";
import tickerData from "@/app/api/ticker-demo-data";
import { FontAwesome } from "@expo/vector-icons";
import { Feather } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import TopMovers from "@/components/TopMovers";
import Animated, {
  SharedValue,
  useAnimatedProps,
} from "react-native-reanimated";
import NewsFeed from "@/components/Home/NewsFeed";
const tabs = [
  { name: "1H" },
  { name: "1D" },
  { name: "1W" },
  { name: "1M" },
  { name: "1Y" },
  { name: "All" },
];

Animated.addWhitelistedNativeProps({ text: true });
const AnimatedTextInput = Animated.createAnimatedComponent(TextInput);

// Start of component
const Home = () => {
  const [value, setValue] = useState(0);
  const font = useFont(require("@/assets/fonts/SpaceMono-Regular.ttf"), 12);
  const { state, isActive } = useChartPressState<{ x: string; y: { price: number; } }>({
    x: '',
    y: { price: 0 }
  });

  const animatedText = useAnimatedProps(() => {
    let textValue = "$342.02"; // Default value

    if (isActive) {
      textValue = `$${state.y.price.value.value.toFixed(2)}`;
    }

    return {
      text: textValue,
      defaultValue: "$342.02",
    };
  });

  const animatedDateText = useAnimatedProps(() => {
    let textValue = "";
    if (isActive) {
      const date = new Date(parseInt(state.x.value.value, 10)); // Convert string to number for Date
      textValue = date.toLocaleDateString();
    } else {
      const today = new Date();
      textValue = today.toLocaleDateString();
    }

    return {
      text: textValue,
      defaultValue: "",
    };
  });

  function ToolTip({
    x,
    y,
  }: {
    x: SharedValue<number>;
    y: SharedValue<number>;
  }) {
    return <Circle cx={x} cy={y} r={4} color="purple" />;
  }

  return (
    <>
    <ScrollView style={{ backgroundColor: Colors.background }}>
      <View style={styles.account}>
        <View style={styles.column}>
          <Text style={{ fontSize: 32, fontWeight: "bold", marginLeft: -10 }}>
            Investing
            <AnimatedTextInput
              editable={false}
              underlineColorAndroid={"transparent"}
              style={{ fontSize: 18, color: Colors.gray }}
              animatedProps={animatedDateText}
            ></AnimatedTextInput>
          </Text>

          <View style={styles.balanceContainer}>
            <AnimatedTextInput
              editable={false}
              underlineColorAndroid={"transparent"}
              style={[styles.balance, { marginLeft: -10 }]}
              animatedProps={animatedText}
            ></AnimatedTextInput>
          </View>

          <Text style={styles.today}>
            <AntDesign name="caretup" size={12} color="green" /> $237.12
            (12.37%) <Text>Today </Text>{" "}
          </Text>
          <Text style={styles.today}>
            <AntDesign name="caretdown" size={12} color="red" /> $12.37 (-2.37%){" "}
            <Text>yesterday </Text>{" "}
          </Text>
          <AnimatedTextInput
            editable={false}
            underlineColorAndroid={"transparent"}
            style={{
              fontSize: 18,
              color: Colors.gray,
              marginLeft: 285,
              marginTop: -20,
            }}
            animatedProps={animatedDateText}
          ></AnimatedTextInput>
        </View>
      </View>
      {/*  Cartesian Chart to display Users Data */}
      <View style={{ height: 180, marginRight: 30, marginLeft: -20 }}>
        <CartesianChart
          chartPressState={state}
          data={tickerData!}
          xKey="timestamp"
          yKeys={["price"]}
          axisOptions={{
            font,
            tickCount: 5,
            labelOffset: { x: 10, y: 0 },
            labelColor: Colors.gray,
            formatYLabel: () => ``,
            formatXLabel: (ms) => format(new Date(ms), "MM"),
          }}
        >
          {({ points }) => (
            <>
              <Line points={points.price} color={"purple"} strokeWidth={2} />
              {isActive && (
                <ToolTip x={state.x.position} y={state.y.price.position} />
              )}
            </>
          )}
        </CartesianChart>
      </View>
      {/* Buttons to change date range of graph  */}
      <SafeAreaView style={{ flex: 1 }}>
        <View style={styles.container}>
          {tabs.map((item, index) => {
            const isActive = index === value;
            return (
              <View key={item.name} style={{ flex: 1 }}>
                <TouchableWithoutFeedback
                  onPress={() => {
                    setValue(index);
                  }}
                >
                  <View
                    style={[
                      styles.item,
                      isActive && { backgroundColor: "#e0e7ff" },
                    ]}
                  >
                    <Text
                      style={[styles.text, isActive && { color: "#4338ca" }]}
                    >
                      {item.name}
                    </Text>
                  </View>
                </TouchableWithoutFeedback>
              </View>
            );
          })}
        </View>
      </SafeAreaView>
      {/* Current Crypto and Cash in APP */}
      <TouchableOpacity>
      <View style={[styles.listHeader, {}]}>
           <Text style={styles.listTitle}>Buying Power </Text>
                <Text style={styles.listTitle}>$100.05</Text>
            </View>
            <View style={styles.line}></View>
        <View style={styles.cryptoAvailableContainer}>
          <View style={[styles.row, { marginLeft: 30 }]}>
          <MaterialCommunityIcons name="hand-coin-outline" size={24} color="black" />
            <Text style={{ fontSize: 16, fontWeight: 600 }}>Crypto</Text>
          </View>
          <View style={[styles.row, { marginRight: 30 }]}>
            <Text style={{ fontSize: 16, fontWeight: 600 }}>$224.13</Text>
            <Feather name="chevron-right" size={24} color="black" />
          </View>
        </View>
      </TouchableOpacity>
      <TouchableOpacity>
        <View style={styles.cashContainer}>
          <View style={[styles.row, { marginLeft: 30 }]}>
          <FontAwesome name="money" size={24} color="black" />
            <Text style={{ fontSize: 16, fontWeight: 600 }}>Cash</Text>
          </View>
          <View style={[styles.row, { marginRight: 30 }]}>
            <Text style={{ fontSize: 16, fontWeight: 600 }}>$224.13</Text>
            <Feather name="chevron-right" size={24} color="black" />
          </View>
        </View>
      </TouchableOpacity>
      <View style={styles.line}></View>
      {/* TopGainers for Crypto */}
      <TopMovers />
      <View >
            <View style={styles.listHeader}>
              <Text style={styles.listTitle}>Crypto News </Text>

              <TouchableOpacity onPress={() => {}}>
                <Text style={styles.listAction}>View All</Text>
              </TouchableOpacity>
            </View>
          </View>
      
   
      <NewsFeed/>
      </ScrollView>
      <View style={styles.line}></View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    paddingHorizontal: 12,
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 0,
  },
  item: {
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 10,
    backgroundColor: "transparent",
    borderRadius: 6,
  },
  text: {
    fontSize: 13,
    fontWeight: "600",
    color: "#6b7280",
  },
  account: {
    margin: 30,
    alignItems: "flex-start",
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
  },
  column: {
    flexDirection: "column",
    alignItems: "flex-start",
    justifyContent: "flex-start",
  },
  balance: {
    fontSize: 45,
    fontWeight: "bold",
  },
  balanceContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  today: {},
  yesterday: {},
  actionRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    margin: 25,
  },
  transactions: {
    marginHorizontal: 20,
    padding: 14,
    backgroundColor: "#fff",
    borderRadius: 16,
    gap: 20,
  },
  circle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Colors.lightGray,
    alignItems: "center",
    justifyContent: "center",
  },
  cryptoAvailableContainer: {
    display: "flex",
    width: "100%",
    marginTop:40,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
  listHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 24,
    marginTop: 20,
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
  cashContainer: {  
    display: "flex",
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 10,
    paddingVertical: 10,
    marginTop:20,
  },
  line: {
    borderBottomColor: Colors.lightGray,
    borderBottomWidth: 1,
    marginHorizontal: 20,
    marginTop: 20,
  }
});
export default Home;
