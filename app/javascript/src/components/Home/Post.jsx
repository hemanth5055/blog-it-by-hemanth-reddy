import React from "react";

import { Typography } from "@bigbinary/neetoui";

const Post = () => (
  <div className="flex w-[70%] flex-col gap-2 p-3">
    <Typography className="text-gray-100" style="h2" weight="semibold">
      Rails 8 introduces a basic authentication generator
    </Typography>
    <div>
      <Typography
        className="italic text-gray-300"
        style="body1"
        weight="medium"
      >
        Rails now include all the key building blocks needed to do basic
        authentication, but many new developers are still uncertain of how to
        put them together, so they end up leaning on all-in-one gems that hide
        the mechanics. To address this, Rails 8 has introduced a generator that
        simplifies the addition of basic authentication to Rails ...
      </Typography>
    </div>
    <Typography className="text-gray-400" style="body2" weight="medium">
      30 September 2024
    </Typography>
    <div className="neeto-ui-bg-gray-500 h-[2px] w-full" />
  </div>
);

export default Post;
