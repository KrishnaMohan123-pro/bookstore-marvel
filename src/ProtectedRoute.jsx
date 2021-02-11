import React from "react";
import { Redirect, Route } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import developerRoutes from "./utility/Routes/developerRoutes";
import adminRoutes from "./utility/Routes/adminRoutes";
import userRoutes from "./utility/Routes/userRoutes";
import { toast } from "react-toastify";
import { openModal } from "./actions/modalActions";
export default function ProtectedRoute({ component: Component, ...rest }) {
  const loggedIn = useSelector((state) => state.loggedIn);
  const role = useSelector((state) => state.auth.user.role);
  const dispatch = useDispatch();

  if (!loggedIn) {
    toast.error("Please login First");
    dispatch(openModal("SIGNUP"));
    return <Redirect to="/" />;
  }
  if (role && role === "developer" && !developerRoutes.includes(rest.path)) {
    return <Redirect to="/restricted" />;
  } else if (role && role === "admin" && !adminRoutes.includes(rest.path)) {
    return <Redirect to="/restricted" />;
  } else if (role && role === "user" && !userRoutes.includes(rest.path)) {
    return <Redirect to="/restricted" />;
  }
  return (
    <Route
      render={() => {
        return <Component />;
      }}
      {...rest}
    />
  );
}
