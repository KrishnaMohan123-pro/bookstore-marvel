import React from "react";
import "./styles.css";
import StarIcon from "@material-ui/icons/Star";
import { Link } from "react-router-dom";
import Carousel from "nuka-carousel";
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
              autoplay
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
              {topCharacters.map((character) => {
                return (
                  <section key={character.id} style={{ padding: "3rem" }}>
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
