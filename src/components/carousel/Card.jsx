import React from "react";
import ProductCard from "../ProductCard/ProductCard";
import { _MARVEL } from "../../utility/sources/sources";

export default function Card(props) {
  return (
    <section className="book-card">
      <ProductCard
        type="book"
        img={props.img}
        title={props.title}
        price={props.price}
        id={props.id}
        source={_MARVEL}
      />
    </section>
  );
}
