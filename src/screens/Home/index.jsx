import React, { useEffect } from "react";
import "./styles.css";
import StarIcon from "@material-ui/icons/Star";
import FlashOnIcon from "@material-ui/icons/FlashOn";
import BookIcon from "@material-ui/icons/Book";
import ViewColumnIcon from "@material-ui/icons/ViewColumn";
import { Link } from "react-router-dom";
import { Grid } from "@material-ui/core";
import topCharacters from "../../utility/characters/homeScreenCharacters";
import { _MARVEL } from "../../utility/sources/sources";
import { _CHARACTER, _SERIES, _BOOK } from "../../utility/sources/itemTypes";
import NavigationCard from "../../components/NavigationCard/navigationCard";
import ItemsCarousel from "react-items-carousel";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";
import { IconButton } from "@material-ui/core";
export default function Home() {
  const [activeItemIndex, setActiveItemIndex] = React.useState(0);
  useEffect(() => {
    setInterval(() => {
      setActiveItemIndex((prevValue) => {
        return (prevValue + 1) % 5;
      });
    }, 5000);
  }, [setActiveItemIndex]);

  return (
    <main className="home-body">
      <section id="latest">
        <section id="latest-carousel">
          <div
            style={{
              padding: 0,
              maxWidth: window.innerWidth < 700 ? "100%" : "90%",
              margin: "0 auto",
            }}
          >
            <ItemsCarousel
              requestToChangeActive={setActiveItemIndex}
              activeItemIndex={activeItemIndex}
              infiniteLoop={true}
              gutter={1}
              activePosition={"center"}
              chevronWidth={60}
              disableSwipe={false}
              alwaysShowChevrons={false}
              numberOfCards={1}
              slidesToScroll={1}
              outsideChevron={true}
              showSlither={false}
              firstAndLastGutter={false}
              rightChevron={
                navigator.maxTouchPoints > 0 ? null : (
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
                navigator.maxTouchPoints > 0 ? null : (
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
              {topCharacters.map((character) => {
                return (
                  <section className="home-carousel-section" key={character.id}>
                    <Link
                      to={{
                        pathname: `/character/${character.id}`,
                        search: `?source=${_MARVEL}`,
                      }}
                    >
                      <Grid container>
                        <Grid item xl={5} lg={5} md={5} sm={5} xs={12}>
                          <img
                            className="home-screen-character-image"
                            alt={character.name}
                            src={character.image}
                          />
                        </Grid>
                        <Grid item xl={7} lg={7} md={7} sm={7} xs={12}>
                          <p className="home-screen-character-name">
                            {character.name.toUpperCase()}
                          </p>
                        </Grid>
                      </Grid>
                    </Link>
                  </section>
                );
              })}
            </ItemsCarousel>
          </div>
        </section>
      </section>
      <section id="popular-and-trending">
        <div className="bg-section-1"></div>
        <Grid container className="section-content">
          {window.innerWidth < 769 ? (
            <Grid item xl={8} lg={8} md={8} sm={12} xs={12}>
              <NavigationCard
                icon={<StarIcon style={{ fontSize: "9rem" }} />}
                navigateTo="/popular"
                cardTitle="Popular And Trending"
              />
            </Grid>
          ) : null}
          <Grid
            item
            xl={4}
            lg={4}
            md={4}
            sm={12}
            xs={12}
            style={{ alignSelf: "center" }}
          >
            <div className="section-heading-box">
              <p className="section-heading">Find Your Popular Comics</p>
              <p className="section-subheading">
                ut diam quam nulla porttitor massa id neque aliquam vestibulum
                morbi blandit cursus risus at
              </p>
            </div>
          </Grid>
          {window.innerWidth > 768 ? (
            <Grid item xl={8} lg={8} md={8} sm={12} xs={12}>
              <NavigationCard
                icon={<StarIcon style={{ fontSize: "9rem" }} />}
                navigateTo="/popular"
                cardTitle="Popular And Trending"
              />
            </Grid>
          ) : null}
        </Grid>
      </section>
      <section id="categories">
        <div className="bg-section-2"></div>
        <Grid container className="section-content">
          <Grid item xl={8} lg={8} md={8} sm={12} xs={12}>
            <NavigationCard
              icon={<FlashOnIcon style={{ fontSize: "9rem" }} />}
              navigateTo="/all"
              search={`?itemCategory=${_CHARACTER}`}
              cardTitle="Characters"
            />
          </Grid>
          <Grid
            item
            xl={4}
            lg={4}
            md={4}
            sm={12}
            xs={12}
            style={{ alignSelf: "center" }}
          >
            <div className="section-heading-box">
              <p className="section-heading">Find All Characters</p>
              <p className="section-subheading">
                Anim minim cillum pariatur duis fugiat cillum.
              </p>
            </div>
          </Grid>
        </Grid>
      </section>
      <section id="categories">
        <div className="bg-section-1"></div>
        <Grid container className="section-content">
          {window.innerWidth < 769 ? (
            <Grid item xl={8} lg={8} md={8} sm={12} xs={12}>
              <NavigationCard
                icon={<ViewColumnIcon style={{ fontSize: "9rem" }} />}
                navigateTo="/all"
                search={`?itemCategory=${_SERIES}`}
                cardTitle="Series"
              />
            </Grid>
          ) : null}
          <Grid
            item
            xl={4}
            lg={4}
            md={4}
            sm={12}
            xs={12}
            style={{ alignSelf: "center" }}
          >
            <div className="section-heading-box">
              <p className="section-heading">Find All Series</p>
              <p className="section-subheading">
                Consectetur aliqua occaecat sint exercitation nisi sint non.
              </p>
            </div>
          </Grid>
          {window.innerWidth > 768 ? (
            <Grid item xl={8} lg={8} md={8} sm={12} xs={12}>
              <NavigationCard
                icon={<ViewColumnIcon style={{ fontSize: "9rem" }} />}
                navigateTo="/all"
                search={`?itemCategory=${_SERIES}`}
                cardTitle="Series"
              />
            </Grid>
          ) : null}
        </Grid>
      </section>
      <section id="categories">
        <div className="bg-section-2"></div>
        <Grid container className="section-content">
          <Grid item xl={8} lg={8} md={8} sm={12} xs={12}>
            <NavigationCard
              icon={<BookIcon style={{ fontSize: "9rem" }} />}
              navigateTo="/all"
              search={`?itemCategory=${_BOOK}`}
              cardTitle="Comics"
            />
          </Grid>
          <Grid
            item
            xl={4}
            lg={4}
            md={4}
            sm={12}
            xs={12}
            style={{ alignSelf: "center" }}
          >
            <div className="section-heading-box">
              <p className="section-heading">Find All Comics</p>
              <p className="section-subheading">
                Enim duis culpa consectetur id nulla adipisicing minim.
              </p>
            </div>
          </Grid>
        </Grid>
      </section>
    </main>
  );
}
