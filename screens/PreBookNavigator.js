import * as React from "react";
import { View, Text } from "react-native";
import { createSharedElementStackNavigator } from "react-navigation-shared-element";
import PreBookList from "./PreBookTripsScreens/PreBookList";
import PreBookListDetails from "./PreBookTripsScreens/PreBookListDetails";

const Stack = createSharedElementStackNavigator();

const PreBookNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName="PreBookList"
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="PreBookList" component={PreBookList} />
      <Stack.Screen name="PreBookListDetails" component={PreBookListDetails} />
    </Stack.Navigator>
  );
};

export default PreBookNavigator;
