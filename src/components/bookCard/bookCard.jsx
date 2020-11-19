import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useFirestoreConnect, isLoaded } from "react-redux-firebase";
import { addToCart, removeFromCart } from "../../actions/cartActions";
import { Link } from "react-router-dom";

export default function Bookcard(props) {
  const dispatch = useDispatch();
  const doc = useSelector((state) => state);
  const userID = doc.firebase.auth.uid;
  useFirestoreConnect(() => [{ collection: "users", doc: userID }]);
  const data = useSelector(
    ({ firestore: { data } }) => data.users && data.users[userID]
  );
  if (!isLoaded(data)) {
    return <p>Loading</p>;
  }

  let title = props.title;
  if (props.title.length > 25) {
    title = props.title.substring(0, 20) + "...";
  }
  const cartItemIds = [];
  data.cart.forEach((item) => cartItemIds.push(item.id));
  function handleAdd() {
    dispatch(
      addToCart({
        id: props.id,
        price: props.price,
        img: props.img,
        title: props.title,
      })
    );
  }
  function handleRemove() {
    dispatch(removeFromCart({ id: props.id }));
  }
  let button = !cartItemIds.includes(props.id) ? (
    <button className="btn btn-primary" onClick={handleAdd}>
      Add to cart
    </button>
  ) : (
    <button className="btn btn-warning" onClick={handleRemove}>
      Remove from cart
    </button>
  );
  return (
    <div class="card">
      <Link to={"/book/" + props.id}>
        <img src={props.img} class="card-img-top" alt="..." />
      </Link>
      <div class="card-body">
        <Link to={"/book/" + props.id}>
          <h5 class="card-title">{title}</h5>
        </Link>
        <p class="card-text">Price: ${props.price}</p>
        {button}
      </div>
    </div>
  );
}
