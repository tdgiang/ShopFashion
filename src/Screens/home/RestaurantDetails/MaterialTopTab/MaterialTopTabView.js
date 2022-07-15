import React, { useCallback, useState } from "react";
import {
  View,
  Text,
  ScrollView,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Image,
} from "react-native";
import R from "../../../../assets/R";
import {
  MY_CART_SCREEN,
  RESTAURANTDETAILSCREEN,
} from "../../../../routers/ScreenNames";
import Ionicons from "react-native-vector-icons/Ionicons";
import AntDesign from "react-native-vector-icons/AntDesign";
import SimpleLineIcons from "react-native-vector-icons/SimpleLineIcons";
import StarReview from "../../../../components/StarReview/StarReview";
import { useNavigation } from "@react-navigation/native";
import { connect } from "react-redux";
import {
  addCart,
  decreaseItem,
  increaseItem,
} from "../../../../actions/MyCartAction";

const reviewContent = [
  {
    id: 1,
    name: "Garnet Bit",
    rate: 5,
    avt: R.images.avtNu,
    time: "Yesterday 9:28",
    content:
      "I'm happy very good very good, understand your problem. There is no good support for nested ScrollViews and FlatLists in RN and your setup must already be spamming you warnings.",
    img1: R.images.imgPizaFull,
    img2: R.images.imgMyy,
    img3: R.images.imgSotSalad,
  },
  {
    id: 2,
    name: "Garnet Bit",
    rate: 5,
    avt: R.images.avtNam,
    time: "Yesterday 9:28",
    content:
      "I'm happy very good very good, understand your problem. There is no good support for nested ScrollViews and FlatLists in RN and your setup must already be spamming you warnings.",
    img1: R.images.imgPizaFull,
    img2: R.images.imgMyy,
    img3: R.images.imgSotSalad,
  },
];
const MaterialTopTabView = (props) => {
  const [textShown, setTextShown] = useState(false);
  const [lengthMore, setLengthMore] = useState(false);

  return (
    <View>
      {reviewContent.map((item) => (
        <View
          style={{
            flex: 1,
            backgroundColor: R.colors.white,
            flexDirection: "column",
            paddingVertical: 15,
            paddingHorizontal: 15,
          }}
        >
          <View style={{ flex: 1, flexDirection: "row", alignItems: "center" }}>
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
            <Text style={styles.txt} numberOfLines={textShown ? undefined : 3}>
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
            <Image style={styles.imgFoodreview} source={item.img1} />
            <Image style={styles.imgFoodreview} source={item.img2} />
            <Image style={styles.imgFoodreview} source={item.img3} />
          </View>
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
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
})(MaterialTopTabView);
