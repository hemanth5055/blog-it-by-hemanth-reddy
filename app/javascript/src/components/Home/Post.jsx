import React from "react";

import dayjs from "dayjs";
import { Tag, Typography, Avatar } from "neetoui";
import { Link } from "react-router-dom";

const Post = ({ title, updatedAt, slug, categories = [], author }) => (
  <div className="flex w-[70%] flex-col gap-2 p-3">
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
        <Typography className="text-gray-400" style="body2" weight="medium">
          {author.name}
        </Typography>
        <Typography className="text-gray-400" style="body2" weight="medium">
          {dayjs(updatedAt).format("MMM D, YYYY")}
        </Typography>
      </div>
    </div>
    <div className="neeto-ui-bg-gray-200 h-[1px] w-full" />
  </div>
);

export default Post;
