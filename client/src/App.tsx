import * as React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./Home";
import Favorites from "./Favorites";
import NavBar from "./components/NavBar";

export default function App(): JSX.Element {
  return (
    <BrowserRouter>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/favorites" element={<Favorites />}></Route>
      </Routes>
    </BrowserRouter>
  );
}
