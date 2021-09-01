// import React from "react";

// import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
// import Input from "../../components/Input";
// import Colors from "../../constants/Colors";
// import { Button } from "react-native";
// import { useNavigation } from "@react-navigation/native";

// const EnterPinScreen = (props) => {
//   const navigation = useNavigation();
//   return (
//     <View style={styles.screen}>
//       <View style={styles.textContainer}>
//         <Text style={styles.pinText}>ENTER PIN</Text>
//         <Text style={styles.getEmail}>For E-mail names.example.com</Text>
//       </View>
//       <View style={styles.inputContainer}>
//         <Input
//           blurOnSubmit
//           autoCapitilize="none"
//           keyboardType="number-pad"
//           maxLength={4}
//           style={{ width: "30%", fontSize: 40, height: "30%" }}
//         />
//         <Text style={styles.numberText}>
//           Send PIN to mobile{" "}
//           <TouchableOpacity
//             onPress={() => {
//               navigation.navigate("ResetPinScreen", {
//                 numberPin: true,
//               });
//             }}
//           >
//             <Text style={{ color: Colors.primary, fontSize: 16 }}>number</Text>
//           </TouchableOpacity>{" "}
//           instead?
//         </Text>
//       </View>
//       <View style={styles.buttonContainer}>
//         <TouchableOpacity
//           onPress={() => {
//             navigation.navigate("ResetPinScreen", {
//               resendPin: true,
//             });
//           }}
//         >
//           <Text>Resend PIN</Text>
//         </TouchableOpacity>
//         <View>
//           <Button
//             onPress={() => {
//               navigation.navigate("ResetSuccessScreen");
//             }}
//             title="NEXT"
//           ></Button>
//         </View>
//       </View>
//     </View>
//   );
// };

// EnterPinScreen.navigationOptions = {
//   headerTitle: "Enter Pin Number",
// };

// const styles = StyleSheet.create({
//   screen: {
//     height: "100%",
//   },
//   textContainer: {
//     alignSelf: "flex-start",
//     marginLeft: 20,
//     marginTop: 20,
//     height: "20%",
//   },
//   pinText: {
//     fontFamily: "montserrat-medium",
//     fontSize: 30,
//   },
//   getEmail: {
//     fontFamily: "montserrat-regular",
//     color: Colors.secondary,
//     fontSize: 17,
//     paddingTop: 10,
//   },
//   inputContainer: {
//     justifyContent: "center",
//     alignItems: "center",
//     width: "100%",
//   },
//   numberText: {
//     fontSize: 16,
//     paddingTop: 40,
//   },
//   buttonContainer: {
//     flexDirection: "row",
//     justifyContent: "space-around",
//     alignItems: "center",
//     width: "80%",
//     height: "20%",
//     marginHorizontal: 40,
//     marginTop: 40,
//   },
// });

// export default EnterPinScreen;

import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Dimensions,
  StyleSheet,
  StatusBar,
  Image,
} from "react-native";
import * as Animatable from "react-native-animatable";
// import LinearGradient from "react-native-linear-gradient";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { useTheme } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import Colors from "../../constants/Colors";
import Input from "../../components/Input";

const SplashScreen = ({ navigation }) => {
  const { colors } = useTheme();

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Animatable.Image
          animation="bounceIn"
          duraton="1500"
          source={require("../../assets/MainLogoPlaniT.png")}
          style={styles.logo}
          resizeMode="stretch"
        />
      </View>
      <Animatable.View
        style={[
          styles.footer,
          {
            backgroundColor: "white",
          },
        ]}
        animation="fadeInUpBig"
      >
        <View style={{ marginTop: -100 }}>
          <Text
            style={[
              styles.title,
              {
                color: colors.text,
              },
            ]}
          >
            Please enter the One Time Password!
          </Text>
          <Input
            blurOnSubmit
            autoCapitilize="none"
            keyboardType="number-pad"
            maxLength={4}
            style={{
              width: "30%",
              fontSize: 40,
              marginTop: 10,
              marginBottom: 10,
            }}
          />

          <Text style={styles.text}>Sign in with account</Text>
          <View style={styles.button}>
            <TouchableOpacity
              onPress={() => navigation.navigate("ResetPinScreen")}
            >
              <LinearGradient
                colors={["#08d4c4", "#01ab9d"]}
                style={styles.signIn}
              >
                <Text style={styles.textSign}>Resend Pin</Text>
                <MaterialIcons name="navigate-next" color="#fff" size={20} />
              </LinearGradient>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => navigation.navigate("TermsOfUseScreen")}
            >
              <LinearGradient
                colors={["#08d4c4", "#01ab9d"]}
                style={styles.signIn}
              >
                <Text style={styles.textSign}>Continue</Text>
                <MaterialIcons name="navigate-next" color="#fff" size={20} />
              </LinearGradient>
            </TouchableOpacity>
          </View>
        </View>
      </Animatable.View>
    </View>
  );
};

export default SplashScreen;

const { height } = Dimensions.get("screen");
const height_logo = height * 0.28;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.secondary,
  },
  header: {
    flex: 2,
    justifyContent: "center",
    alignItems: "center",
  },
  footer: {
    flex: 1,
    backgroundColor: "#fff",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingVertical: 200,
    paddingHorizontal: 30,
  },
  logo: {
    width: height_logo,
    height: height_logo,
  },
  title: {
    color: "#05375a",
    fontSize: 30,
    fontWeight: "bold",
  },
  text: {
    color: "grey",
    marginTop: 5,
  },
  button: {
    justifyContent: "space-around",
    flexDirection: "row",
    alignItems: "flex-end",
    marginTop: 30,
  },
  signIn: {
    width: 150,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 50,
    flexDirection: "row",
  },
  textSign: {
    color: "white",
    fontWeight: "bold",
  },
});
