import { useNavigation } from "@react-navigation/native";
import React from "react";
import { FlatList, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native";
import { StyleSheet, Text, View } from "react-native";
import { Icon } from "react-native-elements";
import tw from "tailwind-react-native-classnames";
import React, { useEffect, useRef } from "react";


const data = [
  {
    id: "Uber-X-123",
    title: "UberX",
    multiplier: 1,
    image: "https://links.papareact.com/2pn",
  },
  {
    id: "Uber-XL-456",
    title: "Uber XL",
    multiplier: 1.2,
    image: "https://links.papareact.com/5w8",
  },
  {
    id: "Uber-LUX-789",
    title: "Uber LUX",
    multiplier: 1.75,
    image: "https://links.papareact.com/2pf",
  },
];

const RideOptionsCard = () => {
  const navigation = useNavigation();
  const [selected,setSelected] = useState(null);

  return (
    <SafeAreaView style={tw`bg-white flex-grow`}>
      <View>
        <TouchableOpacity
          onPress={() => navigation.navigate("NavigateCard")}
          style={tw`absolute top-3 left-5 p-3 rounded-full`}
        >
          <Icon name="chevron-left" type="fontawesome" />
        </TouchableOpacity>
        <Text style={tw`text-center py-5 text-xl `}>Select A Ride</Text>
      </View>
      <FlatList
        data={data}
        keyExtractor={(item) => item.id}
        renderItem={({ item: { image, id, title, multiplier }, item }) => (
          <TouchableOpacity
            style={tw`flex-row justify-between items-center px-10 ${id === selected?.id && "bg-gray-200"}`}
            onPress={}
          >
            <Image
              style={{
                width: 100,
                height: 100,
                resizeMode: "contain",
              }}
              source={{ uri: image }}
            />
            <View style={tw`-ml-6`}>
              <Text style={tw`text-xl font-semibold`}>{title}</Text>
              <Text>Travel Time....</Text>
            </View>
            <Text style={tw`text-xl`}>Rs900</Text>
          </TouchableOpacity>
        )}
      />
    </SafeAreaView>
  );
};

export default RideOptionsCard;

const styles = StyleSheet.create({});
