import React from "react";

import { Book, List, Edit } from "@bigbinary/neeto-icons";

import Element from "./Element";

import routes from "../../routes";

const Sidebar = () => (
  <div className="flex h-full w-full flex-col items-center gap-5">
    <div className=" flex items-center justify-center rounded-md p-2">
      <Book className="neeto-ui-text-white" />
    </div>
    <div className="flex h-full w-full flex-col items-center gap-4">
      <Element icon={List} to={routes.root} tooltipContent="Posts" />
      <Element icon={Edit} to={routes.create} tooltipContent="Create post" />
    </div>
    <div className="flex w-full flex-col items-center gap-4">
      <div className="neeto-ui-bg-gray-500 h-8 w-8 rounded-full" />
    </div>
  </div>
);

export default Sidebar;
