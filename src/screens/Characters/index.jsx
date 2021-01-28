import React, { useState, useEffect } from "react";
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
import { useLocation } from "react-router-dom";

export default function Characters() {
  const dispatch = useDispatch();
  const location = useLocation();
  const query = location.search.slice(7);
  const loader = useSelector((state) => state.loader.data);
  const newBooks = useSelector((state) => state.newBooks);
  const searchedNewBooks = newBooks.filter((book) =>
    book.book.title.toLowerCase().startsWith(query.toLowerCase())
  );
  console.log(newBooks, searchedNewBooks);
  const [filter, setFilter] = useState("characters");
  const [sort, setSort] = useState("modified");
  const genericSearchResult = useSelector((state) => state.genericSearch);
  useEffect(() => {
    if (query.length !== 0) {
      dispatch(querySearched(query));
      dispatch(search(query, sort, filter));
      return () => {
        dispatch(querySearched(""));
      };
    }
  }, [dispatch, query, sort, filter]);
  const sortOptions =
    filter === "characters"
      ? characterSortOptions
      : filter === "comics"
      ? comicsSortOptions
      : seriesSortOptions;
  function handleSortChange(e) {
    setSort(e.target.value);
  }
  function handleFilterChange(e) {
    setSort("modified");
    setFilter(e.target.value);
  }
  function clearSortAndFilter() {
    setSort("");
    setFilter("characters");
  }
  if (query.length === 0) {
    return <p>PLEASE ENTER A NAME</p>;
  }
  if (loader) {
    return <Loader />;
  }
  if (genericSearchResult.total === 0) {
    return <p>No Data found</p>;
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
                    options={sortOptions}
                    onChange={handleSortChange}
                    value={sort}
                    label="SORT"
                  />
                </span>
              </Grid>
              <Grid item>
                <span>
                  <Selector
                    options={filterOptions}
                    onChange={handleFilterChange}
                    value={filter}
                    label="FILTER"
                  />
                </span>
              </Grid>
              <Grid item>
                {sort.length === 0 || filter === "characters" ? null : (
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
            <Grid container direction="row">
              <Grid item>
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
                                filter === "characters"
                                  ? "character"
                                  : filter === "comics"
                                  ? "book"
                                  : filter
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
            <Divider variant="fullWidth" />
            <Grid item>
              <p style={{ fontFamily: "Goldman", fontSize: "2rem" }}>
                Our Collections
              </p>
              {searchedNewBooks.length === 0
                ? "No Results Found"
                : searchedNewBooks.map((item) => {
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
                  })}
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </section>
  );
}
