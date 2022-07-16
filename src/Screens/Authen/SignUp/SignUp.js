import React from "react";
import { useNavigation } from "@react-navigation/native";
import SignUpView from "./SignUpView";
import { SIGNINSCREEN } from "../../../routers/ScreenNames";
import { showAlert, TYPE } from "../../../components/DropdownAlert";
import { SignUpApi } from "../../../apis/Functions/users";
import { showLoading, hideLoading } from "../../../actions/loadingAction";
import { connect } from "react-redux";

const SignUp = (props) => {
  const navigate = useNavigation();
  const onSubmit = async (data) => {
    props.showLoading();
    const response = await SignUpApi({
      ...data,
    });
    props.hideLoading();
    if (response.data.kq == 1 && response.data.user) {
      showAlert(TYPE.SUCCESS, "Thông báo!", "Đăng ký thành công!");
      navigate.navigate(SIGNINSCREEN);
    } else {
      showAlert(
        TYPE.ERROR,
        "Thông báo!",
        "Tài khoản và mật khẩu không chính xác!"
      );
    }
  };
  return <SignUpView onSubmit={onSubmit} />;
};

const mapStateToProps = (state) => {
  return {};
};

export default connect(mapStateToProps, {
  showLoading,
  hideLoading,
})(SignUp);
