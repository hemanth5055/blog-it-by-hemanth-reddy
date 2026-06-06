import React from "react";

import { useFetchUserPosts } from "hooks/reactQuery/usePostsApi";
import { Typography, NoData, Spinner } from "neetoui";
import { useTranslation } from "react-i18next";

import ColumnFilter from "./ColumnFilter";
import RowFilter from "./RowFilter";
import Table from "./Table";

import routes from "../../routes";
import { AppHeading } from "../commons";

const User = () => {
  const { t } = useTranslation();

  const { isLoading, data: { posts = [] } = {} } = useFetchUserPosts();

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
      <div className="flex w-full flex-col gap-4 pb-4">
        <AppHeading title={t("titles.myBlogPosts")} />
        <div className="flex w-full items-center justify-between">
          <Typography weight="semibold">
            {t("messages.article", { count: posts.length })}
          </Typography>
          <div className="flex gap-3">
            <ColumnFilter />
            <RowFilter />
          </div>
        </div>
      </div>
      <div className="h-full w-full">
        <Table posts={posts} />
      </div>
    </div>
  );
};

export default User;
