import React from "react";

import { Typography } from "@bigbinary/neetoui";
import dayjs from "dayjs";
import { Link } from "react-router-dom/cjs/react-router-dom.min";

const Post = ({ title, description, createdAt, slug }) => (
  <div className="flex w-[70%] flex-col gap-2 p-3">
    <Link to={`/posts/${slug}/show`}>
      <Typography
        className="hover:neeto-ui-text-primary-500 "
        style="h2"
        weight="semibold"
      >
        {title}
      </Typography>
    </Link>
    <div>
      <Typography
        className="line-clamp-2 italic text-gray-300"
        style="body1"
        weight="medium"
      >
        {description}
      </Typography>
    </div>
    <Typography className="text-gray-400" style="body2" weight="medium">
      {dayjs(createdAt).format("MMM D, YYYY hh:mm A")}
    </Typography>
    <div className="neeto-ui-bg-gray-500 h-[2px] w-full" />
  </div>
);

export default Post;
