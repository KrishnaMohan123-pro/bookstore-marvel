import {
  signupAction,
  signupErrorAction,
  loginAction,
  loginErrorAction,
  initialiseUserAction,
  signoutAction,
  signoutErrorAction,
} from "./actionCreators/authActionCreators";
import {
  firebaseLoadingAction,
  stopLoadingAction,
} from "../actions/actionCreators/loadActionCreators";
import {
  clearCartAction,
  initialiseCartAction,
} from "./actionCreators/cartActionCreators";

export function signUp(creds) {
  return (dispatch, getState, { getFirebase }) => {
    const firebase = getFirebase();
    dispatch(firebaseLoadingAction());
    firebase
      .auth()
      .createUserWithEmailAndPassword(creds.email, creds.password)
      .then((user) => {
        firebase
          .firestore()
          .collection("users")
          .doc(user.user.uid)
          .set({
            fname: creds.fname,
            lname: creds.lname,
            email: creds.email,
            phone: creds.phone,
            cart: [],
            address: {
              addressLine1: "",
              addressLine2: "",
              pin: "",
              city: "",
              state: "",
              country: "",
            },
            photoURL: "",
            role: "user",
          });
        firebase
          .firestore()
          .collection("users")
          .doc(user.user.uid)
          .get()
          .then((data) => {
            dispatch(signupAction(data.data(), user.user.uid));
            dispatch(clearCartAction());
            dispatch(initialiseCartAction(data.data().cart));
          });
        dispatch(stopLoadingAction());
      })
      .catch((err) => {
        dispatch(signupErrorAction(err));
        dispatch(stopLoadingAction());
      });
  };
}

export function login(creds) {
  return (dispatch, getState, { getFirebase }) => {
    dispatch(firebaseLoadingAction());
    const firebase = getFirebase();
    firebase
      .auth()
      .signInWithEmailAndPassword(creds.email, creds.password)
      .then((user) => {
        firebase
          .firestore()
          .collection("users")
          .doc(user.user.uid)
          .get()
          .then((data) => {
            dispatch(loginAction(data.data(), user.user.uid));
            dispatch(clearCartAction());
            dispatch(initialiseCartAction(data.data().cart));
            dispatch({ type: "CLOSE_MODAL" });
            dispatch(stopLoadingAction());
          });
      })
      .catch((err) => {
        dispatch(loginErrorAction(err));
        dispatch(stopLoadingAction());
      });
  };
}
export function logout() {
  return (dispatch, getstate, { getFirebase }) => {
    dispatch(firebaseLoadingAction);
    const firebase = getFirebase();
    firebase
      .auth()
      .signOut()
      .then(() => {
        dispatch(signoutAction());
        dispatch(stopLoadingAction());
        dispatch(clearCartAction());
      })
      .catch((err) => {
        dispatch(signoutErrorAction(err));
        dispatch(stopLoadingAction());
      });
  };
}

export function initialiseUser(uid) {
  return async (dispatch, getState, { getFirebase }) => {
    dispatch(firebaseLoadingAction());
    const firebase = getFirebase();
    const res = await firebase.firestore().collection("users").doc(uid).get();
    const userData = await res.data();
    dispatch(
      initialiseUserAction(
        {
          address: userData.address,
          email: userData.email,
          fname: userData.fname,
          lname: userData.lname,
          phone: userData.phone,
          photoURL: userData.photoURL,
          role: userData.role,
        },
        uid
      )
    );

    dispatch(stopLoadingAction());
  };
}

export function addAddress(address) {
  return async (dispatch, getState, { getFirebase }) => {
    dispatch(firebaseLoadingAction());
    const user = getState().auth.user;
    const uid = getState().auth.uid;
    const firebase = getFirebase();
    const token = firebase
      .firestore()
      .collection("users")
      .doc(uid)
      .update({ address: address })
      .then(() => {
        return true;
      })
      .catch((err) => console.log(err));
    if (token) {
      dispatch(
        initialiseUserAction(
          {
            address: address,
            email: user.email,
            fname: user.fname,
            lname: user.lname,
            phone: user.phone,
            photoURL: user.photoURL,
            role: user.role,
          },
          uid
        )
      );
    }
    dispatch(stopLoadingAction());
  };
}

export function addPhone(phone) {
  return async (dispatch, getState, { getFirebase }) => {
    dispatch(firebaseLoadingAction());
    const firebase = getFirebase();
    const uid = getState().auth.uid;
    const user = getState().auth.user;
    const token = firebase
      .firestore()
      .collection("users")
      .doc(uid)
      .update({ phone: phone });
    if (token) {
      dispatch(
        initialiseUserAction(
          {
            email: user.email,
            fname: user.fname,
            lname: user.lname,
            phone: phone,
            photoURL: user.photoURL,
            address: user.address,
            role: user.role,
          },
          uid
        )
      );
      dispatch(stopLoadingAction());
    }
  };
}

export function editName(name) {
  return async (dispatch, getState, { getFirebase }) => {
    dispatch(firebaseLoadingAction());
    const firebase = getFirebase();
    const uid = getState().auth.uid;
    const user = getState().auth.user;
    const token = firebase
      .firestore()
      .collection("users")
      .doc(uid)
      .update({ fname: name.fname, lname: name.lname });
    if (token) {
      dispatch(
        initialiseUserAction(
          {
            email: user.email,
            fname: name.fname,
            lname: name.lname,
            phone: user.phone,
            photoURL: user.photoURL,
            address: user.address,
            role: user.role,
          },
          uid
        )
      );
      dispatch(stopLoadingAction());
    }
  };
}
