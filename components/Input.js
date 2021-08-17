import React from "react";
import { TextInput, StyleSheet } from "react-native";
import Colors from "../constants/Colors";

const Input = (props) => {
  return <TextInput {...props} style={{ ...styles.input, ...props.style }} />;
};
const styles = StyleSheet.create({
  input: {
    height: 30,
    borderBottomColor: Colors.primary,
    borderBottomWidth: 1,
    marginVertical: 3,
  },
});
export default Input;
