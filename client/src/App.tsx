import * as React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import AllPokemon from "./views/AllPokemon";
import Favorites from "./views/Favorites";
import NavBar from "./components/NavBar";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from './utils/react-query/queryClient';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import ErrorBoundary from "./ErrorBoundary";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Users from "./views/Users";

export default function App(): JSX.Element {
  return (
    <QueryClientProvider client={queryClient}>
      <ErrorBoundary>
        <ReactQueryDevtools initialIsOpen={false} />
        <BrowserRouter>
          <NavBar />
          <Routes>
            <Route path="/" element={<Users />}></Route>
            <Route path="/all-pokemon" element={<AllPokemon />}></Route>
            <Route path="/favorites" element={<Favorites />}></Route>
          </Routes>
        </BrowserRouter>
        <ToastContainer />
    </ErrorBoundary>
    </QueryClientProvider >
  );
}
