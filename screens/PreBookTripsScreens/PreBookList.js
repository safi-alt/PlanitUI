// import React from "react";
// import {
//   View,
//   Text,
//   StyleSheet,
//   FlatList,
//   TouchableOpacity,
//   Image,
//   Dimensions,
// } from "react-native";
// import { SharedElement } from "react-navigation-shared-element";

// import preBook from "./PreBook";
// import { selectUser } from "../../slices/navSlice";
// import { useSelector } from "react-redux";
// import profile from "../../assets/safi.jpg";

// const { width, height } = Dimensions.get("screen");
// const SPACING = 12;
// const ITEM_HEIGHT = height * 0.18;

// const PreBookList = ({ navigation }) => {
//   const [data, setData] = React.useState([]);
//   const userInformation = useSelector(selectUser);

//   const getData = async (id) => {
//     // value previously stored
//     // console.log(value);
//     //const val = JSON.parse(value);
//     //const userId = val.id;
//     const res = await fetch(
//       `https://planit-fyp.herokuapp.com/api/orders/getPreBookOrders/${id}`
//     );
//     const response = await res.json();
//     console.log(response);
//     // console.log(response.data);
//     // const orders = response.data.map((x) => x);
//     // console.log(orders);
//     const orders = response.userOrders.map((x) => {
//       return {
//         key: x._id,
//         image: x.avatar,
//         name: x.name,
//         phone: x.phone,
//         date: x.date,
//         time: x.time,
//         guideName: x.guideName,
//         origin: x.origin,
//         destination: x.destination,
//       };
//     });
//     //console.log(orders);
//     setData(orders);
//   };

//   React.useEffect(() => {
//     getData(userInformation.id);
//   }, []);

//   return (
//     <View style={{ flex: 1 }}>
//       <FlatList
//         data={data}
//         keyExtractor={(item) => item.key}
//         contentContainerStyle={{ padding: SPACING }}
//         renderItem={({ item }) => {
//           return (
//             <TouchableOpacity
//               onPress={() => {
//                 navigation.navigate("PreBookListDetails", { item });
//               }}
//               style={{ marginBottom: SPACING, height: ITEM_HEIGHT }}
//             >
//               <View style={{ flex: 1, padding: SPACING }}>
//                 <SharedElement
//                   id={`item.${item.key}.bg`}
//                   style={[StyleSheet.absoluteFillObject]}
//                 >
//                   <View
//                     style={[
//                       StyleSheet.absoluteFillObject,
//                       { backgroundColor: item.color, borderRadius: 16 },
//                     ]}
//                   />
//                 </SharedElement>
//                 <SharedElement id={`item.${item.key}.name`}>
//                   <Text style={styles.name}>{item.guideName}</Text>
//                 </SharedElement>
//                 <Text style={styles.jobTitle}>Phone: {item.phone}</Text>
//                 <SharedElement id={`item.${item.key}.name`}>
//                   <Text style={styles.name}>{item.date}</Text>
//                 </SharedElement>

//                 <Text style={styles.jobTitle}>{item.time}</Text>

//                 <SharedElement
//                   id={`item.${item.key}.image`}
//                   style={styles.image}
//                 >
//                   <Image source={profile} style={styles.image} />
//                 </SharedElement>
//                 <View style={styles.bg} />
//               </View>
//             </TouchableOpacity>
//           );
//         }}
//       />
//       <SharedElement id="general.bg">
//         <View style={styles.bg} />
//       </SharedElement>
//     </View>
//   );
// };

// export default PreBookList;

// const styles = StyleSheet.create({
//   name: {
//     fontWeight: "700",
//     fontSize: 18,
//     position: "absolute",
//   },
//   jobTitle: {
//     fontSize: 11,
//     opacity: 0.7,
//     marginTop: 18 * 1.3,
//   },
//   image: {
//     width: ITEM_HEIGHT * 0.8,
//     height: ITEM_HEIGHT * 0.8,
//     resizeMode: "contain",
//     position: "absolute",
//     bottom: 0,
//     right: SPACING,
//   },
//   bg: {
//     position: "absolute",
//     width,
//     height,
//     backgroundColor: "white",
//     transform: [{ translateY: height }],
//     borderRadius: 32,
//   },
// });

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
import Colors from "../../constants/Colors";
import { selectUser } from "../../slices/navSlice";
import { useSelector } from "react-redux";
import profile from "../../assets/safi.jpg";

const { width, height } = Dimensions.get("screen");
const SPACING = 12;
const ITEM_HEIGHT = height * 0.25;

const PreBookList = ({ navigation }) => {
  const [data, setData] = React.useState([]);
  const userInformation = useSelector(selectUser);

  const getData = async (id) => {
    // value previously stored
    // console.log(value);
    //const val = JSON.parse(value);
    //const userId = val.id;
    const res = await fetch(
      `https://planit-fyp.herokuapp.com/api/orders/getPreBookOrders/${id}`
    );
    const response = await res.json();
    console.log(response);
    // console.log(response.data);
    // const orders = response.data.map((x) => x);
    // console.log(orders);
    const orders = response.userOrders.map((x) => {
      return {
        key: x._id,
        image: x.avatar,
        name: x.name,
        phone: x.phone,
        date: x.date,
        time: x.time,
        guideName: x.guideName,
        origin: x.origin,
        destination: x.destination,
      };
    });
    //console.log(orders);
    setData(orders);
  };

  React.useEffect(() => {
    setTimeout(() => {
      //setMyPosition(null);
      getData(userInformation.id);
    }, 3000);
  }, []);
  return (
    <View style={{ flex: 1 }}>
      <FlatList
        data={data}
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
                      { backgroundColor: Colors.primary, borderRadius: 16 },
                    ]}
                  />
                </SharedElement>
                <SharedElement id={`item.${item.key}.name`}>
                  <Text style={styles.name}>{item.guideName}</Text>
                </SharedElement>
                <Text style={styles.jobTitle}>{item.date}</Text>
                <Text style={styles.jobTitle}>{item.time}</Text>
                <Text style={styles.jobTitle}>{item.origin}</Text>
                <Text style={styles.jobTitle}>{item.destination}</Text>
                <SharedElement
                  id={`item.${item.key}.image`}
                  style={styles.image}
                >
                  <Image source={profile} style={styles.image} />
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
