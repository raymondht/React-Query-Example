import { Alert, CircularProgress } from "@mui/material";
import React from "react";
import { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroller";

import PokeCardList from "../components/PokeCardList";
import "../styles.css";
import useInfinitePokemon from "../utils/react-query/query/pokemon/useInfinitePokemon";

const AllPokemon = () => {
  const {
    data: pokemonFetchResult,
    isLoading: isLoadingAllPokemon,
    error: errorLoadingAllPokemon,
    isFetching: isFetchingMorePokemon,
    fetchNextPage,
    hasNextPage
  } = useInfinitePokemon();
  const loaderView = isLoadingAllPokemon && <CircularProgress className="fixed-center" />;
  const errorView = errorLoadingAllPokemon && <Alert severity="error">{errorLoadingAllPokemon.errorMessage}</Alert>

  const fetchingIndicator = isFetchingMorePokemon && <div style={{position: 'fixed', top: '5px', right: '3px'}}>Loading...</div>

  const pokemonListView = pokemonFetchResult && (
    <InfiniteScroll
      loadMore={(fetchNextPage as any)}
      hasMore={hasNextPage}
    >
       {pokemonFetchResult.pages.map((pageData, index) => {
          return <PokeCardList key={index} pokemonList={pageData.results} />
      })}
    </InfiniteScroll>
  );

  return (
    <>
      {fetchingIndicator}
      {errorView}
      {loaderView}
      {pokemonListView}
    </>
  );
};

export default AllPokemon;
