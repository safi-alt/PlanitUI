// import React, { useState, useEffect } from "react";

// import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";

// import Input from "../../components/Input";
// import Colors from "../../constants/Colors";

// import { Button } from "react-native";
// import { useNavigation } from "@react-navigation/native";

// const SignUpScreen = (props) => {
//   const [isSignup, setIsSignup] = useState(false);
//   const navigation = useNavigation();

//   return (
//     <View style={styles.screen}>
//       <View style={styles.imageContainer}>
//         <Image
//           style={styles.image}
//           source={require("../../assets/planiTMainLogo.png")}
//           resizeMode="cover"
//         />
//       </View>
//       {isSignup ? (
//         <View style={styles.inputTextHolder}>
//           <Text style={styles.textStyles}>Enter E-mail</Text>
//           <Input
//             blurOnSubmit
//             autoCapitilize="none"
//             autoCorrect={false}
//             maxLength={50}
//             keyboardType="email-address"
//           />
//           <Text style={styles.textStyles}>Enter Password</Text>
//           <Input
//             blurOnSubmit
//             autoCapitilize="none"
//             autoCorrect={false}
//             secureTextEntry={true}
//           />
//         </View>
//       ) : (
//         <View style={styles.inputTextHolder}>
//           <Text style={styles.textStyles}>Enter Name</Text>
//           <Input
//             blurOnSubmit
//             autoCapitilize="none"
//             autoCorrect={false}
//             maxLength={50}
//           />
//           <Text style={styles.textStyles}>Enter E-mail</Text>
//           <Input
//             blurOnSubmit
//             autoCapitilize="none"
//             autoCorrect={false}
//             maxLength={50}
//             keyboardType="email-address"
//           />
//           <Text style={styles.textStyles}>Enter Password</Text>
//           <Input
//             blurOnSubmit
//             autoCapitilize="none"
//             autoCorrect={false}
//             secureTextEntry={true}
//           />
//         </View>
//       )}
//       <View style={styles.buttonContainer}>
//         <TouchableOpacity
//           onPress={() => {
//             {
//               isSignup
//                 ? navigation.navigate("HomeScreen")
//                 : navigation.navigate("EnterPinScreen");
//             }
//           }}
//         >
//           <Text> {isSignup ? "Log In" : "Sign Up"}</Text>
//         </TouchableOpacity>
//       </View>
//       <View style={styles.textBase}>
//         <Text style={styles.accountText}>Already have an account?</Text>
//         <TouchableOpacity
//           onPress={() => {
//             setIsSignup((prevState) => !prevState);
//           }}
//         >
//           <Text style={styles.signInText}>
//             Switch to {isSignup ? "Sign Up" : "Log In"}
//           </Text>
//         </TouchableOpacity>
//       </View>
//     </View>
//   );
// };

// SignUpScreen.navigationOptions = {
//   headerTitle: "Authenticate",
// };

// const styles = StyleSheet.create({
//   screen: {
//     justifyContent: "center",
//     alignItems: "center",
//     //height: "100%",
//   },
//   imageContainer: {
//     width: "40%",
//     height: "40%",
//     //overflow: "hidden",
//   },
//   image: {
//     width: "100%",
//     height: "100%",
//   },
//   textStyles: {
//     color: Colors.secondary,
//     fontSize: 16,
//     fontFamily: "montserrat-medium",
//     marginTop: 1,
//     width: "100%",
//   },
//   buttonContainer: {
//     width: "40%",
//     height: "10%",
//   },
//   textBase: {
//     alignItems: "center",
//     width: "80%",
//     height: "10%",
//     marginTop: 10,
//   },
//   accountText: {
//     fontSize: 15,
//     color: Colors.secondary,
//     fontFamily: "montserrat-regular",
//   },
//   signInText: {
//     color: Colors.primary,
//     fontFamily: "montserrat-medium",
//     paddingTop: 10,
//   },
//   inputTextHolder: { width: "80%", height: "30%", marginBottom: 30 },
// });

// export default SignUpScreen;

