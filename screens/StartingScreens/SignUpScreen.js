import React, { useState, useEffect } from "react";

import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";

import Input from "../../components/Input";
import Colors from "../../constants/Colors";

import { Button } from "react-native";
import { useNavigation } from "@react-navigation/native";

import { useDispatch } from "react-redux";
import { setUser } from "../../slices/navSlice";

const SignUpScreen = (props) => {
  const [isSignup, setIsSignup] = useState(false);
  const navigation = useNavigation();
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [token, setToken] = useState("");
  // var token = "";
  const [message, setMessage] = useState("");

  const dispatch = useDispatch();

  const handleSubmit = async () => {
    const res = await fetch(`https://planit-fyp.herokuapp.com/api/users/`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        email,
        password,
        phone,
      }),
    });
    const response = await res.json();
    if (response.token) {
      setToken(response.token);
      dispatch(
        setUser({
          name: response.name,
          phone: response.phone,
          token: response.token,
        })
      );
      navigation.navigate("EnterPinScreen");
      setName("");
      setEmail("");
      setPassword("");
      setPhone("");
    } else {
      alert(`Error:${response.message}`);
    }
  };

  const handleLogin = async () => {
    const res = await fetch(
      `https://planit-fyp.herokuapp.com/api/users/login`,
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      }
    );
    const response = await res.json();
    console.log(response);
    if (response.token) {
      setToken(response.token);
      dispatch(
        setUser({
          name: response.name,
          phone: response.phone,
          token: response.token,
        })
      );
      navigation.navigate("HomeScreen");

      setEmail("");
      setPassword("");
    } else {
      alert(`Error:${response.message}`);
    }
  };
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
            value={email}
            onChangeText={(email) => setEmail(email)}
          />
          <Text style={styles.textStyles}>Enter Password</Text>
          <Input
            blurOnSubmit
            autoCapitilize="none"
            autoCorrect={false}
            secureTextEntry={true}
            value={password}
            onChangeText={(password) => setPassword(password)}
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
            value={name}
            onChangeText={(name) => setName(name)}
          />
          <Text style={styles.textStyles}>Enter E-mail</Text>
          <Input
            blurOnSubmit
            autoCapitilize="none"
            autoCorrect={false}
            maxLength={50}
            keyboardType="email-address"
            value={email}
            onChangeText={(email) => setEmail(email)}
          />
          <Text style={styles.textStyles}>Enter Password</Text>
          <Input
            blurOnSubmit
            autoCapitilize="none"
            autoCorrect={false}
            secureTextEntry={true}
            value={password}
            onChangeText={(password) => setPassword(password)}
          />
          <Text style={styles.textStyles}>Enter Phone</Text>
          <Input
            blurOnSubmit
            autoCapitilize="none"
            autoCorrect={false}
            maxLength={50}
            keyboardType="email-address"
            value={phone}
            onChangeText={(phone) => setPhone(phone)}
          />
        </View>
      )}
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          // onPress={() => {
          //   handleSubmit();
          //   {
          //     isSignup
          //       ? navigation.navigate("HomeScreen")
          //       : navigation.navigate("EnterPinScreen");
          //   }
          // }}
          onPress={() => {
            isSignup ? handleLogin() : handleSubmit();
            // if (token) navigation.navigate("HomeScreen");
            // isSignup
            //   ? navigation.navigate("HomeScreen")
            //   : navigation.navigate("EnterPinScreen");
          }}
        >
          <Text> {isSignup ? "Log In" : "Sign Up"}</Text>
        </TouchableOpacity>
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
