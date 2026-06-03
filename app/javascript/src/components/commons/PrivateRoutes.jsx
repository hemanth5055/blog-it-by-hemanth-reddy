import React from "react";

import { isNil, isEmpty, either } from "ramda";
import { Redirect, Route } from "react-router-dom";
import { Switch } from "react-router-dom/cjs/react-router-dom.min";

import PageNotFound from "./PageNotFound";

import routes from "../../routes";
import { getFromLocalStorage } from "../../utils/storage";
import { Create } from "../Create";
import Home from "../Home";
import Show from "../Show";

const PrivateRoutes = () => {
  const authToken = getFromLocalStorage("authToken");
  const isLoggedIn = !either(isNil, isEmpty)(authToken);
  if (!isLoggedIn) {
    return <Redirect to={routes.login} />;
  }

  return (
    <Switch>
      <Route exact component={Create} path={routes.create} />
      <Route exact component={Show} path={routes.show} />
      <Route exact component={Home} path={routes.root} />
      <Route component={PageNotFound} path="*" />
    </Switch>
  );
};

export default PrivateRoutes;
