import React from "react";

import Sidebar from "../Sidebar";

const WithSidebar = Component => {
  const WrappedComponent = props => (
    <div className="flex h-full w-full">
      <div className="h-full w-20 bg-[#171717] px-2 py-5">
        <Sidebar />
      </div>
      <div className="h-full flex-1 p-5">
        <Component {...props} />
      </div>
    </div>
  );

  WrappedComponent.displayName = `WithSidebar(${
    Component.displayName || Component.name || "Component"
  })`;

  return WrappedComponent;
};

export default WithSidebar;
