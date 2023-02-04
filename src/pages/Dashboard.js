import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Dimensions,
  TextInput,
  Button,
  Modal,
  ScrollView,
} from "react-native";
import React, { useEffect, useRef, useState, useContext } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import AuthContext from "../context/userContext";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import MapView, { Marker } from "react-native-maps";
import MapViewDirections from "react-native-maps-directions";
import { authentication, db } from "../components/firebaseConfig";
import { doc, setDoc } from "firebase/firestore";
import { SafeAreaView } from "react-native-safe-area-context";

import LocalStorage from "@react-native-async-storage/async-storage";

const Dashboard = () => {
  const navigation = useNavigation();
  const locAuth = useContext(AuthContext);
  const { userLoc } = locAuth;
  const { lat, long } = userLoc;
  const [modal, setModal] = useState(false);
  const [user, setUser] = useState({
    id: "",
    userName: "",
  });
  const mapRef = useRef(null);
  const GOOGLE_MAP_KEY = "xxx";

  const [destinations, setDestination] = useState({
    latitude: 0,
    longitude: 0,
    description: "",
  });
  const initialLoc = {
    latitude: lat,
    longitude: long,
  };
  useEffect(() => {
    const getUser = async () => {
      const user = await LocalStorage.getItem("userInfo");
      if (user?.id) {
        setUser(user);
      }
    };
    getUser();
  }, [user]);

  useEffect(() => {
    if (!initialLoc || !destinations) return;
    mapRef.current.fitToSuppliedMarkers(["initialLoc", "destination"], {
      edgePadding: { top: 50, right: 50, bottom: 50, left: 50 },
    });
  }, [initialLoc, destinations]);

  useEffect(() => {
    if (!initialLoc || !destinations) return;
    const getTime = async () => {
      await fetch(
        `https://maps.googleapis.com/maps/api/distancematrix/json?units=imperial&
        &destinations=${destinations.description}
        &origins=${initialLoc}       
        &key=AIzaSyD6ssTOjhnIn0lePvyrotNnO5IgxjDtSYw`
      )
        .then((res) => res.text())
        .then((data) => {
          // console.log(data);
        })
        .catch((err) => console.log(err.message));
    };
    getTime();
  }, [initialLoc, destinations]);

  const handleBooking = async () => {
    // const userProfile = doc(db, "booking", user.uid);
    // const bookingInfo = {
    //   tripDone: false,
    //   userName: user.userName,
    //   pickUp: initialLoc,
    //   destination: destinations,
    // };
    // await setDoc(userProfile, bookingInfo)
    //   .then(() => console.log("Booking Info registered"))
    //   .catch((err) => console.log(err.message));
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* <ScrollView
        style={{ backgroundColor: "red" }}
        keyboardShouldPersistTaps="handled"
        listViewDisplayed={false}
      > */}
      <View
        style={{
          height: Dimensions.get("window").height / 1.3,
        }}
      >
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
              apikey="AIzaSyD6ssTOjhnIn0lePvyrotNnO5IgxjDtSYw"
              strokeWidth={3}
              strokeColor="purple"
            />
          ) : null}
        </MapView>
      </View>
      <View style={styles.autocomplete}>
        <TouchableOpacity
          onPress={() => {
            setModal(true);
          }}
          style={{
            display: "flex",
            width: "100%",
            padding: 10,
          }}
        >
          <Text style={styles.input}>
            {destinations.description
              ? destinations.description
              : "Where do you wana go?"}
          </Text>
        </TouchableOpacity>
        {destinations.description ? (
          <TouchableOpacity
            onPress={handleBooking}
            style={{
              display: "flex",
              width: "50%",
              // padding: 10,
              backgroundColor: "dodgerblue",
              borderRadius: 10,
              padding: 5,
              marginTop: 15,
            }}
          >
            <Text style={{ textAlign: "center", color: "white" }}>
              Confirm booking
            </Text>
          </TouchableOpacity>
        ) : null}
      </View>
      {/* </ScrollView> */}
      <Modal visible={modal} animationType="slide">
        <GooglePlacesAutocomplete
          placeholder="Where Do you wana go ?"
          styles={{
            container: {
              flex: 1,
              backgroundColor: "purple",
              padding: 5,
              zIndex: 1,
            },
            textInput: {
              fontSize: 18,
            },
          }}
          fetchDetails
          nearbyPlacesAPI="GooglePlacesSearch"
          onPress={(data, details = null) => {
            setDestination({
              latitude: details.geometry.location.lat,
              longitude: details.geometry.location.lng,
              description: data.description,
            });
            setModal(false);
          }}
          query={{
            key: GOOGLE_MAP_KEY,
            language: "en",
          }}
          debounce={400}
        />
        <Button
          style={{ marginTop: 50 }}
          title="Close"
          onPress={() => setModal(false)}
        ></Button>
      </Modal>
    </SafeAreaView>
  );
};

export default Dashboard;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: "100%",
  },
  map: {
    width: "100%",
    height: Dimensions.get("window").height / 1.3,
  },
  autocomplete: {
    flex: 1,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderTopLeftRadius: 45,
    borderTopRightRadius: 45,
    backgroundColor: "purple",
    height: "100%",
    // padding: 50,
  },
  input: {
    backgroundColor: "white",
    width: "80%",
    padding: 10,
    alignSelf: "center",
    textAlign: "center",
  },
});
