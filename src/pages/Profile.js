import React, { useEffect, useContext, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Button,
} from "react-native";

import { DrawerActions, useNavigation } from "@react-navigation/native";
import { authentication, db } from "../components/firebaseConfig";
import { doc, getDoc, setDoc } from "firebase/firestore";
import LocalStorage from "@react-native-async-storage/async-storage";
import AuthContext from "../context/userContext";

const Profile = () => {
  const navigation = useNavigation();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [building, setBuilding] = useState("");
  const [district, setDistrict] = useState("");
  const [loading, setLoading] = useState(false);
  const [updateLoading, setUpdateLoading] = useState(false);

  useEffect(() => {
    // navigation.dispatch(DrawerActions.closeDrawer());
    getUserProfile();
  }, [setUpdateLoading]);

  const userAuth = useContext(AuthContext);
  const handleUpdate = () => {
    setUpdateLoading(true);
    const user = authentication.currentUser;
    const userProfile = doc(db, "users", user.uid);
    const userData = {
      name,
      email,
      phone,
      district,
      building,
    };
    setDoc(userProfile, userData, { merge })
      .then((res) => {
        // Toast.show({
        //   topOffset: 30,
        //   type: "success",
        //   text1: "User Info Updated",
        // });
        Alert.alert("User saved successfully");
      })
      .catch((err) => Alert.alert(err.message));
    setUpdateLoading(false);
  };
  const handleLogout = async () => {
    try {
      await LocalStorage.removeItem("driverInfo");
      userAuth.setUserInfo({
        email: "",
        id: "",
      });
      navigation.navigate("Login");
    } catch (error) {
      console.log(error);
    }
  };
  const getUserProfile = async () => {
    setLoading(true);
    const user = authentication.currentUser;
    if (user) {
      const userProfile = doc(db, "users", user.uid);
      await getDoc(userProfile)
        .then((res) => {
          if (res.exists) {
            setName(res.data().name);
            setEmail(res.data().email);
            setPhone(res.data().phone);
            setDistrict(res.data().district);
            setBuilding(res.data().bulidingNumber);
          } else {
            console.log("No user");
          }
        })
        .catch((err) => console.log(err.message));
    } else {
      Alert.alert("No user");
    }
    setLoading(false);
  };
  return (
    <View style={styles.container}>
      {loading || updateLoading ? (
        <ActivityIndicator
          animating={loading || updateLoading}
          color="purple"
          size="large"
        ></ActivityIndicator>
      ) : (
        <>
          <View style={styles.form}>
            <TextInput
              style={styles.textInput}
              autoCapitalize="none"
              onChangeText={(text) => setName(text)}
              autoCorrect={false}
              placeholder="Name"
              value={name}
            ></TextInput>
            <TextInput
              style={styles.textInput}
              onChangeText={(text) => setEmail(text)}
              autoCapitalize="none"
              autoCorrect={false}
              placeholder="Email"
              value={email}
            ></TextInput>
            <TextInput
              style={styles.textInput}
              onChangeText={(text) => setPhone(text)}
              autoCapitalize="none"
              autoCorrect={false}
              placeholder="Phone Number"
              value={phone}
            ></TextInput>
            <TextInput
              style={styles.textInput}
              onChangeText={(text) => setDistrict(text)}
              autoCapitalize="none"
              autoCorrect={false}
              placeholder="District"
              value={district}
            ></TextInput>
            <TextInput
              style={styles.textInput}
              onChangeText={(text) => setBuilding(text)}
              autoCapitalize="none"
              autoCorrect={false}
              placeholder="Building number"
              value={building}
            ></TextInput>
          </View>
          <TouchableOpacity style={styles.button} onPress={handleUpdate}>
            <Text style={styles.btnText}>Save</Text>
          </TouchableOpacity>
        </>
      )}
      <Button title="Logout" onPress={handleLogout}></Button>
    </View>
  );
};

export default Profile;

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "column",
    flex: 1,
    alignItems: "center",
  },
  textInput: {
    backgroundColor: "whitesmoke",
    height: 50,
    borderRadius: 10,
    paddingHorizontal: 5,
    marginVertical: 15,
  },
  form: {
    backgroundColor: "lightgrey",
    width: "90%",
    padding: 10,
    marginTop: 50,
  },
  button: {
    backgroundColor: "#65C18C",
    width: "40%",
    alignSelf: "center",
    padding: 10,
    position: "absolute",
    bottom: 150,
    right: 20,
  },
  btnText: {
    color: "white",
    fontSize: 18,
    textAlign: "center",
  },
});
