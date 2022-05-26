// import {
//   StyleSheet,
//   Text,
//   View,
//   ActivityIndicator,
//   TouchableOpacity,
// } from "react-native";
// import React, { useContext, useState, useEffect } from "react";
// import {
//   createDrawerNavigator,
//   DrawerContentScrollView,
//   DrawerItemList,
// } from "@react-navigation/drawer";
// import LocalStorage from "@react-native-async-storage/async-storage";
// import { useNavigation } from "@react-navigation/native";

// import { authentication } from "../components/firebaseConfig";
// import Dashboard from "../pages/Dashboard";
// import Profile from "../pages/Profile";
// import Trips from "../pages/Trips";

// const Drawer = createDrawerNavigator();
// const HomePageNavigation = () => {
//   const [users, setUsers] = useState("");
//   const navigation = useNavigation();
//   const [loading, setLoading] = useState(false);

//   useEffect(() => {
//     setLoading(true);
//     getUser().then(() => setLoading(false));
//   }, [users]);

//   const getUser = async () => {
//     authentication.onAuthStateChanged((user) => {
//       if (user) {
//         setUsers(user.displayName);
//       }
//     });
//   };
//   const handleLogout = async () => {
//     try {
//       await LocalStorage.removeItem("driverInfo");
//       userAuth.setUserInfo({
//         email: "",
//         id: "",
//       });
//       navigation.navigate("Login");
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   const CustomDrawer = (props) => {
//     return (
//       <View
//         style={{
//           flex: 1,
//           display: "flex",
//           justifyContent: "center",
//         }}
//       >
//         <DrawerContentScrollView
//           {...props}
//           showsVerticalScrollIndicator={false}
//         >
//           {!users ? (
//             <ActivityIndicator
//               animating={users ? false : true}
//               color="purple"
//               size="large"
//             ></ActivityIndicator>
//           ) : (
//             <>
//               <View style={[styles.drawerProfile]}>
//                 <View style={styles.profile}>
//                   <View>
//                     {/* <Text style={styles.profileName}>Sample user</Text> */}
//                     {/* <EvilIcons name="user" size={80} color="white" /> */}
//                     <Text style={styles.phoneNumber}>Hello {users}</Text>
//                   </View>
//                 </View>
//               </View>
//               <DrawerItemList {...props}></DrawerItemList>
//               <TouchableOpacity onPress={handleLogout}>
//                 <View style={{ marginLeft: 20, marginVertical: 20 }}>
//                   <Text style={styles.engVersion}>Log Out</Text>
//                 </View>
//               </TouchableOpacity>
//             </>
//           )}
//         </DrawerContentScrollView>
//       </View>
//     );
//   };
//   return (
//     <Drawer.Navigator
//       useLegacyImplementation={false}
//       defaultStatus="closed"
//       drawerContent={(props) => <CustomDrawer {...props}></CustomDrawer>}
//       screenOptions={{
//         headerTintColor: "white",
//       }}
//     >
//       <Drawer.Screen
//         name="Dashboards"
//         component={Dashboard}
//         options={{
//           headerStyle: { backgroundColor: "purple" },
//           title: () => <Text style={styles.engVersion}>Dashboard</Text>,
//           headerTitle: "Dashboard",
//         }}
//       ></Drawer.Screen>

//       <Drawer.Screen
//         name="Profile"
//         component={Profile}
//         options={{
//           headerStyle: { backgroundColor: "purple" },
//           title: () => (
//             <View style={styles.listContainer}>
//               <Text style={styles.engVersion}>Profile</Text>
//             </View>
//           ),
//           headerTitle: "Profile",
//         }}
//       ></Drawer.Screen>

//       <Drawer.Screen
//         name="Trips"
//         options={{
//           headerStyle: { backgroundColor: "purple" },
//           title: () => <Text style={styles.engVersion}>Trips</Text>,
//           headerTitle: "Trips",
//         }}
//         component={Trips}
//       ></Drawer.Screen>
//       {/* <Drawer.Screen
//         name="Current Trip"
//         component={CurrentTrip}
//         options={{
//           headerStyle: { backgroundColor: "purple" },
//           title: () => <Text style={styles.engVersion}>Current Trip</Text>,
//           headerTitle: "Current Trip",
//         }}
//       ></Drawer.Screen> */}
//     </Drawer.Navigator>
//   );
// };

// export default HomePageNavigation;

// const styles = StyleSheet.create({
//   container: {
//     marginTop: 25,
//   },
//   profile: {
//     padding: 10,
//     alignItems: "center",
//     marginTop: -5,
//   },

//   profileName: {
//     color: "white",
//     fontSize: 25,
//     textTransform: "capitalize",
//     textAlign: "center",
//   },
//   phoneNumber: {
//     color: "white",
//     fontSize: 19,
//     textAlign: "center",
//   },
//   drawerProfile: {
//     backgroundColor: "purple",
//     height: 200,
//     marginTop: -10,
//     justifyContent: "center",
//     alignItems: "center",
//     padding: 10,
//     flex: 1,
//   },
//   engVersion: {
//     color: "black",
//     fontSize: 18,
//   },
// });
