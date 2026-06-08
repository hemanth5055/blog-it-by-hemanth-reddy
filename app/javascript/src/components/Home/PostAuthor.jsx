// PostAuthor.jsx
import React from "react";

import dayjs from "dayjs";
import { Avatar, Typography } from "neetoui";

const PostAuthor = ({ name, updatedAt }) => (
  <div className="flex items-center gap-3">
    <Avatar user={{ name }} />
    <div className="flex flex-col">
      <Typography className="text-gray-400" style="body2" weight="medium">
        {name}
      </Typography>
      <Typography className="text-gray-400" style="body2" weight="medium">
        {dayjs(updatedAt).format("MMM D, YYYY")}
      </Typography>
    </div>
  </div>
);

export default PostAuthor;
