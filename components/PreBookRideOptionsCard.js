import React, { useState } from "react";
import { TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native";
import { StyleSheet, Text, View } from "react-native";
import tw from "tailwind-react-native-classnames";
import { Icon } from "react-native-elements";
import { useNavigation } from "@react-navigation/native";
import { FlatList } from "react-native";
import { Image } from "react-native";
import { useSelector } from "react-redux";
import { selectTravelTimeInformation } from "../slices/navSlice";
import "intl";
import { Platform } from "react-native";
import "intl/locale-data/jsonp/en";
import Colors from "../constants/Colors";

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
  const travelTimeInformation = useSelector(selectTravelTimeInformation);

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
            </Text>
          </TouchableOpacity>
        )}
      />
      <View style={tw`mt-auto border-t border-gray-200`}>
        <TouchableOpacity
          onPress={() => navigation.navigate("PreBookDateNTime")}
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
