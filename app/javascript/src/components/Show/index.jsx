import React, { useEffect, useState } from "react";

import { Spinner, Typography } from "@bigbinary/neetoui";
import Logger from "js-logger";
import { useParams } from "react-router-dom";

import NotFound from "./NotFound";

import postsApi from "../../apis/posts";

const Show = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [post, setPost] = useState({});
  const { slug } = useParams();

  const fetchPostDetails = async () => {
    try {
      const {
        data: { post },
      } = await postsApi.show(slug);
      setPost(post);
    } catch (error) {
      Logger.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchPostDetails();
  }, []);

  if (isLoading) {
    return (
      <div className="flex h-screen w-screen items-center justify-center">
        <Spinner />
      </div>
    );
  }

  if (!post) {
    return (
      <div className="flex h-full w-full items-center justify-center">
        <NotFound />
      </div>
    );
  }

  return (
    <div className="flex w-full flex-col gap-4 p-10">
      <Typography className="text-gray-200" style="h1" weight="medium">
        {post?.title}
      </Typography>
      <Typography
        className="leading-7 text-gray-300"
        style="body1"
        weight="medium"
      >
        {post?.description}
      </Typography>
    </div>
  );
};

export default Show;
