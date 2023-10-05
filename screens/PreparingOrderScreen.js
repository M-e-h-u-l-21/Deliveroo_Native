import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import React, { useEffect } from "react";
import * as Animatable from "react-native-animatable";
import LottieView from "lottie-react-native";
import FastImage from "react-native-fast-image";
import * as Progress from "react-native-progress";
import { useNavigation } from "@react-navigation/native";

const PreparingOrderScreen = () => {
  const navigation = useNavigation();
  useEffect(()=>{
    setTimeout(()=>{
      navigation.navigate("Delivery")
    },4000);
  },[])
  return (
    <SafeAreaView className="bg-[#00CCBB] flex-1 justify-center items-center">
      <Animatable.Image
        source={require("../assets/anim2.gif")}
        iterationCount={1}
        animation="slideInUp"
        className="w-80 h-80"
      />

      <Animatable.Text
        animation="slideInUp"
        iterationCount={1}
        className="text-lg my-10 text-white font-bold text-center"
      >
        Waiting for Restaurant to accept your order
      </Animatable.Text>
      <Progress.CircleSnail size={60} color="white" fill="#000000" borderColor="white" thickness={5} indeterminate={true} />
    </SafeAreaView>
  );
};

export default PreparingOrderScreen;

