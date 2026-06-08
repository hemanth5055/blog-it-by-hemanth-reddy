import React from "react";

import { AppHeading } from "commons";
import { useFetchUserPosts } from "hooks/reactQuery/usePostsApi";
import { Typography, NoData, Spinner } from "neetoui";
import { useTranslation } from "react-i18next";
import routes from "src/routes";
import { useRowFilterStore } from "stores/useRowFilterStore";

import Table from "./Table";
import { sanitizeFilters } from "./utils";

const User = () => {
  const { t } = useTranslation();
  const { selectedFilters } = useRowFilterStore();
  const { isLoading, data: { posts = [] } = {} } = useFetchUserPosts(
    sanitizeFilters(selectedFilters)
  );

  if (isLoading) {
    return (
      <div className="flex h-full w-full flex-col gap-5 p-7">
        <div className="flex w-full flex-col gap-4 pb-4">
          <AppHeading title={t("titles.myBlogPosts")} />
          <Typography weight="semibold">
            {posts?.length} {t("messages.articles")}
          </Typography>
        </div>
        <div className="flex h-full w-full items-center justify-center">
          <Spinner />
        </div>
      </div>
    );
  }

  if (!posts) {
    return (
      <div className="flex h-full w-full items-center justify-center">
        <NoData
          title={t("titles.somethingWentWrong")}
          primaryButtonProps={{
            label: t("labels.goToHome"),
            to: routes.root,
            weight: "medium",
          }}
        />
      </div>
    );
  }

  return (
    <div className="flex h-full w-full flex-col gap-5 p-7">
      <div className="flex w-full flex-col">
        <AppHeading title={t("titles.myBlogPosts")} />
      </div>
      <div className="flex w-full flex-col">
        <Table posts={posts} />
      </div>
    </div>
  );
};

export default User;
