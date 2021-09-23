import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  Dimensions,
  ScrollView,
} from "react-native";
import AntDesign from "react-native-vector-icons/AntDesign";
import * as Animatable from "react-native-animatable";
import { SharedElement } from "react-navigation-shared-element";
import profile from "../../assets/safi.jpg";
import { detailsIcons } from "./PreBook";

const DURATION = 400;
const { width, height } = Dimensions.get("screen");
const SPACING = 10;
const ITEM_HEIGHT = height * 0.18;
const TOP_HEADER_HEIGHT = height * 0.15;
const AVATAR_SIZE = 70;

const PreBookListDetails = ({ navigation, route }) => {
  const { item } = route.params;

  return (
    <View style={{ flex: 1 }}>
      <AntDesign
        name="arrowleft"
        size={18}
        style={{
          padding: 12,
          position: "absolute",
          top: SPACING * 2,
          left: SPACING,
          zIndex: 2,
        }}
        color={"#333"}
        onPress={() => {
          navigation.goBack();
        }}
      />
      <SharedElement id={`item.${item.key}.bg`}>
        <View
          style={[
            StyleSheet.absoluteFillObject,
            {
              backgroundColor: item.color,
              borderRadius: 0,
              height: TOP_HEADER_HEIGHT + 32,
            },
          ]}
        />
      </SharedElement>
      <SharedElement id={`item.${item.key}.name`}>
        <Text style={styles.name}>Trip Details</Text>
      </SharedElement>
      <SharedElement id={`item.${item.key}.image`}>
        <Image source={{ uri: item.image }} style={styles.image} />
      </SharedElement>
      <SharedElement id="general.bg">
        <View style={styles.bg}>
          <ScrollView>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-evenly",
                marginVertical: SPACING,
                marginBottom: SPACING + 32,
              }}
            >
              <Image
                source={profile}
                style={{
                  width: 100,
                  height: 100,
                  borderRadius: AVATAR_SIZE,
                  marginRight: SPACING / 2,
                }}
              />
            </View>
            <View>
              <Animatable.View
                animation="fadeInUp"
                // delay={DURATION * 2 + index * 100}
                key={item.key}
                style={{ marginVertical: SPACING }}
              >
                <Text style={styles.title}>{item.guideName}</Text>

                <View
                  key={item.key}
                  style={{
                    flexDirection: "column",
                    alignItems: "flex-start",
                    marginBottom: SPACING / 2,
                    marginLeft: SPACING,
                  }}
                >
                  {/* <View
                    style={{
                      height: 8,
                      width: 8,
                      borderRadius: 4,
                      backgroundColor: "gold",
                      marginRight: SPACING,
                    }}
                  /> */}
                  <Text
                    style={{
                      fontSize: 18,
                      opacity: 0.7,
                      color: "black",
                      flexWrap: "wrap",
                    }}
                  >
                    <Text style={{ color: "green", fontWeight: "bold" }}>
                      Date:{" "}
                    </Text>
                    {item.date}
                  </Text>

                  <Text
                    style={{
                      fontSize: 18,
                      opacity: 0.7,
                      color: "black",
                      flexWrap: "wrap",
                    }}
                  >
                    <Text style={{ color: "green", fontWeight: "bold" }}>
                      Time:{" "}
                    </Text>
                    {item.time}
                  </Text>

                  <Text
                    style={{
                      fontSize: 18,
                      opacity: 0.7,
                      color: "black",
                      flexWrap: "wrap",
                    }}
                  >
                    <Text style={{ color: "green", fontWeight: "bold" }}>
                      Pickup:{" "}
                    </Text>
                    {item.origin}
                  </Text>

                  <Text
                    style={{
                      fontSize: 18,
                      opacity: 0.7,
                      color: "black",
                      flexWrap: "wrap",
                    }}
                  >
                    <Text style={{ color: "green", fontWeight: "bold" }}>
                      Destination:{" "}
                    </Text>
                    {item.destination}
                  </Text>
                </View>
              </Animatable.View>
            </View>
            {/* <View>
              {item.categories.map((category, index) => {
                return (
                  <Animatable.View
                    animation="fadeInUp"
                    delay={DURATION * 2 + index * 100}
                    key={category.key}
                    style={{ marginVertical: SPACING }}
                  >
                    <Text style={styles.title}>{category.title}</Text>
                    {category.subcats.map((subcat, index) => {
                      return (
                        <View
                          key={index}
                          style={{
                            flexDirection: "row",
                            alignItems: "center",
                            marginBottom: SPACING / 2,
                            marginLeft: SPACING,
                          }}
                        >
                          <View
                            style={{
                              height: 8,
                              width: 8,
                              borderRadius: 4,
                              backgroundColor: "gold",
                              marginRight: SPACING,
                            }}
                          />
                          <Text style={styles.subTitle}>{subcat}</Text>
                        </View>
                      );
                    })}
                  </Animatable.View>
                );
              })}
            </View> */}
          </ScrollView>
        </View>
      </SharedElement>
    </View>
  );
};

PreBookListDetails.sharedElements = (route, otherRoute, showing) => {
  const { item } = route.params;
  return [
    {
      id: `item.${item.key}.bg`,
    },
    {
      id: `item.${item.key}.name`,
    },
    {
      id: `item.${item.key}.image`,
    },
    {
      id: "general.bg",
    },
  ];
};

export default PreBookListDetails;

const styles = StyleSheet.create({
  name: {
    fontWeight: "700",
    fontSize: 20,
    position: "absolute",
    top: TOP_HEADER_HEIGHT - SPACING * 3,
    left: SPACING,
  },
  image: {
    width: ITEM_HEIGHT * 0.8,
    height: ITEM_HEIGHT * 0.8,
    resizeMode: "contain",
    position: "absolute",
    top: TOP_HEADER_HEIGHT - ITEM_HEIGHT * 0.8 + 10,
    right: SPACING,
  },
  bg: {
    position: "absolute",
    width,
    height,
    backgroundColor: "white",
    transform: [{ translateY: TOP_HEADER_HEIGHT }],
    borderRadius: 32,
    padding: SPACING,
    paddingTop: 32 + SPACING,
  },
  title: {
    fontWeight: "700",
    fontSize: 25,
    marginBottom: SPACING,
    textAlign: "center",
  },
  subTitle: {
    fontSize: 14,
    opacity: 0.8,
  },
});
