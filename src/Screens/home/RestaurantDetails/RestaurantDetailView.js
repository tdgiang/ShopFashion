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
import { toPriceVnd, getWidth } from "../../../Config/Functions";
import SimpleLineIcons from "react-native-vector-icons/SimpleLineIcons";
import {
  addCart,
  decreaseItem,
  increaseItem,
} from "../../../actions/MyCartAction";
import { connect } from "react-redux";
import DetailComment from "./MaterialTopTab/MaterialTopTabView";
import { showAlert, TYPE } from "../../../components/DropdownAlert";

const reviewContent = [
  {
    id: 1,
    name: "Garnet Bit",
    rate: 5,
    avt: R.images.avtNu,
    time: "Yesterday 9:28",
    content:
      "I'm happy very good very good, understand your problem. There is no good support for nested ScrollViews and FlatLists in RN and your setup must already be spamming you warnings.",
    img1: "https://cdn.lep.vn//2022/06/images/products/1656399176652-MAXIJENN-3-800x800.jpeg",
    img2: "https://cdn.lep.vn//2022/05/images/products/1652781254962-A82A2575-800x800.jpeg",
  },
  {
    id: 2,
    name: "Garnet Bit",
    rate: 5,
    avt: R.images.avtNam,
    time: "Yesterday 9:28",
    content:
      "I'm happy very good very good, understand your problem. There is no good support for nested ScrollViews and FlatLists in RN and your setup must already be spamming you warnings.",
    img1: "https://cdn.lep.vn//2022/06/images/products/1656399176652-MAXIJENN-3-800x800.jpeg",
    img2: "https://cdn.lep.vn//2022/03/images/products/1647527709988-_DSC9545-300x300.jpeg",
  },
];
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
  const [textShown, setTextShown] = useState(false);
  const [lengthMore, setLengthMore] = useState(false);
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
          style={{
            flex: 1,
          }}
          showsVerticalScrollIndicator={false}
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
              {dataRestaurant.description}
            </Text>
            <Text
              style={{
                fontSize: 18,
                fontWeight: "600",
                marginTop: 20,
              }}
            >
              Nhận xét
            </Text>

            {reviewContent.map((item) => (
              <View
                style={{
                  backgroundColor: R.colors.white,
                  flexDirection: "column",
                  paddingVertical: 15,
                  paddingHorizontal: 15,
                  width: getWidth() - 20,
                }}
              >
                <View
                  style={{
                    flex: 1,
                    flexDirection: "row",
                    alignItems: "center",
                  }}
                >
                  <View style={{ flex: 1, flexDirection: "row" }}>
                    <Image style={styles.avt} source={item.avt} />
                    <View
                      style={{
                        flex: 1,
                        justifyContent: "space-around",
                        paddingHorizontal: 10,
                      }}
                    >
                      <Text>{item.name}</Text>
                      <StarReview rate={item.rate} hide={true} />
                    </View>
                  </View>
                  <Text style={styles.txtGray}>{item.time}</Text>
                </View>
                <View style={{ flex: 1, paddingVertical: 10 }}>
                  <Text
                    style={styles.txt}
                    numberOfLines={textShown ? undefined : 3}
                  >
                    {item.content}
                  </Text>

                  {lengthMore ? (
                    <Text
                      onPress={toggleNumberOfLines}
                      style={[styles.txtweight, { color: R.colors.colorMain }]}
                    >
                      {textShown ? "Read less" : "Read more"}
                    </Text>
                  ) : null}
                </View>
                <View style={{ flex: 1, flexDirection: "row" }}>
                  <Image
                    style={styles.imgFoodreview}
                    source={{ uri: item.img1 }}
                  />
                  <Image
                    style={styles.imgFoodreview}
                    source={{ uri: item.img2 }}
                  />
                </View>
              </View>
            ))}
            <View style={{ height: 30 }} />
          </View>
        </ScrollView>
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
  imgNearmeFood: {
    width: 90,
    height: 90,
    borderRadius: 20,
  },
  txt: {
    fontSize: 15,
    color: R.colors.black,
    lineHeight: 22,
  },
  txtInfo: {
    fontSize: 16,
    color: R.colors.black,
    fontWeight: "500",
  },
  avt: {
    width: 50,
    height: 50,
    borderRadius: 50,
  },
  txtweight: {
    fontSize: 15,
    fontWeight: "600",
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
  },
  txtGray: {
    fontSize: 13,
    color: R.colors.color777,
  },
  txtPrice: {
    fontSize: 15,
    fontWeight: "600",
    color: R.colors.colorMain,
  },
  imgFoodreview: {
    width: 60,
    height: 60,
    marginHorizontal: 5,
    borderRadius: 10,
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
