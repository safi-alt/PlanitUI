import React, { useState } from "react";
import { StyleSheet, Text, View, KeyboardAvoidingView } from "react-native";
import { Provider } from "react-redux";
import HomeScreen from "./screens/HomeScreen";
import MapScreen from "./screens/MapScreen";
import store from "./store";
import { SafeAreaProvider } from "react-native-safe-area-context";
import "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { Platform } from "react-native";
import ChatScreen from "./screens/ChatScreen";
import WelcomeScreen from "./screens/StartingScreens/WelcomeScreen";
import SignUpScreen from "./screens/StartingScreens/SignUpScreen";
import EnterPinScreen from "./screens/StartingScreens/EnterPinScreen";
import ResetPinScreen from "./screens/StartingScreens/ResetPinScreen";
import ResetSuccessScreen from "./screens/StartingScreens/ResetSuccessScreen";
import TermsOfUseScreen from "./screens/StartingScreens/TermsOfUseScreen";
import SuccessScreen from "./screens/StartingScreens/SuccessScreen";

import * as Font from "expo-font";
import AppLoading from "expo-app-loading";

const fetchFonts = () => {
  return Font.loadAsync({
    "montserrat-regular": require("./assets/fonts/Montserrat-Regular.ttf"),
    "montserrat-medium": require("./assets/fonts/Montserrat-Medium.ttf"),
    "montserrat-bold": require("./assets/fonts/Montserrat-Bold.ttf"),
  });
};

export default function App() {
  const Stack = createStackNavigator();
  const [fontLoaded, setFontLoaded] = useState(false);

  if (!fontLoaded) {
    return (
      <AppLoading
        startAsync={fetchFonts}
        onFinish={() => setFontLoaded(true)}
        onError={(err) => console.log(err)}
      />
    );
  }

  return (
    <Provider store={store}>
      <NavigationContainer>
        <SafeAreaProvider>
          <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={{ flex: 1 }}
            keyboardVerticalOffset={Platform.OS === "ios" ? -64 : 0}
          >
            <Stack.Navigator>
              <Stack.Screen
                name="WelcomeScreen"
                component={WelcomeScreen}
                options={{
                  headerShown: false,
                }}
              />

              <Stack.Screen name="SignUpScreen" component={SignUpScreen} />

              <Stack.Screen name="EnterPinScreen" component={EnterPinScreen} />

              <Stack.Screen name="ResetPinScreen" component={ResetPinScreen} />

              <Stack.Screen
                name="ResetSuccessScreen"
                component={ResetSuccessScreen}
              />

              <Stack.Screen name="SuccessScreen" component={SuccessScreen} />
              <Stack.Screen
                name="TermsOfUseScreen"
                component={TermsOfUseScreen}
                options={{ title: "Terms of Use" }}
              />

              <Stack.Screen
                name="HomeScreen"
                component={HomeScreen}
                options={{
                  headerShown: false,
                }}
              />
              <Stack.Screen
                name="MapScreen"
                component={MapScreen}
                options={{
                  headerShown: false,
                }}
              />
              <Stack.Screen
                name="ChatScreen"
                component={ChatScreen}
                options={{
                  headerShown: false,
                }}
              />
            </Stack.Navigator>
          </KeyboardAvoidingView>
        </SafeAreaProvider>
      </NavigationContainer>
    </Provider>
  );
}

const styles = StyleSheet.create({});
