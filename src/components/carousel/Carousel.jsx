import React, { useState, useEffect } from "react";
import { fetchComicsByName } from "../../actions/dataFetch";
import Loader from "../Loader/loader";
import ItemsCarousel from "react-items-carousel";
import Card from "./Card";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";
import { Container, IconButton } from "@material-ui/core";

export default function Carosel(props) {
  const [doc, setDoc] = useState({});
  const [activeItemIndex, setActiveItemIndex] = useState(0);
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
    <Container fixed>
      <div style={{ padding: 0, maxWidth: "100%", margin: "0" }}>
        <ItemsCarousel
          requestToChangeActive={setActiveItemIndex}
          activeItemIndex={activeItemIndex}
          infiniteLoop={true}
          gutter={1}
          activePosition={"center"}
          chevronWidth={60}
          disableSwipe={false}
          alwaysShowChevrons={false}
          numberOfCards={slidesToShow}
          slidesToScroll={slidesToShow}
          outsideChevron={true}
          showSlither={false}
          firstAndLastGutter={false}
          rightChevron={
            window.innerWidth < 700 ? null : (
              <IconButton
                className="carousel-button"
                disableRipple
                disableFocusRipple
                disableTouchRipple
              >
                <ArrowForwardIosIcon />
              </IconButton>
            )
          }
          leftChevron={
            window.innerWidth < 700 ? null : (
              <IconButton
                className="carousel-button"
                disableRipple
                disableFocusRipple
                disableTouchRipple
              >
                <ArrowBackIosIcon />
              </IconButton>
            )
          }
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
        </ItemsCarousel>
      </div>
    </Container>
  );
}
