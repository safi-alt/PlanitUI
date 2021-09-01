import React from "react";
import { StyleSheet, Text, SafeAreaView, View } from "react-native";
import tw from "tailwind-react-native-classnames";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
// import { GOOGLE_MAPS_APIKEY } from "@env";
// import { GOOGLE_MAPS_APIKEY } from "@env";
//import { GOOGLE_MAPS_APIKEY } from "@env";
import { GOOGLE_MAPS_APIKEY } from "@env";
import { useDispatch } from "react-redux";
import { setDestination } from "../slices/navSlice";
import { useNavigation } from "@react-navigation/native";
import NavFavourites from "./NavFavourites";
import { TouchableOpacity } from "react-native";
import { Icon } from "react-native-elements";
import Colors from "../constants/Colors";
import { KeyboardAvoidingView } from "react-native";

const NavigateCard = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  return (
    <SafeAreaView style={tw`bg-white flex-1`}>
      <Text style={tw`text-center py-5 text-xl`}>Good Morning, Safey</Text>
      <View style={tw`border-t border-gray-200 flex-shrink`}>
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          keyboardVerticalOffset={Platform.OS === "ios" ? -64 : 100}
        >
          <View>
            <GooglePlacesAutocomplete
              placeholder="Where to?"
              styles={styles}
              fetchDetails={true}
              enablePoweredByContainer={false}
              minLength={2}
              returnKeyType={"search"}
              onPress={(data, details = null) => {
                dispatch(
                  setDestination({
                    location: details.geometry.location,
                    description: data.description,
                  })
                );
                console.log("destination", details.geometry.location);
                navigation.navigate("RideOptionsCard");
              }}
              query={{
                key: GOOGLE_MAPS_APIKEY,
                language: "en",
              }}
              nearbyPlacesAPI="GooglePlacesSearch"
              debounce={400}
            />
          </View>
        </KeyboardAvoidingView>
        <NavFavourites />
      </View>
      <View
        style={tw`flex-row bg-white justify-evenly py-2 mt-auto border-t border-gray-100`}
      >
        <TouchableOpacity
          onPress={() => navigation.navigate("RideOptionsCard")}
          style={[
            tw`flex flex-row justify-between bg-black px-4 py-3 rounded-full`,
            {
              backgroundColor: Colors.primary,
              alignItems: "center",
            },
          ]}
        >
          <Icon name="person-pin" type="material" color="white" size={30} />
          <Text style={tw`text-white text-center`}>Search Guide</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={tw`justify-around flex flex-row  w-24 px-4 py-3 rounded-full`}
        >
          <Icon
            name="person-pin-circle"
            type="material"
            color="black"
            size={35}
          />
          <Text style={tw`text-center`}>Book Guide</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default NavigateCard;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    paddingTop: 20,
    flex: 0,
  },
  textInput: {
    backgroundColor: "#DDDDDF",
    borderRadius: 0,
    fontSize: 18,
  },
  textInputContainer: {
    paddingHorizontal: 20,
    paddingBottom: 0,
  },
  contain: {
    flex: 1,
  },
});
