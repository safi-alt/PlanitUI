import React, { useEffect, useState, useCallback, LogBox } from "react";
import { GiftedChat } from "react-native-gifted-chat";

import { View, Text, Linking } from "react-native";
import { Header } from "react-native-elements";
import { FontAwesome } from "@expo/vector-icons";
import io from "socket.io-client";
import { TouchableOpacity } from "react-native";
import Colors from "../constants/Colors";

const Communication = () => {
  const dialCall = () => {
    let phoneNumber = "03352097647";
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
    let phoneNumber = "923352097647";
    let url = `whatsapp://send?phone=${phoneNumber}`;
    Linking.openURL(url);
  };
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
