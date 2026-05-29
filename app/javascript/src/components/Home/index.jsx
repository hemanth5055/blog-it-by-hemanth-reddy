import React, { useEffect, useState } from "react";

import { Spinner } from "@bigbinary/neetoui";
import Logger from "js-logger";

import Post from "./Post";

import postsApi from "../../apis/posts";
import AppHeading from "../commons/AppHeading";

const Home = () => {
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchPosts = async () => {
    try {
      const {
        data: { posts },
      } = await postsApi.fetch();
      Logger.log(posts);
      setPosts(posts);
      setIsLoading(false);
    } catch (error) {
      Logger.error(error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

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
      <AppHeading title="Blog Posts" />
      <div className="flex w-full flex-col items-center gap-3">
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
