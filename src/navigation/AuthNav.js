import React from "react";

import { createStackNavigator } from "@react-navigation/stack";
import Login from "../pages/Login";
import SignUp from "../pages/SignUp";
import Forgot from "../pages/Forgot";

const Stack = createStackNavigator();

function AuthNav() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Signup" component={SignUp} />
      {/* <Stack.Screen name="Forgot" component={Forgot} /> */}
    </Stack.Navigator>
  );
}

export default AuthNav;
