import React from "react";
import { useNavigation } from "@react-navigation/native";
import SignInView from "./SignInView";
import { TABNAVIGATOR } from "../../../routers/ScreenNames";
import { showLoading, hideLoading } from "../../../actions/loadingAction";
import { saveUserToRedux } from "../../../actions/users";
import { connect } from "react-redux";
import { showAlert, TYPE } from "../../../components/DropdownAlert";
import { loginApi } from "../../../apis/Functions/users";

const SignIn = (props) => {
  const navigate = useNavigation();
  const onSubmit = async (data) => {
    console.log("data", data);

    props.showLoading();

    const response = await loginApi({
      userName: data.username,
      passWord: data.password,
    });
    props.hideLoading();

    if (response.data.kq == 1 && response.data.user) {
      navigate.navigate(TABNAVIGATOR);
      props.saveUserToRedux(response.data.user);
    } else {
      showAlert(
        TYPE.ERROR,
        "Thông báo!",
        "Tài khoản và mật khẩu không chính xác!"
      );
    }
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
