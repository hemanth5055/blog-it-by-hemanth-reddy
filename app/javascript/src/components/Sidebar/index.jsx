import React, { useState } from "react";

import { Book, List, Edit, Category } from "@bigbinary/neeto-icons";
import { useTranslation } from "react-i18next";

import Element from "./Element";

import routes from "../../routes";
import withT from "../../utils/withT";
import CategorySidebar from "../Category";

const Sidebar = () => {
  const { t } = useTranslation();
  const [showCategories, setShowCategories] = useState(false);

  return (
    <>
      <div className="flex h-full w-full flex-col items-center gap-5">
        <div className=" flex items-center justify-center rounded-md p-2">
          <Book />
        </div>
        <div className="flex h-full w-full flex-col items-center gap-4">
          <Element
            icon={List}
            to={routes.root}
            tooltipContent={t("tooltips.posts")}
          />
          <Element
            icon={Edit}
            to={routes.create}
            tooltipContent={t("tooltips.createPost")}
          />
          <Element
            icon={Category}
            tooltipContent={t("tooltips.viewAndAddCategories")}
            onClick={() => setShowCategories(true)}
          />
        </div>
        <div className="flex w-full flex-col items-center gap-4">
          <div className="neeto-ui-bg-gray-500 h-8 w-8 rounded-full" />
        </div>
      </div>
      <CategorySidebar
        setShowCategories={setShowCategories}
        showCategories={showCategories}
      />
    </>
  );
};

export default withT(Sidebar);
