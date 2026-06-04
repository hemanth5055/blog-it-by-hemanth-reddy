import React from "react";

import { Button } from "neetoui";

const Element = ({ icon, to, tooltipContent, onClick, isActive }) => (
  <Button
    icon={icon}
    style="link"
    to={to}
    className={`rounded-sm text-white  ${
      isActive
        ? "neeto-ui-border-primary-500 border-b-2"
        : "border-b-2 border-transparent"
    }`}
    tooltipProps={{
      content: tooltipContent,
      position: "right",
      className: "font-medium",
    }}
    onClick={onClick}
  />
);

export default Element;
