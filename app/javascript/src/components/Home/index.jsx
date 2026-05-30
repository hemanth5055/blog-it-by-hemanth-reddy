import React from "react";

import { Button, Spinner } from "@bigbinary/neetoui";
import { Link } from "react-router-dom/cjs/react-router-dom.min";

import Post from "./Post";

import { useFetchPosts } from "../../hooks/reactQuery/usePostsApi";
import routes from "../../routes";
import AppHeading from "../commons/AppHeading";

const Home = () => {
  const { isLoading, data: { data: { posts = [] } = {} } = {} } =
    useFetchPosts();

  if (isLoading) {
    <div className="flex h-full w-full flex-col gap-5">
      <AppHeading title="Blog Posts" />
      <div className="flex w-full flex-col items-center gap-3">
        <Spinner />
      </div>
    </div>;
  }

  return (
    <div className="flex h-full w-full flex-col gap-5">
      <div className="flex w-full items-center justify-between pb-4">
        <AppHeading title="Blog posts" />
        <Link to={routes.create}>
          <Button
            className="font-semibold"
            label="Add new blog post"
            style="primary"
          />
        </Link>
      </div>
      <div className="flex w-full flex-col items-center gap-3 overflow-y-scroll">
        {posts.map(post => (
          <Post
            createdAt={post.createdAt}
            description={post.description}
            key={post.id}
            slug={post.slug}
            title={post.title}
          />
        ))}
      </div>
    </div>
  );
};

export default Home;
