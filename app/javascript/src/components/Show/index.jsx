import React from "react";

import dayjs from "dayjs";
import { Tag, Typography } from "neetoui";
import { useParams } from "react-router-dom";

import NotFound from "./NotFound";

import { useShowPost } from "../../hooks/reactQuery/usePostsApi";
import PageLoader from "../commons/PageLoader";

const Show = () => {
  const { slug } = useParams();

  const { isLoading, data: { data: { post } = {} } = {} } = useShowPost(slug);

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

  return (
    <div className="flex w-full flex-col gap-3 p-10">
      <div className="flex w-full gap-2">
        {post?.categories?.map(category => (
          <Tag key={category.id} label={category.name} style="secondary" />
        ))}
      </div>
      <Typography className="text-gray-200" style="h1" weight="medium">
        {post?.title}
      </Typography>
      <div className="flex w-full gap-2 pb-2">
        <Typography className="text-gray-400" style="body2" weight="medium">
          {post.user.name} •
        </Typography>
        <Typography className="text-gray-400" style="body2" weight="medium">
          {dayjs(post.createdAt).format("MMM D, YYYY")}
        </Typography>
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
