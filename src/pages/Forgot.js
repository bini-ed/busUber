// import { StatusBar } from 'expo-status-bar';
// import React from 'react';
// import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
// import { Input, NativeBaseProvider, Button, Icon, Box, Image, AspectRatio } from 'native-base';
// import { FontAwesome5 } from '@expo/vector-icons';
// import { useNavigation } from '@react-navigation/native';

// function Login() {
//     const navigation = useNavigation();
//   return (
//     <View style={styles.container}>
//       <View style={styles.Middle}>
//       <Image style={styles.image} source={require("./Logo1.png")} />
//         <Text style={styles.LoginText}>Forgot Password?</Text>
//       </View>
//       {/* Username or Email Input Field */}
//       <View style={styles.buttonStyle}>

//         <View style={styles.emailInput}>
//           <Input
//             InputLeftElement={
//               <Icon
//                 as={<FontAwesome5 name="user-secret" />}
//                 size="sm"
//                 m={2}
//                 _light={{
//                   color: "black",
//                 }}
//                 _dark={{
//                   color: "gray.300",
//                 }}
//               />
//             }
//             variant="outline"
//             placeholder="Enter Email"
//             _light={{
//               placeholderTextColor: "blueGray.400",
//             }}
//             _dark={{
//               placeholderTextColor: "blueGray.50",
//             }}

//           />
//         </View>
//       </View>

//       {/* Button */}
//       <View style={styles.buttonStyle}>
//         <Button style={styles.buttonDesign}>
//            <Text style= {{color: 'black'}}> Retrieve Password </Text>
//         </Button>
//       </View>

//       {/* Line */}
//       <View style={styles.lineStyle}>
//         <View style={{flex: 1, height: 1, backgroundColor: '#EDB841'}} />
//         <View>
//           <Text style={{width: 50, textAlign: 'center', color: "white"}}>Or</Text>
//         </View>
//         <View style={{flex: 1, height: 1, backgroundColor: '#EDB841'}} />
//       </View>
//       <View style={styles.text2}>
//         <Text style={{color: "white"}}>Don't have an account? </Text>
//         <TouchableOpacity onPress={() => navigation.navigate("Signup")} ><Text style={styles.signupText}> Sign up</Text></TouchableOpacity>
//       </View>
//       <View style={styles.text2}>
//         <Text style={{color: "white"}}>Already have an account? </Text>
//         <TouchableOpacity onPress={() => navigation.navigate("Login")} ><Text style={styles.signupText}> Log in </Text></TouchableOpacity>
//       </View>
//     </View>
//   );
// }

// export default () => {
//   return (
//     <NativeBaseProvider>

//         <Login />

//     </NativeBaseProvider>
//   )
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#1873AA',
//   },
//   LoginText: {
//     fontSize:30,
//     fontWeight:'bold',
//     color: "#EDB841",
//     marginTop: 25,
//   },
//   Middle:{
//     alignItems:'center',
//     justifyContent:'center',
//   },
//   text2:{
//     flexDirection:'row',
//     justifyContent:'center',
//     paddingTop:5,
//     marginBottom: 10,
//   },
//   image: {
//     marginTop: 100,
//     width: 150,
//     height: 150,
//   },
//   signupText:{
//     fontWeight:'bold',
//     color:'#EDB841',

//   },
//   emailField:{
//     marginTop:30,
//     marginLeft:15,
//   },
//   emailInput:{
//     marginTop:10,
//     marginRight:5,
//     backgroundColor: 'white',

//   },
//   buttonStyle:{
//     marginTop:30,
//     marginLeft:15,
//     marginRight:15
//   },
//   buttonStyleX:{
//     marginTop:12,
//     marginLeft:15,
//     marginRight:15
//   },
//   buttonDesign:{
//     backgroundColor:'#BBE5FB',
//   },
//   lineStyle:{
//     flexDirection:'row',
//     marginTop:30,
//     marginLeft:15,
//     marginRight:15,
//     marginBottom: 5,
//     alignItems:'center'
//   },
//   imageStyle:{
//     width:80,
//     height:80,
//     marginLeft:20,
//   },
//   boxStyle:{
//     flexDirection:'row',
//     marginTop:30,
//     marginLeft:15,
//     marginRight:15,
//     justifyContent:'space-around'
//   },
// });
