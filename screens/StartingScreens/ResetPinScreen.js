import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import Input from "../../components/Input";
import Colors from "../../constants/Colors";
import MainButton from "../../components/MainButton.andriod";

const ResetPinScreen = (props) => {
  const numberPin = props.navigation.getParam("numberPin");
  const resendPin = props.navigation.getParam("resendPin");
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
          <MainButton
            onPress={() => {
              props.navigation.navigate({ routeName: "EnterPin" });
            }}
          >
            NEXT
          </MainButton>
        </View>
      </View>
    </View>
  );
};

ResetPinScreen.navigationOptions = (navData) => {
  const numberPin = navData.navigation.getParam("numberPin");
  const resendPin = navData.navigation.getParam("resendPin");
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
