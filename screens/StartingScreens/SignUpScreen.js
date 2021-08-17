import React, { useState, useEffect } from "react";

import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";

import Input from "../../components/Input";
import Colors from "../../constants/Colors";
import MainButton from "../../components/MainButton.andriod";

const SignUpScreen = (props) => {
  const [isSignup, setIsSignup] = useState(false);

  return (
    <View style={styles.screen}>
      <View style={styles.imageContainer}>
        <Image
          style={styles.image}
          source={require("../../assets/planiTMainLogo.png")}
          resizeMode="cover"
        />
      </View>
      {isSignup ? (
        <View style={styles.inputTextHolder}>
          <Text style={styles.textStyles}>Enter E-mail</Text>
          <Input
            blurOnSubmit
            autoCapitilize="none"
            autoCorrect={false}
            maxLength={50}
            keyboardType="email-address"
          />
          <Text style={styles.textStyles}>Enter Password</Text>
          <Input
            blurOnSubmit
            autoCapitilize="none"
            autoCorrect={false}
            secureTextEntry={true}
          />
        </View>
      ) : (
        <View style={styles.inputTextHolder}>
          <Text style={styles.textStyles}>Enter Name</Text>
          <Input
            blurOnSubmit
            autoCapitilize="none"
            autoCorrect={false}
            maxLength={50}
          />
          <Text style={styles.textStyles}>Enter E-mail</Text>
          <Input
            blurOnSubmit
            autoCapitilize="none"
            autoCorrect={false}
            maxLength={50}
            keyboardType="email-address"
          />
          <Text style={styles.textStyles}>Enter Password</Text>
          <Input
            blurOnSubmit
            autoCapitilize="none"
            autoCorrect={false}
            secureTextEntry={true}
          />
        </View>
      )}
      <View style={styles.buttonContainer}>
        <MainButton
          onPress={() => {
            props.navigation.navigate({ routeName: "EnterPin" });
          }}
        >
          {isSignup ? "Log In" : "Sign Up"}
        </MainButton>
      </View>
      <View style={styles.textBase}>
        <Text style={styles.accountText}>Already have an account?</Text>
        <TouchableOpacity
          onPress={() => {
            setIsSignup((prevState) => !prevState);
          }}
        >
          <Text style={styles.signInText}>
            Switch to {isSignup ? "Sign Up" : "Log In"}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

SignUpScreen.navigationOptions = {
  headerTitle: "Authenticate",
};

const styles = StyleSheet.create({
  screen: {
    justifyContent: "center",
    alignItems: "center",
    //height: "100%",
  },
  imageContainer: {
    width: "40%",
    height: "40%",
    //overflow: "hidden",
  },
  image: {
    width: "100%",
    height: "100%",
  },
  textStyles: {
    color: Colors.secondary,
    fontSize: 16,
    fontFamily: "montserrat-medium",
    marginTop: 1,
    width: "100%",
  },
  buttonContainer: {
    width: "40%",
    height: "10%",
  },
  textBase: {
    alignItems: "center",
    width: "80%",
    height: "10%",
    marginTop: 10,
  },
  accountText: {
    fontSize: 15,
    color: Colors.secondary,
    fontFamily: "montserrat-regular",
  },
  signInText: {
    color: Colors.primary,
    fontFamily: "montserrat-medium",
    paddingTop: 10,
  },
  inputTextHolder: { width: "80%", height: "30%", marginBottom: 30 },
});

export default SignUpScreen;
