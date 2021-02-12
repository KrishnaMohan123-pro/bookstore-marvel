import React from "react";
import "./styles.css";
import StarIcon from "@material-ui/icons/Star";
import FlashOnIcon from "@material-ui/icons/FlashOn";
import BookIcon from "@material-ui/icons/Book";
import ViewColumnIcon from "@material-ui/icons/ViewColumn";
import { Link } from "react-router-dom";
import Carousel from "react-material-ui-carousel";
import { Grid, Container } from "@material-ui/core";
import topCharacters from "../../utility/characters/homeScreenCharacters";
import { _MARVEL } from "../../utility/sources/sources";
import { _CHARACTER, _SERIES, _BOOK } from "../../utility/sources/itemTypes";
import NavigationCard from "../../components/NavigationCard/navigationCard";
export default function Home() {
  return (
    <main className="home-body">
      <section id="latest">
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
      <section id="popular-and-trending">
        <h3>Find Your Popular Comics</h3>
        <Container maxWidth="md">
          <Grid container>
            <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
              <NavigationCard
                icon={<StarIcon style={{ fontSize: "5rem" }} />}
                navigateTo="/popular"
                cardTitle="Popular And Trending"
              />
            </Grid>
          </Grid>
        </Container>
      </section>
      <section id="categories">
        <h3>Our Categories</h3>
        <Container>
          <Grid container>
            <Grid item xl={4} lg={4} md={4} sm={12} xs={12}>
              <NavigationCard
                icon={<FlashOnIcon style={{ fontSize: "5rem" }} />}
                navigateTo="/all"
                search={`?itemCategory=${_CHARACTER}`}
                cardTitle="Characters"
              />
            </Grid>
            <Grid item xl={4} lg={4} md={4} sm={12} xs={12}>
              <NavigationCard
                icon={<ViewColumnIcon style={{ fontSize: "5rem" }} />}
                navigateTo="/all"
                search={`?itemCategory=${_SERIES}`}
                cardTitle="Series"
              />
            </Grid>
            <Grid item xl={4} lg={4} md={4} sm={12} xs={12}>
              <NavigationCard
                icon={<BookIcon style={{ fontSize: "5rem" }} />}
                navigateTo="/all"
                search={`?itemCategory=${_BOOK}`}
                cardTitle="Comics"
              />
            </Grid>
          </Grid>
        </Container>
      </section>
    </main>
  );
}
