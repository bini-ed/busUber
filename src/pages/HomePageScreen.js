import {
  StyleSheet,
  Dimensions,
  ActivityIndicator,
  Button,
  Text,
  View,
  Alert,
} from "react-native";
import React, { useContext, useState, useEffect, useRef } from "react";
import { useNavigation } from "@react-navigation/native";
import AuthContext from "../context/userContext";
import { SafeAreaView } from "react-native-safe-area-context";
import MapView, { Marker } from "react-native-maps";
import * as Location from "expo-location";
import MapViewDirections from "react-native-maps-directions";
import { authentication, db } from "../components/firebaseConfig";
import { collection, doc, onSnapshot, setDoc } from "firebase/firestore";
import LocalStorage from "@react-native-async-storage/async-storage";

const HomePageScreen = () => {
  const mapRef = useRef(null);
  const [user, setUser] = useState({});
  const [updateLoading, setUpdateLoading] = useState(false);
  const [loading, setLoading] = useState(true);

  const [initialLoc, setInitialLoc] = useState({
    latitude: 0,
    longitude: 0,
  });

  const [destinations, setDestination] = useState({
    latitude: 0,
    longitude: 0,
    description: "",
  });

  useEffect(() => {
    getLocation();
  }, [initialLoc.latitude, initialLoc.longitude]);

  useEffect(() => {
    if (!initialLoc || !destinations) return;
    mapRef.current.fitToSuppliedMarkers(["initialLoc", "destination"], {
      edgePadding: { top: 50, right: 50, bottom: 50, left: 50 },
    });
  }, [initialLoc, destinations]);

  useEffect(() => {
    const getUserInfo = async () => {
      const user = JSON.parse(await LocalStorage.getItem("driverInfo"));
      if (user) {
        setUser(user);
      }
    };
    getUserInfo();
  }, []);

  const getLocation = async () => {
    const permissionIsGranted = askPermission();
    if (!permissionIsGranted) {
      Alert.alert("Permission to access location was denied");
      askPermission();
    }
    const { coords } = await Location.getCurrentPositionAsync({});
    if (coords)
      setInitialLoc({ latitude: coords.latitude, longitude: coords.longitude });
    return;
  };

  const askPermission = async () => {
    const { granted } = await Location.requestForegroundPermissionsAsync();
    return granted;
  };

  const handleUpdate = () => {
    setUpdateLoading(true);
    const userProfile = doc(db, "driversLocation", user?.id);
    const userData = {
      currentLocation: { initialLoc },
    };
    setDoc(userProfile, userData)
      .then((res) => {
        console.log(res);
        Alert.alert("User Info Updated");
      })
      .catch((err) => Alert.alert(err.message));
    setUpdateLoading(false);
  };
  // setTimeout(handleUpdate);

  useEffect(() => {
    onSnapshot(collection(db, "booking"), (snapshot) => {
      const data = snapshot.docs.map((doc) => doc.data());
      console.log(data);
      data[0]?.dropOff
        ? setDestination({
            latitude: data[0].dropOff.latitude,
            longitude: data[0].dropOff.longitude,
          })
        : null;
    });
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <MapView
        ref={mapRef}
        style={styles.map}
        mapType="mutedStandard"
        initialRegion={{
          latitude: initialLoc.latitude,
          longitude: initialLoc.longitude,
          latitudeDelta: 0.008,
          longitudeDelta: 0.008,
        }}
      >
        {initialLoc?.latitude ? (
          <Marker
            coordinate={{
              latitude: initialLoc.latitude,
              longitude: initialLoc.longitude,
            }}
            title="origin"
            identifier="initialLoc"
          ></Marker>
        ) : null}
        {destinations?.latitude ? (
          <Marker
            coordinate={{
              latitude: destinations.latitude,
              longitude: destinations.longitude,
            }}
            title="destination"
            identifier="destination"
          ></Marker>
        ) : null}
        {initialLoc.latitude && destinations.latitude ? (
          <MapViewDirections
            origin={initialLoc}
            destination={destinations}
            apikey="AIzaSyBpIjiB5nbtZACNb7QMCXtPvmWmreO-4ls"
            strokeWidth={3}
            strokeColor="purple"
          />
        ) : null}
      </MapView>
    </SafeAreaView>
  );
};

export default HomePageScreen;

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flex: 1,
  },
  map: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height / 1.4,
  },
});
