import React, { Component } from "react";
import { View, Text } from "react-native";
import AccountView from "./AccountView";
import { connect } from "react-redux";
const Account = (props) => {
  console.log("userInfo", props.userInfo);

  return <AccountView dataProfile={props.userInfo} />;
};

const mapStateToProps = (state) => {
  return {
    userInfo: state.userReducer,
  };
};

export default connect(mapStateToProps, {})(Account);
