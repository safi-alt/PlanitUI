import React, { useState } from "react";

import { Text, StyleSheet, View, ScrollView, CheckBox } from "react-native";

import Colors from "../../constants/Colors";
import MainButton from "../../components/MainButton.andriod";
const TermsOfUseScreen = (props) => {
  const [isSelected, setSelection] = useState(false);
  return (
    <View style={styles.screen}>
      <View style={styles.termOfUseContainer}>
        <Text style={styles.TermOfUseText}>TERMS OF USE</Text>
        <Text style={styles.text} numberOfLines={2}>
          You need to read and accept PlaniT terms and conditions before
          Sigining up
        </Text>
      </View>
      <View style={styles.signupText}>
        <Text style={styles.TermOfUseText}>PlaniT Sign Up Terms</Text>
        <Text style={styles.TermOfUseText}>of Use</Text>
      </View>
      <View style={styles.termContainer}>
        <ScrollView>
          <View>
            <Text style={styles.termHeadings}>1. Contractual Relatiopship</Text>
            <Text style={styles.termText}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
              reprehenderit in voluptate velit esse cillum dolore eu fugiat
              nulla pariatur. Excepteur sint occaecat cupidatat non proident,
              sunt in culpa qui officia deserunt mollit anim id est laborum.
            </Text>
            <Text style={styles.termHeadings}>2. Contractual Relatiopship</Text>
            <Text style={styles.termText}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
              reprehenderit in voluptate velit esse cillum dolore eu fugiat
              nulla pariatur. Excepteur sint occaecat cupidatat non proident,
              sunt in culpa qui officia deserunt mollit anim id est laborum.
            </Text>
            <Text style={styles.termHeadings}>3. Contractual Relatiopship</Text>
            <Text style={styles.termText}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
              reprehenderit in voluptate velit esse cillum dolore eu fugiat
              nulla pariatur. Excepteur sint occaecat cupidatat non proident,
              sunt in culpa qui officia deserunt mollit anim id est laborum.
            </Text>
            <Text style={styles.termHeadings}>4. Contractual Relatiopship</Text>
            <Text style={styles.termText}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
              reprehenderit in voluptate velit esse cillum dolore eu fugiat
              nulla pariatur. Excepteur sint occaecat cupidatat non proident,
              sunt in culpa qui officia deserunt mollit anim id est laborum.
            </Text>
            <View style={styles.checkboxContainer}>
              <CheckBox
                value={isSelected}
                onValueChange={setSelection}
                style={styles.checkbox}
              />
              <Text style={styles.label}>
                Do you agree to the terms and conditions?
              </Text>
              <Text style={{ paddingLeft: 5 }}>{isSelected ? "👍" : "👎"}</Text>
            </View>
          </View>
        </ScrollView>
      </View>
      <View style={styles.button}>
        <MainButton
          onPress={() => {
            props.navigation.navigate({ routeName: "MainProfile" });
          }}
        >
          NEXT
        </MainButton>
      </View>
    </View>
  );
};

TermsOfUseScreen.navigationOptions = {
  headerTitle: "Terms Of Use",
};

const styles = StyleSheet.create({
  screen: {
    height: "100%",
  },
  termOfUseContainer: {
    height: "15%",
    marginTop: 15,
    marginLeft: 10,
  },
  TermOfUseText: {
    fontSize: 22,
    fontFamily: "montserrat-bold",
  },
  text: {
    color: Colors.secondary,
    fontFamily: "montserrat-regular",
    paddingTop: 10,
  },
  signupText: {
    alignItems: "center",
    justifyContent: "flex-start",
    height: "10%",
  },
  termContainer: {
    height: "50%",
    alignItems: "center",
    marginHorizontal: 10,
    marginTop: 10,
  },
  termHeadings: {
    fontSize: 13,
    fontFamily: "montserrat-bold",
  },
  button: {
    justifyContent: "center",
    alignItems: "center",
    height: "15%",
  },
  termText: {
    fontFamily: "montserrat-regular",
  },
  checkboxContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
});

export default TermsOfUseScreen;
