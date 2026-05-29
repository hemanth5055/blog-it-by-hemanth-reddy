import React from "react";

import { Book, List } from "@bigbinary/neeto-icons";
import { Button } from "@bigbinary/neetoui";

import routes from "../../routes";

const Sidebar = () => (
  <div className="flex h-full w-full flex-col items-center gap-5">
    <div className=" flex items-center justify-center rounded-md p-2">
      <Book className="neeto-ui-text-white" />
    </div>
    <div className="flex h-full w-full flex-col items-center gap-4">
      <Button
        className="text-white hover:bg-[#262626]"
        icon={List}
        style="text"
        to={routes.root}
        tooltipProps={{
          content: "posts",
          position: "right",
        }}
      />
    </div>
    <div className="flex w-full flex-col items-center gap-4">
      <div className="neeto-ui-bg-gray-500 h-8 w-8 rounded-full" />
    </div>
  </div>
);

export default Sidebar;
