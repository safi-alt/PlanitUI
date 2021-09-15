import React, { useState, useEffect } from "react";
import { SafeAreaView, Dimensions } from "react-native";
import { StyleSheet, Text, View, Image } from "react-native";
import { Avatar, Icon, ListItem } from "react-native-elements";
import { TouchableOpacity } from "react-native";
import tw from "tailwind-react-native-classnames";
import { useSelector, useDispatch } from "react-redux";
import {
  selectPreBookGuide,
  selectTravelTimeInformation,
} from "../slices/navSlice";
import ChatScreen from "../screens/ChatScreen";
import { createStackNavigator } from "@react-navigation/stack";
import { Pressable } from "react-native";
import { useNavigation } from "@react-navigation/native";
import Colors from "../constants/Colors";
const { width } = Dimensions.get("screen");
import profile from "../assets/safi.jpg";
import {
  selectOrigin,
  selectDestination,
  setOrigin,
  setDestination,
  selectUser,
  selectGuide,
  selectPreTravelTimeInformation,
  setGuideLocation,
  selectGuideLocation,
  selectPreBookOrderId,
  setPreDestination,
  setPreOrigin,
  setPreTravelTimeInformation,
  setPreBookGuide,
  setPreBookOrderId,
  selectLiveOrderId,
  setLiveOrderId,
  setGuide,
  setOrder,
  selectPreOrigin,
  selectPreDestination,
  setTravelTimeInformation,
} from "../slices/navSlice";
import ModalPoup from "./ModalTrip";
import { Rating, AirbnbRating } from "react-native-ratings";
import io from "socket.io-client";

