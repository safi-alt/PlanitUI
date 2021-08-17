import React from "react";

import { View, Text, StyleSheet, Image } from "react-native";

import Colors from "../../constants/Colors";
import { Button } from "react-native";
import { useNavigation } from "@react-navigation/native";

const ResetSuccessScreen = (props) => {
  const navigation = useNavigation();
  return (
    <View style={styles.screen}>
      <View style={styles.imageContainer}>
        <Image
          style={styles.image}
          source={require("../../assets/SuccessImage.png")}
          resizeMode="cover"
        />
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.pinSuccess}>PIN RESET SUCCESSFULLY</Text>
        <Text style={styles.pinCongrats}>
          Congratulations! You Have Registered
        </Text>
      </View>
      <View style={styles.buttonContainer}>
        <View>
          <Button
            onPress={() => {
              navigation.navigate("TermsOfUseScreen");
            }}
            title="NEXT"
          ></Button>
        </View>
      </View>
    </View>
  );
};

ResetSuccessScreen.setOptions = {
  headerTitle: "Reset Pin Successful",
};

const styles = StyleSheet.create({
  screen: {
    // flex: 1,
    justifyContent: "space-around",
    alignItems: "center",
    height: "90%",
  },
  imageContainer: {
    alignItems: "center",
    justifyContent: "center",
    width: "80%",
    height: "50%",
    overflow: "hidden",
  },
  image: {
    width: "100%",
    height: "100%",
  },
  pinCongrats: {
    fontFamily: "montserrat-regular",
    color: Colors.secondary,
    fontSize: 16,
  },
  pinSuccess: {
    fontFamily: "montserrat-medium",
    fontSize: 27,
  },
  textContainer: {
    marginTop: -60,
    height: "20%",
    alignItems: "center",
  },
  numberText: {
    fontSize: 16,
  },
  buttonContainer: {
    justifyContent: "center",
    alignItems: "center",
    width: "80%",
  },
});

export default ResetSuccessScreen;
