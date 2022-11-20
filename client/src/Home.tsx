import { Alert, CircularProgress } from "@mui/material";
import React from "react";
import { useEffect, useState } from "react";
import PokeCardList from "./components/PokeCardList";
import "./styles.css";

const Home = () => {
  const [pokemonList, setPokemonList] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>();

  useEffect(() => {
    setIsLoading(true);
    fetch("https://ps94fl-5000.preview.csb.app/api")
      .then((response) => response.json())
      .then((data) => {
        console.log({ data });
      });
    fetch("https://pokeapi.co/api/v2/pokemon/")
      .then((response) => response.json())
      .then((data) => {
        setPokemonList(data.results);
        setIsLoading(false);
      })
      .catch((error: unknown) => {
        const errorMessage =
          error instanceof Error ? error.message : "Something went wrong";
        setIsLoading(false);
        setError(errorMessage);
      });
  }, []);

  const loaderView = isLoading && <CircularProgress className="fixed-center" />;
  const errorView = error && <Alert severity="error">{error}</Alert>;
  const pokemonListView = !isLoading && !error && (
    <PokeCardList pokemonList={pokemonList} />
  );
  return (
    <>
      {loaderView}
      {errorView}
      {pokemonListView}
    </>
  );
};

export default Home;
