import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect } from "react";
import { DrawerActions, useNavigation } from "@react-navigation/native";

const Trips = () => {
  const navigation = useNavigation();
  useEffect(() => {
    // navigation.dispatch(DrawerActions.closeDrawer());
  });
  return (
    <ScrollView style={styles.container}>
      <View style={styles.box}>
        <View>
          <Text style={styles.busName}>#4-Bus 1</Text>
          <Text style={styles.bustDetail}>Bus Stop: Alazizya</Text>
          <Text style={styles.bustDetail}>Gate: 1</Text>
          <Text style={styles.bustDetail}>Uni section: Alzahir</Text>
          <Text style={styles.bustDetail}>
            0.20 meter away from the bus stop 5
          </Text>
          <Text style={styles.bustDetail}>Count time to arive</Text>
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate("Bus")}
          >
            <Text style={styles.btnText}>View Map</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.dot}></View>
      </View>
      <View style={styles.box}>
        <Text style={styles.busName}>#3-Bus 1</Text>
        <Text style={styles.bustDetail}>Bus Stop: Alazizya</Text>
        <Text style={styles.bustDetail}>Gate: 3</Text>
        <Text style={styles.bustDetail}>Uni section: Alnuzha</Text>
        <Text style={styles.bustDetail}>
          0.20 meter away from the bus stop 5
        </Text>
        <Text style={styles.bustDetail}>Count time to arive</Text>
      </View>
      <View style={styles.box}>
        <Text style={styles.busName}>#2-Bus 1</Text>
        <Text style={styles.bustDetail}>Bus Stop: Alazizya</Text>
        <Text style={styles.bustDetail}>Gate: 1</Text>
        <Text style={styles.bustDetail}>Uni section: Alzahir</Text>
        <Text style={styles.bustDetail}>
          0.20 meter away from the bus stop 5
        </Text>
        <Text style={styles.bustDetail}>Count time to arive</Text>
      </View>
      <View style={styles.box}>
        <Text style={styles.busName}>#1- Bus 1</Text>
        <Text style={styles.bustDetail}>Bus Stop: Alazizya</Text>
        <Text style={styles.bustDetail}>Gate: 1</Text>
        <Text style={styles.bustDetail}>Uni section: Alzahir</Text>
        <Text style={styles.bustDetail}>
          0.20 meter away from the bus stop 5
        </Text>
        <Text style={styles.bustDetail}>Count time to arive</Text>
      </View>
    </ScrollView>
  );
};

export default Trips;

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flex: 1,
    padding: 10,
    marginBottom: 10,
  },
  box: {
    display: "flex",
    flexDirection: "column",
    backgroundColor: "#DFDFDE",
    padding: 10,
    height: 200,
    margin: 5,
  },
  busName: {
    fontSize: 18,
  },
  button: {
    backgroundColor: "#65C18C",
    width: "40%",
    alignSelf: "center",
    padding: 10,
    marginTop: 10,
  },
  btnText: {
    color: "white",
    fontSize: 18,
    textAlign: "center",
  },
  dot: {
    width: 25,
    height: 25,
    backgroundColor: "#65C18C",
    borderRadius: 20,
    position: "absolute",
    right: 10,
    top: 10,
  },
});
