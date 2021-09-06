import React from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
  Dimensions,
} from "react-native";
import { SharedElement } from "react-navigation-shared-element";

import preBook from "./PreBook";

const { width, height } = Dimensions.get("screen");
const SPACING = 12;
const ITEM_HEIGHT = height * 0.18;

const PreBookList = ({ navigation }) => {
  return (
    <View style={{ flex: 1 }}>
      <FlatList
        data={preBook}
        keyExtractor={(item) => item.key}
        contentContainerStyle={{ padding: SPACING }}
        renderItem={({ item }) => {
          return (
            <TouchableOpacity
              onPress={() => {
                navigation.navigate("PreBookListDetails", { item });
              }}
              style={{ marginBottom: SPACING, height: ITEM_HEIGHT }}
            >
              <View style={{ flex: 1, padding: SPACING }}>
                <SharedElement
                  id={`item.${item.key}.bg`}
                  style={[StyleSheet.absoluteFillObject]}
                >
                  <View
                    style={[
                      StyleSheet.absoluteFillObject,
                      { backgroundColor: item.color, borderRadius: 16 },
                    ]}
                  />
                </SharedElement>
                <SharedElement id={`item.${item.key}.name`}>
                  <Text style={styles.name}>{item.name}</Text>
                </SharedElement>
                <Text style={styles.jobTitle}>{item.jobTitle}</Text>
                <SharedElement
                  id={`item.${item.key}.image`}
                  style={styles.image}
                >
                  <Image source={{ uri: item.image }} style={styles.image} />
                </SharedElement>
                <View style={styles.bg} />
              </View>
            </TouchableOpacity>
          );
        }}
      />
      <SharedElement id="general.bg">
        <View style={styles.bg} />
      </SharedElement>
    </View>
  );
};

export default PreBookList;

const styles = StyleSheet.create({
  name: {
    fontWeight: "700",
    fontSize: 18,
    position: "absolute",
  },
  jobTitle: {
    fontSize: 11,
    opacity: 0.7,
    marginTop: 18 * 1.3,
  },
  image: {
    width: ITEM_HEIGHT * 0.8,
    height: ITEM_HEIGHT * 0.8,
    resizeMode: "contain",
    position: "absolute",
    bottom: 0,
    right: SPACING,
  },
  bg: {
    position: "absolute",
    width,
    height,
    backgroundColor: "white",
    transform: [{ translateY: height }],
    borderRadius: 32,
  },
});
