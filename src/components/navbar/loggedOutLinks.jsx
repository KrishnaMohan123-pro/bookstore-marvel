import React, { Fragment } from "react";
import { useSelector } from "react-redux";
import TransitionModal from "../Modal/modal";
import LoginForm from "../../utility/forms/loginForm";
import SignupForm from "../../utility/forms/signupForm";

export default function LoggedOutLinks() {
  const modalVisible = useSelector((state) => state.modal);
  return (
    <Fragment>
      <TransitionModal
        linkName="Login"
        modalTitle="Welcome Back"
        childComponent={<LoginForm />}
        color="primary"
        modalName="LOGIN"
        modalVisible={modalVisible.loginModalVisible}
      />
      <TransitionModal
        linkName="Sign up"
        modalTitle="Hello New Friend"
        childComponent={<SignupForm />}
        color="primary"
        modalName="SIGNUP"
        modalVisible={modalVisible.signupModalVisible}
      />
    </Fragment>
  );
}
