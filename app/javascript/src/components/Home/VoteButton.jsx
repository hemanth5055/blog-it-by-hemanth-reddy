// VoteButton.jsx
import React from "react";

import classNames from "classnames";
import { Button } from "neetoui";

const VoteButton = ({ icon, isActive, activeClassName, onClick }) => (
  <Button
    icon={icon}
    size="large"
    style="link"
    weight="bold"
    className={classNames("rounded-md text-gray-500", {
      [` ${activeClassName}`]: isActive,
    })}
    onClick={onClick}
  />
);

export default VoteButton;
