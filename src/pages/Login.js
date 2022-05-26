import React, { useContext, useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Alert,
  TextInput,
  Image,
  ActivityIndicator,
} from "react-native";
import LocalStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import { signInWithEmailAndPassword } from "firebase/auth";
import { authentication } from "../components/firebaseConfig";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const navigation = useNavigation();

  useEffect(() => {
    getUser = async () => {
      const user = JSON.parse(await LocalStorage.getItem("userInfo"));
      if (user?.id) navigation.navigate("Home");
    };
    getUser();
  }, []);

  const handleSignIn = async () => {
    setLoading(true);

    signInWithEmailAndPassword(authentication, email, password)
      .then(async (user) => {
        const value = { email: user.user.email, id: user.user.uid };
        await LocalStorage.setItem("userInfo", JSON.stringify(value));
        navigation.navigate("Home");
      })
      .catch((error) => {
        // Toast.show({
        //   topOffset: 30,
        //   type: "error",
        //   text1: error.message,
        // });
        Alert.alert(error.message);
      });
    setLoading(false);
  };

  return (
    <View style={styles.container}>
      {loading ? (
        <ActivityIndicator
          animating={loading ? true : false}
          color="white"
          size={50}
        ></ActivityIndicator>
      ) : (
        <>
          <View style={styles.Middle}>
            <Image
              source={require("../../assets/Logo1.png")}
              alt="test"
              style={styles.profilePicture}
            />
            <Text style={styles.LoginText}>LogIn</Text>
          </View>

          <View style={styles.login}>
            <View>
              <Text style={{ fontSize: 17, fontWeight: "400", color: "white" }}>
                E-mail
              </Text>
              <TextInput
                onChangeText={(text) => setEmail(text)}
                style={styles.input}
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
            <TouchableOpacity
              onPress={handleSignIn}
              style={[styles.button, { backgroundColor: "#00CFEB90" }]}
            >
              <Text style={{ fontSize: 17, fontWeight: "400", color: "white" }}>
                Login
              </Text>
            </TouchableOpacity>
          </View>

          {/* Line */}
          <View style={styles.lineStyle}>
            <View style={{ flex: 1, height: 1, backgroundColor: "#EDB841" }} />
            <View>
              <Text style={{ width: 50, textAlign: "center", color: "white" }}>
                Or
              </Text>
            </View>
            <View style={{ flex: 1, height: 1, backgroundColor: "#EDB841" }} />
          </View>
          <View style={styles.text2}>
            <Text style={{ color: "white" }}>Don't have an account? </Text>
            <TouchableOpacity onPress={() => navigation.navigate("Signup")}>
              <Text style={styles.signupText}> Sign up</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.text2}>
            <Text style={{ color: "white" }}>Forgot </Text>
            <TouchableOpacity onPress={() => navigation.navigate("Forgot")}>
              <Text style={styles.signupText}> Password?</Text>
            </TouchableOpacity>
          </View>
        </>
      )}
    </View>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flex: 1,
    backgroundColor: "red",
    justifyContent: "center",
    alignItems: "center",
  },
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
    marginTop: 30,
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
    height: 500,
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
