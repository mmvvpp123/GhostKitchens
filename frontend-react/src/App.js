import React, { useState, useMemo, useEffect } from "react";
import axios from "axios";
import "./App.css";
import Login from "./components/user/UserLogin";
import Register from "./components/user/UserRegister";
import Home from "./components/Home";
import RestaurantList from "./components/restaurant/RestaurantList";
import Restaurant from "./components/restaurant/Restaurant";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute";
import AddItem from "./components/restaurant/AddItem";
import OwnerRegister from "./components/owner/OwnerRegister";
import OwnerLogin from "./components/owner/OwnerLogin";
import RegisterRestaurant from "./components/owner/RegisterRestaurant";
import RestaurantCreationProvider from "./components/contexts/RestaurantCreationContext";
import { GlobalContext } from "./components/contexts/GlobalContext";
import AddExtraInfo from "./components/cart/AddExtraInfo";
import SubmitOrder from "./components/cart/SubmitOrder";
import Nav from "./components/nav/Nav";

function App() {
  const [jwtToken, setJwtToken] = useState(() => {
    const token = localStorage.getItem("jwt");
    if (!token) {
      return "";
    } else {
      return {
        headers: {
          Authorization: "Bearer " + { token }
        }
      };
    }
  });
  const [name, setName] = useState("");
  const [auth, setAuth] = useState(() => {
    const auth = localStorage.getItem("auth");
    if (auth) {
      return true;
    } else {
      return false;
    }
  });
  const value = { setName, auth, setAuth, name, setJwtToken, jwtToken };
  return (
    <GlobalContext.Provider value={value}>
      <Router>
        <Nav />
        <Switch>
          <ProtectedRoute exact path="/home" component={Home} />
          <Route exact path="/login">
            <Login />
          </Route>
          <Route exact path="/register" component={() => <Register />} />
          <Route exact path="/restaurants" component={RestaurantList} />
          <Route exact path="/restaurants/:id" component={Restaurant} />
          <Route exact path="/owner/register" component={OwnerRegister} />
          <RestaurantCreationProvider>
            <Route exact path="/restaurants/menu/add" component={AddItem} />
            <Route exact path="/owner/login">
              <OwnerLogin />
            </Route>
            <Route exact path="/order/submit" component={SubmitOrder} />
            <Route
              exact
              path="/owner/register/restaurants"
              component={RegisterRestaurant}
            />
          </RestaurantCreationProvider>
          <Route exact path="/addExtraInfo" component={AddExtraInfo} />
        </Switch>
      </Router>
    </GlobalContext.Provider>
  );
}

export default App;
