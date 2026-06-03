import React from "react";

import { QueryClientProvider } from "react-query";
import { Route, Switch, BrowserRouter as Router } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import "./common/i18n";
import Login from "./components/Authentication/Login";
import Signup from "./components/Authentication/Signup";
import { PrivateRoutes } from "./components/commons";
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
            <Route exact component={Login} path={routes.login} />
            <Route exact component={Signup} path={routes.signup} />
            <PrivateRoutes />
          </Switch>
        </div>
      </div>
    </Router>
  </QueryClientProvider>
);

export default App;
