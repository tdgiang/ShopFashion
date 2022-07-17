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
import R from "../../assets/R";
import { getWidth, toPriceVnd } from "../../Config/Functions";
import { useNavigation } from "@react-navigation/native";
import { RESTAURANTDETAILSCREEN } from "../../routers/ScreenNames";
import Header from "../../components/Header/Header";

const ListProductView = (props) => {
  const { data, name } = props;
  const navigate = useNavigation();
  return (
    <View
      style={{
        flex: 1,
      }}
    >
      <Header isBack={true} title={`Sản phẩm ${name}`} />
      <View
        style={{
          flex: 1,
          paddingTop: 10,
        }}
      >
        <FlatList
          showsVerticalScrollIndicator={false}
          numColumns={2}
          data={data}
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item) => item.id}
          renderItem={({ item, index }) => {
            return (
              <View
                style={{
                  flexDirection: "column",
                  alignItems: "center",
                  marginBottom: 10,
                }}
              >
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
                <Text
                  style={{
                    color: R.colors.main,
                    fontWeight: "600",
                  }}
                >
                  {toPriceVnd(item.price)} đ
                </Text>
              </View>
            );
          }}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  btnFoodBreakfast: {
    marginHorizontal: 15,
    alignItems: "center",
    justifyContent: "center",
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

export default ListProductView;
