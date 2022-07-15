import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  Image,
  ImageBackground,
} from "react-native";
import R from "../../../assets/R";
import { Searchbar } from "react-native-paper";
import Entypo from "react-native-vector-icons/Entypo";
import { ButtonGroup } from "@rneui/themed";
import StarReview from "../../../components/StarReview/StarReview";
import { getWidth, toPriceVnd } from "../../../Config/Functions";
import { useNavigation } from "@react-navigation/native";
import { RESTAURANTDETAILSCREEN } from "../../../routers/ScreenNames";

const FoodBreakfast = (props) => {
  const { data } = props;
  const navigate = useNavigation();
  return (
    <FlatList
      scrollEnabled={false}
      contentContainerStyle={{ alignSelf: "flex-start", marginBottom: 100 }}
      numColumns={2}
      data={data}
      pagingEnabled
      showsHorizontalScrollIndicator={false}
      keyExtractor={(item) => item.id}
      renderItem={({ item, index }) => {
        return (
          <View style={{ flexDirection: "column", alignItems: "center" }}>
            <TouchableOpacity
              style={styles.btnFoodBreakfast}
              key={item.id}
              onPress={() =>
                navigate.navigate(RESTAURANTDETAILSCREEN, { item })
              }
            >
              <Image
                style={styles.imgFoodBreakFast}
                source={{ uri: item.img }}
              />
            </TouchableOpacity>
            <Text numberOfLines={1} style={styles.txt}>
              {item.name}
            </Text>
            <Text style={{ color: R.colors.main, fontWeight: "600" }}>
              {toPriceVnd(item.price)} đ
            </Text>
          </View>
        );
      }}
    />
  );
};

const styles = StyleSheet.create({
  btnFoodBreakfast: {
    marginHorizontal: 15,
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 10,
  },
  imgFoodBreakFast: {
    width: getWidth() / 2 - 30,
    height: 200,
    borderRadius: 10,
  },
  txt: {
    fontSize: 15,
    color: R.colors.black,
  },
});

export default FoodBreakfast;
