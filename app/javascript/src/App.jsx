import React from "react";

import { Route, Switch, BrowserRouter as Router } from "react-router-dom";

import { Create } from "./components/Create";
import Home from "./components/Home";
import Sidebar from "./components/Sidebar";
import routes from "./routes";

const App = () => (
  <Router>
    <div className="flex h-screen w-full">
      <div className="h-full w-[5%] bg-[#171717] px-2 py-5">
        <Sidebar />
      </div>
      <div className="h-full w-[95%] p-5">
        <Switch>
          <Route exact component={Create} path={routes.create} />
          <Route exact component={Home} path={routes.root} />
          <Route exact path="/about" render={() => <div>About</div>} />
        </Switch>
      </div>
    </div>
  </Router>
);

export default App;
