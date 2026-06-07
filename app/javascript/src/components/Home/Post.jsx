import React from "react";

import classNames from "classnames";
import dayjs from "dayjs";
import { useUpdateVote } from "hooks/reactQuery/useVotesApi";
import { UpArrow, DownArrow } from "neetoicons";
import { Tag, Typography, Avatar, Button } from "neetoui";
import { Link } from "react-router-dom";
import queryClient from "utils/queryClient";

import { QUERY_KEYS } from "../../constants/query";

const Post = ({
  id,
  title,
  updatedAt,
  slug,
  categories = [],
  author,
  netVotes,
  currentVote,
}) => {
  const { mutate: updateVote } = useUpdateVote();
  const handleUpdateVote = vote => {
    if (currentVote === vote) return;

    updateVote(
      { postId: id, voteType: vote },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({
            queryKey: [QUERY_KEYS.POSTS],
            refetchType: "active",
          });
        },
      }
    );
  };

  return (
    <>
      <div className="flex w-[75%] justify-between">
        <div className="flex flex-col gap-2 p-3">
          <div className="flex items-center gap-2">
            {categories.map(category => (
              <Tag key={category.id} label={category.name} style="secondary" />
            ))}
          </div>
          <Link to={`/posts/${slug}/show`}>
            <Typography
              className="hover:neeto-ui-text-primary-500"
              style="h2"
              weight="semibold"
            >
              {title}
            </Typography>
          </Link>
          <div className="flex w-full items-center gap-3">
            <div>
              <Avatar user={{ name: author.name }} />
            </div>
            <div className="flex flex-col">
              <Typography
                className="text-gray-400"
                style="body2"
                weight="medium"
              >
                {author.name}
              </Typography>
              <Typography
                className="text-gray-400"
                style="body2"
                weight="medium"
              >
                {dayjs(updatedAt).format("MMM D, YYYY")}
              </Typography>
            </div>
          </div>
        </div>
        <div className="flex flex-col items-center justify-center gap-1 ">
          <Button
            icon={UpArrow}
            style="link"
            weight="bold"
            className={classNames("rounded-md text-gray-500", {
              "cursor-not-allowed !text-green-500": currentVote === "up",
            })}
            onClick={() => handleUpdateVote("up")}
          />
          <Typography weight="semibold">{netVotes}</Typography>
          <Button
            icon={DownArrow}
            style="link"
            weight="bold"
            className={classNames("rounded-md text-gray-500", {
              "cursor-not-allowed !text-red-500": currentVote === "down",
            })}
            onClick={() => handleUpdateVote("down")}
          />
        </div>
      </div>
      <div className="neeto-ui-bg-gray-200  h-[1px] w-[75%] w-full" />
    </>
  );
};

export default Post;
