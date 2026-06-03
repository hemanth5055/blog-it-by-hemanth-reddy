import React from "react";

import dayjs from "dayjs";
import { Tag, Typography } from "neetoui";
import { Link } from "react-router-dom/cjs/react-router-dom.min";

const Post = ({ title, createdAt, slug, categories = [], author }) => (
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
    <div className="flex w-full gap-2">
      <Typography className="text-gray-400" style="body2" weight="medium">
        {author.name} •
      </Typography>
      <Typography className="text-gray-400" style="body2" weight="medium">
        {dayjs(createdAt).format("MMM D, YYYY")}
      </Typography>
    </div>
    <div className="neeto-ui-bg-gray-200 h-[1px] w-full" />
  </div>
);

export default Post;
