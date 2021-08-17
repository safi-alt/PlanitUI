import React from "react";
import { SafeAreaView } from "react-native";
import { StyleSheet, Text, View } from "react-native";
import { Avatar, Icon, ListItem } from "react-native-elements";
import { TouchableOpacity } from "react-native-gesture-handler";
import tw from "tailwind-react-native-classnames";
import { useSelector } from "react-redux";
import { selectTravelTimeInformation } from "../slices/navSlice";
import ChatScreen from "../screens/ChatScreen";
import { createStackNavigator } from "@react-navigation/stack";
import { Pressable } from "react-native";
import { useNavigation } from "@react-navigation/native";

const TourOptionsCard = () => {
  const Stack = createStackNavigator();
  const travelTimeInformation = useSelector(selectTravelTimeInformation);
  const navigation = useNavigation();
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

      <View style={tw``}>
        <Avatar
          title="Hamza Farooqui"
          source={{
            uri: "https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg",
          }}
        />
      </View>
      <TouchableOpacity onPress={() => navigation.navigate("ChatScreen")}>
        <Text>Hellow click me </Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default TourOptionsCard;

const styles = StyleSheet.create({});
