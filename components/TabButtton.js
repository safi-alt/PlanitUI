import React, { useState } from "react";
import { StyleSheet, Text, View, TouchableOpacity, Image } from "react-native";
import { useNavigation } from "@react-navigation/native";
import Colors from "../constants/Colors";

const TabButtton = (props) => {
  const navigation = useNavigation();

  return (
    <TouchableOpacity
      onPress={() => {
        if (props.title == "LogOut") {
          // Do your Stuff...
        } else {
          props.setCurrentTab(props.title);
          navigation.navigate({ name: props.nav });
        }
      }}
    >
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          paddingVertical: 8,
          backgroundColor:
            props.currentTab == props.title ? "white" : "transparent",
          paddingLeft: 13,
          paddingRight: 35,
          borderRadius: 8,
          marginTop: 15,
        }}
      >
        <Image
          source={props.image}
          style={{
            width: 25,
            height: 25,
            tintColor:
              props.currentTab == props.title ? Colors.primary : "white",
          }}
        ></Image>

        <Text
          style={{
            fontSize: 15,
            fontWeight: "bold",
            paddingLeft: 15,
            color: props.currentTab == props.title ? Colors.primary : "white",
            flexDirection: "row",
          }}
        >
          {props.title}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default TabButtton;

const styles = StyleSheet.create({});
