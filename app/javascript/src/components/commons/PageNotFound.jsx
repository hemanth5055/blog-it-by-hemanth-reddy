import React from "react";

import { NoData } from "neetoui";
import routes from "src/routes";
import withT from "utils/withT";

const PageNotFound = ({ t }) => (
  <div className="flex h-full w-full items-center justify-center">
    <NoData
      title={t("titles.pageNotFound")}
      primaryButtonProps={{
        label: t("labels.goToHome"),
        to: routes.root,
        weight: "medium",
      }}
    />
  </div>
);
export default withT(PageNotFound);
