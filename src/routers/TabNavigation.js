import React from "react";
import { Image, View } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import { connect } from "react-redux";
import R from "../assets/R";
import Octicons from "react-native-vector-icons/Octicons";
import Entypo from "react-native-vector-icons/Entypo";
import Ionicons from "react-native-vector-icons/Ionicons";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";

import Home from "../Screens/home/Home";
import Notification from "../Screens/notification/Notification";
import Account from "../Screens/Account/Account";
import Profile from "../Screens/Profile/Profile";
import MyList from "../Screens/MyList/MyList";
import Order from "../Screens/Order/Oder";

const Tab = createBottomTabNavigator();

const TabNavigator = (props) => {
  return (
    <View style={{ flex: 1 }}>
      <Tab.Navigator
        initialRouteName="Screen5"
        tabBarOptions={{
          activeTintColor: R.colors.colorMain,
          labelStyle: { fontSize: 15 },
        }}
      >
        <Tab.Screen
          name="HomeScreen"
          component={Home}
          options={{
            tabBarLabel: "Trang chủ",
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="ios-home" size={size} color={color} />
            ),
          }}
        />
        <Tab.Screen
          name="OrderScreen"
          component={Order}
          options={{
            tabBarLabel: "Đơn hàng",
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons
                name="text-box-outline"
                size={size}
                color={color}
              />
            ),
          }}
        />

        <Tab.Screen
          name="MyListScreen"
          component={MyList}
          options={{
            tabBarLabel: "Yêu thích",
            tabBarIcon: ({ color, size }) => (
              <Octicons name="bookmark" size={size} color={color} />
            ),
          }}
        />
        <Tab.Screen
          name="AccountScreen"
          component={Account}
          options={{
            tabBarLabel: "Tài khoản",
            tabBarIcon: ({ color, size }) => (
              <Octicons name="person" size={size} color={color} />
            ),
          }}
        />
      </Tab.Navigator>
    </View>
  );
};

const mapStateToProps = (state) => {
  return {
    user: state.userReducer,
  };
};

export default connect(mapStateToProps, {})(TabNavigator);
