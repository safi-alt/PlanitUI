// import React, { useState } from "react";

// import { Text, StyleSheet, View, ScrollView } from "react-native";

// import Colors from "../../constants/Colors";

// import { Button } from "react-native";
// import { useNavigation } from "@react-navigation/native";
// import { CheckBox } from "react-native-elements";

// const TermsOfUseScreen = (props) => {
//   const [isSelected, setSelection] = useState(false);
//   const navigation = useNavigation();
//   return (
//     <View style={styles.screen}>
//       <View style={styles.termOfUseContainer}>
//         <Text style={styles.TermOfUseText}>TERMS OF USE</Text>
//         <Text style={styles.text} numberOfLines={2}>
//           You need to read and accept PlaniT terms and conditions before
//           Sigining up
//         </Text>
//       </View>
//       <View style={styles.signupText}>
//         <Text style={styles.TermOfUseText}>PlaniT Sign Up Terms</Text>
//         <Text style={styles.TermOfUseText}>of Use</Text>
//       </View>
//       <View style={styles.termContainer}>
//         <ScrollView>
//           <View>
//             <Text style={styles.termHeadings}>1. Contractual Relatiopship</Text>
//             <Text style={styles.termText}>
//               Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
//               eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
//               enim ad minim veniam, quis nostrud exercitation ullamco laboris
//               nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
//               reprehenderit in voluptate velit esse cillum dolore eu fugiat
//               nulla pariatur. Excepteur sint occaecat cupidatat non proident,
//               sunt in culpa qui officia deserunt mollit anim id est laborum.
//             </Text>
//             <Text style={styles.termHeadings}>2. Contractual Relatiopship</Text>
//             <Text style={styles.termText}>
//               Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
//               eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
//               enim ad minim veniam, quis nostrud exercitation ullamco laboris
//               nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
//               reprehenderit in voluptate velit esse cillum dolore eu fugiat
//               nulla pariatur. Excepteur sint occaecat cupidatat non proident,
//               sunt in culpa qui officia deserunt mollit anim id est laborum.
//             </Text>
//             <Text style={styles.termHeadings}>3. Contractual Relatiopship</Text>
//             <Text style={styles.termText}>
//               Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
//               eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
//               enim ad minim veniam, quis nostrud exercitation ullamco laboris
//               nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
//               reprehenderit in voluptate velit esse cillum dolore eu fugiat
//               nulla pariatur. Excepteur sint occaecat cupidatat non proident,
//               sunt in culpa qui officia deserunt mollit anim id est laborum.
//             </Text>
//             <Text style={styles.termHeadings}>4. Contractual Relatiopship</Text>
//             <Text style={styles.termText}>
//               Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
//               eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
//               enim ad minim veniam, quis nostrud exercitation ullamco laboris
//               nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
//               reprehenderit in voluptate velit esse cillum dolore eu fugiat
//               nulla pariatur. Excepteur sint occaecat cupidatat non proident,
//               sunt in culpa qui officia deserunt mollit anim id est laborum.
//             </Text>
//             <View style={styles.checkboxContainer}>
//               <CheckBox
//                 checked={isSelected}
//                 onPress={() => setSelection(!isSelected)}
//               />
//               <Text style={styles.label}>
//                 Do you agree to the terms and conditions?
//               </Text>
//               <Text style={{ paddingLeft: 5 }}>{isSelected ? "👍" : "👎"}</Text>
//             </View>
//           </View>
//         </ScrollView>
//       </View>
//       <View style={styles.button}>
//         <Button
//           onPress={() => {
//             navigation.navigate("SideNavScreen");
//           }}
//           title="NEXT"
//         ></Button>
//       </View>
//     </View>
//   );
// };

// TermsOfUseScreen.setOption = {
//   title: "Terms Of Use",
// };

// const styles = StyleSheet.create({
//   screen: {
//     height: "100%",
//   },
//   termOfUseContainer: {
//     height: "15%",
//     marginTop: 15,
//     marginLeft: 10,
//   },
//   TermOfUseText: {
//     fontSize: 22,
//     fontFamily: "montserrat-bold",
//   },
//   text: {
//     color: Colors.secondary,
//     fontFamily: "montserrat-regular",
//     paddingTop: 10,
//   },
//   signupText: {
//     alignItems: "center",
//     justifyContent: "flex-start",
//     height: "10%",
//   },
//   termContainer: {
//     height: "50%",
//     alignItems: "center",
//     marginHorizontal: 10,
//     marginTop: 10,
//   },
//   termHeadings: {
//     fontSize: 13,
//     fontFamily: "montserrat-bold",
//   },
//   button: {
//     justifyContent: "center",
//     alignItems: "center",
//     height: "15%",
//   },
//   termText: {
//     fontFamily: "montserrat-regular",
//   },
//   checkboxContainer: {
//     flexDirection: "row",
//     alignItems: "center",
//     marginBottom: 10,
//   },
// });

