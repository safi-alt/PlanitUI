import * as React from "react";
import {
  StatusBar,
  FlatList,
  Image,
  Animated,
  Text,
  View,
  Dimensions,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
  Easing,
  SafeAreaViewBase,
  SafeAreaView,
  Pressable,
  ActivityIndicator,
} from "react-native";
import Entypo from "react-native-vector-icons/Entypo";

const { width, height } = Dimensions.get("screen");
import faker from "faker";
import { selectUser } from "../slices/navSlice";
import { useSelector } from "react-redux";
// import {Title} from 'react-native-paper';
import { useIsFocused } from "@react-navigation/native";

faker.seed(10);
const DATA = [...Array(30).keys()].map((_, i) => {
  return {
    key: faker.datatype.uuid(),
    image: `https://randomuser.me/api/portraits/${faker.helpers.randomize([
      "women",
      "men",
    ])}/${faker.datatype.number(60)}.jpg`,
    name: faker.name.findName(),
    jobTitle: faker.name.jobTitle(),
    email: faker.internet.email(),
  };
});

const BG_IMG = require("../assets/MainLogoPlaniT.png");

const SPACING = 20;
const AVATAR_SIZE = 70;
const ITEM_SIZE = AVATAR_SIZE + SPACING * 3;

const YourTripsScreen = (props) => {
  const scrollY = React.useRef(new Animated.Value(0)).current;
  const userInformation = useSelector(selectUser);
  const [data, setData] = React.useState([]);
  const [isFetching, setIsFetching] = React.useState(true);
  const isFocused = useIsFocused();

  const getData = async (id) => {
    setIsFetching(true);
    const res = await fetch(
      `https://planit-fyp.herokuapp.com/api/orders/getUserOrders/${id}`
    );
    const response = await res.json();
    const orders = response.userOrders.map((x) => {
      return {
        key: x._id,
        image: x.avatar,
        name: x.name,
        phone: x.phone,
        origin: x.origin,
        destination: x.destination,
        cost: x.cost,
      };
    });
    setData(orders);
  };

  React.useEffect(() => {
    console.log("Hello your trips");
    setIsFetching(true);
    setTimeout(() => {
      getData(userInformation.id);
      setIsFetching(false);
    }, 3000);
  }, [isFocused]);

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      {isFetching ? (
        <ActivityIndicator
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
          size="large"
          color="green"
        />
      ) : (
        <View>
          <Image
            source={require("../assets/MainLogoPlaniT.png")}
            style={{
              position: "absolute",
              height: "100%",
              width: "100%",
            }}
            blurRadius={3}
          />
          <Animated.FlatList
            data={data}
            onScroll={Animated.event(
              [{ nativeEvent: { contentOffset: { y: scrollY } } }],
              { useNativeDriver: true }
            )}
            keyExtractor={(item) => item.key}
            contentContainerStyle={{
              padding: SPACING,
              paddingTop: StatusBar.currentHeight || 42,
            }}
            renderItem={({ item, index }) => {
              const inputRange = [
                -1,
                0,
                ITEM_SIZE * index,
                ITEM_SIZE * (index + 2),
              ];
              const opacityInputRange = [
                -1,
                0,
                ITEM_SIZE * index,
                ITEM_SIZE * (index + 1),
              ];

              const scale = scrollY.interpolate({
                inputRange,
                outputRange: [1, 1, 1, 0],
              });
              const opacity = scrollY.interpolate({
                inputRange: opacityInputRange,
                outputRange: [1, 1, 1, 0],
              });

              return (
                <Animated.View
                  style={{
                    flexDirection: "row",
                    padding: SPACING,
                    marginBottom: SPACING,
                    backgroundColor: "rgba(255,255,255,0.8)",
                    borderRadius: 12,
                    shadowColor: "#000",
                    shadowOffset: {
                      width: 0,
                      height: 10,
                    },
                    shadowOpacity: 0.3,
                    shadowRadius: 20,
                    opacity,
                    transform: [{ scale }],
                  }}
                >
                  <Image
                    source={{ uri: userInformation.avatar }}
                    style={{
                      width: AVATAR_SIZE,
                      height: AVATAR_SIZE,
                      borderRadius: AVATAR_SIZE,
                      marginRight: SPACING / 2,
                    }}
                  />
                  <View style={{ flexShrink: 1 }}>
                    <Text style={{ fontSize: 22, fontWeight: "700" }}>
                      {item.name}
                    </Text>
                    <Text style={{ fontSize: 14, opacity: 0.7, flexShrink: 1 }}>
                      <Text style={{ color: "green", fontWeight: "bold" }}>
                        Origin:{" "}
                      </Text>
                      {item.origin}
                    </Text>
                    <Text
                      style={{
                        fontSize: 14,
                        opacity: 0.7,
                        color: "black",
                        flexWrap: "wrap",
                      }}
                    >
                      <Text style={{ color: "green", fontWeight: "bold" }}>
                        Destination:{" "}
                      </Text>
                      {item.destination}
                    </Text>
                    <Text
                      style={{
                        fontSize: 14,
                        opacity: 0.7,
                        color: "black",
                        flexWrap: "wrap",
                      }}
                    >
                      <Text style={{ color: "green", fontWeight: "bold" }}>
                        Cost:{" "}
                      </Text>
                      {item.cost}
                    </Text>
                  </View>
                </Animated.View>
              );
            }}
          />
        </View>
      )}
    </View>
  );
};

export default YourTripsScreen;
