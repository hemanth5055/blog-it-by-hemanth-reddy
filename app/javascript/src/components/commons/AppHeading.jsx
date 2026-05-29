import React from "react";

import { Typography } from "@bigbinary/neetoui";

const AppHeading = ({ title }) => (
  <Typography className="text-white" style="h1" weight="medium">
    {title}
  </Typography>
);

export default AppHeading;
