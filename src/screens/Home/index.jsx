import React from "react";
import "./styles.css";
import StarIcon from "@material-ui/icons/Star";
import { Link } from "react-router-dom";
import Carousel from "react-material-ui-carousel";
import { Grid, Container } from "@material-ui/core";
import topCharacters from "../../utility/characters/homeScreenCharacters";
import { _MARVEL } from "../../utility/sources/sources";
export default function Home() {
  return (
    <section className="home-body">
      <section>
        <Container>
          <section id="home-message">
            <Carousel
              className="home-carousel"
              animation={"slide"}
              autoplay
              interval={5000}
              indicators={true}
              indicatorProps={{
                className: "inactive-indicators",
                style: { color: "white" },
              }}
              activeIndicatorProps={{
                className: "active-indicators",
                style: { color: "black" },
              }}
              navButtonsAlwaysVisible={true}
            >
              {topCharacters.map((character) => {
                return (
                  <section className="home-carousel-section" key={character.id}>
                    <Link
                      to={{
                        pathname: `/character/${character.id}`,
                        search: `?source=${_MARVEL}`,
                      }}
                      style={{ color: "#fff" }}
                    >
                      <Grid container>
                        <Grid item lg={5} md={5} sm={12} xs={12}>
                          <img
                            className="home-screen-character-image"
                            alt={character.name}
                            src={character.image}
                          />
                        </Grid>
                        <Grid
                          item
                          lg={7}
                          md={7}
                          sm={12}
                          xs={12}
                          style={{ padding: "2rem" }}
                        >
                          <p className="home-screen-character-name">
                            {character.name.toUpperCase()}
                          </p>
                        </Grid>
                      </Grid>
                    </Link>
                  </section>
                );
              })}
            </Carousel>
          </section>
        </Container>
      </section>
      <section id="links">
        <div className="container">
          <div className="row no-gutters p-2">
            <div className=" col-sm-4 "></div>
            <div className="links-col col-sm-4 ">
              <Link to="/popular">
                <p>
                  <StarIcon fontSize="large" />
                </p>
                <p className="link-text">Popular and Trending</p>
              </Link>
            </div>
            <div className=" col-sm-4 "></div>
          </div>
        </div>
      </section>
      <Link to="/admin">Admin</Link>
      <br />
      <Link to="/developer">Developer</Link>
    </section>
  );
}
