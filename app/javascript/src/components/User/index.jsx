import React from "react";

import dayjs from "dayjs";
import {
  useDeletePost,
  useFetchUserPosts,
  useUpdatePost,
} from "hooks/reactQuery/usePostsApi";
import { MenuHorizontal } from "neetoicons";
import { Table, Typography, Dropdown, NoData, Spinner } from "neetoui";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import queryClient from "utils/queryClient";

import { QUERY_KEYS } from "../../constants/query";
import routes from "../../routes";
import { AppHeading } from "../commons";

const User = () => {
  const { t } = useTranslation();

  const { isLoading, data: { posts = [] } = {} } = useFetchUserPosts();
  const { mutate: updatePost } = useUpdatePost();
  const { mutate: deletePost } = useDeletePost();

  const handleTogglePublish = (slug, showActionPublish) => {
    updatePost(
      { slug, payload: {}, isPostBeingPublished: showActionPublish },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({
            queryKey: [QUERY_KEYS.POSTS, QUERY_KEYS.USER],
            refetchType: "active",
          });

          queryClient.invalidateQueries({
            queryKey: [QUERY_KEYS.POST, slug],
            refetchType: "active",
          });

          queryClient.invalidateQueries({
            queryKey: [QUERY_KEYS.POSTS],
            refetchType: "active",
          });
        },
      }
    );
  };

  const handleDeletePost = slug => {
    deletePost(slug, {
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: [QUERY_KEYS.POSTS, QUERY_KEYS.USER],
          refetchType: "active",
        });

        queryClient.invalidateQueries({
          queryKey: [QUERY_KEYS.POSTS],
          refetchType: "active",
        });
      },
    });
  };

  const rowData = posts.map(post => ({
    ...post,
    category: post.categories.map(c => c.name).join(", "),
  }));

  if (isLoading) {
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
    </div>;
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

  const columns = [
    {
      title: t("labels.title"),
      dataIndex: "title",
      key: "title",
      render: (_, post) => (
        <Link to={routes.show.replace(":slug", post.slug)}>
          <Typography className="neeto-ui-text-primary-500" weight="medium">
            {post.title}
          </Typography>
        </Link>
      ),
    },
    {
      title: t("labels.category"),
      dataIndex: "category",
      key: "category",
      render: category => (
        <Typography className="text-gray-400" style="body1" weight="medium">
          {category}
        </Typography>
      ),
    },
    {
      title: t("labels.lastUpdatedAt"),
      dataIndex: "lastUpdatedAt",
      key: "lastUpdatedAt",
      render: lastUpdatedAt => (
        <Typography className="text-gray-400" style="body1" weight="medium">
          {dayjs(lastUpdatedAt).format("MMM D, YYYY - hh:mm:ss A")}
        </Typography>
      ),
    },
    {
      title: t("labels.status"),
      dataIndex: "status",
      key: "status",
      render: status => (
        <Typography className="text-gray-400" style="body1" weight="medium">
          {status ? status.charAt(0).toUpperCase() + status.slice(1) : ""}
        </Typography>
      ),
    },
    {
      key: "action",
      render: (_, post) => {
        const isPublished = post.status === "published";

        return (
          <Dropdown
            buttonStyle="text"
            className="p-2"
            icon={MenuHorizontal}
            strategy="fixed"
          >
            <Dropdown.Menu>
              <Dropdown.MenuItem
                className="text-md cursor-pointer  rounded-md p-2"
                onClick={() => handleTogglePublish(post.slug, !isPublished)}
              >
                <Typography style="body1" weight="medium">
                  {isPublished ? t("labels.unpublish") : t("labels.publish")}
                </Typography>
              </Dropdown.MenuItem>
              <Dropdown.Divider />
              <Dropdown.MenuItem
                className="cursor-pointer rounded-md p-2"
                onClick={() => handleDeletePost(post.slug)}
              >
                <Typography style="body1" weight="medium">
                  {t("labels.delete")}
                </Typography>
              </Dropdown.MenuItem>
            </Dropdown.Menu>
          </Dropdown>
        );
      },
    },
  ];

  return (
    <div className="flex h-full w-full flex-col gap-5 p-7">
      <div className="flex w-full flex-col gap-4 pb-4">
        <AppHeading title={t("titles.myBlogPosts")} />
        <Typography weight="semibold">
          {posts?.length} {t("messages.articles")}
        </Typography>
      </div>
      <div className="h-full w-full">
        <Table columnData={columns} loading={isLoading} rowData={rowData} />
      </div>
    </div>
  );
};

export default User;
