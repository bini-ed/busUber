import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { MaterialIcons } from "@expo/vector-icons";

import Dashboard from "../pages/Dashboard";
import Profile from "../pages/Profile";
import Trips from "../pages/Trips";

const Tab = createBottomTabNavigator();

const MainPageNavigation = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarInactiveTintColor: "grey",
        tabBarActiveTintColor: "purple",
        tabBarLabelStyle: {
          fontSize: 15,
        },
      }}
    >
      <Tab.Screen
        name="HomePage"
        component={Dashboard}
        options={{
          tabBarIcon: ({ focused, color, size }) => {
            const icon = "home";
            return <MaterialIcons name={icon} size={25} color={color} />;
          },
        }}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarIcon: ({ focused, color, size }) => {
            const icon = "person";
            return <MaterialIcons name={icon} size={25} color={color} />;
          },
        }}
      />

      <Tab.Screen
        name="Trips"
        component={Trips}
        options={{
          tabBarIcon: ({ focused, color, size }) => {
            const icon = "bus-alert";
            return <MaterialIcons name={icon} size={25} color={color} />;
          },
        }}
      />
    </Tab.Navigator>
  );
};

export default MainPageNavigation;

const styles = StyleSheet.create({});
