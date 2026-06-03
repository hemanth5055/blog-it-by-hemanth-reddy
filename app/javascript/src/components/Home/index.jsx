import React, { useState } from "react";

import { isNotEmpty } from "@bigbinary/neeto-cist";
import { Category } from "@bigbinary/neeto-icons";
import { Button, NoData, Spinner } from "neetoui";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom/cjs/react-router-dom.min";

import Post from "./Post";

import { useFetchPosts } from "../../hooks/reactQuery/usePostsApi";
import routes from "../../routes";
import { useCategoryStore } from "../../stores/useCategoryStore";
import CategorySidebar from "../Category";
import { AppHeading } from "../commons";

const Home = () => {
  const [showCategories, setShowCategories] = useState(false);

  const { selectedCategories } = useCategoryStore();

  const { isLoading, data: { posts = [] } = {} } =
    useFetchPosts(selectedCategories);

  const { t } = useTranslation();

  if (isLoading) {
    return (
      <>
        <div className="flex h-full w-full flex-col gap-5 p-7">
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
          <div className="flex w-full flex-col items-center gap-3">
            <Spinner />
          </div>
        </div>
        <CategorySidebar
          setShowCategories={setShowCategories}
          showCategories={showCategories}
        />
      </>
    );
  }

  return (
    <>
      <div className="flex h-full w-full flex-col gap-5 p-7">
        <div className="flex w-full items-center justify-between pb-4">
          <AppHeading title={t("titles.blogPosts")} />
          <div className="flex gap-4">
            <Button
              icon={Category}
              style="text"
              tooltipProps={{
                content: t("tooltips.viewAndAddCategories"),
                position: "bottom",
              }}
              onClick={() => setShowCategories(true)}
            />
            <Button
              className="font-semibold"
              label={t("labels.addNewBlogPost")}
              style="primary"
              to={routes.create}
            />
          </div>
        </div>
        <div className="flex h-full w-full flex-col items-center gap-3 overflow-y-scroll">
          {isNotEmpty(posts) ? (
            posts.map(post => (
              <Post
                author={post.author}
                categories={post.categories}
                createdAt={post.createdAt}
                description={post.description}
                key={post.id}
                slug={post.slug}
                title={post.title}
              />
            ))
          ) : (
            <div className="flex h-full w-full items-center justify-center">
              <NoData
                className="font-medium"
                description={t("messages.noBlogPosts")}
                title={t("titles.noBlogPostsAvailable")}
              />
            </div>
          )}
        </div>
      </div>
      <CategorySidebar
        setShowCategories={setShowCategories}
        showCategories={showCategories}
      />
    </>
  );
};

export default Home;
