import React, { useRef, useState } from "react";
import {
  Animated,
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import profile from "../assets/profile.png";
// Tab ICons...
import home from "../assets/home.png";
import search from "../assets/search.png";
import notifications from "../assets/bell.png";

import edit from "../assets/edit.png";
// import settings from "../assets/settings.png";
import logout from "../assets/logout.png";
// Menu
import menu from "../assets/menu.png";
import close from "../assets/close.png";

// Photo
import photo from "../assets/photo.jpg";
import TabButtton from "../components/TabButtton";

import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from "../screens/HomeScreen";
import tw from "tailwind-react-native-classnames";
import Colors from "../constants/Colors";
import ProfileScreen from "./ProfileScreen";
import EditProfileScreen from "./EditProfileScreen";
import YourTripsScreen from "./YourTripsScreen";

const SideNavScreen = () => {
  const Stack = createStackNavigator();
  const [currentTab, setCurrentTab] = useState("Home");
  // To get the curretn Status of menu ...
  const [showMenu, setShowMenu] = useState(false);

  // Animated Properties...

  const offsetValue = useRef(new Animated.Value(0)).current;
  // Scale Intially must be One...
  const scaleValue = useRef(new Animated.Value(1)).current;
  const closeButtonOffset = useRef(new Animated.Value(0)).current;

  return (
    <SafeAreaView style={styles.container}>
      <View style={{ justifyContent: "flex-start", padding: 15 }}>
        <Image
          source={profile}
          style={{
            width: 60,
            height: 60,
            borderRadius: 10,
            marginTop: 8,
          }}
        ></Image>

        <Text
          style={{
            fontSize: 20,
            fontWeight: "bold",
            color: "white",
            marginTop: 20,
          }}
        >
          Jenna Ezarik
        </Text>

        <TouchableOpacity>
          <Text
            style={{
              marginTop: 6,
              color: "white",
            }}
          >
            View Profile
          </Text>
        </TouchableOpacity>

        <View style={{ flexGrow: 1, marginTop: 50 }}>
          {
            // Tab Bar Buttons....
          }

          <TabButtton
            currentTab={currentTab}
            setCurrentTab={setCurrentTab}
            title={"Home"}
            nav={"HomeScreen"}
            image={home}
          />
          <TabButtton
            currentTab={currentTab}
            setCurrentTab={setCurrentTab}
            title={"Profile"}
            nav={"ProfileScreen"}
            image={search}
          />
          <TabButtton
            currentTab={currentTab}
            setCurrentTab={setCurrentTab}
            nav={"EditProfileScreen"}
            title={"Edit Profile"}
            image={edit}
          />
          <TabButtton
            currentTab={currentTab}
            setCurrentTab={setCurrentTab}
            nav={"YourTripsScreen"}
            title={"Your Trips"}
            image={notifications}
          />
        </View>

        <View>
          <TabButtton
            currentTab={currentTab}
            setCurrentTab={setCurrentTab}
            title={"LogOut"}
            image={logout}
          />
        </View>
      </View>

      {
        // Over lay View...
      }

      <Animated.View
        style={{
          flexGrow: 1,
          backgroundColor: "white",
          position: "absolute",
          top: 0,
          bottom: 0,
          left: 0,
          right: 0,
          // paddingHorizontal: 15,
          // paddingVertical: 20,
          borderRadius: showMenu ? 15 : 0,
          // Transforming View...
          transform: [{ scale: scaleValue }, { translateX: offsetValue }],
        }}
      >
        {
          // Menu Button...
        }

        <Animated.View
          style={{
            transform: [
              {
                translateY: closeButtonOffset,
              },
            ],
          }}
        >
          <TouchableOpacity
            onPress={() => {
              // Do Actions Here....
              // Scaling the view...
              Animated.timing(scaleValue, {
                toValue: showMenu ? 1 : 0.88,
                duration: 300,
                useNativeDriver: true,
              }).start();

              Animated.timing(offsetValue, {
                // YOur Random Value...
                toValue: showMenu ? 0 : 230,
                duration: 300,
                useNativeDriver: true,
              }).start();

              Animated.timing(closeButtonOffset, {
                // YOur Random Value...
                toValue: !showMenu ? -30 : 0,
                duration: 300,
                useNativeDriver: true,
              }).start();

              setShowMenu(!showMenu);
            }}
          >
            <Image
              source={showMenu ? close : menu}
              style={{
                width: 20,
                height: 20,
                tintColor: "black",
                marginTop: 50,
                marginLeft: 20,
              }}
            ></Image>
          </TouchableOpacity>

          <View style={tw`h-full`}>
            <Stack.Navigator>
              <Stack.Screen
                name="HomeScreen"
                component={HomeScreen}
                options={{
                  headerShown: false,
                }}
              />
              <Stack.Screen
                name="ProfileScreen"
                component={ProfileScreen}
                options={{
                  headerShown: false,
                }}
              />
              <Stack.Screen
                name="EditProfileScreen"
                component={EditProfileScreen}
                options={{
                  headerShown: false,
                }}
              />
              <Stack.Screen
                name="YourTripsScreen"
                component={YourTripsScreen}
                options={{
                  headerShown: false,
                }}
              />
            </Stack.Navigator>
          </View>
        </Animated.View>
      </Animated.View>
    </SafeAreaView>
  );
};

export default SideNavScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.primary,
    alignItems: "flex-start",
    justifyContent: "flex-start",
  },
});
