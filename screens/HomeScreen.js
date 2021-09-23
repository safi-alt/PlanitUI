import React from "react";
import { StyleSheet, Text, View, SafeAreaView, Image } from "react-native";
import tw from "tailwind-react-native-classnames";
import NavOptions from "../components/NavOptions";
// import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
// import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
// import { GOOGLE_MAPS_APIKEY } from "@env";
// import { GOOGLE_MAPS_APIKEY } from "@env";
import { GOOGLE_MAPS_APIKEY } from "@env";

import { useDispatch, useSelector } from "react-redux";
import {
  setTravelTimeInformation,
  setOrder,
  setGuide,
  setOrigin,
  setDestination,
  setUser,
  setPreDestination,
  setPreOrigin,
  setPreTravelTimeInformation,
  selectUser,
  setPreBookGuide,
  setGuideLocation,
  selectGuideLocation,
  setPreBookOrderId,
  selectOrigin,
  selectDestination,
  setPreGuidePhone,
  selectPreGuidePhone,
} from "../slices/navSlice";
import NavFavourites from "../components/NavFavourites";
import AsyncStorage from "@react-native-async-storage/async-storage";
import io from "socket.io-client";
import { useNavigation } from "@react-navigation/native";
import moment from "moment";

const HomeScreen = () => {
  const dispatch = useDispatch();
  const userInformation = useSelector(selectUser);
  const guideLocation = useSelector(selectGuideLocation);
  const navigation = useNavigation();
  const origin = useSelector(selectOrigin);
  const destination = useSelector(selectDestination);
  const phonePreGuide = useSelector(selectPreGuidePhone);

  const getData = async () => {
    try {
      const value = await AsyncStorage.getItem("@storage_Key");
      const obj = JSON.parse(value);
      if (value !== null) {
        // value previously stored

        dispatch(
          setUser({
            name: obj.name,
            phone: obj.phone,
            token: obj.token,
            email: obj.email,
            id: obj.id,
            city: obj.city,
            country: obj.country,
            avatar: obj.avatar,
          })
        );
      }
    } catch (e) {
      // error reading value
    }
  };

  React.useEffect(() => {
    socket = io("https://planit-fyp.herokuapp.com");
    getData();

    socket.on("pre book", (pre) => {
      dispatch(
        setPreBookOrderId({
          orderId: pre.order._id,
        })
      );

      dispatch(
        setPreOrigin({
          lat: Number(pre.order.originlatitude),
          lng: Number(pre.order.originLongitude),
          description: pre.order.origin,
        })
      );
      dispatch(
        setPreDestination({
          lat: Number(pre.order.destLatitude),
          lng: Number(pre.order.destLongitude),
          description: pre.order.destination,
        })
      );
      dispatch(
        setPreTravelTimeInformation({
          distance: pre.order.distance,
          duration: pre.order.duration,
        })
      );
      dispatch(
        setPreBookGuide({
          guideName: pre.order.guideName,
        })
      );
      socket.on("guide Location", (location) => {
        dispatch(
          setGuideLocation({
            ...guideLocation,
            guideLatitude: location.latitude,
            guideLongitude: location.longitude,
          })
        );
      });
      navigation.navigate("MapScreen", {
        screen: "TourOptionsCard",
      });
    });
    socket.on("guide Phone", (phone) => {
      dispatch(
        setPreGuidePhone({
          ...phonePreGuide,
          guidePhone: phone,
        })
      );
    });
  }, []);

  return (
    <SafeAreaView style={tw`bg-white h-full`}>
      <View style={tw`p-5`}>
        <Image
          style={styles.imageStyle}
          source={require("../assets/planiTMainLogo.png")}
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
                ...origin,
                location: details.geometry.location,
                description: data.description,
              })
            );
            dispatch(setDestination(null));
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
