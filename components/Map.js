import React, { useEffect, useRef } from "react";
import { StyleSheet, Text, View } from "react-native";
// import MapView, { Marker } from "react-native-maps";
import MapView, { Marker } from "react-native-maps";
// import MapViewDirections from "react-native-maps-directions";
// import MapViewDirections from "react-native-maps-directions";
import MapViewDirections from "react-native-maps-directions";
import { useSelector, useDispatch } from "react-redux";
import tw from "tailwind-react-native-classnames";
import {
  selectDestination,
  selectGuideLocation,
  selectOrigin,
  setTravelTimeInformation,
  selectPreOrigin,
  selectPreDestination,
  selectPreTravelTimeInformation,
  selectTravelTimeInformation,
} from "../slices/navSlice";
import { GOOGLE_MAPS_APIKEY } from "@env";

const Map = () => {
  const origin = useSelector(selectOrigin);
  const destination = useSelector(selectDestination);
  const preOrigin = useSelector(selectPreOrigin);
  const preDestination = useSelector(selectPreDestination);
  const travelTimeInformation = useSelector(selectTravelTimeInformation);
  const guideLocation = useSelector(selectGuideLocation);
  const mapRef = useRef();
  const dispatch = useDispatch();

  // useEffect(() => {
  //   // if (!origin || !destination) return;
  //   //Zoom and fit to Markers
  //   mapRef.current.fitToSuppliedMarkers(["origin", "destination"], {
  //     edgePadding: { top: 50, right: 50, bottom: 50, left: 50 },
  //   });
  //   mapRef.current.fitToSuppliedMarkers(["preOrigin", "preDestination"], {
  //     edgePadding: { top: 50, right: 50, bottom: 50, left: 50 },
  //   });
  // }, [origin, destination, preOrigin, preDestination]);

  useEffect(() => {
    if (!origin || !destination) return;
    const getTravelTime = async () => {
      fetch(
        `https://maps.googleapis.com/maps/api/distancematrix/json?units=imperial&origins=${origin.description}&destinations=${destination.description}&key=${GOOGLE_MAPS_APIKEY}`
      )
        .then((res) => res.json())
        .then((data) => {
          dispatch(setTravelTimeInformation(data.rows[0].elements[0]));
        });
    };
    getTravelTime();
  }, [origin, destination, GOOGLE_MAPS_APIKEY, guideLocation]);

  const onDirectionFound = (event) => {
    mapRef.current.fitToCoordinates(event.coordinates, {
      edgePadding: {
        right: 15,
        bottom: 100,
        left: 15,
        top: 100,
      },
    });
  };

  return (
    <MapView
      ref={mapRef}
      style={tw`flex-1`}
      mapType="mutedStandard"
      initialRegion={{
        latitude: origin ? origin.location.lat : preOrigin.lat,
        longitude: origin ? origin.location.lng : preOrigin.lng,
        latitudeDelta: 0.005,
        longitudeDelta: 0.005,
      }}
    >
      {origin && destination && (
        <MapViewDirections
          origin={origin.description}
          destination={{
            latitude: guideLocation?.guideLatitude
              ? guideLocation.guideLatitude
              : destination.location.lat,
            longitude: guideLocation?.guideLongitude
              ? guideLocation.guideLongitude
              : destination.location.lng,
          }}
          apikey={GOOGLE_MAPS_APIKEY}
          strokeColor="green"
          strokeWidth={3}
          lineDashPattern={[0]}
          onReady={onDirectionFound}
        />
      )}
      {preOrigin && preDestination && (
        <MapViewDirections
          origin={preOrigin.description}
          destination={{
            latitude: guideLocation?.guideLatitude
              ? guideLocation.guideLatitude
              : preDestination.lat,
            longitude: guideLocation?.guideLongitude
              ? guideLocation.guideLongitude
              : preDestination.lng,
          }}
          apikey={GOOGLE_MAPS_APIKEY}
          strokeColor="green"
          strokeWidth={3}
          lineDashPattern={[0]}
          onReady={onDirectionFound}
        />
      )}
      {origin?.location && (
        <Marker
          coordinate={{
            latitude: origin.location.lat,
            longitude: origin.location.lng,
          }}
          title="Origin"
          description={origin.description}
          identifier="origin"
          pinColor={"green"}
        />
      )}
      {preOrigin?.lat && (
        <Marker
          coordinate={{
            latitude: preOrigin.lat,
            longitude: preOrigin.lng,
          }}
          title="Origin"
          description={preOrigin.description}
          identifier="origin"
          pinColor={"green"}
        />
      )}

      {destination?.location && (
        <Marker
          coordinate={{
            latitude: guideLocation?.guideLatitude
              ? guideLocation.guideLatitude
              : destination.location.lat,
            longitude: guideLocation?.guideLongitude
              ? guideLocation.guideLongitude
              : destination.location.lng,
          }}
          title="Destination"
          description={destination.description}
          identifier="destination"
          // pinColor={guideLocation ? "green" : "red"}
          pinColor={"green"}
        />
      )}
      {preDestination?.lat && (
        <Marker
          coordinate={{
            latitude: guideLocation?.guideLatitude
              ? guideLocation.guideLatitude
              : preDestination.lat,
            longitude: guideLocation?.guideLongitude
              ? guideLocation.guideLongitude
              : preDestination.lng,
          }}
          title="Destination"
          description={preDestination.description}
          identifier="destination"
          // pinColor={guideLocation ? "green" : "red"}
          pinColor={"green"}
        />
      )}
    </MapView>
  );
};

export default Map;

const styles = StyleSheet.create({});
