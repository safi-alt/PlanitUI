import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import Input from "../../components/Input";
import Colors from "../../constants/Colors";
import { Button } from "react-native";
import { useNavigation } from "@react-navigation/native";

const ResetPinScreen = (props) => {
  const numberPin = props.route.params.numberPin;
  const resendPin = props.route.params.resendPin;
  const navigation = useNavigation();
  return (
    <View style={styles.screen}>
      <View style={styles.textContainer}>
        <Text style={styles.pinText}>RESET PIN</Text>
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.getPin}>
          {numberPin ? "Enter Number" : resendPin ? "Enter E-mail" : ""}
        </Text>
        <Input
          blurOnSubmit
          autoCapitilize="none"
          maxLength={50}
          keyboardType={
            numberPin ? "numeric" : resendPin ? "email-address" : ""
          }
        />
      </View>
      <View style={styles.buttonContainer}>
        <View>
          <Button
            onPress={() => {
              navigation.navigate("EnterPinScreen");
            }}
            title="NEXT"
          ></Button>
        </View>
      </View>
    </View>
  );
};

ResetPinScreen.setOptions = (navData) => {
  const numberPin = navData.route.params.numberPin;
  const resendPin = navData.route.params.resendPin;
  return {
    headerTitle: numberPin ? "Enter Number" : resendPin ? "Enter E-mail" : "",
  };
};

const styles = StyleSheet.create({
  screen: {
    height: "100%",
  },
  textContainer: {
    alignSelf: "flex-start",
    marginLeft: 30,
    marginTop: 30,
    height: "10%",
  },
  pinText: {
    fontFamily: "montserrat-medium",
    fontSize: 30,
  },
  getPin: {
    fontFamily: "montserrat-regular",
    color: Colors.secondary,
    fontSize: 17,
  },
  inputContainer: {
    height: "30%",
    width: "80%",
    justifyContent: "center",
    marginTop: 20,
    marginLeft: 30,
  },
  numberText: {
    fontSize: 16,
  },
  buttonContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 40,
  },
});

export default ResetPinScreen;
