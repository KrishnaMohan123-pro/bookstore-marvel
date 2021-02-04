import React from "react";
import { useDispatch } from "react-redux";
import Button from "@material-ui/core/Button";
import firebase from "../../services/firebase/index";
export default function GoogleSignIn() {
  const dispatch = useDispatch();
  function googleSignIn() {
    const googleProvider = new firebase.auth.GoogleAuthProvider();
    firebase
      .auth()
      .signInWithPopup(googleProvider)
      .then(function (result) {
        var user = result.user;
        var newUser = result.additionalUserInfo.isNewUser;
        if (newUser) {
          firebase
            .firestore()
            .collection("users")
            .doc(user.uid)
            .set({
              address: {
                addressLine1: "",
                addressLine2: "",
                pin: "",
                city: "",
                state: "",
                country: "",
              },
              cart: [],
              email: user.email,
              fname: user.displayName,
              lname: "",
              phone: "",
              photoURL: result.user.photoURL,
            });
          firebase.firestore().collection("cart").doc(user.uid).set({});
          dispatch({
            type: "SIGN_IN",
            payload: {
              user: {
                address: {
                  addressLine1: "",
                  addressLine2: "",
                  pin: "",
                  city: "",
                  state: "",
                  country: "",
                },
                email: user.email,
                fname: user.displayName,
                lname: "",
                phone: "",
                photoURL: result.user.photoURL,
              },
              uid: user.uid,
            },
          });
          dispatch({ type: "CLOSE_MODAL" });
        } else {
          firebase
            .firestore()
            .collection("users")
            .doc(user.uid)
            .get()
            .then((doc) => {
              dispatch({
                type: "LOG_IN",
                payload: { user: doc.data(), uid: user.uid },
              });
              dispatch({
                type: "INITIALISE_CART",
                payload: { cart: doc.data().cart },
              });
            });
          dispatch({ type: "CLOSE_MODAL" });
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  }
  return (
    <Button
      color="secondary"
      variant="contained"
      onClick={(e) => {
        e.preventDefault();
        googleSignIn();
      }}
      style={{ margin: "0.5rem auto" }}
    >
      <i class="fab fa-google mx-1 fa-2x"></i>
    </Button>
  );
}
