// This is used to determine if a user is authenticated and
// if they are allowed to visit the page they navigated to.

// If they are: they proceed to the page
// If not: they are redirected to the login page.
import React from "react";
import { Redirect, Route } from "react-router-dom";
import Axios from "axios";
import { useState, useEffect } from "react";
const PrivateRoute = ({
  component: Component,
  ...rest
}) => {
  const isLoggedIn = localStorage.getItem("isLoggedIn")
  return (
    <Route
      {...rest}
      render={(props) =>
        isLoggedIn ? (
          <Component {...props} />
        ) : (
           <Redirect to="/login" />
        )
      }
    />
  );
};

export default PrivateRoute;
