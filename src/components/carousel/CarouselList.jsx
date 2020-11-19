import React, { useState, useEffect } from "react";
import Carousel from "nuka-carousel";
import Card from "./Card";
import { fetchComicsByCharacterId } from "../../actions/dataFetch";
export default function CarouselList(props) {
  const [data, setData] = useState([]);
  useEffect(() => {
    fetchComicsByCharacterId(props.id).then((doc) => setData(doc.data.results));
  }, []);
  if (data.length === 0) {
    return (
      <div class="spinner-grow text-warning" role="status">
        <span class="sr-only">Loading...</span>
      </div>
    );
  }
  // let slideCounts = 3;
  // console.log(window.screen.width);
  // if (window.screen.width >= 1024) {
  //   slideCounts = 3;
  // } else if (window.screen.width >= 768) {
  //   slideCounts = 2;
  // } else {
  //   slideCounts = 1;
  // }
  return (
    // <div>Show books</div>
    <Carousel
      slidesToShow={3}
      speed={1000}
      dragging={false}
      autoplay={true}
      autoplayInterval={2000}
      autoGenerateStyleTag={true}
      pauseOnHover={true}
      wrapAround={true}
      width={"100%"}
      scrollMode={"page"}
      defaultControlsConfig={{
        nextButtonText: ">",
        // <i class="fas fa-caret-right fa-3x"></i>
        prevButtonText: "<",
        // <i class="fas fa-caret-left fa-3x"></i>
        pagingDotsStyle: {
          fill: "gold",
        },
      }}
    >
      {data.map((item) => (
        <Card
          id={item.id}
          key={item.id}
          img={item.thumbnail.path + "." + item.thumbnail.extension}
          price={item.prices[0].price}
          title={item.title}
        />
      ))}
    </Carousel>
  );
}