const TourOptionsCard = () => {
  const Stack = createStackNavigator();
  const origin = useSelector(selectOrigin);
  const destination = useSelector(selectDestination);
  const preOrigin = useSelector(selectPreOrigin);
  const preDestination = useSelector(selectPreDestination);
  const travelTimeInformation = useSelector(selectTravelTimeInformation);
  const preTravelTimeInformation = useSelector(selectPreTravelTimeInformation);
  const preBookGuideInformation = useSelector(selectPreBookGuide);
  const guideLocation = useSelector(selectGuideLocation);
  const navigation = useNavigation();
  const guideInformation = useSelector(selectGuide);
  const dispatch = useDispatch();
  const [visible, setVisible] = useState(false);
  const preOrderId = useSelector(selectPreBookOrderId);
  const liveOrderId = useSelector(selectLiveOrderId);

  const handleEditOrder = async (id) => {
    const res = await fetch(
      `https://planit-fyp.herokuapp.com/api/orders/updateOrder/${id}`,
      {
        method: "PUT",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          completed: true,
        }),
      }
    );
    const response = await res.json();
    console.log(response);
    // socket.emit("order details", {
    //   Name: response.data.name,
    //   Phone: response.data.phone,
    //   Origin: response.data.origin,
    //   Destination: response.data.destination,
    //   OriginLatitude: response.data.originlatitude,
    //   OriginLongitude: response.data.originLongitude,
    //   DestLatitude: response.data.destLatitude,
    //   DestLongitude: response.data.destLongitude,
    // });
  };

  useEffect(() => {
    //console.log("Hello");
    // console.log(userInformation);
    // console.log(guideInformation);
    // console.log("Hello");
    // console.log(userInformation.avatar);
    console.log(preOrderId);
    socket = io("https://planit-fyp.herokuapp.com");
    socket.on("final Posiiton", (location) => {
      dispatch(
        setGuideLocation({
          ...guideLocation,
          guideLatitude: false,
          guideLongitude: false,
        })
      );
    });
    socket.on("trip completed", (response) => {
      // dispatch(
      //   setDestination({
      //     location: null,
      //     description: null,
      //   })
      // );

      setVisible(true);
    });
  }, []);

  const payment = async (payment) => {
    console.log("Hello");
    // console.log(paymentMethod);
    socket.emit("payment method", payment);
    console.log(preOrderId);

    liveOrderId?.orderId
      ? handleEditOrder(liveOrderId.orderId)
      : handleEditOrder(preOrderId.orderId);
    liveOrderId.orderId
      ? dispatch(
          setDestination({
            ...destination,
            location: {
              lat: destination.location.lat,
              lng: destination.location.lng,
            },

            description: destination.description,
          })
        )
      : dispatch(
          setDestination({
            ...destination,
            location: {
              lat: preDestination.lat,
              lng: preDestination.lng,
            },

            description: preDestination.description,
          })
        );
    liveOrderId
      ? dispatch(
          setOrigin({
            ...origin,
            location: {
              lat: destination.location.lat,
              lng: destination.location.lng,
            },
            description: destination.description,
          })
        )
      : dispatch(
          setOrigin({
            ...origin,
            location: {
              lat: preOrigin.lat,
              lng: preOrigin.lng,
            },
            description: preOrigin.description,
          })
        );
    dispatch(
      setPreOrigin({
        ...preOrigin,
        lat: null,
        lng: null,
        description: null,
      })
    );
    dispatch(
      setPreDestination({
        ...preDestination,
        lat: null,
        lng: null,
        description: null,
      })
    );
    dispatch(
      setPreTravelTimeInformation({
        ...preTravelTimeInformation,
        distance: null,
        duration: null,
      })
    );
    dispatch(
      setPreBookGuide({
        ...preBookGuideInformation,
        guideName: null,
        guidePhone: null,
      })
    );
    dispatch(
      setGuideLocation({
        ...guideLocation,
        guideLatitude: null,
        guideLongitude: null,
      })
    );
    // dispatch(
    //   setOrigin({
    //     ...origin,
    //     location: null,
    //     description: null,
    //   })
    // );
    dispatch(
      setTravelTimeInformation({
        ...travelTimeInformation,
        travelTimeInformation: null,
      })
    );
    dispatch(
      setGuide({
        ...guideInformation,
        guideName: null,
        guidePhone: null,
      })
    );
    dispatch(
      setLiveOrderId({
        ...liveOrderId,
        orderId: null,
      })
    );

    dispatch(
      setPreBookOrderId({
        ...preOrderId,
        orderId: null,
      })
    );

    navigation.navigate("SideNavScreen", { screen: "HomeScreen" });
  };

  const paymentCard = async (payment) => {
    console.log("Hello");
    // console.log(paymentMethod);
    socket.emit("payment card", payment);
    liveOrderId?.orderId
      ? handleEditOrder(liveOrderId.orderId)
      : handleEditOrder(preOrderId.orderId);

    liveOrderId.orderId
      ? dispatch(
          setDestination({
            ...destination,
            location: {
              lat: destination.location.lat,
              lng: destination.location.lng,
            },

            description: destination.description,
          })
        )
      : dispatch(
          setDestination({
            ...destination,
            location: {
              lat: preDestination.lat,
              lng: preDestination.lng,
            },

            description: preDestination.description,
          })
        );
    liveOrderId
      ? dispatch(
          setOrigin({
            ...origin,
            location: {
              lat: destination.location.lat,
              lng: destination.location.lng,
            },
            description: destination.description,
          })
        )
      : dispatch(
          setOrigin({
            ...origin,
            location: {
              lat: preOrigin.lat,
              lng: preOrigin.lng,
            },
            description: preOrigin.description,
          })
        );

    dispatch(
      setPreOrigin({
        ...preOrigin,
        lat: null,
        lng: null,
        description: null,
      })
    );
    dispatch(
      setPreDestination({
        ...preDestination,
        lat: null,
        lng: null,
        description: null,
      })
    );
    dispatch(
      setPreTravelTimeInformation({
        ...preTravelTimeInformation,
        distance: null,
        duration: null,
      })
    );
    dispatch(
      setPreBookGuide({
        ...preBookGuideInformation,
        guideName: null,
        guidePhone: null,
      })
    );
    dispatch(
      setGuideLocation({
        ...guideLocation,
        guideLatitude: null,
        guideLongitude: null,
      })
    );
    //dispatch(...travelTimeInformation, setTravelTimeInformation(null));
    dispatch(
      setGuide({
        ...guideInformation,
        guideName: null,
        guidePhone: null,
      })
    );
    dispatch(
      setLiveOrderId({
        ...liveOrderId,
        orderId: null,
      })
    );

    dispatch(
      setPreBookOrderId({
        ...preOrderId,
        orderId: null,
      })
    );

    navigation.navigate("SideNavScreen", { screen: "HomeScreen" });
  };

  return (
    <SafeAreaView style={tw`bg-white flex-grow`}>
      <View>
        <TouchableOpacity
          onPress={() => navigation.navigate("RideOptionsCard")}
          style={tw`absolute top-3 z-50 left-5 p-3 rounded-full`}
        >
          <Icon name="chevron-left" type="fontawesome" />
        </TouchableOpacity>
        {travelTimeInformation?.distance && (
          <Text style={tw`text-center py-5 text-xl`}>
            Your Ride Details - {travelTimeInformation?.distance?.text}
          </Text>
        )}
        {preTravelTimeInformation?.distance && (
          <Text style={tw`text-center py-5 text-xl`}>
            Your Ride Details - {preTravelTimeInformation?.distance}
          </Text>
        )}
      </View>

      {/* <View style={tw``}>
        <Avatar
          title="Hamza Farooqui"
          source={{
            uri: "https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg",
          }}
        />
      </View>
      <TouchableOpacity onPress={() => navigation.navigate("ChatScreen")}>
        <Text>Hello Please click me </Text>
      </TouchableOpacity> */}

      <View style={style.detailsContainer}>
        {/* Name and rating view container */}
        <View style={style.cardBox}>
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            {/* <Text style={{ fontSize: 20, fontWeight: "bold" }}>AVATAR</Text> */}
            <Image
              source={profile}
              style={{
                width: 60,
                height: 60,
                borderRadius: 10,
                marginTop: 8,
              }}
            ></Image>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <View style={style.ratingTag}>
                <Text style={{ color: Colors.primary }}>4.8</Text>
              </View>
              <Text style={{ fontSize: 13, marginLeft: 5 }}>155 ratings</Text>
            </View>
          </View>

          {/* Location text */}
          {guideInformation && (
            <Text style={{ fontSize: 16, color: Colors.primary }}>
              Name: {guideInformation.guideName}
            </Text>
          )}
          {guideInformation && (
            <Text style={{ fontSize: 16, color: Colors.primary }}>
              Phone: {guideInformation.guidePhone}
            </Text>
          )}
          {preBookGuideInformation && (
            <Text style={{ fontSize: 16, color: Colors.primary }}>
              Phone: {preBookGuideInformation.guideName}
            </Text>
          )}
          {preBookGuideInformation && (
            <Text style={{ fontSize: 16, color: Colors.primary }}>
              Phone: {preBookGuideInformation.guidePhone}
            </Text>
          )}

          {/* Facilities container */}
          <View style={{ flexDirection: "row", marginTop: 20 }}>
            <View style={style.facility}>
              <Icon name="person" size={18} />
              <Text style={style.facilityText}>10</Text>
            </View>
            <View style={style.facility}>
              <Icon name="location" size={18} type="entypo" />
              <Text style={style.facilityText}>2</Text>
            </View>
            <View style={style.facility}>
              <Icon name="aspect-ratio" size={18} />
              <Text style={style.facilityText}>10 Km area</Text>
            </View>
          </View>
        </View>

        {/* Interior list */}
        {/* <FlatList
          contentContainerStyle={{ marginTop: 20 }}
          horizontal
          showsHorizontalScrollIndicator={false}
          keyExtractor={(_, key) => key.toString()}
          data={house.interiors}
          renderItem={({ item }) => <InteriorCard interior={item} />}
        /> */}

        {/* footer container */}
        <View style={style.footer}>
          <View>
            <Text
              style={{
                color: "black",
                fontWeight: "bold",
                fontSize: 18,
              }}
            >
              $1,500
            </Text>
            <Text
              style={{
                fontSize: 12,
                color: "black",
                fontWeight: "bold",
              }}
            >
              Total Price
            </Text>
          </View>
          <TouchableOpacity
            style={style.bookNowBtn}
            onPress={() => navigation.navigate("ChatScreen")}
          >
            <Text style={{ color: "white" }}>Chat Now</Text>
          </TouchableOpacity>
        </View>
      </View>
      <ModalPoup visible={visible}>
        <View style={{ alignItems: "center" }}>
          <View style={style.headerPopup}>
            <TouchableOpacity onPress={() => setVisible(false)}>
              <Image
                source={require("../assets/x.png")}
                style={{ height: 30, width: 30 }}
              />
            </TouchableOpacity>
          </View>
        </View>
        <View style={{ alignItems: "center" }}>
          <Image
            source={require("../assets/success.png")}
            style={{ height: 150, width: 150, marginVertical: 10 }}
          />
        </View>

        <Text style={{ marginVertical: 30, fontSize: 20, textAlign: "center" }}>
          Congratulations trip was successful
        </Text>

        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-around",
            marginTop: 5,
          }}
        >
          <TouchableOpacity
            style={style.commandButton}
            onPress={() => {
              paymentCard("card");
            }}
          >
            <Text style={style.panelButtonTitle}>Cash</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={style.commandButton}
            onPress={() => {
              payment("cash");
            }}
          >
            <Text style={style.panelButtonTitle}>Card</Text>
          </TouchableOpacity>
        </View>
        <AirbnbRating />
      </ModalPoup>
    </SafeAreaView>
  );
};

