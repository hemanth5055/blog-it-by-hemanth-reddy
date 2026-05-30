import React from "react";

import { Button, Spinner } from "@bigbinary/neetoui";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom/cjs/react-router-dom.min";

import Post from "./Post";

import { useFetchPosts } from "../../hooks/reactQuery/usePostsApi";
import routes from "../../routes";
import AppHeading from "../commons/AppHeading";

const Home = () => {
  const { isLoading, data: { data: { posts = [] } = {} } = {} } =
    useFetchPosts();

  const { t } = useTranslation();

  if (isLoading) {
    <div className="flex h-full w-full flex-col gap-5">
      <AppHeading title={t("titles.blogPosts")} />
      <div className="flex w-full flex-col items-center gap-3">
        <Spinner />
      </div>
    </div>;
  }

  return (
    <div className="flex h-full w-full flex-col gap-5">
      <div className="flex w-full items-center justify-between pb-4">
        <AppHeading title={t("titles.blogPosts")} />
        <Link to={routes.create}>
          <Button
            className="font-semibold"
            label={t("labels.addNewBlogPost")}
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
