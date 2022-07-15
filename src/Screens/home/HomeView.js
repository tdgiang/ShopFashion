import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  Image,
  ImageBackground,
  Modal,
} from "react-native";
import ModalEnableLocation from "./SmallComponents/ModalEnableLocationComponent";
import R from "../../assets/R";
import { Searchbar } from "react-native-paper";
import Entypo from "react-native-vector-icons/Entypo";
import Ionicons from "react-native-vector-icons/Ionicons";
import { ButtonGroup } from "@rneui/themed";
import { getWidth } from "../../Config/Functions";
import StarReview from "../../components/StarReview/StarReview";
import FoodMenu from "./SmallComponents/FoodMenu";
import FoodNearMe from "./SmallComponents/FoodNearMe";
import FoodBreakfast from "./SmallComponents/FoodBreakFast";
import Button from "../../components/Button";
import Header from "../../components/Header/Header";
import { connect } from "react-redux";
import { increase, decrease } from "../../actions/CountAction";

import Banner from "./Banner";

const ListProduct = [
  {
    id: 10000021,
    type: "Burgers",
    img: "https://cdn.lep.vn//2022/05/images/products/1652781254962-A82A2575-800x800.jpeg",
    name: "Váy Cổ V Ly",
    price: 450000,
    address: "13 Street 47 W 13th St ,NY",
    time: 10,
    km: 2,
    rate: 3.6,
    review: 1000,
    open: "7:00 - 21:00",
  },
  {
    id: 10000022,
    type: "Burgers",
    img: "https://cdn.lep.vn//2022/06/images/products/1656399176652-MAXIJENN-3-800x800.jpeg",
    price: 500000,
    name: "Váy Maxi Jenn - Đỏ Cam",
    address: "13 Street 47 W 13th St ,NY",
    time: 10,
    km: 2,
    rate: 3.9,
    review: 1000,
    open: "7:00 - 21:00",
  },
  {
    id: 10000023,
    type: "Burgers",
    img: "https://cdn.lep.vn//2022/03/images/products/1647538267012-IMG_2578-800x800.jpeg",
    name: "Váy nơ cổ tùng xòe",
    price: 600000,
    address: "13 Street 47 W 13th St ,NY",
    time: 10,
    km: 2,
    rate: 4.6,
    review: 1000,
    open: "7:00 - 21:00",
  },
  {
    id: 10000024,
    type: "Burgers",
    img: "https://cdn.lep.vn//2022/03/images/products/1647527709988-_DSC9545-300x300.jpeg",
    name: "Áo Khoác Lệch Tà",
    price: 1450000,
    address: "13 Street 47 W 13th St ,NY",
    time: 10,
    km: 2,
    rate: 4.1,
    review: 1000,
    open: "7:00 - 21:00",
  },
  {
    id: 10000025,
    type: "Burgers",
    img: "https://cdn.lep.vn//2022/07/images/products/1656856238386-IMG_5230-800x800.jpeg",
    name: "Váy cổ tròn nhún eo",
    price: 790000,
    address: "13 Street 47 W 13th St ,NY",
    time: 10,
    km: 2,
    rate: 4.0,
    review: 1000,
    open: "7:00 - 21:00",
  },
  {
    id: 10000026,
    type: "Burgers",
    img: "https://cdn.lep.vn//2022/07/images/products/1657089641385-1VA02018HO-03-800x800.jpeg",
    name: "Váy wrap tùng xoè ",
    price: 595000,
    address: "13 Street 47 W 13th St ,NY",
    time: 10,
    km: 2,
    rate: 4.6,
    review: 1000,
    open: "7:00 - 21:00",
  },
];

