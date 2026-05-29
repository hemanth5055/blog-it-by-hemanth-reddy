import React from "react";

import Post from "./Post";

import AppHeading from "../commons/AppHeading";

const Home = () => (
  <div className="flex h-full w-full flex-col gap-5">
    <AppHeading title="Blog Posts" />
    <div className="flex w-full flex-col items-center gap-3">
      <Post />
    </div>
  </div>
);

export default Home;
