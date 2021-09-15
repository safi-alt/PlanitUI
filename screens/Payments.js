import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  Image,
  Animated,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import {
  CreditCardInput,
  LiteCreditCardInput,
} from "react-native-credit-card-input";
import tw from "tailwind-react-native-classnames";
import Colors from "../constants/Colors";
import { useSelector } from "react-redux";
import {
  selectTravelTimeInformation,
  selectOrigin,
  selectDestination,
  selectUser,
  selectPayment,
  selectTripCost,
  setGuide,
  setGuideLocation,
  selectGuideLocation,
  setStartTrip,
} from "../slices/navSlice";

const { width, height } = Dimensions.get("screen");
import faker from "faker";
// import {Title} from 'react-native-paper';

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

const Payments = () => {
  const scrollY = React.useRef(new Animated.Value(0)).current;
  const userInformation = useSelector(selectUser);
  const paymentInformation = useSelector(selectPayment);

  const [user, setUser] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvc, setCvc] = useState("");
  const [data, setData] = React.useState([]);

  const getData = async (id) => {
    // value previously stored
    // console.log(value);
    //const val = JSON.parse(value);
    //const userId = val.id;
    const res = await fetch(
      `https://planit-fyp.herokuapp.com/api/orders/getUserOrders/${id}`
    );
    const response = await res.json();
    console.log(response);
    // console.log(response.data);
    // const orders = response.data.map((x) => x);
    // console.log(orders);
    const orders = response.userOrders.map((x) => {
      return {
        key: x._id,
        image: x.avatar,
        name: x.guideName,
        phone: x.phone,
        origin: x.origin,
        destination: x.destination,
        cost: x.cost,
      };
    });
    //console.log(orders);
    setData(orders);
  };

  useEffect(() => {
    setUser(userInformation.id);
    getData(userInformation.id);
    // console.log(paymentInformation);
    // console.log(paymentInformation);
    //getPayment(userInformation.id);
    //console.log(labels);
  }, [userInformation]);

  const handleSubmitPayment = async () => {
    const res = await fetch(`https://planit-fyp.herokuapp.com/api/payment`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user,
        cardNumber,
        expiry,
        cvc,
      }),
    });
    const response = await res.json();
    console.log(response);
    // socket.emit("order details", response);
    // socket.emit("order details", {
    //   Name: response.data.name,
    //   Phone: response.data.phone,
    //   Origin: response.data.origin,
    //   Destination: response.data.destination,
    //   OriginLatitude: response.data.originlatitude,
    //   OriginLongitude: response.data.originLongitude,
    //   DestLatitude: response.data.destLatitude,
    //   DestLongitude: response.data.destLongitude,
    // });
  };

  const onChange = (form) => {
    console.log(form.values);
    setCardNumber(form.values.number);
    setCvc(form.values.cvc);
    setExpiry(form.values.expiry);
  };

  return (
    <View style={{ backgroundColor: "white", flex: 1 }}>
      <View
        style={
          ([tw`h-1/2`],
          {
            marginVertical: 10,
            backgroundColor: "white",
          })
        }
      >
        <CreditCardInput autoFocus={true} onChange={onChange} />
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-around",
            marginTop: 5,
          }}
        >
          <TouchableOpacity
            style={styles.commandButton}
            onPress={() => {
              handleSubmitPayment();
            }}
          >
            <Text style={styles.panelButtonTitle}>Submit</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.commandButton} onPress={() => {}}>
            <Text style={styles.panelButtonTitle}>Change</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={tw`h-1/2`}>
        <Text style={tw`text-center py-3 text-xl`}>
          Your Completed Transactions
        </Text>
        <View style={{ flex: 1, backgroundColor: "#fff" }}>
          <Image
            source={require("../assets/MainLogoPlaniT.png")}
            // style={StyleSheet.absoluteFillObject}
            style={{
              bottom: 0,
              left: 0,
              position: "absolute",
              right: 0,
              top: 0,
              height: "100%",
              width: "100%",
            }}
            blurRadius={10}
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
                  <View>
                    <Text style={{ fontSize: 22, fontWeight: "700" }}>
                      {item.name}
                    </Text>
                    <Text style={{ fontSize: 16, opacity: 0.7, flexShrink: 1 }}>
                      {item.origin}
                    </Text>
                    <Text
                      style={{
                        fontSize: 14,
                        opacity: 0.7,
                        color: "#0099cc",
                        flexWrap: "wrap",
                      }}
                    >
                      {item.destination}
                    </Text>
                    <Text
                      style={{
                        fontSize: 14,
                        opacity: 0.7,
                        color: "#0099cc",
                        flexWrap: "wrap",
                      }}
                    >
                      {item.cost}
                    </Text>
                  </View>
                </Animated.View>
              );
            }}
          />
          <StatusBar hidden />
        </View>
      </View>
    </View>
  );
};

export default Payments;

const styles = StyleSheet.create({
  commandButton: {
    padding: 15,
    borderRadius: 10,
    backgroundColor: Colors.primary,
    alignItems: "center",
    marginTop: 10,
  },
  panelButtonTitle: {
    fontSize: 17,
    fontWeight: "bold",
    color: "white",
  },
});
