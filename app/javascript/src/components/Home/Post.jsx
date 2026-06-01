import React from "react";

import { Tag, Typography } from "@bigbinary/neetoui";
import dayjs from "dayjs";
import { Link } from "react-router-dom/cjs/react-router-dom.min";

import { useFetchCategories } from "../../hooks/reactQuery/useCategoriesApi";

const Post = ({ title, description, createdAt, slug, categoryIds = [] }) => {
  const { data: { data: { categories = [] } = {} } = {} } =
    useFetchCategories();

  // Corrected filtering logic
  const postCategories = categories.filter(cat => categoryIds.includes(cat.id));

  return (
    <div className="flex w-[70%] flex-col gap-2 p-3">
      <Link to={`/posts/${slug}/show`}>
        <Typography
          className="hover:neeto-ui-text-primary-500"
          style="h2"
          weight="semibold"
        >
          {title}
        </Typography>
      </Link>
      <div className="flex flex-wrap gap-1">
        {postCategories.map(category => (
          <Tag key={category.id} label={category.name} />
        ))}
      </div>
      <div>
        <Typography
          className="line-clamp-2 italic text-gray-500"
          style="body1"
          weight="medium"
        >
          {description}
        </Typography>
      </div>
      <Typography className="text-gray-400" style="body2" weight="medium">
        {dayjs(createdAt).format("MMM D, YYYY hh:mm A")}
      </Typography>
      <div className="neeto-ui-bg-gray-200 h-[1px] w-full" />
    </div>
  );
};

export default Post;
