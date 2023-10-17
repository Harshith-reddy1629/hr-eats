import { Routes, Route, Navigate } from "react-router-dom";

import Cookies from "js-cookie";

import "./App.css";
import Home from "./components/Home";
import Login from "./components/Login";
// import RestaurantDetails from "./components/RestaurantDetails";
import RestaurantRedirector from "./components/RestaurantRedirector";
import Cart from "./components/Cart";

function App() {
  const isValidUser = !Cookies.get("jwt_token");
  return (
    <>
      {/* <Link
        to="/"
      >
        Home
      </Link>
      <Link to="/login">
        login
      </Link> */}
      <Routes>
        <Route
          exact
          path="/"
          element={isValidUser ? <Navigate to="/login" /> : <Home />}
        />
        <Route exact path="/login" element={<Login />} />
        <Route
          exact
          path="/restaurant/:id"
          element={
            isValidUser ? <Navigate to="/login" /> : <RestaurantRedirector />
          }
        />
        <Route
          exact
          path="/cart"
          element={isValidUser ? <Navigate to="/login" /> : <Cart />}
        />
      </Routes>
    </>
  );
}

export default App;
