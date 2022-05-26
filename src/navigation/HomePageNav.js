import React, { useContext } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { SafeAreaView } from "react-native-safe-area-context";

import AuthNav from "./AuthNav";
import MainPageNavigation from "./MainPageNavigation";

const Stack = createStackNavigator();

const HomePageNav = () => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Auth" component={AuthNav} />
        <Stack.Screen name="Home" component={MainPageNavigation} />
      </Stack.Navigator>
    </SafeAreaView>
  );
};

export default HomePageNav;
