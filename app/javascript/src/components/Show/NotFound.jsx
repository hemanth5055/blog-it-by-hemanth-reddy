import React from "react";

import { NoData } from "neetoui";

import routes from "../../routes";
import withT from "../../utils/withT";

const NotFound = ({ t }) => (
  <NoData
    className="font-medium"
    description={t("messages.blogPostNotFound")}
    title={t("titles.blogPostNotFound")}
    primaryButtonProps={{
      label: t("labels.goToHome"),
      to: routes.root,
      weight: "medium",
    }}
  />
);

export default withT(NotFound);