import React from "react";
import {
  View,
  Text,
  Button,
  TouchableOpacity,
  Dimensions,
  TextInput,
  Platform,
  StyleSheet,
  ScrollView,
  StatusBar,
} from "react-native";
import * as Animatable from "react-native-animatable";
// import LinearGradient from "react-native-linear-gradient";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import Feather from "react-native-vector-icons/Feather";
import Fontisto from "react-native-vector-icons/Fontisto";
import { LinearGradient } from "expo-linear-gradient";
import Colors from "../../constants/Colors";
import { useDispatch } from "react-redux";
import { setUser } from "../../slices/navSlice";

const SignUpScreen = ({ navigation }) => {
  const [data, setData] = React.useState({
    username: "",
    password: "",
    confirm_password: "",
    check_textInputChange: false,
    check_textInputChanges: false,
    check_textInputChanged: false,
    secureTextEntry: true,
    confirm_secureTextEntry: true,
  });
  const [name, setName] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [phone, setPhone] = React.useState("");
  const [token, setToken] = React.useState("");
  // var token = "";
  const [message, setMessage] = React.useState("");

  const dispatch = useDispatch();

  const storeData = async (value) => {
    try {
      await AsyncStorage.setItem("@storage_Key", value);
    } catch (e) {
      // saving error
    }
  };

  const textInputChange = (val) => {
    if (val.length !== 0) {
      setData({
        ...data,
        username: val,
        check_textInputChange: true,
      });
    } else {
      setData({
        ...data,
        username: val,
        check_textInputChange: false,
      });
    }
  };
  const textInputChanges = (val) => {
    if (val.length !== 0) {
      setData({
        ...data,
        username: val,
        check_textInputChanges: true,
      });
    } else {
      setData({
        ...data,
        username: val,
        check_textInputChanges: false,
      });
    }
  };
  const textInputChanged = (val) => {
    if (val.length !== 0) {
      setData({
        ...data,
        username: val,
        check_textInputChanged: true,
      });
    } else {
      setData({
        ...data,
        username: val,
        check_textInputChanged: false,
      });
    }
  };

  const handlePasswordChange = (val) => {
    setData({
      ...data,
      password: val,
    });
  };

  const handleConfirmPasswordChange = (val) => {
    setData({
      ...data,
      confirm_password: val,
    });
  };

  const updateSecureTextEntry = () => {
    setData({
      ...data,
      secureTextEntry: !data.secureTextEntry,
    });
  };

  const updateConfirmSecureTextEntry = () => {
    setData({
      ...data,
      confirm_secureTextEntry: !data.confirm_secureTextEntry,
    });
  };

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

  return (
    <View style={styles.container}>
      {/* <StatusBar backgroundColor={Colors.primary} barStyle="light-content" /> */}
      <View style={styles.header}>
        <Text style={styles.text_header}>Register Now!</Text>
      </View>
      <Animatable.View animation="fadeInUpBig" style={styles.footer}>
        <ScrollView>
          <Text style={styles.text_footer}>Username</Text>
          <View style={styles.action}>
            <FontAwesome name="user-o" color="#05375a" size={20} />
            <TextInput
              placeholder="Your Username"
              style={styles.textInput}
              autoCapitalize="none"
              value={name}
              onChangeText={(name) => {
                textInputChange(name);
                setName(name);
              }}
            />
            {data.check_textInputChange ? (
              <Animatable.View animation="bounceIn">
                <Feather name="check-circle" color="green" size={20} />
              </Animatable.View>
            ) : null}
          </View>
          <Text
            style={[
              styles.text_footer,
              {
                marginTop: 35,
              },
            ]}
          >
            E-mail
          </Text>
          <View style={styles.action}>
            <Fontisto name="email" color="#05375a" size={20} />
            <TextInput
              placeholder="Your E-mail"
              style={styles.textInput}
              autoCapitalize="none"
              value={email}
              onChangeText={(email) => {
                textInputChanges(email);
                setEmail(email);
              }}
            />
            {data.check_textInputChanges ? (
              <Animatable.View animation="bounceIn">
                <Feather name="check-circle" color="green" size={20} />
              </Animatable.View>
            ) : null}
          </View>
          <Text
            style={[
              styles.text_footer,
              {
                marginTop: 35,
              },
            ]}
          >
            Phone Number
          </Text>
          <View style={styles.action}>
            <Feather name="phone" color="#05375a" size={20} />
            <TextInput
              placeholder="Your Phone Number"
              style={styles.textInput}
              autoCapitalize="none"
              value={phone}
              onChangeText={(phone) => {
                textInputChanged(phone);
                setPhone(phone);
              }}
              keyboardType="number-pad"
            />
            {data.check_textInputChanged ? (
              <Animatable.View animation="bounceIn">
                <Feather name="check-circle" color="green" size={20} />
              </Animatable.View>
            ) : null}
          </View>

          <Text
            style={[
              styles.text_footer,
              {
                marginTop: 35,
              },
            ]}
          >
            Password
          </Text>
          <View style={styles.action}>
            <Feather name="lock" color="#05375a" size={20} />
            <TextInput
              placeholder="Your Password"
              secureTextEntry={data.secureTextEntry ? true : false}
              style={styles.textInput}
              autoCapitalize="none"
              value={password}
              onChangeText={(password) => {
                handlePasswordChange(password);
                setPassword(password);
              }}
            />
            <TouchableOpacity onPress={updateSecureTextEntry}>
              {data.secureTextEntry ? (
                <Feather name="eye-off" color="grey" size={20} />
              ) : (
                <Feather name="eye" color="grey" size={20} />
              )}
            </TouchableOpacity>
          </View>

          <Text
            style={[
              styles.text_footer,
              {
                marginTop: 35,
              },
            ]}
          >
            Confirm Password
          </Text>
          <View style={styles.action}>
            <Feather name="lock" color="#05375a" size={20} />
            <TextInput
              placeholder="Confirm Your Password"
              secureTextEntry={data.confirm_secureTextEntry ? true : false}
              style={styles.textInput}
              autoCapitalize="none"
              onChangeText={(val) => handleConfirmPasswordChange(val)}
            />
            <TouchableOpacity onPress={updateConfirmSecureTextEntry}>
              {data.secureTextEntry ? (
                <Feather name="eye-off" color="grey" size={20} />
              ) : (
                <Feather name="eye" color="grey" size={20} />
              )}
            </TouchableOpacity>
          </View>
          <View style={styles.textPrivate}>
            <Text style={styles.color_textPrivate}>
              By signing up you agree to our
            </Text>
            <Text style={[styles.color_textPrivate, { fontWeight: "bold" }]}>
              {" "}
              Terms of service
            </Text>
            <Text style={styles.color_textPrivate}> and</Text>
            <Text style={[styles.color_textPrivate, { fontWeight: "bold" }]}>
              {" "}
              Privacy policy
            </Text>
          </View>
          <View style={styles.button}>
            <TouchableOpacity
              style={styles.signIn}
              onPress={() => {
                handleSubmit();
              }}
            >
              <LinearGradient
                colors={["#08d4c4", "#01ab9d"]}
                style={styles.signIn}
              >
                <Text
                  style={[
                    styles.textSign,
                    {
                      color: "#fff",
                    },
                  ]}
                >
                  Sign Up
                </Text>
              </LinearGradient>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => {
                navigation.navigate("SignInScreen");
              }}
              style={[
                styles.signIn,
                {
                  borderColor: "#009387",
                  borderWidth: 1,
                  marginTop: 15,
                },
              ]}
            >
              <Text
                style={[
                  styles.textSign,
                  {
                    color: "#009387",
                  },
                ]}
              >
                Sign In
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </Animatable.View>
    </View>
  );
};

export default SignUpScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.primary,
  },
  header: {
    flex: 1,
    justifyContent: "flex-end",
    paddingHorizontal: 20,
    paddingBottom: 50,
  },
  footer: {
    flex: Platform.OS === "ios" ? 3 : 5,
    backgroundColor: "#fff",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingHorizontal: 20,
    paddingVertical: 30,
  },
  text_header: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 30,
  },
  text_footer: {
    color: "#05375a",
    fontSize: 18,
  },
  action: {
    flexDirection: "row",
    marginTop: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#f2f2f2",
    paddingBottom: 5,
  },
  textInput: {
    flex: 1,
    marginTop: Platform.OS === "ios" ? 0 : -12,
    paddingLeft: 10,
    color: "#05375a",
  },
  button: {
    alignItems: "center",
    marginTop: 50,
  },
  signIn: {
    width: "100%",
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
  },
  textSign: {
    fontSize: 18,
    fontWeight: "bold",
  },
  textPrivate: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: 20,
  },
  color_textPrivate: {
    color: "grey",
  },
});
