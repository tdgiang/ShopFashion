import React, { Component } from "react";
import { View, Text } from "react-native";
import AccountView from "./AccountView";

const Account = (props) => {
  const dataProfile = {
    name: "Thưởng Trần",
    phone: "08827127221",
    email: "jack@gmail.mail",
    address: "111 Trâu Quỳ,Gia Lâm,Hà Nội",
  };
  return <AccountView dataProfile={dataProfile} />;
};

export default Account;
