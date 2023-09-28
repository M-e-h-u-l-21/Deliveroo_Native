import { Image, ScrollView, Text, View } from "react-native";
import React, { useEffect, useLayoutEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  UserIcon,
  ChevronDownIcon,
  MagnifyingGlassIcon,
  AdjustmentsVerticalIcon,
} from "react-native-heroicons/outline";
import { TextInput } from "react-native";
import Categories from "../components/Categories";
import FeaturedRow from "../components/FeaturedRow";
import { client } from "../sanity";

const HomeScreen = () => {
  const navigation = useNavigation();
  const [featuredCategories, setFeaturedCategories] = useState([]);
  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);

  useEffect(() => {
    client
      .fetch(
        `
    *[_type=="featured"]{
      ...,
      restaurants[]->{
        ...,
        dishes[]->
      }
    }`
      )
      .then((data) => {
        setFeaturedCategories(data);
      });
  }, []);
  // console.log(featuredCategories);
  return (
    <SafeAreaView className="bg-gray-100 pt-5 flex-1">
      {/*header*/}
      <View className="flex-row pb-3 items-center mx-4 space-x-2">
        <Image
          source={{
            uri: "https://links.papareact.com/wru",
          }}
          className="h-7 w-7 bg-gray-300 p-4 rounded-full"
        />

        <View className="flex-1">
          <Text className="font-bold text-gray-400 text-xs justify-center">
            Deliver Now!
          </Text>
          <View className="flex-row items-end">
            <Text className="font-bold text-xl ">Current Location</Text>
            <ChevronDownIcon size={23} color="#00CCBB" />
          </View>
        </View>
        <UserIcon size={35} color="#00CCBB" />
      </View>

      {/*Search*/}
      <View className="flex-row items-center space-x-2 pb-2 mx-4 ">
        <View className="flex-row items-center space-x-2 flex-1 bg-gray-200 p-3">
          <MagnifyingGlassIcon size={20} color="#00CCBB" />
          <TextInput placeholder="Restaurants and cuisines" keyoard />
        </View>
        <AdjustmentsVerticalIcon color="#00CCBB" />
      </View>

      {/*ScrollView*/}
      <ScrollView>
        {/*Catergories*/}
        <Categories />
        {/*Featured*/}
        {featuredCategories?.map((category) => {
          return (
            <FeaturedRow
              key={category._id}
              id={category._id}
              title={category.name}
              description={category.short_description}
            />
          );
        })}
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomeScreen;
