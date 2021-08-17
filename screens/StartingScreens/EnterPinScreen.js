import React from "react";

import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import Input from "../../components/Input";
import Colors from "../../constants/Colors";
import { Button } from "react-native";
import { useNavigation } from "@react-navigation/native";

const EnterPinScreen = (props) => {
  const navigation = useNavigation();
  return (
    <View style={styles.screen}>
      <View style={styles.textContainer}>
        <Text style={styles.pinText}>ENTER PIN</Text>
        <Text style={styles.getEmail}>For E-mail names.example.com</Text>
      </View>
      <View style={styles.inputContainer}>
        <Input
          blurOnSubmit
          autoCapitilize="none"
          keyboardType="number-pad"
          maxLength={4}
          style={{ width: "30%", fontSize: 40, height: "30%" }}
        />
        <Text style={styles.numberText}>
          Send PIN to mobile{" "}
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("ResetPinScreen", {
                numberPin: true,
              });
            }}
          >
            <Text style={{ color: Colors.primary, fontSize: 16 }}>number</Text>
          </TouchableOpacity>{" "}
          instead?
        </Text>
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("ResetPinScreen", {
              resendPin: true,
            });
          }}
        >
          <Text>Resend PIN</Text>
        </TouchableOpacity>
        <View>
          <Button
            onPress={() => {
              navigation.navigate("ResetSuccessScreen");
            }}
            title="NEXT"
          ></Button>
        </View>
      </View>
    </View>
  );
};

EnterPinScreen.navigationOptions = {
  headerTitle: "Enter Pin Number",
};

const styles = StyleSheet.create({
  screen: {
    height: "100%",
  },
  textContainer: {
    alignSelf: "flex-start",
    marginLeft: 20,
    marginTop: 20,
    height: "20%",
  },
  pinText: {
    fontFamily: "montserrat-medium",
    fontSize: 30,
  },
  getEmail: {
    fontFamily: "montserrat-regular",
    color: Colors.secondary,
    fontSize: 17,
    paddingTop: 10,
  },
  inputContainer: {
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
  },
  numberText: {
    fontSize: 16,
    paddingTop: 40,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    width: "80%",
    height: "20%",
    marginHorizontal: 40,
    marginTop: 40,
  },
});

export default EnterPinScreen;
