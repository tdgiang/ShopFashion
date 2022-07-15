import React from "react";
import { useNavigation } from "@react-navigation/native";
import SignInView from "./SignInView";
import { TABNAVIGATOR } from "../../../routers/ScreenNames";
import { showLoading, hideLoading } from "../../../actions/loadingAction";
import { saveUserToRedux } from "../../../actions/users";
import { connect } from "react-redux";
import { showAlert, TYPE } from "../../../components/DropdownAlert";

const SignIn = (props) => {
  const navigate = useNavigation();
  const onSubmit = (data) => {
    console.log("data", data);

    props.showLoading();
    setTimeout(() => {
      props.hideLoading();
      if (data.username == "thuongtran" && data.password == "12345678") {
        navigate.navigate(TABNAVIGATOR);
      } else {
        showAlert(
          TYPE.ERROR,
          "Thông báo!",
          "Tài khoản và mật khẩu không chính xác!"
        );
      }
    }, 2000);
  };
  return <SignInView onSubmit={onSubmit} />;
};

const mapStateToProps = (state) => {
  return {};
};

export default connect(mapStateToProps, {
  saveUserToRedux,
  showLoading,
  hideLoading,
})(SignIn);
