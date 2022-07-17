import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  Image,
  ScrollView,
  Alert,
} from "react-native";
import R from "../../assets/R";
import Entypo from "react-native-vector-icons/Entypo";
import Ionicons from "react-native-vector-icons/Ionicons";
import Header from "../../components/Header/Header";
import { connect } from "react-redux";
import {
  addCart,
  increaseItem,
  decreaseItem,
  payToOrder,
  resetCart,
} from "../../actions/MyCartAction";
import Button from "../../components/Button";
import { ORDER_SCREEN, TABNAVIGATOR } from "../../routers/ScreenNames";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-community/async-storage";
import { showAlert, TYPE } from "../../components/DropdownAlert";
import { createBillApi } from "../../apis/Functions/users";
import { showLoading, hideLoading } from "../../actions/loadingAction";
const CheckoutView = (props) => {
  const { product, total, payToOrder, resetCart, userInfo } = props;
  const [selectedMethod, setSelectedMethod] = useState(false);
  function TotalPrice(price, tonggia) {
    return Number(price * tonggia).toLocaleString("en-US");
  }
  const navigate = useNavigation();
  const onPay = async () => {
    const arrFoods = product.cart.map((e) => {
      return { name: e.name, price: e.price, count: e.count };
    });
    const contact = {
      name: userInfo.name,
      phone: userInfo.phone,
      address: userInfo.address,
    };

    props.showLoading();
    const response = await createBillApi({
      user: userInfo._id,
      contact,
      arrFoods,
      total: parseInt(total.split(",").join("")),
      cardPayMethod: selectedMethod == "creditCard" ? true : false,
    });
    props.hideLoading();
    console.log(response.data);
    if (response.data.kq == 1) {
      showAlert(TYPE.SUCCESS, "Thông báo!", "Đặt hàng thành công!");
      navigate.navigate(TABNAVIGATOR);
      console.log("product.cart", product.cart);
      payToOrder(product.cart);
      AsyncStorage.setItem("IDBILL", response.data.data._id);
    } else {
      showAlert(TYPE.ERROR, "Thông báo!", "Đặt hàng thất bại!");
    }
  };
  const onSelectedMethod = (value) => {
    setSelectedMethod(value);
  };

  return (
    <View style={{ flex: 1, backgroundColor: R.colors.white }}>
      <Header
        title="Checkout"
        isBack={true}
        styleTitle={{
          fontSize: 22,
          textTransform: "none",
          textAlign: "left",
          paddingHorizontal: 15,
          fontWeight: "500",
        }}
      />
      <ScrollView>
        <View style={{ flex: 0.5, paddingHorizontal: 15, paddingVertical: 20 }}>
          <Text style={styles.txtGray}>Ship to</Text>
          <TouchableOpacity
            style={{
              flexDirection: "row",
              paddingVertical: 10,
              alignItems: "center",
            }}
          >
            <Entypo
              style={{ paddingRight: 10 }}
              name="location"
              size={23}
              color="black"
            />
            <Text style={styles.txt}>111 Trâu Quỳ,Gia Lâm,Hà Nội </Text>
          </TouchableOpacity>
          <Text style={[styles.txtGray, { paddingTop: 20 }]}>Thời gian</Text>
          <TouchableOpacity
            style={{
              paddingVertical: 10,
            }}
          >
            <Text style={styles.txt}>🕒 14:00 15/07/2022</Text>
          </TouchableOpacity>
        </View>
        <View style={{ flex: 2.5 }}>
          <Text
            style={[
              styles.txtGray,
              { paddingBottom: 10, paddingHorizontal: 15 },
            ]}
          >
            Mặt hàng
          </Text>
          <FlatList
            style={{ flex: 1 }}
            data={product?.cart}
            horizontal
            pagingEnabled
            scrollEnabled
            snapToAlignment="center"
            showsHorizontalScrollIndicator={false}
            keyExtractor={(item) => item.id}
            renderItem={({ item, index }) => {
              return (
                <View
                  style={{
                    flexDirection: "column",
                    paddingLeft: 15,
                    width: 130,
                  }}
                >
                  <Image
                    style={styles.imgNearmeFood}
                    source={{ uri: item.img }}
                  />
                  <Text
                    numberOfLines={1}
                    style={[styles.txt, { paddingTop: 10 }]}
                  >
                    {item.name}
                  </Text>
                  <Text style={styles.txtTotal}>
                    {TotalPrice(item.price, item.count)} đ
                  </Text>
                  <View
                    style={{
                      position: "absolute",
                      width: 20,
                      height: 20,
                      borderRadius: 20,
                      backgroundColor: R.colors.colorMain,
                      alignItems: "center",
                      justifyContent: "center",
                      right: -8,
                    }}
                  >
                    <Text
                      style={{
                        color: R.colors.white,
                        fontWeight: "600",
                      }}
                    >
                      {item.count}
                    </Text>
                  </View>
                </View>
              );
            }}
          />
          <View style={{ flex: 2.5 }}>
            <View
              style={{ flex: 1.5, paddingHorizontal: 15, paddingRight: 50 }}
            >
              <Text style={[styles.txtGray, { fontSize: 16, marginTop: 10 }]}>
                Chọn phương thức thanh toán
              </Text>

              <TouchableOpacity
                style={styles.btnChoosePayment}
                onPress={() => onSelectedMethod("creditCard")}
              >
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <Image style={styles.icon} source={R.images.iconVisa} />
                  <Text style={styles.txtPayment}>Thẻ tín dụng</Text>
                </View>
                <Text style={styles.txt}>43234 *** **** 3232</Text>
                {selectedMethod == "creditCard" && (
                  <Ionicons
                    name="checkmark-circle"
                    size={18}
                    color={R.colors.colorMain}
                    style={{ position: "absolute", right: -30 }}
                  />
                )}
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.btnChoosePayment}
                onPress={() => onSelectedMethod("Cash")}
              >
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <Image style={styles.icon} source={R.images.iconCash} />
                  <Text style={styles.txtPayment}>Cash</Text>
                </View>
                <Text style={styles.txt}>Trả tiền khi nhận hàng</Text>
                {selectedMethod == "Cash" && (
                  <Ionicons
                    name="checkmark-circle"
                    size={18}
                    color={R.colors.colorMain}
                    style={{ position: "absolute", right: -30 }}
                  />
                )}
              </TouchableOpacity>
            </View>
            <View style={{ paddingHorizontal: 15, flex: 2 }}>
              <TouchableOpacity style={styles.btnChoosePayment}>
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <Image style={styles.icon} source={R.images.iconAddCard} />
                  <Text style={styles.txtPayment}>
                    Thêm phương thức thanh toán
                  </Text>
                </View>
                <Entypo name="plus" size={24} color={R.colors.gray} />
              </TouchableOpacity>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                  paddingTop: 10,
                }}
              >
                <Text style={styles.txtweight}>Tổng tiền</Text>
                <Text style={[styles.txtTotal, { fontSize: 25 }]}>
                  {total} đ
                </Text>
              </View>

              <Button
                onPress={() => onPay()}
                disabled={selectedMethod ? false : true}
                title={"Thanh toán"}
                backgroundColor={
                  selectedMethod ? R.colors.colorMain : R.colors.gray5
                }
                containerStyle={{
                  height: 50,
                  borderRadius: 15,
                  marginTop: 20,
                }}
                txtStyle={{
                  color: "#fff",
                  fontWeight: "700",
                }}
              />
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  txt: {
    fontSize: 15,
    color: R.colors.black,
  },
  txtTotal: {
    fontSize: 16,
    color: R.colors.colorMain,
    fontWeight: "600",
  },
  txtPayment: {
    fontSize: 16,
    color: R.colors.black,
    paddingLeft: 10,
  },
  txtGray: {
    fontSize: 13,
    color: R.colors.color777,
  },
  btnChoosePayment: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 10,
  },
  btnType: {
    width: 80,
    height: 80,
    marginBottom: 10,
    borderRadius: 20,
    marginHorizontal: 15,
    backgroundColor: "#ccc",
    alignItems: "center",
    justifyContent: "center",
  },
  img: {
    width: 45,
    height: 45,
  },
  txtTitle: {
    fontSize: 22,
    fontWeight: "600",
    color: R.colors.black,
    paddingHorizontal: 15,
    paddingVertical: 20,
  },
  btnFood: {
    overflow: "hidden",
    width: 120,
    height: 120,
    borderRadius: 20,
    marginHorizontal: 15,
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 10,
  },
  txtweight: {
    fontSize: 15,
    fontWeight: "500",
    color: R.colors.black,
  },
  bg: {
    width: "100%",
    height: 150,
    resizeMode: "cover",
    marginVertical: 15,
  },
  centeredView: {
    flex: 1,
    paddingTop: 70,
    backgroundColor: R.colors.white,
  },
  modalView: {
    backgroundColor: R.colors.white,
  },
  textStyle: {
    color: R.colors.color777,
    fontSize: 16,
    textAlign: "center",
    paddingVertical: 25,
  },
  imgNearmeFood: {
    width: 110,
    height: 110,
    borderRadius: 20,
  },
  icon: {
    width: 25,
    height: 25,
  },
});

const mapStateToProps = (state) => {
  return {
    product: state.MyCartReaducer,
    userInfo: state.userReducer,
  };
};

export default connect(mapStateToProps, {
  addCart,
  increaseItem,
  decreaseItem,
  payToOrder,
  resetCart,
  showLoading,
  hideLoading,
})(CheckoutView);
