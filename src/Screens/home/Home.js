import React, { useEffect, useState } from "react";
import R from "../../assets/R";
import HomeView from "./HomeView";
import { useNavigation } from "@react-navigation/native";
import { LIST_PRODUCT } from "../../routers/ScreenNames";
import { FoodTypeData } from "./DataFake";
import { connect } from "react-redux";
import { listCollectionApi, listPopularApi } from "../../apis/Functions/users";
import { hideLoading, showLoading } from "../../actions/loadingAction";
import { showAlert, TYPE } from "../../components/DropdownAlert";
const Home = (props) => {
  const navigate = useNavigation();
  const [searchQuery, setSearchQuery] = React.useState("");
  const onChangeSearch = (query) => setSearchQuery(query);
  const [selectedFoodType, setSelectedFoodType] = useState(null);

  const [listPopular, setListPopular] = useState([]);
  const [collections, setCollections] = useState([]);
  const [refreshing, setRefreshing] = useState(true);

  useEffect(() => {
    getListPopular();
    getListCollection();
  }, []);

  const getListPopular = async () => {
    props.showLoading();
    const response = await listPopularApi();
    props.hideLoading();
    if (response.data) {
      const temps = response.data.map((e) => {
        return {
          id: e._id,
          type: "Burgers",
          img: e.images[0],
          name: e.name,
          price: e.price,
          description: e.description,
          address: "13 Street 47 W 13th St ,NY",
          time: 10,
          km: 2,
          rate: 3.9,
          review: 1000,
          open: "7:00 - 21:00",
        };
      });

      setListPopular(temps);
    } else {
      showAlert(TYPE.ERROR, "Thông báo!", "Lấy dữ liệu thất bại!");
    }
  };

  const getListCollection = async () => {
    props.showLoading();
    const response = await listCollectionApi();
    props.hideLoading();
    if (response.data) {
      const temp = response.data.map((e) => {
        return {
          id: e._id,
          type: "Snack1",
          name: e.name,
          img: `http://localhost:3000${e.img}`,
          products: e.children,
        };
      });
      setCollections(temp);
    } else {
      showAlert(TYPE.ERROR, "Thông báo!", "Lấy dữ liệu thất bại!");
    }
  };

  const OnChangFoodType = (itemFoodType) => {
    setSelectedFoodType(itemFoodType);
    navigate.navigate(LIST_PRODUCT, { data: itemFoodType });
  };

  const onRefresh = () => {
    console.log("Chay vao re");
    // setRefreshing(true);
    getListPopular();
    getListCollection();
  };

  return (
    <HomeView
      FoodTypeData={FoodTypeData}
      searchQuery={searchQuery}
      onChangeSearch={onChangeSearch}
      selectedFoodType={selectedFoodType}
      OnChangFoodType={OnChangFoodType}
      userInfo={props.userInfo}
      refreshing={refreshing}
      onRefresh={onRefresh}
      listPopular={listPopular}
      collections={collections}
    />
  );
};

const mapStateToProps = (state) => {
  return {
    userInfo: state.userReducer,
  };
};

export default connect(mapStateToProps, {
  showLoading,
  hideLoading,
})(Home);
