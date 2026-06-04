import React from "react";

import { Edit } from "@bigbinary/neeto-icons";
import dayjs from "dayjs";
import { Tag, Typography, Avatar, Button } from "neetoui";
import { useParams } from "react-router-dom";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

import { useShowPost } from "../../../hooks/reactQuery/usePostsApi";
import routes from "../../../routes";
import PageLoader from "../../commons/PageLoader";
import NotFound from "../commons/NotFound";

const Show = () => {
  const { slug } = useParams();

  const history = useHistory();

  const { isLoading, data: { post = null } = {} } = useShowPost(slug);

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
    <div className="flex h-full w-full flex-col gap-3 p-10">
      <div className="flex w-full items-center justify-between pl-5">
        <div className="flex w-full gap-2">
          {post?.categories?.map(category => (
            <Tag key={category.id} label={category.name} style="secondary" />
          ))}
        </div>
        {post?.isOwner && (
          <Button
            icon={Edit}
            style="secondary"
            onClick={() => {
              history.push(routes.edit.replace(":slug", slug));
            }}
          />
        )}
      </div>
      <Typography className="text-gray-200" style="h1" weight="medium">
        {post?.title}
      </Typography>
      <div className="flex w-full items-center gap-2 pb-2">
        <div>
          <Avatar user={{ name: "Hello" }} />
        </div>
        <div className="flex flex-col">
          <Typography className="text-gray-400" style="body2" weight="medium">
            {post.user.name}
          </Typography>
          <Typography className="text-gray-400" style="body2" weight="medium">
            {dayjs(post.createdAt).format("MMM D, YYYY")}
          </Typography>
        </div>
      </div>
      <div className="h-full w-full overflow-y-scroll whitespace-pre-line">
        <Typography
          className="whitespace-pre-line leading-7 text-gray-300"
          style="body1"
          weight="medium"
        >
          {post?.description}
        </Typography>
      </div>
    </div>
  );
};

export default Show;
