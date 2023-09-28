import { ScrollView, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import {
  ArrowDownLeftIcon,
  ArrowRightIcon,
} from "react-native-heroicons/outline";
import RestaurantCard from "./RestaurantCard";
import { client } from "../sanity";

const FeaturedRow = ({ id, title, description }) => {
  const [restaurants, setRestaurants] = useState([]);
  useEffect(() => {
    client
      .fetch(
        `
    *[_type=="featured" && _id==$id]{
      ...,
      restaurants[]->{
        ...,
        dishes[]->,
        type->{
          name
        }
      }
    }[0]
    `,
        { id: id }
      )
      .then((data) => {
        setRestaurants(data?.restaurants);
      });
  }, []);

  console.log(restaurants);

  return (
    <View>
      <View className="m t-4 flex-row items-center justify-between px-4">
        <Text className="font-bold text-lg">{title}</Text>
        <ArrowRightIcon size={20} color="#00CCBB" />
      </View>

      <Text className="text-xs text-gray-500 px-4">{description}</Text>
      <ScrollView
        horizontal
        contentContainerStyle={{
          paddingHorizontal: 15,
        }}
        showsHorizontalScrollIndicator={false}
        className="pt-4 mb-4"
      >
        {/*Restaurant cards*/}

        {restaurants?.map((restaurant) => {
          return (
            <RestaurantCard
              key={restaurant._id}
              id={restaurant._id}
              imgUrl={restaurant.image}
              address={restaurant.address}
              title={restaurant.name}
              rating={restaurant.rating}
              genre={restaurant.type?.name}
              short_description={restaurant.short_description}
              dishes={restaurant.dishes}
              long={restaurant.long}
              lat={restaurant.lat}
            />
          );
        })}
      </ScrollView>
    </View>
  );
};

export default FeaturedRow;
