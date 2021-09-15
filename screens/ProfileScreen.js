import React, { useEffect, useState } from "react";
import { View, SafeAreaView, StyleSheet } from "react-native";
import {
  Avatar,
  Title,
  Caption,
  Text,
  TouchableRipple,
} from "react-native-paper";

import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import AntDesign from "react-native-vector-icons/AntDesign";
import Feather from "react-native-vector-icons/Feather";
import Colors from "../constants/Colors";
import { setOrigin, setDestination, selectUser } from "../slices/navSlice";
import { useSelector } from "react-redux";
import profile from "../assets/safi.jpg";
import AsyncStorage from "@react-native-async-storage/async-storage";

// import Share from 'react-native-share';

// import files from '../assets/filesBase64';

const ProfileScreen = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [ordersLength, setOrdersLength] = useState(0);
  const [earnings, setEarnings] = useState(0);
  const userInformation = useSelector(selectUser);

  const getData = async () => {
    console.log("Hello wrold");
    const value = await AsyncStorage.getItem("@storage_Key");

    // value previously stored
    // console.log(value);
    const val = JSON.parse(value);
    const userId = userInformation.id;
    const res = await fetch(
      `https://planit-fyp.herokuapp.com/api/orders/getUserOrders/${userId}`
    );
    const response = await res.json();
    setOrdersLength(response.userOrders.length);

    // console.log('Helloo');
  };

  const getTransactions = async () => {
    try {
      const value = await AsyncStorage.getItem("@storage_Key");
      if (userInformation.token) {
        // value previously stored
        // console.log(value);
        const val = JSON.parse(value);
        const userId = userInformation.id;
        console.log(userId);
        const res = await fetch(
          `https://planit-fyp.herokuapp.com/api/transaction/getUserTransaction/${userId}`
        );
        const response = await res.json();
        console.log(response);
        //console.log(response.filterTransaction);
        let moneyArray = response.filterTransaction.map((x) => Number(x.cost));
        let earnings = moneyArray.reduce((a, b) => Math.round(a + b), 0);
        setEarnings(earnings);

        //setEarnings(response.cost);
      }
    } catch (e) {
      // error reading value
    }
  };

  // useEffect(() => {
  //   getData();
  //   //getTransactions();
  //   console.log(userInformation.id);
  //   // console.log('Hello world');
  // });
  //file:///storage/emulated/0/Android/data/com.driverapp/files/Pictures/00b12f50-8ba1-4856-96ff-b0f3eebaebdb.jpg
  // const [image, setImage] = React.useState(userInformation.avatar);
  const [image, setImage] = React.useState(userInformation.avatar);
  React.useEffect(() => {
    //console.log(userInformation);
    setImage(userInformation.avatar);
    getData();
    getTransactions();
  }, [userInformation]);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.userInfoSection}>
        <View style={{ flexDirection: "row", marginTop: 15 }}>
          <Avatar.Image
            source={{
              uri: image,
            }}
            size={80}
          />
          <View style={{ marginLeft: 20 }}>
            <Title
              style={[
                styles.title,
                {
                  marginTop: 15,
                  marginBottom: 5,
                },
              ]}
            >
              {userInformation.name}
            </Title>
            <Caption style={styles.caption}>@j_doe</Caption>
          </View>
        </View>
      </View>

      <View style={styles.userInfoSection}>
        <View style={styles.row}>
          <Icon name="map-marker-radius" color={Colors.primary} size={20} />
          <Text style={{ color: "#777777", marginLeft: 20 }}>
            {userInformation.city}, {userInformation.country}
          </Text>
        </View>
        <View style={styles.row}>
          <Icon name="phone" color={Colors.primary} size={20} />
          <Text style={{ color: "#777777", marginLeft: 20 }}>
            {userInformation.phone}
          </Text>
        </View>
        <View style={styles.row}>
          <Icon name="email" color={Colors.primary} size={20} />
          <Text style={{ color: "#777777", marginLeft: 20 }}>
            {userInformation.email}
          </Text>
        </View>
      </View>

      <View style={styles.infoBoxWrapper}>
        <View
          style={[
            styles.infoBox,
            {
              borderRightColor: "#dddddd",
              borderRightWidth: 1,
            },
          ]}
        >
          <Title>Rs.{earnings}</Title>
          <Caption>Wallet</Caption>
        </View>
        <View style={styles.infoBox}>
          <Title>{ordersLength}</Title>
          <Caption>Trips</Caption>
        </View>
      </View>

      <View style={styles.menuWrapper}>
        <TouchableRipple onPress={() => {}}>
          <View style={styles.menuItem}>
            <AntDesign name="hearto" color={Colors.primary} size={25} />
            <Text style={styles.menuItemText}>Your Favorites</Text>
          </View>
        </TouchableRipple>
        <TouchableRipple onPress={() => {}}>
          <View style={styles.menuItem}>
            <Icon name="credit-card" color={Colors.primary} size={25} />
            <Text style={styles.menuItemText}>Payment</Text>
          </View>
        </TouchableRipple>
        <TouchableRipple onPress={() => {}}>
          <View style={styles.menuItem}>
            <Icon name="share-outline" color={Colors.primary} size={25} />
            <Text style={styles.menuItemText}>Tell Your Friends</Text>
          </View>
        </TouchableRipple>
        <TouchableRipple onPress={() => {}}>
          <View style={styles.menuItem}>
            <Icon
              name="account-check-outline"
              color={Colors.primary}
              size={25}
            />
            <Text style={styles.menuItemText}>Support</Text>
          </View>
        </TouchableRipple>
        <TouchableRipple onPress={() => {}}>
          <View style={styles.menuItem}>
            <Feather name="settings" color={Colors.primary} size={25} />
            <Text style={styles.menuItemText}>Settings</Text>
          </View>
        </TouchableRipple>
      </View>
    </SafeAreaView>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  userInfoSection: {
    paddingHorizontal: 30,
    marginBottom: 25,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
  },
  caption: {
    fontSize: 14,
    lineHeight: 14,
    fontWeight: "500",
  },
  row: {
    flexDirection: "row",
    marginBottom: 10,
  },
  infoBoxWrapper: {
    borderBottomColor: "#dddddd",
    borderBottomWidth: 1,
    borderTopColor: "#dddddd",
    borderTopWidth: 1,
    flexDirection: "row",
    height: 100,
  },
  infoBox: {
    width: "50%",
    alignItems: "center",
    justifyContent: "center",
  },
  menuWrapper: {
    marginTop: 10,
  },
  menuItem: {
    flexDirection: "row",
    paddingVertical: 15,
    paddingHorizontal: 30,
  },
  menuItemText: {
    color: "#777777",
    marginLeft: 20,
    fontWeight: "600",
    fontSize: 16,
    lineHeight: 26,
  },
});
