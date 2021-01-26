import React, { Fragment } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import TransitionModal from "../Modal/modal";
import LoginForm from "../../utility/forms/loginForm";
import SignupForm from "../../utility/forms/signupForm";
import { logout } from "../../actions/authActions";
import CartLink from "./cartLink";
import SearchBar from "../SearchBar/searchBar";
import { Avatar } from "@material-ui/core";
import SideDrawer from "../SideDrawer/sideDrawer";
import "./styles.css";

export default function Navbar() {
  const history = useHistory();
  const dispatch = useDispatch();
  const modalVisible = useSelector((state) => state.modal);
  const loggedIn = useSelector((state) => state.loggedIn);
  const userName = useSelector((state) => state.auth.user.fname);
  const userImage = useSelector((state) => state.auth.user.photoURL);

  return (
    <AppBar className="app-bar" position="sticky" elevation={0}>
      <Toolbar>
        <SideDrawer />
        <Link to="/" style={{ color: "inherit" }}>
          <Typography variant="h6">Marvel</Typography>
        </Link>
        <div className="app-bar-links">
          <SearchBar />
        </div>
        <div className="app-bar-links" style={{ marginLeft: "auto" }}>
          {loggedIn ? (
            <Fragment>
              <Button
                color="inherit"
                variant="text"
                style={{ position: "relative" }}
                onClick={() => {
                  history.push("/cart");
                }}
              >
                <CartLink />
              </Button>
              <Button
                color="inherit"
                variant="text"
                onClick={() => {
                  history.push("/account");
                }}
              >
                <Avatar alt={userName} src={userImage} />
              </Button>
              <Button
                color="inherit"
                variant="text"
                onClick={() => {
                  dispatch({ type: "LOGGED_OUT" });
                  dispatch(logout());
                  history.push("/");
                }}
              >
                SIGNOUT
              </Button>
            </Fragment>
          ) : (
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
          )}
        </div>
      </Toolbar>
    </AppBar>
  );
}
