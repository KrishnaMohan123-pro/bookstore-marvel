import React from "react";
import characterNames from "../../utility/characters/data";
import "./styles.css";
import CarouselList from "../../components/carousel/Carousel";
import { Grid, Container } from "@material-ui/core";
import { useSelector } from "react-redux";
import Carousel from "nuka-carousel";
import ProductCard from "../../components/ProductCard/ProductCard";

export default function Books() {
  const newBooks = useSelector((state) => state.newBooks);
  let slidesToShow =
    window.innerWidth > 1000 ? 3 : window.innerWidth > 700 ? 2 : 1;

  return (
    <div>
      <section className="New Arrivals" style={{ margin: "3rem 0" }}>
        <div className="character-section">
          <p className="character-name">New Arrivals</p>
        </div>
        <Container>
          <Grid container>
            <Carousel
              slidesToShow={slidesToShow}
              speed={500}
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
              {newBooks.length === 0
                ? null
                : newBooks.map((book) => {
                    return (
                      <section key={book.book.id}>
                        <ProductCard
                          type="book"
                          img={
                            book.book.image.length === 0
                              ? "http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg"
                              : book.book.image
                          }
                          title={book.book.title}
                          price={book.book.price}
                          id={book.book.id}
                        />
                      </section>
                    );
                  })}
            </Carousel>
          </Grid>
        </Container>
      </section>
      {characterNames.map((item) => {
        return (
          <div className="character-section" key={item}>
            <p className="character-name">{item.toUpperCase()}</p>
            <CarouselList name={item} />
          </div>
        );
      })}
    </div>
  );
}
