import * as React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./Home";
import Favorites from "./Favorites";
import NavBar from "./components/NavBar";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from './utils/react-query/queryClient';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import ErrorBoundary from "./ErrorBoundary";
import { SnackbarProvider } from "notistack";


export default function App(): JSX.Element {
  return (
    <QueryClientProvider client={queryClient}>
      <ErrorBoundary>
        <ReactQueryDevtools initialIsOpen={false} />
        <SnackbarProvider maxSnack={3}>
          <BrowserRouter>
            <NavBar />
            <Routes>
              <Route path="/" element={<Home />}></Route>
              <Route path="/favorites" element={<Favorites />}></Route>
            </Routes>
          </BrowserRouter>
        </SnackbarProvider>
      </ErrorBoundary>
    </QueryClientProvider>
  );
}
