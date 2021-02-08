import React from "react";
import ProductCard from "../ProductCard/ProductCard";
import { _MARVEL } from "../../utility/sources/sources";
import { _BOOK } from "../../utility/sources/itemTypes";

export default function Card(props) {
  return (
    <section className="book-card">
      <ProductCard
        type={_BOOK}
        img={props.img}
        title={props.title}
        price={props.price}
        id={props.id}
        source={_MARVEL}
      />
    </section>
  );
}
