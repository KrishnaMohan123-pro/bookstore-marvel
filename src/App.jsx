import React from "react";
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";
import Home from "./screens/Home/index";
import Navbar from "./components/navbar/Navbar";
import Cart from "./screens/Cart/index";
import Books from "./screens/Books/index";
import Account from "./screens/Account/index";
import Book from "./screens/Book";
import Character from "./screens/Character/index";
import Characters from "./screens/Characters/index";
import Series from "./screens/Series/Series";
import AllItems from "./screens/AllItems/index";
import BackdropLoader from "./components/BackdropLoader/backdropLoader";
import { useSelector, useDispatch } from "react-redux";
import ProtectedRoute from "./ProtectedRoute";
import { initialiseUser } from "./actions/authActions";
import { initialiseCart } from "./actions/cartActions";
import { fetchNewBooks } from "./actions/newBookAdditionActions";
import HourglassFullTwoToneIcon from "@material-ui/icons/HourglassFullTwoTone";
import { initialiseSavedItems } from "./actions/savedItemsActions";

function bookDetail({ match }) {
  return <Book id={match.params.book_id} />;
}
function seriesDetail({ match }) {
  return <Series id={match.params.series_id} />;
}
function characterDetail({ match }) {
  return <Character id={match.params.character_id} />;
}

function Admin() {
  return (
    <p>
      Admin<Link to="/developer">Developer</Link>
    </p>
  );
}
function Developer() {
  return (
    <p>
      Developer<Link to="/admin">Admin</Link>
    </p>
  );
}
function Restricted() {
  return <p>Restricted</p>;
}

function App() {
  const emptyUser = useSelector((state) => state.firebase.auth.isEmpty);
  const isLoaded = useSelector((state) => state.firebase.auth.isLoaded);
  const uid = useSelector((state) => state.firebase.auth.uid);
  const dispatch = useDispatch();
  dispatch(fetchNewBooks());
  if (!emptyUser) {
    dispatch({ type: "LOGGED_IN" });
    dispatch(initialiseUser(uid));
    dispatch(initialiseCart(uid));
    dispatch(initialiseSavedItems(uid));
  }
  if (!isLoaded) {
    return (
      <HourglassFullTwoToneIcon className="page-loader" fontSize="large" />
    );
  } else {
    return (
      <Router>
        <Navbar />
        <Switch>
          <Route path="/" exact render={() => <Home />} />
          <ProtectedRoute component={Account} path="/account" exact={true} />
          <ProtectedRoute path="/admin" exact component={Admin} />
          <Route path="/all" exact component={AllItems} />
          <Route exact path="/popular" render={() => <Books />} />
          <Route exact path="/book/:book_id" component={bookDetail} />
          <Route exact path="/search" component={Characters} />
          <Route
            exact
            path="/character/:character_id"
            component={characterDetail}
          />
          <ProtectedRoute exact path="/developer" component={Developer} />
          <ProtectedRoute component={Cart} path="/cart" exact={true} />
          <Route exact path="/restricted" component={Restricted}></Route>
          <Route exact path="/series/:series_id" component={seriesDetail} />
          <Route
            path="*"
            exact
            component={() => {
              return (
                <p>
                  404!!
                  <br />
                  Page Not Found
                </p>
              );
            }}
          />
        </Switch>
        {/* <Footer /> */}
        <BackdropLoader />
      </Router>
    );
  }
}
export default App;
