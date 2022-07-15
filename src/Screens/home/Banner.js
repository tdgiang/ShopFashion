import React from "react";
import {
  StyleSheet,
  Image,
  View,
  Linking,
  TouchableOpacity,
} from "react-native";

import Swiper from "react-native-swiper";
import R from "../../assets/R";
import { getWidth, HEIGHTXD, WIDTHXD } from "../../Config/Functions";

const listImage = [
  {
    id: 1,
    image_link:
      "https://cdn.lep.vn/2022/07/images/banners/1657334088987-COVER---PC-(4).jpeg",
  },
  {
    id: 2,
    image_link:
      "https://cdn.lep.vn/2022/06/images/banners/1655462186517-COVER---PC-(3).jpeg",
  },
  {
    id: 3,
    image_link:
      "https://cdn.lep.vn/2022/06/images/banners/1655462146535-COVER---PC-(2).jpeg",
  },

  {
    id: 4,
    image_link:
      "https://cdn.lep.vn/2022/07/images/banners/1657279851339-COVER---PC.jpeg",
  },
];

const SwiperComponent = (props) => {
  return (
    <View style={styles.container}>
      <Swiper
        autoplayTimeout={6}
        dotColor={R.colors.color777}
        activeDotColor={R.colors.white}
        paginationStyle={{ bottom: 10 }}
        loop={true}
        containerStyle={{ backgroundColor: "transparent" }}
        dotStyle={{
          height: 10,
          width: 10,
          marginLeft: 8,
          marginRight: 8,
          borderRadius: 5,
        }}
        activeDotStyle={{
          height: 10,
          width: 10,
          marginLeft: 8,
          marginRight: 8,
          borderRadius: 5,
          backgroundColor: R.colors.white,
        }}
        autoplay={true}
      >
        {listImage.map((item) => (
          <Image
            style={{
              height: 180,
              width: getWidth(),
            }}
            source={{ uri: item.image_link }}
            resizeMode={"cover"}
          />
        ))}
      </Swiper>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 10,
    height: 180,
    backgroundColor: "transparent",
    marginTop: 5,
  },
  wrapper: {
    height: 180,
  },
  text: {
    color: "#fff",
    fontSize: 30,
    fontWeight: "bold",
  },
});

export default SwiperComponent;
