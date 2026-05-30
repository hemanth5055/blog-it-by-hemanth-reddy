import React from "react";

import { NoData } from "@bigbinary/neetoui";

import routes from "../../routes";

const NotFound = () => (
  <NoData
    className="font-medium"
    description="We couldn't find a blog post matching that web address. "
    title="Blog post not found"
    primaryButtonProps={{
      label: "Go to home",
      to: routes.root,
    }}
  />
);

export default NotFound;
