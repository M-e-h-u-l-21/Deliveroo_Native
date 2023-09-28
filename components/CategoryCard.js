import { Image, StyleSheet, Text, View } from "react-native";
import React from "react";
import { TouchableOpacity } from "react-native";

const CategoryCard = ({ imgUrl, title }) => {
  return (
    <TouchableOpacity className="relative mr-2">
      <Image
        source={{ uri: imgUrl }}
        className="h-20 w-20 rounded object-scale-down"
      />
      <Text className="absolute bottom-1 left-1 text-white font-bold drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)]">
        {title}
      </Text>
    </TouchableOpacity>
  );
};

export default CategoryCard;
