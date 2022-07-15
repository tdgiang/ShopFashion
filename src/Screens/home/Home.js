import React, { useState } from "react";
import R from "../../assets/R";
import HomeView from "./HomeView";
import { useNavigation } from "@react-navigation/native";
import { LIST_PRODUCT } from "../../routers/ScreenNames";
import { FoodTypeData } from "./DataFake";

const Home = (props) => {
  const navigate = useNavigation();
  const [searchQuery, setSearchQuery] = React.useState("");
  const onChangeSearch = (query) => setSearchQuery(query);
  const [selectedFoodType, setSelectedFoodType] = useState(null);
  const OnChangFoodType = (itemFoodType) => {
    setSelectedFoodType(itemFoodType);
    navigate.navigate(LIST_PRODUCT, { data: itemFoodType });
  };

  return (
    <HomeView
      FoodTypeData={FoodTypeData}
      searchQuery={searchQuery}
      onChangeSearch={onChangeSearch}
      selectedFoodType={selectedFoodType}
      OnChangFoodType={OnChangFoodType}
    />
  );
};

export default Home;
