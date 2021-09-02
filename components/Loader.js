import React from "react";
import { StyleSheet, Text, View } from "react-native";
import PulseLoader from "react-native-pulse-loader";

const Loader = () => {
  return (
    <PulseLoader
      avatar={
        "https://scontent-fra3-1.cdninstagram.com/t51.2885-15/e35/11429705_386886401514376_550879228_n.jpg"
      }
    />
  );
};

export default Loader;

const styles = StyleSheet.create({});
