import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import WelcomeScreen from "./StartingScreens/WelcomeScreen";
import SignUpScreen from "./StartingScreens/SignUpScreen";
import EnterPinScreen from "./StartingScreens/EnterPinScreen";
import ResetPinScreen from "./StartingScreens/ResetPinScreen";
import ResetSuccessScreen from "./StartingScreens/ResetSuccessScreen";
import TermsOfUseScreen from "./StartingScreens/TermsOfUseScreen";
import SuccessScreen from "./StartingScreens/SuccessScreen";
import SignInScreen from "./StartingScreens/SignInScreen";

const AuthScreen = () => {
  const Stack = createStackNavigator();
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="WelcomeScreen"
        component={WelcomeScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="SignUpScreen"
        component={SignUpScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="SignInScreen"
        component={SignInScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="EnterPinScreen"
        component={EnterPinScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="ResetPinScreen"
        component={ResetPinScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="ResetSuccessScreen"
        component={ResetSuccessScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen name="SuccessScreen" component={SuccessScreen} />
      <Stack.Screen
        name="TermsOfUseScreen"
        component={TermsOfUseScreen}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
};

export default AuthScreen;

const styles = StyleSheet.create({});
