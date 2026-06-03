import React from "react";

import { QueryClientProvider } from "react-query";
import { Route, Switch, BrowserRouter as Router } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import "./common/i18n";
import Login from "./components/Authentication/Login";
import Signup from "./components/Authentication/Signup";
import { Create } from "./components/Create";
import Home from "./components/Home";
import Show from "./components/Show";
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
            <Route exact component={Show} path={routes.show} />
            <Route exact component={Create} path={routes.create} />
            <Route exact component={Home} path={routes.root} />
            <Route exact component={Signup} path={routes.signup} />
            <Route exact component={Login} path={routes.login} />
          </Switch>
        </div>
      </div>
    </Router>
  </QueryClientProvider>
);

export default App;
