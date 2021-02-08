import React, { useState, useEffect } from "react";
import { fetchComicsByName } from "../../actions/dataFetch";
import Loader from "../Loader/loader";
import Carousel from "nuka-carousel";
import Card from "./Card";

export default function Carosel(props) {
  const [doc, setDoc] = useState({});
  useEffect(() => {
    fetchComicsByName(props.name).then((response) => {
      setDoc(response.data.results);
    });
  }, [props.name]);
  if (Object.keys(doc).length === 0) {
    return <Loader />;
  }
  let slidesToShow =
    window.innerWidth > 1000 ? 3 : window.innerWidth > 700 ? 2 : 1;
  return (
    <div className="container d-flex justify-content-center my-5">
      <Carousel
        slidesToShow={slidesToShow}
        speed={1000}
        dragging={false}
        autoGenerateStyleTag={true}
        pauseOnHover={true}
        wrapAround={true}
        width={"100%"}
        scrollMode={"page"}
        defaultControlsConfig={{
          nextButtonText: <i className="fas fa-caret-right fa-3x"></i>,
          prevButtonText: <i className="fas fa-caret-left fa-3x"></i>,
          pagingDotsStyle: {
            fill: "gold",
          },
        }}
      >
        {doc.map((item) => (
          <Card
            id={item.id}
            key={item.id}
            img={item.thumbnail.path + "." + item.thumbnail.extension}
            price={item.prices[0].price}
            title={item.title}
          />
        ))}
      </Carousel>
    </div>
  );
}
