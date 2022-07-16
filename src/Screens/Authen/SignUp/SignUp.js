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
    if (data.passWord != data.repassword) {
      showAlert(TYPE.WARN, "Thông báo!", "Mật khẩu không trùng nhau!");
    } else {
      props.showLoading();
      const response = await SignUpApi({
        ...data,
        address: "Trâu Quỳ,Gia Lâm,Hà Nội",
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
    }

    console.log(data);
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
