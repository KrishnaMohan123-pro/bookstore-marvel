import React, { Fragment } from "react";
import characterNames from "../../utility/characters/data";
import "./styles.css";
import CarouselList from "../../components/carousel/Carousel";
import { Grid, Container, Divider } from "@material-ui/core";
import { useSelector } from "react-redux";
import Carousel from "nuka-carousel";
import ProductCard from "../../components/ProductCard/ProductCard";
import Loader from "../../components/Loader/loader";
import { _OUR_COLLECTION } from "../../utility/sources/sources";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";

export default function Books() {
  const newBooks = useSelector((state) => state.newBooks);
  const loader = useSelector((state) => state.loader.profile);
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
    <section>
      <section className="new-arrivals" style={{ margin: "3rem 0" }}>
        <div className="character-section">
          <p className="character-name">New Arrivals</p>
        </div>
        <Container>
          <Grid container>
            <Carousel
              slidesToShow={slidesToShow}
              speed={200}
              dragging={false}
              autoGenerateStyleTag={true}
              pauseOnHover={true}
              wrapAround={true}
              width={"100%"}
              scrollMode={"page"}
              defaultControlsConfig={{
                nextButtonText: <ArrowForwardIosIcon />,
                prevButtonText: <ArrowBackIosIcon />,
                pagingDotsStyle: {
                  fill: "black",
                },
              }}
            >
              {newBooks.length === 0
                ? null
                : newBooks.map((item) => {
                    return (
                      <section key={item.id}>
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
                      </section>
                    );
                  })}
            </Carousel>
          </Grid>
        </Container>
      </section>
      <Divider />
      {characterNames.map((item) => {
        return (
          <Fragment key={item}>
            <div className="character-section" style={{ margin: "3rem 0" }}>
              <p className="character-name">{item.toUpperCase()}</p>
              <CarouselList name={item} />
            </div>
            <Divider />
          </Fragment>
        );
      })}
    </section>
  );
}
