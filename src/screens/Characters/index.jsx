import React, { useEffect } from "react";
import { Button, Grid, Container, Divider } from "@material-ui/core";
import ProductCard from "../../components/ProductCard/ProductCard";
import Selector from "../../components/Selector/selector";
import "./styles.css";
import { useSelector, useDispatch } from "react-redux";
import Loader from "../../components/Loader/loader";
import { search } from "../../actions/FetchActions/searchAction";
import filterOptions from "../../utility/sortsAndFilters/filter";
import {
  seriesSortOptions,
  comicsSortOptions,
  characterSortOptions,
} from "../../utility/sortsAndFilters/sort";
import { querySearched } from "../../actions/queryActions";
import { useHistory, useLocation } from "react-router-dom";

export default function Characters() {
  const history = useHistory();
  const dispatch = useDispatch();
  const location = useLocation();
  var searchParams = new URLSearchParams(location.search);
  // Query Name
  const query = searchParams.get("query");
  // Query sort
  const sortQuery = searchParams.get("sort");
  // Query Filter
  const filterQuery = searchParams.get("filter");

  const loader = useSelector((state) => state.loader.data);
  const newBooks = useSelector((state) => state.newBooks);
  const searchedNewBooks = newBooks.filter((book) =>
    book.book.title.toLowerCase().startsWith(query.toLowerCase())
  );
  const genericSearchResult = useSelector((state) => state.genericSearch);
  useEffect(() => {
    if (
      location.search.includes("sort") ||
      location.search.includes("filter") ||
      location.search.includes("query")
    ) {
      if (query.length !== 0) {
        dispatch(querySearched(query));
        dispatch(search(query, sortQuery, filterQuery));
        return () => {
          dispatch(querySearched(""));
        };
      }
    }
  }, [dispatch, query, sortQuery, filterQuery, location.search]);

  const sortOptions = () => {
    switch (filterQuery) {
      case "characters":
        return characterSortOptions;
      case "series":
        return seriesSortOptions;
      case "comics":
        return comicsSortOptions;
      default:
        return characterSortOptions;
    }
  };
  function handleSortChange(e) {
    history.push({
      pathname: "/search",
      search: `?query=${query}&sort=${e.target.value}&filter=${filterQuery}`,
    });
  }

  function handleFilterChange(e) {
    history.push({
      pathname: "/search",
      search: `?query=${query}&sort=${"modified"}&filter=${e.target.value}`,
    });
  }

  function clearSortAndFilter() {
    history.push({
      pathname: "/search",
      search: `?query=${query}&sort=${characterSortOptions[1].value}&filter=${filterOptions[0].value}`,
    });
  }
  if (!location.search.includes("sort") || !location.search.includes("filter"))
    return (
      <p>
        PLEASE CHECK THE URL
        <br />
        MAY BE MISSPELLED SORT OR FILTER
      </p>
    );

  if (query.length === 0) {
    return <p>PLEASE ENTER A NAME</p>;
  }

  if (loader) {
    return <Loader />;
  }

  return (
    <section id="searched-body" style={{ marginTop: "1.5rem" }}>
      <Container maxWidth="xl">
        <Grid container spacing={2}>
          <Grid item lg={2} style={{ border: "0.1rem grey solid" }}>
            <Grid container direction="column" spacing={4}>
              <Grid item>
                <span>
                  <Selector
                    options={sortOptions()}
                    onChange={handleSortChange}
                    value={sortQuery}
                    label="SORT"
                  />
                </span>
              </Grid>
              <Grid item>
                <span>
                  <Selector
                    options={filterOptions}
                    onChange={handleFilterChange}
                    value={filterQuery}
                    label="FILTER"
                  />
                </span>
              </Grid>
              <Grid item>
                {sortQuery === "modified" &&
                filterQuery === "characters" ? null : (
                  <Button
                    size="small"
                    onClick={clearSortAndFilter}
                    variant="contained"
                  >
                    Remove
                  </Button>
                )}
              </Grid>
            </Grid>
          </Grid>
          <Grid item lg={10} style={{ border: "0.1rem grey solid" }}>
            <Grid container direction="column">
              <Grid item>
                <p style={{ fontFamily: "Goldman", fontSize: "2rem" }}>
                  Our Collections
                </p>
                {searchedNewBooks.length === 0 ? (
                  <p>
                    <br />
                    No Results Found
                  </p>
                ) : (
                  searchedNewBooks.map((item) => {
                    return (
                      <Grid
                        item
                        key={item.book.id}
                        xl={3}
                        lg={4}
                        md={6}
                        sm={12}
                        xs={12}
                      >
                        <ProductCard
                          type="book"
                          endYear={item.endYear}
                          id={item.book.id}
                          img={item.book.image}
                          price={item.book.price}
                          title={item.name ? item.name : item.book.title}
                          startYear={item.book.startYear}
                        />
                      </Grid>
                    );
                  })
                )}
              </Grid>
              <Divider variant="fullWidth" style={{ margin: "2rem 0" }} />
              <Grid item>
                <p style={{ fontFamily: "Goldman", fontSize: "2rem" }}>
                  Marvel Collection
                </p>
                {loader ? (
                  <Loader />
                ) : genericSearchResult.total === 0 ? (
                  <p>No Data found</p>
                ) : (
                  <div>
                    <Grid container spacing={4}>
                      {genericSearchResult.results.map((item) => {
                        return (
                          <Grid
                            item
                            key={item.id}
                            xl={3}
                            lg={4}
                            md={6}
                            sm={12}
                            xs={12}
                          >
                            <ProductCard
                              type={
                                filterQuery === "characters"
                                  ? "character"
                                  : filterQuery === "comics"
                                  ? "book"
                                  : filterQuery
                              }
                              endYear={item.endYear}
                              id={item.id}
                              img={
                                item.thumbnail.path +
                                "." +
                                item.thumbnail.extension
                              }
                              price={item.prices && item.prices[0].price}
                              title={item.name ? item.name : item.title}
                              startYear={item.startYear}
                            />
                          </Grid>
                        );
                      })}
                    </Grid>
                  </div>
                )}
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </section>
  );
}
