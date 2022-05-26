import {
  StyleSheet,
  Text,
  Image,
  TextInput,
  ScrollView,
  View,
  TouchableOpacity,
} from "react-native";
import React, { useState, useEffect } from "react";

import { useNavigation } from "@react-navigation/native";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { authentication, db } from "../components/firebaseConfig";
import { setDoc, doc } from "firebase/firestore";
import LocalStorage from "@react-native-async-storage/async-storage";

const SignUp = () => {
  const [car, setCar] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const navigation = useNavigation();

  const handleCreateAccount = async () => {
    try {
      const user = await createUserWithEmailAndPassword(
        authentication,
        email,
        password
      );

      updateProfile(authentication.currentUser, { displayName: firstName });
      const userProfile = doc(db, "drivers", user.user.uid);
      const userData = {
        email: email,
        firstName: firstName,
        lastName: lastName,
        car: car,
      };
      await setDoc(userProfile, userData)
        .then(() => console.log("User Info registered"))
        .catch((err) => console.log(err.message));
      const value = { email: user.user.email, id: user.user.uid };
      await LocalStorage.setItem("userInfo", JSON.stringify(value));
      navigation.navigate("Home");
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <ScrollView style={{ display: "flex", backgroundColor: "#1873AA" }}>
      <View style={styles.container}>
        <View style={styles.Middle}>
          <Image
            source={require("../../assets/Logo1.png")}
            style={styles.profilePicture}
          />
          <Text style={styles.LoginText}>SignUp</Text>
        </View>

        <View>
          <View></View>
          <View>
            <Text style={{ fontSize: 17, fontWeight: "400", color: "white" }}>
              First Name:{" "}
            </Text>
            <TextInput
              onChangeText={(text) => setFirstName(text)}
              style={styles.input}
              placeholder="Your First name"
            />
          </View>
          <View>
            <Text style={{ fontSize: 17, fontWeight: "400", color: "white" }}>
              Last Name:{" "}
            </Text>
            <TextInput
              onChangeText={(text) => setLastName(text)}
              style={styles.input}
              placeholder="Your Last name"
            />
          </View>
          <View>
            <Text style={{ fontSize: 17, fontWeight: "400", color: "white" }}>
              E-mail
            </Text>
            <TextInput
              onChangeText={(text) => setEmail(text)}
              style={styles.input}
              autoCapitalize="none"
              placeholder="example@outlook.com"
            />
          </View>
          <View>
            <Text style={{ fontSize: 17, fontWeight: "400", color: "white" }}>
              Password
            </Text>
            <TextInput
              onChangeText={(text) => setPassword(text)}
              style={styles.input}
              placeholder="password"
              secureTextEntry={true}
            />
          </View>

          <View>
            <Text style={{ fontSize: 17, fontWeight: "400", color: "white" }}>
              Car:
            </Text>
            <TextInput
              onChangeText={(text) => setCar(text)}
              style={styles.input}
              placeholder="Car name"
            />
          </View>
          <View>
            <TouchableOpacity
              onPress={handleCreateAccount}
              style={[styles.button, { backgroundColor: "#6792F090" }]}
            >
              <Text style={{ fontSize: 17, fontWeight: "400", color: "white" }}>
                Create Account
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

export default SignUp;

const styles = StyleSheet.create({
  LoginText: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#EDB841",
    marginTop: 25,
  },
  Middle: {
    alignItems: "center",
    justifyContent: "center",
  },
  text2: {
    flexDirection: "row",
    justifyContent: "center",
    paddingTop: 5,
    marginBottom: 10,
  },
  image: {
    marginTop: 100,
    width: 150,
    height: 150,
  },
  signupText: {
    fontWeight: "bold",
    color: "#EDB841",
  },
  lineStyle: {
    flexDirection: "row",
    marginTop: 50,
    marginLeft: 15,
    marginRight: 15,
    marginBottom: 5,
    alignItems: "center",
  },
  imageStyle: {
    width: 80,
    height: 80,
    marginLeft: 20,
  },
  boxStyle: {
    flexDirection: "row",
    marginTop: 30,
    marginLeft: 15,
    marginRight: 15,
    justifyContent: "space-around",
  },
  image: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  login: {
    width: 350,
    height: 800,
    borderColor: "#fff",
    borderWidth: 2,
    borderRadius: 10,
    padding: 10,
    alignItems: "center",
  },
  input: {
    width: 250,
    height: 40,
    borderColor: "#fff",
    borderWidth: 2,
    borderRadius: 10,
    padding: 10,
    marginVertical: 10,
    backgroundColor: "#ffffff90",
    marginBottom: 20,
  },
  button: {
    width: 250,
    height: 40,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 10,
    borderColor: "#fff",
    borderWidth: 1,
  },
  container: {
    flex: 1,
    backgroundColor: "#1873AA",
    alignItems: "center",
    justifyContent: "center",
  },

  login: {
    width: 350,
    height: 300,
    borderColor: "#fff",
    borderWidth: 2,
    borderRadius: 10,
    padding: 10,
    paddingTop: 20,
    alignItems: "center",
    marginTop: 30,
  },
  profilePicture: {
    width: 175,
    height: 175,
    borderRadius: 50,
    borderWidth: 1,
    marginTop: 30,
  },
  input: {
    width: 250,
    height: 40,
    borderColor: "#fff",
    borderWidth: 2,
    borderRadius: 10,
    padding: 10,
    marginVertical: 10,
    backgroundColor: "#fff",
    marginBottom: 20,
  },
  button: {
    width: 250,
    height: 40,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 10,
    borderColor: "#fff",
    borderWidth: 1,
  },
});
