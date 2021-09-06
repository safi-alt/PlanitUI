import React, { useEffect, useState } from "react";
import { TouchableOpacity } from "react-native";
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
  setStartTrip,
  setOrder,
} from "../slices/navSlice";
import { useDispatch } from "react-redux";
import io from "socket.io-client";

const data = [
  {
    id: "Uber-X-123",
    title: "Sight Seening",
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

const PreBookRideOptionsCard = () => {
  const navigation = useNavigation();
  const [isSelect, setisSelect] = useState(null);
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

  let socket = io("https://planit-fyp.herokuapp.com");

  useEffect(() => {
    console.log(travelTimeInformation);
    setDuration(travelTimeInformation?.duration?.text);
    // socket.on("guide details", (detail) => {
    //   // console.log(detail);
    //   setVal(false);
    //   dispatch(
    //     setGuide({
    //       guideName: detail.name,
    //       guidePhone: detail.phone,
    //     })
    //   );
    //   // alert(`Guide:${detail.name},Phone:${detail.phone}`);
    //   navigation.navigate("TourOptionsCard");
    //   // setCnic(detail.cnic);
    //   // setDriver(detail.driver);
    //   // setMessage(detail.message);
    // });

    // socket.on("guide Location", (location) => {
    //   //console.log(location);
    //   dispatch(
    //     setGuideLocation({
    //       ...guideLocation,
    //       guideLatitude: location.latitude,
    //       guideLongitude: location.longitude,
    //     })
    //   );
    // });

    // socket.on("final Posiiton", (location) => {
    //   dispatch(
    //     setGuideLocation({
    //       ...guideLocation,
    //       guideLatitude: false,
    //       guideLongitude: false,
    //     })
    //   );
    // });

    //   }, []);
    // console.log(userInformation);
    // console.log(originInformation);
    // console.log(destinationInformation);
  }, [destinationInformation, travelTimeInformation]);

  const handleSubmitOrder = async () => {
    setVal(true);
    var finalCost = cost.filter((x) => x.id === isSelect.id).map((x) => x.pay);
    console.log(finalCost);
    console.log(duration);
    //console.log(travelTimeInformation);
    const res = await fetch(`https://planit-fyp.herokuapp.com/api/orders/`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user: userInformation.id,
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
        category: "Prebook",
      }),
    });
    const response = await res.json();
    console.log(response);
    dispatch(setOrder(response));
    if (response) navigation.navigate("PreBookDateNTime");

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

  return (
    <SafeAreaView style={tw`bg-white flex-grow`}>
      <View>
        <TouchableOpacity
          onPress={() => navigation.navigate("PreBookScreen")}
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
            onPress={() => setisSelect(item)}
            style={tw`flex-row items-center justify-between px-10  ${
              id === isSelect?.id && "bg-gray-200"
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
          onPress={() => handleSubmitOrder()}
          disabled={!isSelect}
          style={[
            tw`bg-black py-3 m-3 ${!isSelect && "bg-gray-300"}`,
            { backgroundColor: Colors.primary },
          ]}
        >
          <Text style={tw`text-center text-white text-xl`}>
            Choose {isSelect?.title}
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default PreBookRideOptionsCard;

const styles = StyleSheet.create({});
