import React, { useState, useEffect, useRef } from "react";
import { Pressable, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native";
import { StyleSheet, Text, View } from "react-native";
import tw from "tailwind-react-native-classnames";
import { Icon } from "react-native-elements";
import { useNavigation } from "@react-navigation/native";
import { FlatList } from "react-native";
import { Image } from "react-native";
import { useSelector } from "react-redux";
import "intl";
import { Platform } from "react-native";
import "intl/locale-data/jsonp/en";
import Colors from "../constants/Colors";
import {
  selectTravelTimeInformation,
  selectOrigin,
  selectDestination,
  selectUser,
  selectTripCost,
  setGuide,
  setGuideLocation,
  selectGuideLocation,
  setOrigin,
  setDestination,
  setStartTrip,
  setOrder,
  setTravelTimeInformation,
  setLiveOrderId,
} from "../slices/navSlice";
import { useDispatch } from "react-redux";
import io from "socket.io-client";
import ModalTrip from "./ModalTrip";
import ModalPoup from "./ModalTrip";
import { Rating, AirbnbRating } from "react-native-ratings";
import moment from "moment";

const data = [
  {
    id: "Uber-X-123",
    title: "Sight Seeing",
    multiplier: 1,
    image: "https://img.icons8.com/officel/80/26e07f/tourist-male.png",
  },
  {
    id: "Uber-XL-456",
    title: "Adventure",
    multiplier: 1.2,
    image: "https://img.icons8.com/color/48/26e07f/tour-guide-skin-type-2.png",
  },
  {
    id: "Uber-LUX-789",
    title: "Mysterious",
    multiplier: 1.75,
    image: "https://img.icons8.com/color/48/26e07f/trekking.png",
  },
];

const SURGE_CHARGE_RATE = 1.5;
const date = new Date();
const hourRate = 2000;
// const andriodInt = if (Platform.OS === "android") {
//   if (typeof (Intl as any).__disableRegExpRestore === "function") {
//       (Intl as any).__disableRegExpRestore();
//   }

const RideOptionsCard = () => {
  const navigation = useNavigation();
  const [selected, setSelected] = useState(null);
  let cost = [];
  const [duration, setDuration] = useState("");
  const travelTimeInformation = useSelector(selectTravelTimeInformation);
  const userInformation = useSelector(selectUser);
  const originInformation = useSelector(selectOrigin);
  const destinationInformation = useSelector(selectDestination);
  const [name, setName] = useState("");
  const [originlatitude, setOriginLatitude] = useState("");
  const [originLongitude, setOriginLongitude] = useState("");
  const [destLatitude, setDestLatitude] = useState("");
  const [destLongitude, setDestLongitude] = useState("");
  const [phone, setPhone] = useState("");
  const dispatch = useDispatch();
  const [guideFound, setGuideFound] = useState(false);
  const guideLocation = useSelector(selectGuideLocation);
  const [val, setVal] = useState(false);
  const [visible, setVisible] = useState(false);
  const [orderId, setOrderId] = useState("");

  useEffect(() => {
    // console.log(travelTimeInformation);
    socket = io("https://planit-fyp.herokuapp.com");
    setDuration(travelTimeInformation?.duration?.text);

    socket.on("guide details", (detail) => {
      // console.log(detail);
      setVal(false);
      dispatch(
        setGuide({
          guideName: detail.name,
          guidePhone: detail.phone,
        })
      );
      // alert(`Guide:${detail.name},Phone:${detail.phone}`);
      navigation.navigate("TourOptionsCard");
      // setCnic(detail.cnic);
      // setDriver(detail.driver);
      // setMessage(detail.message);
    });

    socket.on("guide Location", (location) => {
      //console.log(location);
      dispatch(
        setGuideLocation({
          ...guideLocation,
          guideLatitude: location.latitude,
          guideLongitude: location.longitude,
        })
      );
    });

    socket.on("final Posiiton", (location) => {
      dispatch(
        setGuideLocation({
          ...guideLocation,
          guideLatitude: false,
          guideLongitude: false,
        })
      );
    });

    // socket.on("trip completed", (response) => {
    //   // dispatch(
    //   //   setDestination({
    //   //     location: null,
    //   //     description: null,
    //   //   })
    //   // );
    //   setGuideLocation(null);
    //   setGuide(null);
    //   setOrigin(null);
    //   setDestination(null);
    //   setOrder(null);
    //   setTravelTimeInformation(null);
    //   //navigation.navigate("RideOptionsCard");
    //   setVisible(true);

    //   console.log("Hello modal");
    // });
  }, [destinationInformation, travelTimeInformation]);

  const handleEditOrder = async (id) => {
    const res = await fetch(
      `https://planit-fyp.herokuapp.com/api/orders/updateOrder/${id}`,
      {
        method: "PUT",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          completed: true,
        }),
      }
    );
    const response = await res.json();
    // console.log(response);
  };

  const payment = (payment) => {
    console.log("Hello");
    // console.log(paymentMethod);
    socket.emit("payment method", payment);
    handleEditOrder(orderId);
    setGuideLocation(null);
    setGuide(null);
    setOrigin(null);
    setDestination(null);
    setOrder(null);
    setTravelTimeInformation(null);
    navigation.navigate("SideNavScreen", { screen: "HomeScreen" });
  };

  const paymentCard = (payment) => {
    console.log("Hello");
    // console.log(paymentMethod);
    socket.emit("payment card", payment);
    handleEditOrder(orderId);
    setGuideLocation(null);
    setGuide(null);
    setOrigin(null);
    setDestination(null);
    setOrder(null);
    setTravelTimeInformation(null);
    navigation.navigate("SideNavScreen", { screen: "HomeScreen" });
  };

  const handleSubmitOrder = async () => {
    setVal(true);
    var finalCost = cost.filter((x) => x.id === selected.id).map((x) => x.pay);
    //console.log(finalCost[0]);
    // console.log();
    //console.log(cost);
    // console.log(duration);
    //console.log(travelTimeInformation);
    console.log(selected);
    var date = moment().format("DD/MM/YYYY");
    const res = await fetch(`https://planit-fyp.herokuapp.com/api/orders/`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user: userInformation.id,
        date,
        name: userInformation.name,
        phone: userInformation.phone,
        cost: finalCost[0],
        duration,
        origin: originInformation.description,
        destination: destinationInformation.description,
        originlatitude: originInformation.location.lat,
        originLongitude: originInformation.location.lng,
        destLatitude: destinationInformation.location.lat,
        destLongitude: destinationInformation.location.lng,
        category: "Live",
        distance: travelTimeInformation?.distance?.text,
        tripType: selected.title,
      }),
    });
    const response = await res.json();
    setOrderId(response.data._id);
    dispatch(
      setLiveOrderId({
        orderId: response.data._id,
      })
    );

    //console.log(response);
    socket.emit("order details", response);
  };

  return (
    <SafeAreaView style={tw`bg-white flex-grow`}>
      <View>
        <TouchableOpacity
          onPress={() => navigation.navigate("NavigateCard")}
          style={tw`absolute top-3 z-50 left-5 p-3 rounded-full`}
        >
          <Icon name="chevron-left" type="fontawesome" />
        </TouchableOpacity>
        <Text style={tw`text-center py-5 text-xl`}>
          Select a Ride - {travelTimeInformation?.distance?.text}
        </Text>
      </View>

      <FlatList
        data={data}
        keyExtractor={(item) => item.id}
        renderItem={({ item: { id, title, image, multiplier }, item }) => (
          <TouchableOpacity
            onPress={() => setSelected(item)}
            style={tw`flex-row items-center justify-between px-10  ${
              id === selected?.id && "bg-gray-200"
            }`}
          >
            <Image
              style={{
                width: 100,
                height: 100,
                resizeMode: "contain",
              }}
              source={{ uri: image }}
            />
            <View>
              <Text style={tw`text-xl font-semibold`}>{title}</Text>
              <Text>{travelTimeInformation?.duration?.text}</Text>
            </View>
            <Text style={tw`text-xl`}>
              {/* {new Intl.NumberFormat("en-gb", {
                style: "currency",
                currency: "PKR",
              }).format(
                Math.round(
                  (travelTimeInformation?.duration.value *
                    SURGE_CHARGE_RATE *
                    multiplier) /
                    10
                )
              )} */}
              {new Intl.NumberFormat("en-US", {
                style: "currency",
                currency: "PKR",
              }).format(
                (travelTimeInformation?.duration.value *
                  SURGE_CHARGE_RATE *
                  multiplier) /
                  10
              )}
              {cost.push({
                id: id,
                pay: new Intl.NumberFormat("en-US", {
                  style: "currency",
                  currency: "PKR",
                }).format(
                  (travelTimeInformation?.duration.value *
                    SURGE_CHARGE_RATE *
                    multiplier) /
                    10
                ),
              })}
            </Text>
          </TouchableOpacity>
        )}
      />
      <View style={tw`mt-auto border-t border-gray-200`}>
        <TouchableOpacity
          onPress={() => {
            handleSubmitOrder();
          }}
          disabled={!selected}
          style={[
            tw`bg-black py-3 m-3 ${!selected && "bg-gray-300"}`,
            { backgroundColor: Colors.primary },
          ]}
        >
          <Text style={tw`text-center text-white text-xl`}>
            Choose {selected?.title}
          </Text>
        </TouchableOpacity>
      </View>
      <ModalPoup visible={visible}>
        <View style={{ alignItems: "center" }}>
          <View style={styles.header}>
            <TouchableOpacity onPress={() => setVisible(false)}>
              <Image
                source={require("../assets/x.png")}
                style={{ height: 30, width: 30 }}
              />
            </TouchableOpacity>
          </View>
        </View>
        <View style={{ alignItems: "center" }}>
          <Image
            source={require("../assets/success.png")}
            style={{ height: 150, width: 150, marginVertical: 10 }}
          />
        </View>

        <Text style={{ marginVertical: 30, fontSize: 20, textAlign: "center" }}>
          Congratulations trip was successful
        </Text>

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
              paymentCard("card");
            }}
          >
            <Text style={styles.panelButtonTitle}>Cash</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.commandButton}
            onPress={() => {
              payment("cash");
            }}
          >
            <Text style={styles.panelButtonTitle}>Card</Text>
          </TouchableOpacity>
        </View>
        <AirbnbRating />
      </ModalPoup>
    </SafeAreaView>
  );
};

export default React.memo(RideOptionsCard);

const styles = StyleSheet.create({
  modalBackGround: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContainer: {
    width: "80%",
    backgroundColor: "white",
    paddingHorizontal: 20,
    paddingVertical: 30,
    borderRadius: 20,
    elevation: 20,
  },
  header: {
    width: "100%",
    height: 40,
    alignItems: "flex-end",
    justifyContent: "center",
  },
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
