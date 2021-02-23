import React, { Fragment, useState } from "react";
import characterNames from "../../utility/characters/data";
import "./styles.css";
import CarouselList from "../../components/carousel/Carousel";
import { Grid, Container, Divider, IconButton } from "@material-ui/core";
import { useSelector } from "react-redux";
import ItemsCarousel from "react-items-carousel";
import ProductCard from "../../components/ProductCard/ProductCard";
import Loader from "../../components/Loader/loader";
import { _OUR_COLLECTION } from "../../utility/sources/sources";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";

export default function Books() {
  const newBooks = useSelector((state) => state.newBooks);
  const loader = useSelector((state) => state.loader.profile);
  const [activeItemIndex, setActiveItemIndex] = useState(0);
  if (loader) {
    return (
      <p>
        <Loader />
      </p>
    );
  }
  let slidesToShow =
    newBooks.length < 3
      ? newBooks.length
      : window.innerWidth > 1000
      ? 3
      : window.innerWidth > 700
      ? 2
      : 1;

  return (
    <main id="popular-page">
      <section className="new-arrivals">
        <div className="character-section" style={{ margin: "1rem 0" }}>
          <p className="character-name">New Arrivals</p>

          <Container fixed>
            <Grid container>
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
                  {newBooks.length === 0
                    ? null
                    : newBooks.map((item) => {
                        return (
                          <div
                            key={item.id}
                            style={{
                              height:
                                window.innerWidth > 1000 ? "425px" : "475px",
                            }}
                          >
                            <ProductCard
                              type={item.type}
                              img={
                                item.image.length === 0
                                  ? "http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg"
                                  : item.image
                              }
                              title={item.title ? item.title : item.name}
                              endYear={item.endYear}
                              startYear={item.startYear}
                              price={item.price}
                              id={item.id}
                              source={_OUR_COLLECTION}
                            />
                          </div>
                        );
                      })}
                </ItemsCarousel>
              </div>
            </Grid>
          </Container>
        </div>
      </section>
      <Divider
        style={{
          height: "1rem",
        }}
      />
      {characterNames.map((item) => {
        return (
          <Fragment key={item}>
            <div className="character-section">
              <p className="character-name">{item.toUpperCase()}</p>
              <CarouselList name={item} />
            </div>
            <Divider
              style={{
                height: "1rem",
              }}
            />
          </Fragment>
        );
      })}
    </main>
  );
}
