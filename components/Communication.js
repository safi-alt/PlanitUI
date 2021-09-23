import React, { useEffect, useState, useCallback, LogBox } from "react";
import { GiftedChat } from "react-native-gifted-chat";

import { View, Text, Linking } from "react-native";
import { Header } from "react-native-elements";
import { FontAwesome } from "@expo/vector-icons";
import io from "socket.io-client";
import { TouchableOpacity } from "react-native";
import Colors from "../constants/Colors";
import {
  selectGuide,
  selectPreBookGuide,
  selectPreGuidePhone,
} from "../slices/navSlice";
import { useSelector } from "react-redux";

const Communication = () => {
  const guideInformation = useSelector(selectGuide);
  const preBookGuideInformation = useSelector(selectPreBookGuide);
  const phonePreGuide = useSelector(selectPreGuidePhone);
  const dialCall = () => {
    let phoneNumber = guideInformation?.guidePhone
      ? guideInformation.guidePhone
      : phonePreGuide.guidePhone;
    if (Platform.OS === "android") {
      phoneNumber = `tel:${phoneNumber}`;
      //  setPressed(true);
    } else {
      phoneNumber = `telprompt:${phoneNumber}`;
    }
    //let url = `whatsapp://send?phone=${phoneNumber}`;
    Linking.openURL(phoneNumber);
  };

  const whatsappCall = () => {
    let phoneNumber = guideInformation?.guidePhone
      ? guideInformation.guidePhone
      : phonePreGuide.guidePhone;
    let url = `whatsapp://send?phone=${phoneNumber}`;
    Linking.openURL(url);
  };
  useEffect(() => {}, []);
  return (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "flex-start",
        alignItems: "center",
        paddingRight: 20,
      }}
    >
      <TouchableOpacity onPress={dialCall}>
        <FontAwesome
          name="phone"
          size={30}
          color={Colors.secondary}
          style={{ padding: 10 }}
        />
      </TouchableOpacity>
      <TouchableOpacity onPress={whatsappCall}>
        <FontAwesome name="whatsapp" size={30} color={Colors.primary} />
      </TouchableOpacity>
    </View>
  );
};

export default Communication;
