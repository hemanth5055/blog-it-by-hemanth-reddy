import React from "react";

import { QueryClientProvider } from "react-query";
import { Route, Switch, BrowserRouter as Router } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import "./common/i18n";
import Login from "./components/Authentication/Login";
import Signup from "./components/Authentication/Signup";
import WithSidebar from "./components/commons/withSidebar";
import { Create } from "./components/Create";
import Home from "./components/Home";
import Show from "./components/Show";
import routes from "./routes";
import queryClient from "./utils/queryClient";

const ShowWithSidebar = WithSidebar(Show);
const CreateWithSidebar = WithSidebar(Create);
const HomeWithSidebar = WithSidebar(Home);

const App = () => (
  <QueryClientProvider client={queryClient}>
    <Router>
      <ToastContainer />
      <div className="h-screen w-full overflow-hidden">
        <Switch>
          <Route exact component={ShowWithSidebar} path={routes.show} />
          <Route exact component={CreateWithSidebar} path={routes.create} />
          <Route exact component={HomeWithSidebar} path={routes.root} />
          <Route exact component={Signup} path={routes.signup} />
          <Route exact component={Login} path={routes.login} />
          <Route exact path="/about" render={() => <div>About</div>} />
        </Switch>
      </div>
    </Router>
  </QueryClientProvider>
);

export default App;
