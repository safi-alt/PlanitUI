import React from "react";
import { StyleSheet, Text, View } from "react-native";
import tw from "tailwind-react-native-classnames";
import Map from "../components/Map";
import MapView from "react-native-maps";
import { createStackNavigator } from "@react-navigation/stack";
import NavigateCard from "../components/NavigateCard";
import RideOptionsCard from "../components/RideOptionsCard";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Icon } from "react-native-elements";
import { Pressable } from "react-native";
import { useNavigation } from "@react-navigation/native";
import TourOptionsCard from "../components/TourOptionsCard";
import PreBookRideOptionsCard from "../components/PreBookRideOptionsCard";
import PreBookDateNTime from "../components/PreBookDateNTime";

const PreBookMapScreen = () => {
  const Stack = createStackNavigator();
  const navigation = useNavigation();
  return (
    <View>
      <Pressable
        onPress={() => navigation.navigate("PreBookScreen")}
        style={tw`bg-gray-100 absolute top-16 left-8 z-50 p-3 rounded-full shadow-lg`}
      >
        <Icon name="back" type="antdesign" />
      </Pressable>

      <View style={tw`h-1/2`}>
        <Map />
      </View>
      <View style={tw`h-1/2`}>
        <Stack.Navigator>
          <Stack.Screen
            name="RideOptionsCard"
            component={PreBookRideOptionsCard}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="PreBookDateNTime"
            component={PreBookDateNTime}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="TourOptionsCard"
            component={TourOptionsCard}
            options={{
              headerShown: false,
            }}
          />
        </Stack.Navigator>
      </View>
    </View>
  );
};

export default PreBookMapScreen;

const styles = StyleSheet.create({});
