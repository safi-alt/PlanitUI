import React, { useEffect } from "react";
import { StyleSheet, Text, View, SafeAreaView, Image } from "react-native";
import tw from "tailwind-react-native-classnames";
import NavOptions from "../components/NavOptions";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
// import { GOOGLE_MAPS_APIKEY } from "@env";
import { GOOGLE_MAPS_APIKEY } from "@env";
import { useDispatch } from "react-redux";
import { setOrigin, setDestination, selectUser } from "../slices/navSlice";
import NavFavourites from "../components/NavFavourites";
import { Button } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useSelector } from "react-redux";
import AsyncStorage from "@react-native-async-storage/async-storage";

const HomeScreen = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const userInformation = useSelector(selectUser);

  const getData = async () => {
    try {
      const value = await AsyncStorage.getItem("@storage_Key");
      if (value !== null) {
        // value previously stored
        console.log(value);
      }
    } catch (e) {
      // error reading value
    }
  };

  useEffect(() => {
    // console.log(userInformation);
    getData();
  }, []);
  return (
    <SafeAreaView style={tw`bg-white h-full`}>
      <View style={tw`p-5`}>
        <Image
          style={styles.imageStyle}
          source={{
            uri: "https://links.papareact.com/gzs",
          }}
        />
        <GooglePlacesAutocomplete
          styles={{
            container: {
              flex: 0,
            },
            textInput: {
              fontSize: 18,
            },
          }}
          placeholder="Where From?"
          onPress={(data, details = null) => {
            dispatch(
              setOrigin({
                location: details.geometry.location,
                description: data.description,
              })
            );
            dispatch(setDestination(null));
            // console.log("Origin", details.geometry.location);
          }}
          fetchDetails={true}
          returnKeyType={"search"}
          enablePoweredByContainer={false}
          minLength={2}
          query={{
            key: GOOGLE_MAPS_APIKEY,
            language: "en",
          }}
          nearbyPlacesAPI="GooglePlacesSearch"
          debounce={400}
        />
        <NavOptions />
        <NavFavourites />
      </View>
      <Button
        title="Logout"
        onPress={() => navigation.navigate("SignUpScreen")}
      ></Button>
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  text: {
    color: "blue",
  },
  imageStyle: {
    width: 100,
    height: 100,
    resizeMode: "contain",
  },
});
