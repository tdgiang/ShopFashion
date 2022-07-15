import React, { useState, useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import {
  View,
  Text,
  Image,
  StyleSheet,
  StatusBar,
  Animated,
  FlatList,
  TouchableOpacity,
  ImageBackground,
  ScrollView,
} from "react-native";
import R from "../../../assets/R";
import {
  FORGOTPASSSCREEN,
  LOGINSCREEN,
  TABNAVIGATOR,
  MY_CART_SCREEN,
} from "../../../routers/ScreenNames";

import { useNavigation } from "@react-navigation/native";
import Ionicons from "react-native-vector-icons/Ionicons";
import StarReview from "../../../components/StarReview/StarReview";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { toPriceVnd } from "../../../Config/Functions";
import SimpleLineIcons from "react-native-vector-icons/SimpleLineIcons";
import {
  addCart,
  decreaseItem,
  increaseItem,
} from "../../../actions/MyCartAction";
import { connect } from "react-redux";
import DetailComment from "./MaterialTopTab/MaterialTopTabView";
import { showAlert, TYPE } from "../../../components/DropdownAlert";

const Tab = createMaterialTopTabNavigator();
const RestaurantDetailsView = (props) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { dataRestaurant, toggleHeart, favotiteList } = props;

  const navigate = useNavigation();
  const [size, setSize] = useState("S");
  const [isOrder, setOrder] = useState(false);
  console.log("favotiteList");
  return (
    <>
      <StatusBar barStyle="light-content" />
      <View style={{ flex: 1, backgroundColor: R.colors.white }}>
        <View
          style={{
            flexDirection: "row",
            paddingHorizontal: 10,
            zIndex: 1,
            position: "absolute",
            justifyContent: "space-between",
            alignItems: "center",
            width: "100%",
          }}
        >
          <TouchableOpacity
            style={styles.iconStyle}
            onPress={() => navigate.goBack()}
          >
            <Ionicons name="chevron-back-outline" size={30} color={"white"} />
          </TouchableOpacity>
          <View style={{ flexDirection: "row" }}>
            <TouchableOpacity
              style={styles.iconStyle}
              onPress={() => toggleHeart(dataRestaurant)}
            >
              <Ionicons
                name="heart"
                size={30}
                color={
                  favotiteList.findIndex((e) => e.id == dataRestaurant.id) > -1
                    ? "red"
                    : "white"
                }
              />
            </TouchableOpacity>
            <TouchableOpacity style={styles.iconStyle}>
              <Ionicons
                name="ios-share-social-outline"
                size={30}
                color={"white"}
              />
            </TouchableOpacity>
          </View>
        </View>
        <ScrollView
          contentContainerStyle={{
            flex: 1,
          }}
        >
          <Image
            resizeMode="stretch"
            source={{ uri: dataRestaurant.img }}
            style={styles.banner}
          />
          <View style={{ paddingHorizontal: 15 }}>
            <Text style={[styles.txtTitle, { marginVertical: 5 }]}>
              {dataRestaurant.name}
            </Text>
            <Text
              style={{
                fontSize: 16,
                color: R.colors.main,
              }}
            >
              {toPriceVnd(dataRestaurant.price)} đ
            </Text>

            <View style={{ paddingVertical: 5, flexDirection: "row" }}>
              <StarReview rate={dataRestaurant.rate} />
              <Text style={styles.txtGray}>
                {" "}
                · {dataRestaurant.review} Reviews
              </Text>
            </View>
            <View
              style={{
                marginTop: 10,
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <Text
                style={{
                  fontSize: 18,
                }}
              >
                SIZE:
              </Text>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  marginLeft: 20,
                }}
              >
                <TouchableOpacity
                  onPress={() => setSize("S")}
                  style={[
                    styles.box,
                    size == "S"
                      ? { backgroundColor: R.colors.colorMain }
                      : null,
                  ]}
                >
                  <Text
                    style={{
                      fontSize: 20,
                      fontWeight: "600",
                      color: size == "S" ? "white" : "black",
                    }}
                  >
                    S
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => setSize("L")}
                  style={[
                    styles.box,
                    size == "L"
                      ? { backgroundColor: R.colors.colorMain }
                      : null,
                  ]}
                >
                  <Text
                    style={{
                      fontSize: 20,
                      fontWeight: "600",
                      color: size == "L" ? "white" : "black",
                    }}
                  >
                    L
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => setSize("M")}
                  style={[
                    styles.box,
                    size == "M"
                      ? { backgroundColor: R.colors.colorMain }
                      : null,
                  ]}
                >
                  <Text
                    style={{
                      fontSize: 20,
                      fontWeight: "600",
                      color: size == "M" ? "white" : "black",
                    }}
                  >
                    M
                  </Text>
                </TouchableOpacity>
              </View>
              <View
                style={{
                  flex: 1,
                  alignItems: "flex-end",
                }}
              >
                <TouchableOpacity
                  onPress={() => {
                    if (isOrder) {
                      showAlert(
                        TYPE.WARN,
                        "Thông báo!",
                        "Mặt hàng này đã có trong giỏ hàng!"
                      );
                    } else {
                      setOrder(true);
                      props.addCart({ ...dataRestaurant, size });
                    }
                  }}
                >
                  <Ionicons
                    name="add-circle"
                    size={40}
                    color={R.colors.colorMain}
                  />
                </TouchableOpacity>
              </View>
            </View>
            <Text
              style={{
                fontSize: 18,
                fontWeight: "600",
                marginTop: 10,
                marginBottom: 5,
              }}
            >
              Thông tin sản phẩm
            </Text>
            <Text
              style={{
                fontSize: 16,
              }}
            >
              {`Thiết kế váy của Lep' dành cho những cô gái muốn đẹp muốn tươi,muốn yêu đời rực rỡ. Thanh lịch những vẫn quyến rũ! \n- Chất liệu: gântrơn \n- Chiều dài áo: 115cm \n- Dáng áo: trench coat \n- Size váy:\nSize S: Vòng 1 dưới 83, Vòng 2 dưới 64. \nSize M: Vòng 1 82-86, Vòng 264-68. \nSize L: Vòng 1 86-90, Vòng 2 68-74.`}
            </Text>
          </View>
          {props.product.cart?.length > 0 && (
            <TouchableOpacity
              style={styles.popup}
              onPress={() => navigate.navigate(MY_CART_SCREEN)}
            >
              <SimpleLineIcons
                style={{ top: 8 }}
                name="handbag"
                size={24}
                color={R.colors.white}
              />
              <View
                style={{
                  backgroundColor: R.colors.white,
                  alignSelf: "center",
                  borderRadius: 20,
                  width: 18,
                  height: 18,
                  top: -5,
                  right: -10,
                }}
              >
                <Text style={styles.txtCountPopup}>
                  {props.product.cart.length}
                </Text>
              </View>
            </TouchableOpacity>
          )}
        </ScrollView>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  banner: {
    width: "100%",
    height: 400,
  },
  iconStyle: {
    top: 50,
    paddingHorizontal: 5,
  },
  txtGray: {
    fontSize: 13,
    color: R.colors.color777,
  },
  txtTitle: {
    fontSize: 22,
    fontWeight: "600",
    color: R.colors.black,
  },
  box: {
    borderWidth: 1,
    borderColor: R.colors.borderGray,
    height: 35,
    width: 30,
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 10,
  },

  popup: {
    width: 70,
    height: 70,
    borderRadius: 70,
    backgroundColor: R.colors.colorMain,
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    right: 15,
    bottom: 100,
    alignSelf: "center",
  },
  txtCountPopup: {
    textAlign: "center",
    color: R.colors.colorMain,
  },
});

const mapStateToProps = (state) => {
  return {
    product: state.MyCartReaducer,
  };
};

export default connect(mapStateToProps, {
  addCart,
  increaseItem,
  decreaseItem,
})(RestaurantDetailsView);
