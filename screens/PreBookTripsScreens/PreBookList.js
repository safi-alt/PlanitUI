import React from "react";
import {
  StatusBar,
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
  Dimensions,
  ActivityIndicator,
  Modal,
  Pressable,
  Animated,
} from "react-native";
import { SharedElement } from "react-navigation-shared-element";

import preBook from "./PreBook";
import Colors from "../../constants/Colors";
import { selectUser } from "../../slices/navSlice";
import { useSelector } from "react-redux";
import profile from "../../assets/safi.jpg";

const { width, height } = Dimensions.get("screen");
const SPACING = 12;
const ITEM_HEIGHT = height * 0.25;
const AVATAR_SIZE = 70;
const ITEM_SIZE = AVATAR_SIZE + 70 * 3;

const PreBookList = ({ navigation }) => {
  const scrollY = React.useRef(new Animated.Value(0)).current;
  const [data, setData] = React.useState([]);
  const userInformation = useSelector(selectUser);
  const [isFetching, setIsFetching] = React.useState(true);

  const getData = async (id) => {
    const res = await fetch(
      `https://planit-fyp.herokuapp.com/api/orders/getPreBookOrders/${id}`
    );
    const response = await res.json();
    const orders = response.userOrders.map((x) => {
      return {
        key: x._id,
        image: x.avatar,
        name: x.name,
        phone: x.phone,
        date: x.date,
        time: x.time,
        guideName: x.guideName,
        origin: x.origin,
        destination: x.destination,
      };
    });
    setData(orders);
  };
  React.useEffect(() => {
    setTimeout(() => {
      getData(userInformation.id);
      setIsFetching(false);
    }, 3000);
  }, []);

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
            source={require("../../assets/MainLogoPlaniT.png")}
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
                <TouchableOpacity
                  onPress={() => {
                    // navigation.navigate('PreBookListDetails', {item});
                    navigation.navigate("PreBookListDetails", { item });
                  }}
                >
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
                      <Text
                        style={{ fontSize: 14, opacity: 0.7, flexShrink: 1 }}
                      >
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
                          Date:{" "}
                        </Text>
                        {item.date}
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
                          Time:{" "}
                        </Text>
                        {item.time}
                      </Text>
                    </View>
                  </Animated.View>
                </TouchableOpacity>
              );
            }}
          />
          {/* <SharedElement id="general.bg"> */}
          <View style={styles.bg} />
          {/* </SharedElement> */}
        </View>
      )}
    </View>
  );
};

export default PreBookList;

const styles = StyleSheet.create({
  name: {
    fontWeight: "700",
    fontSize: 18,
    position: "absolute",
  },
  jobTitle: {
    fontSize: 11,
    opacity: 0.7,
    marginTop: 18 * 1.3,
  },
  image: {
    width: ITEM_HEIGHT * 0.8,
    height: ITEM_HEIGHT * 0.8,
    resizeMode: "contain",
    // position: 'absolute',
    bottom: 0,
    right: SPACING,
  },
  bg: {
    position: "absolute",
    width,
    height,
    backgroundColor: "white",
    transform: [{ translateY: height }],
    borderRadius: 32,
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalView: {
    margin: 20,
    paddingTop: 0,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
    fontSize: 15,
  },
  buttonClose: {
    backgroundColor: Colors.primary,
  },
  modalButton: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
});