export default TourOptionsCard;

const style = StyleSheet.create({
  backgroundImageContainer: {
    elevation: 20,
    marginHorizontal: 20,
    marginTop: 20,
    alignItems: "center",
    height: 350,
  },
  backgroundImage: {
    height: "100%",
    width: "100%",
    borderRadius: 20,
    overflow: "hidden",
  },
  header: {
    paddingVertical: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 10,
  },
  headerBtn: {
    height: 50,
    width: 50,
    backgroundColor: Colors.primary,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  ratingTag: {
    height: 30,
    width: 35,
    backgroundColor: Colors.star,
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
  },
  virtualTag: {
    top: -20,
    width: 120,
    borderRadius: 10,
    height: 40,
    paddingHorizontal: 20,
    backgroundColor: Colors.primary,
    justifyContent: "center",
    alignItems: "center",
  },
  interiorImage: {
    width: width / 3 - 20,
    height: 80,
    marginRight: 10,
    borderRadius: 10,
  },
  footer: {
    height: 70,
    backgroundColor: "#DDEEF2",
    borderRadius: 10,
    paddingHorizontal: 20,
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 10,
  },
  bookNowBtn: {
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.primary,
    borderRadius: 10,
    paddingHorizontal: 20,
  },
  detailsContainer: { flex: 1, paddingHorizontal: 20 },
  facility: { flexDirection: "row", marginRight: 15 },
  facilityText: { marginLeft: 5, color: Colors.primary },
  cardBox: {
    backgroundColor: "#DDEEF2",
    borderRadius: 10,
    paddingHorizontal: 20,
    paddingVertical: 20,
    justifyContent: "space-between",
    marginVertical: 10,
  },
  modalBackGround: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContainer: {
    width: "80%",
    backgroundColor: "white",
    paddingHorizontal: 20,
    paddingVertical: 30,
    borderRadius: 20,
    elevation: 20,
  },
  headerPopup: {
    width: "100%",
    height: 40,
    alignItems: "flex-end",
    justifyContent: "center",
  },
  commandButton: {
    padding: 15,
    borderRadius: 10,
    backgroundColor: Colors.primary,
    alignItems: "center",
    marginTop: 10,
  },
  panelButtonTitle: {
    fontSize: 17,
    fontWeight: "bold",
    color: "white",
  },
});
