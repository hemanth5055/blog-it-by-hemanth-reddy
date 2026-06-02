import React from "react";

import { Tag, Typography } from "@bigbinary/neetoui";
import { useParams } from "react-router-dom";

import NotFound from "./NotFound";

import { useFetchCategories } from "../../hooks/reactQuery/useCategoriesApi";
import { useShowPost } from "../../hooks/reactQuery/usePostsApi";
import PageLoader from "../commons/PageLoader";

const Show = () => {
  const { slug } = useParams();

  const { isLoading, data: { data: { post } = {} } = {} } = useShowPost(slug);

  const { data: { data: { categories = [] } = {} } = {} } =
    useFetchCategories();

  if (isLoading) {
    return <PageLoader />;
  }

  if (!post) {
    return (
      <div className="flex h-full w-full items-center justify-center">
        <NotFound />
      </div>
    );
  }

  const postCategories = categories.filter(cat =>
    post.category_ids.includes(cat.id)
  );

  return (
    <div className="flex w-full flex-col gap-4 p-10">
      <Typography className="text-gray-200" style="h1" weight="medium">
        {post?.title}
      </Typography>
      <div className="flex w-full gap-2">
        {postCategories.map(category => (
          <Tag key={category.id} label={category.name} style="secondary" />
        ))}
      </div>
      <Typography
        className="whitespace-pre-line leading-7 text-gray-300"
        style="body1"
        weight="medium"
      >
        {post?.description}
      </Typography>
    </div>
  );
};

export default Show;