// export default TermsOfUseScreen;

import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Dimensions,
  StyleSheet,
  StatusBar,
  Image,
  ScrollView,
} from "react-native";
import * as Animatable from "react-native-animatable";
// import LinearGradient from "react-native-linear-gradient";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { useTheme } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import Colors from "../../constants/Colors";
import Input from "../../components/Input";
import { CheckBox } from "react-native-elements";

const TermsOfUseScreen = ({ navigation }) => {
  const { colors } = useTheme();
  const [isSelected, setSelection] = useState(false);

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
        <View style={{ marginTop: -270 }}>
          <Text
            style={[
              styles.title,
              {
                color: colors.text,
              },
            ]}
          >
            Terms and Conditions
          </Text>

          <Text style={styles.text}>
            Please Accept the Following Terms and Conditions
          </Text>
          <ScrollView style={{ height: "150%" }}>
            <View>
              <Text style={styles.termHeadings}>
                1. Contractual Relatiopship
              </Text>

              <Text style={styles.termText}>
                // Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                do // eiusmod tempor incididunt ut labore et dolore magna
                aliqua. Ut // enim ad minim veniam, quis nostrud exercitation
                ullamco laboris // nisi ut aliquip ex ea commodo consequat. Duis
                aute irure dolor in // reprehenderit in voluptate velit esse
                cillum dolore eu fugiat // nulla pariatur. Excepteur sint
                occaecat cupidatat non proident, // sunt in culpa qui officia
                deserunt mollit anim id est laborum.
              </Text>

              <Text style={styles.termHeadings}>
                2. Contractual Relatiopship
              </Text>

              <Text style={styles.termText}>
                // Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                do // eiusmod tempor incididunt ut labore et dolore magna
                aliqua. Ut // enim ad minim veniam, quis nostrud exercitation
                ullamco laboris // nisi ut aliquip ex ea commodo consequat. Duis
                aute irure dolor in // reprehenderit in voluptate velit esse
                cillum dolore eu fugiat // nulla pariatur. Excepteur sint
                occaecat cupidatat non proident, // sunt in culpa qui officia
                deserunt mollit anim id est laborum.
              </Text>

              <Text style={styles.termHeadings}>
                3. Contractual Relatiopship
              </Text>

              <Text style={styles.termText}>
                // Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                do // eiusmod tempor incididunt ut labore et dolore magna
                aliqua. Ut // enim ad minim veniam, quis nostrud exercitation
                ullamco laboris // nisi ut aliquip ex ea commodo consequat. Duis
                aute irure dolor in // reprehenderit in voluptate velit esse
                cillum dolore eu fugiat // nulla pariatur. Excepteur sint
                occaecat cupidatat non proident, // sunt in culpa qui officia
                deserunt mollit anim id est laborum.
              </Text>

              <Text style={styles.termHeadings}>
                4. Contractual Relatiopship
              </Text>

              <Text style={styles.termText}>
                // Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                do // eiusmod tempor incididunt ut labore et dolore magna
                aliqua. Ut // enim ad minim veniam, quis nostrud exercitation
                ullamco laboris // nisi ut aliquip ex ea commodo consequat. Duis
                aute irure dolor in // reprehenderit in voluptate velit esse
                cillum dolore eu fugiat // nulla pariatur. Excepteur sint
                occaecat cupidatat non proident, // sunt in culpa qui officia
                deserunt mollit anim id est laborum.
              </Text>
            </View>
            <View style={styles.checkboxContainer}>
              <CheckBox
                checked={isSelected}
                onPress={() => setSelection(!isSelected)}
              />
              <Text style={styles.label}>
                Do you agree to the terms and conditions?
              </Text>
              <Text style={{ paddingLeft: 5 }}>{isSelected ? "👍" : "👎"}</Text>
            </View>

            <View style={styles.button}>
              <TouchableOpacity
                onPress={() => navigation.navigate("SideNavScreen")}
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
          </ScrollView>
        </View>
      </Animatable.View>
    </View>
  );
};

export default TermsOfUseScreen;

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
    paddingVertical: 300,
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
    color: Colors.primary,
    marginTop: 5,
    marginBottom: 5,
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
  checkboxContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
    justifyContent: "flex-start",
  },
});
