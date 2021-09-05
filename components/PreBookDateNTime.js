import React, { useState } from "react";
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

export const PreBookDateNTime = () => {
  const [date, setDate] = useState(new Date(1598051730000));
  const [mode, setMode] = useState("date");
  const [show, setShow] = useState(false);
  const [text, setText] = useState("Empty");
  const navigation = useNavigation();

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
      "Hours: " +
      ((tempDate.getHours() + 24) % 12 || 12) +
      " | Minutes: " +
      tempDate.getMinutes() +
      "| " +
      (tempDate.getHours() >= 12 ? "pm" : "am");
    setText(fDate + "\n" + fTime);

    console.log(fTime);
    console.log(tempDate);
  };

  const showMode = (currentMode) => {
    setShow(true);
    setMode(currentMode);
  };

  return (
    <SafeAreaView style={tw`bg-white flex-grow`}>
      <Text style={tw`text-center py-5 text-xl`}>Good Morning, Safey</Text>
      <View style={styles.cardBox}>
        <View style={{ flexDirection: "row", justifyContent: "center" }}>
          <View style={{ margin: 20 }}>
            <Button onPress={() => showMode("date")} title="Select Date" />
          </View>
          <View style={{ margin: 20 }}>
            <Button onPress={() => showMode("time")} title="Select Time" />
          </View>
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
        style={[tw`mt-auto border-t border-gray-200`, { alignItems: "center" }]}
      >
        <TouchableOpacity
          onPress={() => navigation.navigate("TourOptionsCard")}
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
});
