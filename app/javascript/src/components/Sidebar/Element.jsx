import React from "react";

import { Button } from "neetoui";
import { useLocation } from "react-router-dom";

const Element = ({ icon, to, tooltipContent, onClick }) => {
  const location = useLocation();

  const isActive = location.pathname === to;

  return (
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
};

export default Element;
