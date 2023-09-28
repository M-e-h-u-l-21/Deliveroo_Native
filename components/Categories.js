import { ScrollView, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import CategoryCard from "./CategoryCard";
import { client, urlFor } from "../sanity";
import { createNavigatorFactory } from "@react-navigation/native";
const Categories = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    client
      .fetch(
        `
    *[_type=='category']`
      )
      .then((data) => {
        setCategories(data);
      });
  }, []);

  return (
    <ScrollView
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={{
        paddingHorizontal: 15,
        paddingTop: 10,
        paddingBottom: 10,
      }}
      horizontal
    >

      {categories.map((category)=>{
        return(
          <CategoryCard
          key={category._id}
          imgUrl={urlFor(category.image).width(200).url()}
          title={category.name}
          />
        )
      })}
    </ScrollView>
  );
};

export default Categories;
