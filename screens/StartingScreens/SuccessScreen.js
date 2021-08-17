import React from "react";

import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";

import Colors from "../../constants/Colors";
import MainButton from "../../components/MainButton.andriod";

const SuccessScreen = (props) => {
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
        <Text style={styles.pinSuccess}>PIN SET SUCCESSFULLY</Text>
        <Text style={styles.pinCongrats}>
          Congratulations! You Have Registered
        </Text>
      </View>
      <View style={styles.buttonContainer}>
        <View>
          <MainButton
            onPress={() => {
              props.navigation.navigate({ routeName: "TermsOfUse" });
            }}
          >
            NEXT
          </MainButton>
        </View>
      </View>
    </View>
  );
};

SuccessScreen.navigationOptions = {
  headerTitle: "Congratulation",
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

export default SuccessScreen;
