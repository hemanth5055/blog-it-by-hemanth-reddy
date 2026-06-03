import React from "react";

import { QueryClientProvider } from "react-query";
import { Route, Switch, BrowserRouter as Router } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import "./common/i18n";
import Login from "./components/Authentication/Login";
import Signup from "./components/Authentication/Signup";
import {
  PageNotFound,
  ProtectedRoute,
  PublicRestrictedRoute,
} from "./components/commons";
import Home from "./components/Home";
import Create from "./components/Post/Create";
import Show from "./components/Post/Show";
import Sidebar from "./components/Sidebar";
import routes from "./routes";
import queryClient from "./utils/queryClient";

const App = () => (
  <QueryClientProvider client={queryClient}>
    <Router>
      <ToastContainer />
      <div className="flex h-screen w-full ">
        <Sidebar />
        <div className="h-full w-full overflow-hidden">
          <Switch>
            <ProtectedRoute exact component={Home} path={routes.root} />
            <ProtectedRoute exact component={Create} path={routes.create} />
            <ProtectedRoute exact component={Show} path={routes.show} />
            <PublicRestrictedRoute
              exact
              component={Signup}
              path={routes.signup}
            />
            <PublicRestrictedRoute
              exact
              component={Login}
              path={routes.login}
            />
            <Route component={PageNotFound} path="*" />
          </Switch>
        </div>
      </div>
    </Router>
  </QueryClientProvider>
);

export default App;
