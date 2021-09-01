import React from "react";
import { SafeAreaView, Dimensions } from "react-native";
import { StyleSheet, Text, View, Image } from "react-native";
import { Avatar, Icon, ListItem } from "react-native-elements";
import { TouchableOpacity } from "react-native";
import tw from "tailwind-react-native-classnames";
import { useSelector } from "react-redux";
import { selectTravelTimeInformation } from "../slices/navSlice";
import ChatScreen from "../screens/ChatScreen";
import { createStackNavigator } from "@react-navigation/stack";
import { Pressable } from "react-native";
import { useNavigation } from "@react-navigation/native";
import Colors from "../constants/Colors";
const { width } = Dimensions.get("screen");
import profile from "../assets/profile.png";

const TourOptionsCard = () => {
  const Stack = createStackNavigator();
  const travelTimeInformation = useSelector(selectTravelTimeInformation);
  const navigation = useNavigation();
  return (
    <SafeAreaView style={tw`bg-white flex-grow`}>
      <View>
        <TouchableOpacity
          onPress={() => navigation.navigate("RideOptionsCard")}
          style={tw`absolute top-3 z-50 left-5 p-3 rounded-full`}
        >
          <Icon name="chevron-left" type="fontawesome" />
        </TouchableOpacity>
        <Text style={tw`text-center py-5 text-xl`}>
          Your Ride Details - {travelTimeInformation?.distance?.text}
        </Text>
      </View>

      {/* <View style={tw``}>
        <Avatar
          title="Hamza Farooqui"
          source={{
            uri: "https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg",
          }}
        />
      </View>
      <TouchableOpacity onPress={() => navigation.navigate("ChatScreen")}>
        <Text>Hello Please click me </Text>
      </TouchableOpacity> */}

      <View style={style.detailsContainer}>
        {/* Name and rating view container */}
        <View style={style.cardBox}>
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            {/* <Text style={{ fontSize: 20, fontWeight: "bold" }}>AVATAR</Text> */}
            <Image
              source={profile}
              style={{
                width: 60,
                height: 60,
                borderRadius: 10,
                marginTop: 8,
              }}
            ></Image>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <View style={style.ratingTag}>
                <Text style={{ color: Colors.primary }}>4.8</Text>
              </View>
              <Text style={{ fontSize: 13, marginLeft: 5 }}>155 ratings</Text>
            </View>
          </View>

          {/* Location text */}
          <Text style={{ fontSize: 16, color: Colors.primary }}>
            guide details
          </Text>

          {/* Facilities container */}
          <View style={{ flexDirection: "row", marginTop: 20 }}>
            <View style={style.facility}>
              <Icon name="person" size={18} />
              <Text style={style.facilityText}>10</Text>
            </View>
            <View style={style.facility}>
              <Icon name="location" size={18} type="entypo" />
              <Text style={style.facilityText}>2</Text>
            </View>
            <View style={style.facility}>
              <Icon name="aspect-ratio" size={18} />
              <Text style={style.facilityText}>10 Km area</Text>
            </View>
          </View>
        </View>
        <Text style={{ marginTop: 20, color: Colors.primary }}>Guide name</Text>

        {/* Interior list */}
        {/* <FlatList
          contentContainerStyle={{ marginTop: 20 }}
          horizontal
          showsHorizontalScrollIndicator={false}
          keyExtractor={(_, key) => key.toString()}
          data={house.interiors}
          renderItem={({ item }) => <InteriorCard interior={item} />}
        /> */}

        {/* footer container */}
        <View style={style.footer}>
          <View>
            <Text
              style={{
                color: "black",
                fontWeight: "bold",
                fontSize: 18,
              }}
            >
              $1,500
            </Text>
            <Text
              style={{
                fontSize: 12,
                color: "black",
                fontWeight: "bold",
              }}
            >
              Total Price
            </Text>
          </View>
          <TouchableOpacity
            style={style.bookNowBtn}
            onPress={() => navigation.navigate("ChatScreen")}
          >
            <Text style={{ color: "white" }}>Chat Now</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default TourOptionsCard;

const style = StyleSheet.create({
  backgroundImageContainer: {
    elevation: 20,
    marginHorizontal: 20,
    marginTop: 20,
    alignItems: "center",
    height: 350,
  },
  backgroundImage: {
    height: "100%",
    width: "100%",
    borderRadius: 20,
    overflow: "hidden",
  },
  header: {
    paddingVertical: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 10,
  },
  headerBtn: {
    height: 50,
    width: 50,
    backgroundColor: Colors.primary,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  ratingTag: {
    height: 30,
    width: 35,
    backgroundColor: Colors.star,
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
  },
  virtualTag: {
    top: -20,
    width: 120,
    borderRadius: 10,
    height: 40,
    paddingHorizontal: 20,
    backgroundColor: Colors.primary,
    justifyContent: "center",
    alignItems: "center",
  },
  interiorImage: {
    width: width / 3 - 20,
    height: 80,
    marginRight: 10,
    borderRadius: 10,
  },
  footer: {
    height: 70,
    backgroundColor: "#DDEEF2",
    borderRadius: 10,
    paddingHorizontal: 20,
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 10,
  },
  bookNowBtn: {
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.primary,
    borderRadius: 10,
    paddingHorizontal: 20,
  },
  detailsContainer: { flex: 1, paddingHorizontal: 20 },
  facility: { flexDirection: "row", marginRight: 15 },
  facilityText: { marginLeft: 5, color: Colors.primary },
  cardBox: {
    backgroundColor: "#DDEEF2",
    borderRadius: 10,
    paddingHorizontal: 20,
    paddingVertical: 20,
    justifyContent: "space-between",
    marginVertical: 10,
  },
});
