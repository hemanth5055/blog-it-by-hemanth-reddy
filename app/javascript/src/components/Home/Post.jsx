import React from "react";

import { useUpdateVote } from "hooks/reactQuery/useVotesApi";
import { UpArrow, DownArrow } from "neetoicons";
import { Tag, Typography } from "neetoui";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import queryClient from "utils/queryClient";

import { VOTE_TYPES } from "./contants";
import PostAuthor from "./PostAuthor";
import VoteButton from "./VoteButton";

import { QUERY_KEYS } from "../../constants/query";

const Post = ({
  id,
  title,
  updatedAt,
  slug,
  categories = [],
  author,
  netVotes,
  isBloggable,
  currentVote,
}) => {
  const { mutate: updateVote } = useUpdateVote();
  const { t } = useTranslation();

  const handleUpdateVote = voteType => {
    updateVote(
      { postId: id, voteType },
      {
        onSuccess: () =>
          queryClient.invalidateQueries({
            queryKey: [QUERY_KEYS.POSTS],
            refetchType: "active",
          }),
      }
    );
  };

  const handleVote = vote => {
    const isSameVote = currentVote === vote;
    handleUpdateVote(isSameVote ? VOTE_TYPES.NEUTRAL : vote);
  };

  return (
    <>
      <div className="flex w-[75%] justify-between">
        <div className="flex flex-col gap-2 p-3">
          <div className="flex items-center gap-2">
            {categories.map(({ id, name }) => (
              <Tag key={id} label={name} style="secondary" />
            ))}
          </div>
          <Link className="flex items-center gap-2" to={`/posts/${slug}/show`}>
            <Typography
              className="hover:neeto-ui-text-primary-500"
              style="h2"
              weight="semibold"
            >
              {title}
            </Typography>
            {isBloggable && (
              <Tag
                className="!text-white"
                label={t("labels.blogIt")}
                style="success"
              />
            )}
          </Link>
          <PostAuthor name={author.name} updatedAt={updatedAt} />
        </div>
        <div className="flex flex-col items-center justify-center">
          <VoteButton
            activeClassName="text-green-500"
            icon={UpArrow}
            isActive={currentVote === VOTE_TYPES.UP}
            onClick={() => handleVote(VOTE_TYPES.UP)}
          />
          <Typography weight="semibold">{netVotes}</Typography>
          <VoteButton
            activeClassName="text-red-500"
            icon={DownArrow}
            isActive={currentVote === VOTE_TYPES.DOWN}
            onClick={() => handleVote(VOTE_TYPES.DOWN)}
          />
        </div>
      </div>
      <div className="neeto-ui-bg-gray-200 h-[1px] w-[70%]" />
    </>
  );
};

export default Post;
