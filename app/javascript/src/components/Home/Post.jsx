import React from "react";

import { Typography } from "@bigbinary/neetoui";
import dayjs from "dayjs";

const Post = ({ title, description, createdAt }) => (
  <div className="flex w-[70%] flex-col gap-2 p-3">
    <Typography className="text-gray-100" style="h2" weight="semibold">
      {title}
    </Typography>
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
