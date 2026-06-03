import React from "react";

import { isNil, isEmpty, either } from "ramda";
import { Redirect, Route } from "react-router-dom";

import routes from "../../routes";
import { getFromLocalStorage } from "../../utils/storage";

const PublicButRestrictedWhenLoggedIn = ({ component: Component, ...rest }) => {
  const authToken = getFromLocalStorage("authToken");
  const isLoggedIn = !either(isNil, isEmpty)(authToken);

  return (
    <Route
      {...rest}
      render={props =>
        !isLoggedIn ? <Component {...props} /> : <Redirect to={routes.root} />
      }
    />
  );
};

export default PublicButRestrictedWhenLoggedIn;