const HomeView = (props) => {
  const historySearch = [
    {
      id: 1,
      name: "Váy xoè",
    },
    {
      id: 2,
      name: "Chân váy",
    },
  ];

  const {
    FoodTypeData,
    searchQuery,
    onChangeSearch,
    selectedFoodType,
    OnChangFoodType,
  } = props;
  const menuFood = FoodTypeData[1].menuFood;
  const [modalSeacrh, setModalSearch] = useState(false);
  const [search, setSearch] = useState("");
  const [filterData, setfilterData] = useState([]);
  const [masterData, setmasterData] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      setmasterData(menuFood);
    };
    fetchData();
  }, []);
  const serachFilter = (text) => {
    let matches = [];
    if (text.length > 0) {
      matches = masterData.filter((i) => {
        const regax = new RegExp(`${text}`, "gi");
        return i.type.match(regax);
      });
    }

    setfilterData(matches);
    setSearch(text);
  };
  return (
    <View style={{ flex: 1, backgroundColor: R.colors.white }}>
      <View style={{ flex: 1, backgroundColor: R.colors.white }}>
        {/* <ModalEnableLocation /> */}
        <View>
          <Button
            title={"Search"}
            backgroundColor={R.colors.gray5}
            containerStyle={{
              height: 50,
              marginHorizontal: 15,
              borderRadius: 15,
              alignItems: "flex-start",
              marginTop: 70,
            }}
            txtStyle={{
              color: R.colors.color777,
              fontWeight: "400",
              left: 55,
            }}
            isIcon={true}
            iconName={"md-search-outline"}
            onPress={() => setModalSearch(true)}
          />
          <Modal animationType="fade" transparent={false} visible={modalSeacrh}>
            <View style={styles.centeredView}>
              <View style={{ marginHorizontal: 15, marginBottom: 15 }}>
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <TouchableOpacity
                    style={{ width: 35, height: 30 }}
                    onPress={() => setModalSearch(!modalSeacrh)}
                  >
                    <Ionicons
                      name="chevron-back-outline"
                      size={26}
                      color="black"
                    />
                  </TouchableOpacity>
                  <Searchbar
                    placeholder="Nhập từ khoá"
                    // onChangeText={(text) => serachFilter(text)}
                    value={search}
                    style={{
                      width: 315,
                      marginLeft: 10,
                      backgroundColor: R.colors.gray5,
                      borderWidth: 0.1,
                      height: 50,
                      borderRadius: 15,
                      shadowColor: "#000",
                      shadowOffset: {
                        width: 0,
                        height: 2,
                      },
                      shadowOpacity: 0.25,
                      shadowRadius: 3.84,
                    }}
                  />
                </View>

                {search ? (
                  <FlatList
                    style={{ marginTop: 10 }}
                    data={filterData}
                    renderItem={({ item }) => {
                      return (
                        <View
                          style={{
                            marginVertical: 5,
                            alignItems: "center",
                          }}
                        >
                          <Text style={styles.txtSearch}>{item.type}</Text>
                        </View>
                      );
                    }}
                    showsVerticalScrollIndicator={false}
                    keyExtractor={(item) => item.id}
                  />
                ) : (
                  <View>
                    <View
                      style={{
                        flexDirection: "row",
                        justifyContent: "space-between",
                        paddingVertical: 15,
                      }}
                    >
                      <Text style={styles.txtGray}>🕒 Lịch sử tìm kiếm</Text>
                      <TouchableOpacity>
                        <Text style={[styles.txtGray, { fontSize: 15 }]}>
                          Xoá hết
                        </Text>
                      </TouchableOpacity>
                    </View>
                    <FlatList
                      scrollEnabled={false}
                      data={historySearch}
                      pagingEnabled
                      showsHorizontalScrollIndicator={false}
                      keyExtractor={(item) => item.id}
                      renderItem={({ item, index }) => {
                        return (
                          <View
                            style={{
                              flexDirection: "row",
                              alignItems: "center",
                              justifyContent: "space-between",
                            }}
                          >
                            <TouchableOpacity>
                              <Text
                                style={[
                                  styles.txt,
                                  { paddingVertical: 10, fontWeight: "300" },
                                ]}
                              >
                                {item.name}
                              </Text>
                            </TouchableOpacity>
                            <TouchableOpacity>
                              <Ionicons
                                style={{ color: R.colors.color777 }}
                                name="close-outline"
                                size={23}
                                color="black"
                              />
                            </TouchableOpacity>
                          </View>
                        );
                      }}
                    />
                  </View>
                )}
              </View>
            </View>
          </Modal>

          <ScrollView showsVerticalScrollIndicator={false}>
            <TouchableOpacity
              style={{
                flexDirection: "row",
                paddingHorizontal: 15,
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
              <Text style={styles.txt}>111 Trâu Quỳ,Gia Lâm,Hà Nội</Text>
            </TouchableOpacity>

            <Banner />

            <FlatList
              data={FoodTypeData}
              horizontal
              pagingEnabled
              scrollEnabled
              snapToAlignment="center"
              showsHorizontalScrollIndicator={false}
              keyExtractor={(item) => item.id}
              renderItem={({ item, index }) => {
                return (
                  <View
                    style={{ flexDirection: "column", alignItems: "center" }}
                  >
                    <TouchableOpacity
                      style={[
                        styles.btnType,
                        {
                          backgroundColor:
                            selectedFoodType?.id === item.id
                              ? R.colors.colorMain
                              : R.colors.gray4,
                        },
                      ]}
                      key={item.id}
                      onPress={() => OnChangFoodType(item)}
                    >
                      <Image
                        style={[
                          styles.img,
                          {
                            tintColor:
                              selectedFoodType?.id === item.id
                                ? R.colors.white
                                : R.colors.black,
                          },
                        ]}
                        source={item.img}
                      />
                    </TouchableOpacity>
                    <Text style={styles.txt}>{item.name}</Text>
                  </View>
                );
              }}
            />
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <Text style={styles.txtTitle}>Sản phẩm bán chạy</Text>
            </View>
            <FoodBreakfast data={ListProduct} />
            <View
              style={{
                height: 50,
              }}
            />
          </ScrollView>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  txt: {
    fontSize: 15,
    color: R.colors.black,
  },
  txtSearch: {
    fontSize: 16,
    fontWeight: "500",
    color: R.colors.black,
  },
  txtGray: {
    fontSize: 13,
    color: R.colors.color777,
  },
  btnType: {
    width: 76,
    height: 76,
    marginBottom: 10,
    borderRadius: 20,
    marginHorizontal: 10,
    backgroundColor: "#ccc",
    alignItems: "center",
    justifyContent: "center",
  },
  img: {
    width: 45,
    height: 45,
  },
  txtTitle: {
    fontSize: 20,
    fontWeight: "600",
    color: R.colors.black,
    paddingVertical: 20,
    paddingHorizontal: 15,
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
  btnFoodBreakfast: {
    marginHorizontal: 15,
    marginVertical: 10,
  },
  imgFoodBreakFast: {
    width: 80,
    height: 80,
    borderRadius: 20,
  },
});

const mapStateToProps = (state) => {
  return {
    count: state.CountReaducer,
  };
};
export default connect(mapStateToProps, { increase, decrease })(HomeView);
