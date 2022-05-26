import "react-native-gesture-handler";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { useState, useEffect } from "react";
import * as Location from "expo-location";
import AuthContext from "./src/context/userContext";
import LocalStorage from "@react-native-async-storage/async-storage";
import HomePageNav from "./src/navigation/HomePageNav";
import { SafeAreaView } from "react-native-safe-area-context";

export default function App() {
  const [userInfo, setUserInfo] = useState({
    email: "",
    id: "",
  });
  const [userLoc, setUserLoc] = useState({
    lat: 0,
    long: 0,
  });

  useEffect(() => {
    getLocation();
    getUserInfo();
  }, [userInfo.id]);

  const getUserInfo = async () => {
    const user = await LocalStorage.getItem("userInfo");
    if (user) {
      setUserInfo(user);
    }
  };
  const getLocation = async () => {
    const permissionIsGranted = askPermission();
    if (!permissionIsGranted) {
      Alert.alert("Permission to access location was denied");
      askPermission();
    }
    const { coords } = await Location.getCurrentPositionAsync({});
    if (coords) setUserLoc({ lat: coords.latitude, long: coords.longitude });
    return;
  };

  const askPermission = async () => {
    const { granted } = await Location.requestForegroundPermissionsAsync();
    return granted;
  };
  return (
    <AuthContext.Provider
      value={{ userLoc, setUserLoc, userInfo, setUserInfo }}
    >
      <NavigationContainer>
        <StatusBar></StatusBar>
        <HomePageNav></HomePageNav>
      </NavigationContainer>
    </AuthContext.Provider>
  );
}

const styles = StyleSheet.create({});
