import React, { useState, useEffect } from "react";
import {
  View,
  Button,
  Platform,
  Text,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import tw from "tailwind-react-native-classnames";
import Colors from "../constants/Colors";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native";

import { useSelector } from "react-redux";
import {
  selectTravelTimeInformation,
  selectOrigin,
  selectDestination,
  selectUser,
  selectTripCost,
  setGuide,
  setGuideLocation,
  selectGuideLocation,
  setStartTrip,
  selectOrder,
} from "../slices/navSlice";
import { useDispatch } from "react-redux";
import io from "socket.io-client";
import moment from "moment";

export const PreBookDateNTime = () => {
  //1598051730000
  //moment().format("DD/MM/YYYY hh:mm:ss A")
  //moment().utc()
  const dispatch = useDispatch();
  const [date, setDate] = useState(new Date());
  const [time, setTime] = useState("");
  const [mode, setMode] = useState("date");
  const [show, setShow] = useState(false);
  const [text, setText] = useState("Empty");
  const [duration, setDuration] = useState("");
  const navigation = useNavigation();
  const orderInformation = useSelector(selectOrder);
  const userInformation = useSelector(selectUser);
  const destinationInformation = useSelector(selectDestination);
  const travelTimeInformation = useSelector(selectTravelTimeInformation);

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === "ios");
    setDate(currentDate);

    let tempDate = new Date(currentDate);
    let fDate =
      tempDate.getDate() +
      "/" +
      (tempDate.getMonth() + 1) +
      "/" +
      tempDate.getFullYear();
    let fTime =
      ((tempDate.getHours() + 24) % 12 || 12) +
      ":" +
      tempDate.getMinutes() +
      " " +
      (tempDate.getHours() >= 12 ? "pm" : "am");
    setText(fDate + "\n" + fTime);

    setTime(fTime);
  };

  const showMode = (currentMode) => {
    setShow(true);
    setMode(currentMode);
  };
  let socket = io("https://planit-fyp.herokuapp.com");
  useEffect(() => {
    setDuration(travelTimeInformation?.duration?.text);
    socket.on("guide details", (detail) => {
      dispatch(
        setGuide({
          guideName: detail.name,
          guidePhone: detail.phone,
        })
      );
      // alert(`Guide:${detail.name},Phone:${detail.phone}`);
      navigation.navigate("TourOptionsCard");
    });
  }, [destinationInformation, orderInformation]);

  const handleEditOrder = async (id) => {
    //   setVal(true);

    let d1 = date.toISOString();
    d1 = moment(d1.split("T")[0]).format("DD/MM/YYYY");

    const res = await fetch(
      `https://planit-fyp.herokuapp.com/api/orders/updateOrder/${id}`,
      {
        method: "PUT",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          date: d1,
          time,
        }),
      }
    );
    const response = await res.json();

    socket.emit("order details", response);
  };

  return (
    <SafeAreaView style={tw`bg-white flex-grow`}>
      <Text style={tw`text-center py-5 text-xl`}>
        Good Morning, {userInformation.name}
      </Text>
      <View style={styles.cardBox}>
        <View style={{ flexDirection: "row", justifyContent: "center" }}>
          <TouchableOpacity
            onPress={() => showMode("date")}
            style={{
              margin: 20,
              backgroundColor: Colors.primary,
              alignItems: "center",
              justifyContent: "center",
              padding: 10,
            }}
          >
            <Text style={{ color: "white" }}>Select Date</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => showMode("time")}
            style={{
              margin: 20,
              backgroundColor: Colors.primary,
              alignItems: "center",
              justifyContent: "center",
              padding: 10,
            }}
          >
            <Text style={{ color: "white" }}>Select Time</Text>
          </TouchableOpacity>
        </View>
        <View style={{ alignItems: "center", width: "100%" }}>
          <Text style={{ fontWeight: "bold", fontSize: 20 }}>{text}</Text>
        </View>
      </View>
      {show && (
        <DateTimePicker
          style={{ marginHorizontal: 150, marginTop: 10 }}
          testID="dateTimePicker"
          value={date}
          mode={mode}
          is24Hour={false}
          display="default"
          onChange={onChange}
        />
      )}
      <View
        style={[
          tw`mt-auto border-t border-gray-200`,
          { alignItems: "center", marginBottom: 20 },
        ]}
      >
        <TouchableOpacity
          onPress={() => {
            handleEditOrder(orderInformation.data._id);
          }}
          style={{ backgroundColor: Colors.primary }}
        >
          <Text style={tw`text-center text-white text-xl p-3`}>
            Book A Guide
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default PreBookDateNTime;

const styles = StyleSheet.create({
  cardBox: {
    backgroundColor: "#DDEEF2",
    borderRadius: 10,
    paddingHorizontal: 20,
    paddingVertical: 30,
    marginVertical: 10,
    marginHorizontal: 50,
  },
  buttonColor: {
    backgroundColor: "red",
  },
});
